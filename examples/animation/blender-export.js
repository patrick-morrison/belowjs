/**
 * Below.js to Blender Scene Exporter
 *
 * Exports Below.js animation scenes in two formats:
 * 1. GLB file - Direct import into Blender with camera animation, lights, and model
 * 2. Python script - For manual scene setup with full control
 *
 * Coordinate System Note:
 * - Three.js/Below.js: Y-up, right-handed
 * - Blender (when importing glTF): Handles conversion automatically
 */

import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

/**
 * Export scene as GLB file for direct Blender import
 *
 * @param {Object} options - Export options
 * @param {Array} options.keyframes - Array of keyframe objects with time, position, target
 * @param {number} options.duration - Animation duration in seconds
 * @param {string} options.interpolation - Interpolation mode ('linear', 'ease', 'smooth')
 * @param {Object} options.settings - Scene settings (diveMode, torch, fogColor, etc.)
 * @param {THREE.Scene} options.scene - The Three.js scene to export (includes model)
 * @param {THREE.Camera} options.camera - The current camera
 * @param {string} options.modelFilename - Original model filename (for reference)
 * @param {Function} onComplete - Callback when export is complete
 */
export async function exportToGLB(options, filename = 'belowjs_scene.glb') {
    const {
        keyframes = [],
        duration = 20,
        interpolation = 'linear',
        settings = {},
        scene,
        camera
    } = options;

    const fps = 30;

    // Create a new scene for export
    const exportScene = new THREE.Scene();
    exportScene.name = 'BelowJS_Scene';

    // Clone the model from the original scene
    if (scene) {
        scene.traverse((child) => {
            // Clone meshes (the model)
            if (child.isMesh) {
                const clonedMesh = child.clone();
                // Clone materials to avoid sharing
                if (clonedMesh.material) {
                    if (Array.isArray(clonedMesh.material)) {
                        clonedMesh.material = clonedMesh.material.map(m => m.clone());
                    } else {
                        clonedMesh.material = clonedMesh.material.clone();
                    }
                }
                exportScene.add(clonedMesh);
            }
        });
    }

    // Create camera for export
    const exportCamera = new THREE.PerspectiveCamera(65, 16/9, 0.05, 2000);
    exportCamera.name = 'BelowJS_Camera';

    // Create camera target (empty object)
    const cameraTarget = new THREE.Object3D();
    cameraTarget.name = 'Camera_Target';

    // Set initial camera position from first keyframe
    if (keyframes.length > 0) {
        const firstKF = keyframes[0];
        exportCamera.position.set(firstKF.position.x, firstKF.position.y, firstKF.position.z);
        cameraTarget.position.set(firstKF.target.x, firstKF.target.y, firstKF.target.z);
        exportCamera.lookAt(cameraTarget.position);
    } else if (camera) {
        exportCamera.position.copy(camera.position);
        exportCamera.quaternion.copy(camera.quaternion);
    }

    exportScene.add(exportCamera);
    exportScene.add(cameraTarget);

    // Create animation clips for camera and target
    if (keyframes.length > 0) {
        const cameraClip = createCameraAnimationClip(keyframes, 'CameraAnimation', interpolation);
        const targetClip = createTargetAnimationClip(keyframes, 'TargetAnimation', interpolation);

        // Attach animations to objects
        exportCamera.animations = [cameraClip];
        cameraTarget.animations = [targetClip];
    }

    // Add lights based on settings
    addLightsToScene(exportScene, settings, exportCamera);

    // Export using GLTFExporter
    const exporter = new GLTFExporter();

    try {
        const glb = await exporter.parseAsync(exportScene, {
            binary: true,
            animations: [
                ...(exportCamera.animations || []),
                ...(cameraTarget.animations || [])
            ],
            includeCustomExtensions: true
        });

        // Download the GLB file
        const blob = new Blob([glb], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename.endsWith('.glb') ? filename : `${filename}.glb`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('GLB export failed:', error);
        throw error;
    }
}

/**
 * Create animation clip for camera position
 */
function createCameraAnimationClip(keyframes, name, interpolation) {
    const times = [];
    const positionValues = [];

    keyframes.forEach(kf => {
        times.push(kf.time);
        positionValues.push(kf.position.x, kf.position.y, kf.position.z);
    });

    const positionTrack = new THREE.VectorKeyframeTrack(
        '.position',
        times,
        positionValues,
        getInterpolationType(interpolation)
    );

    return new THREE.AnimationClip(name, -1, [positionTrack]);
}

/**
 * Create animation clip for camera target position
 */
function createTargetAnimationClip(keyframes, name, interpolation) {
    const times = [];
    const positionValues = [];

    keyframes.forEach(kf => {
        times.push(kf.time);
        positionValues.push(kf.target.x, kf.target.y, kf.target.z);
    });

    const positionTrack = new THREE.VectorKeyframeTrack(
        '.position',
        times,
        positionValues,
        getInterpolationType(interpolation)
    );

    return new THREE.AnimationClip(name, -1, [positionTrack]);
}

/**
 * Get Three.js interpolation type from string
 */
function getInterpolationType(interpolation) {
    switch (interpolation) {
        case 'smooth':
            return THREE.InterpolateSmooth;
        case 'ease':
        case 'linear':
        default:
            return THREE.InterpolateLinear;
    }
}

/**
 * Add lights to the export scene
 */
function addLightsToScene(scene, settings, camera) {
    const isDiveMode = settings.diveMode === true;

    if (isDiveMode) {
        // Dive mode - torch/spotlight
        const torchIntensity = settings.torch?.intensity || 1;
        const torchWidth = settings.torch?.width || 45;

        const torch = new THREE.SpotLight(0xfff2e6, torchIntensity * 5);
        torch.name = 'Torch';
        torch.angle = THREE.MathUtils.degToRad(torchWidth / 2);
        torch.penumbra = 0.5;
        torch.position.set(0, 0, 0);

        // Parent to camera
        camera.add(torch);
        torch.target.position.set(0, 0, -1);
        camera.add(torch.target);
    } else {
        // Survey mode lighting
        const ambient = new THREE.AmbientLight(0xffffff, 0.5);
        ambient.name = 'Ambient';
        scene.add(ambient);

        const sunMain = new THREE.DirectionalLight(0xffffff, 1.2);
        sunMain.name = 'Sun_Main';
        sunMain.position.set(10, 20, 10);
        scene.add(sunMain);

        const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
        fillLight.name = 'Fill_Light';
        fillLight.position.set(-10, 10, -10);
        scene.add(fillLight);

        const bottomLight = new THREE.DirectionalLight(0xffffff, 0.3);
        bottomLight.name = 'Bottom_Fill';
        bottomLight.position.set(0, -10, 0);
        scene.add(bottomLight);

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.7);
        hemiLight.name = 'Hemisphere';
        scene.add(hemiLight);
    }
}

