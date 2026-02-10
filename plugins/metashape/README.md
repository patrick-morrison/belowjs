# belowjs Metashape Plugin

Agisoft Metashape plugin that checks your photogrammetry project against all belowjs compatibility requirements and exports an optimised GLB file.

## Installation

Copy `belowjs_checker.py` to your Metashape auto-start scripts folder:

| Platform | Path |
|----------|------|
| Windows  | `%LOCALAPPDATA%/Agisoft/Metashape Pro/scripts/` |
| macOS    | `~/Library/Application Support/Agisoft/Metashape Pro/scripts/` |
| Linux    | `~/.local/share/Agisoft/Metashape Pro/scripts/` |

Restart Metashape Professional. A **belowjs** menu will appear in the menu bar.

## Requirements

- Agisoft Metashape Professional 2.0+
- A chunk with an aligned, built, and textured model

## Menu Items

| Menu Item | Description |
|-----------|-------------|
| **belowjs > Check Compatibility** | Run all checks without exporting. Shows a detailed report. |
| **belowjs > Export for belowjs** | Run checks, then export GLB with belowjs-optimal settings. |
| **belowjs > About** | Plugin version and summary of checks performed. |

## What It Checks

| Check | belowjs Requirement |
|-------|---------------------|
| Polygon count | VR: max 1,200,000 faces. AR/mobile: max 500,000. |
| Texture size | 4096x4096 recommended. Power-of-two enforced. |
| Texture pages | 4 pages recommended for VR detail. |
| Texture type | Diffuse map required. |
| Scale bars | Needed for accurate measurements in belowjs. |
| Camera alignment | 90%+ alignment expected. |
| Model orientation | Checks for obviously wrong orientation. |
| Vertex colors | Should be disabled (textures used instead). |

## Export Settings

The plugin exports with these settings:

- **Format:** Binary glTF (.glb)
- **Textures:** JPEG, embedded
- **Vertex colors:** Disabled
- **UV coordinates:** Enabled
- **Normals:** Enabled

> **Important:** Enable "glTF Y-up convention" in the Metashape export dialog. Without this, models will appear on their side in belowjs.

## After Export

Run the belowjs optimiser for web/VR compression:

```bash
npx belowjs-optimiser pack model.glb
```

This applies:
- Draco mesh compression (20-bit quantization, no visible seams)
- KTX2 texture compression (ETC1S, quality 64)
- Polygon simplification to 1.2M if needed
- Texture resize to max 4096x4096

Typical result: 30% smaller on disk, 75% less VRAM usage.