// ============================================================================
// Python Script Export (fallback/alternative)
// ============================================================================

/**
 * Convert Three.js coordinates to Blender coordinates
 * Three.js Y-up -> Blender Z-up
 */
function toBlenderCoords(x, y, z) {
    return { x: x, y: -z, z: y };
}

/**
 * Generate Blender Python script from Below.js animation data
 */
export function generateBlenderScript(options) {
    const {
        keyframes = [],
        duration = 20,
        interpolation = 'linear',
        settings = {},
        modelFilename = 'model.glb'
    } = options;

    const fps = 30;
    const totalFrames = Math.ceil(duration * fps);
    const cameraFov = 65;
    const cameraNear = 0.05;
    const cameraFar = 2000;

    let script = `"""
Below.js to Blender Scene Import Script
Generated by Below.js Animation Editor
https://belowjs.com

This script recreates your Below.js animation scene in Blender.

Instructions:
1. Open Blender
2. Go to Scripting workspace
3. Create a new text file and paste this script
4. Click "Run Script"
5. Import your GLB model: File > Import > glTF 2.0 (.glb/.gltf)
   Model file: ${modelFilename}
"""

import bpy
import math
from mathutils import Vector

# Clear existing objects (optional - comment out to preserve scene)
def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.meshes:
        if block.users == 0: bpy.data.meshes.remove(block)
    for block in bpy.data.cameras:
        if block.users == 0: bpy.data.cameras.remove(block)
    for block in bpy.data.lights:
        if block.users == 0: bpy.data.lights.remove(block)

# Uncomment to clear scene: clear_scene()

# Scene settings
bpy.context.scene.frame_start = 1
bpy.context.scene.frame_end = ${totalFrames}
bpy.context.scene.render.fps = ${fps}

# Create camera
cam_data = bpy.data.cameras.new(name='BelowJS_Camera')
cam_data.lens_unit = 'FOV'
cam_data.angle = math.radians(${cameraFov})
cam_data.clip_start = ${cameraNear}
cam_data.clip_end = ${cameraFar}

camera = bpy.data.objects.new('BelowJS_Camera', cam_data)
bpy.context.collection.objects.link(camera)

# Create camera target
target = bpy.data.objects.new('Camera_Target', None)
target.empty_display_type = 'SPHERE'
target.empty_display_size = 0.5
bpy.context.collection.objects.link(target)

# Track To constraint
track_constraint = camera.constraints.new(type='TRACK_TO')
track_constraint.target = target
track_constraint.track_axis = 'TRACK_NEGATIVE_Z'
track_constraint.up_axis = 'UP_Y'

bpy.context.scene.camera = camera

${generateKeyframeSection(keyframes, fps, interpolation)}

${generateLightingSection(settings)}

${generateWorldSettings(settings)}

# Set viewport to camera view
for area in bpy.context.screen.areas:
    if area.type == 'VIEW_3D':
        for space in area.spaces:
            if space.type == 'VIEW_3D':
                space.region_3d.view_perspective = 'CAMERA'
                break

bpy.context.scene.frame_set(1)
print("Below.js scene imported!")
print(f"Animation: ${totalFrames} frames at ${fps} fps")
print("Import your GLB model: File > Import > glTF 2.0")
`;

    return script;
}

function generateKeyframeSection(keyframes, fps, interpolation) {
    if (keyframes.length === 0) {
        return '# No keyframes defined\npass';
    }

    let section = `# Keyframes (${interpolation} interpolation)\n`;

    keyframes.forEach((kf, index) => {
        const frame = Math.round(kf.time * fps) + 1;
        const pos = toBlenderCoords(kf.position.x, kf.position.y, kf.position.z);
        const tgt = toBlenderCoords(kf.target.x, kf.target.y, kf.target.z);

        section += `
bpy.context.scene.frame_set(${frame})
camera.location = (${pos.x.toFixed(4)}, ${pos.y.toFixed(4)}, ${pos.z.toFixed(4)})
camera.keyframe_insert(data_path="location", frame=${frame})
target.location = (${tgt.x.toFixed(4)}, ${tgt.y.toFixed(4)}, ${tgt.z.toFixed(4)})
target.keyframe_insert(data_path="location", frame=${frame})
`;
    });

    const interpType = interpolation === 'linear' ? 'LINEAR' : 'BEZIER';
    section += `
def set_interpolation(obj, interp):
    if obj.animation_data and obj.animation_data.action:
        for fc in obj.animation_data.action.fcurves:
            for kf in fc.keyframe_points:
                kf.interpolation = interp
                ${interpolation === 'smooth' ? "kf.handle_left_type = 'AUTO'\n                kf.handle_right_type = 'AUTO'" : ''}

set_interpolation(camera, '${interpType}')
set_interpolation(target, '${interpType}')
`;

    return section;
}

function generateLightingSection(settings) {
    const isDiveMode = settings.diveMode === true;

    if (isDiveMode) {
        const torchIntensity = settings.torch?.intensity || 1;
        const torchWidth = settings.torch?.width || 45;

        return `
# Dive Mode - Torch
torch_data = bpy.data.lights.new(name='Torch', type='SPOT')
torch_data.energy = ${(torchIntensity * 500).toFixed(1)}
torch_data.spot_size = math.radians(${torchWidth})
torch_data.spot_blend = 0.5
torch = bpy.data.objects.new('Torch', torch_data)
bpy.context.collection.objects.link(torch)
torch.parent = camera
`;
    }

    return `
# Survey Mode Lighting
sun = bpy.data.lights.new(name='Sun_Main', type='SUN')
sun.energy = 1.2
sun_obj = bpy.data.objects.new('Sun_Main', sun)
bpy.context.collection.objects.link(sun_obj)
sun_obj.rotation_euler = (math.radians(45), math.radians(25), math.radians(45))

fill = bpy.data.lights.new(name='Fill', type='SUN')
fill.energy = 0.8
fill_obj = bpy.data.objects.new('Fill', fill)
bpy.context.collection.objects.link(fill_obj)
fill_obj.rotation_euler = (math.radians(45), math.radians(-135), 0)

bottom = bpy.data.lights.new(name='Bottom', type='SUN')
bottom.energy = 0.3
bottom_obj = bpy.data.objects.new('Bottom', bottom)
bpy.context.collection.objects.link(bottom_obj)
bottom_obj.rotation_euler = (math.radians(-90), 0, 0)
`;
}

function generateWorldSettings(settings) {
    let fogColor = settings.fogColor || '#001122';
    if (fogColor.startsWith('#')) fogColor = fogColor.slice(1);
    const r = parseInt(fogColor.slice(0, 2), 16) / 255;
    const g = parseInt(fogColor.slice(2, 4), 16) / 255;
    const b = parseInt(fogColor.slice(4, 6), 16) / 255;
    const isDiveMode = settings.diveMode === true;

    const bgColor = isDiveMode
        ? `(${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)}, 1.0)`
        : '(0.05, 0.05, 0.05, 1.0)';

    return `
# World
world = bpy.data.worlds.get('World') or bpy.data.worlds.new('World')
bpy.context.scene.world = world
world.use_nodes = True
bg = world.node_tree.nodes.get('Background')
if bg: bg.inputs['Color'].default_value = ${bgColor}
`;
}

/**
 * Download the generated Blender script as a .py file
 */
export function downloadBlenderScript(options, filename = 'belowjs_scene.py') {
    const script = generateBlenderScript(options);
    const blob = new Blob([script], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.py') ? filename : `${filename}.py`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
