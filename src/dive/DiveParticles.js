import * as THREE from 'three';

export class DiveParticles {
  constructor(scene) {
    this.scene = scene;
    this.particleBounds = {
      min: new THREE.Vector3(-50, -25, -50),
      max: new THREE.Vector3(50, 25, 50)
    };
    this.particleCount = 1750;
    this.createParticleSystem();
  }
  calculateParticleCount(bounds) {
    const size = new THREE.Vector3();
    bounds.getSize(size);
    const expansion = 2.5;
    const expandedSize = size.clone().multiplyScalar(expansion);
    const volume = expandedSize.x * expandedSize.y * expandedSize.z;
    const calculatedCount = Math.round(volume * 0.01);
    const minParticles = 100;
    const maxParticles = 16000;
    const finalCount = Math.max(minParticles, Math.min(maxParticles, calculatedCount));
    return finalCount;
  }
  
  createParticleSystem() {
    const particlePositions = new Float32Array(this.particleCount * 3);
    const particleVelocities = new Float32Array(this.particleCount * 3);
    const particleSizes = new Float32Array(this.particleCount);
    
    this.initializeParticleData(particlePositions, particleVelocities, particleSizes);
    
    const particleGeometry = new THREE.BufferGeometry();
    
    const particleIndices = new Float32Array(this.particleCount);
    for (let i = 0; i < this.particleCount; i++) {
      particleIndices[i] = i;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('originalSize', new THREE.BufferAttribute(particleSizes, 1));
    particleGeometry.setAttribute('velocity', new THREE.BufferAttribute(particleVelocities, 3));
    particleGeometry.setAttribute('particleIndex', new THREE.BufferAttribute(particleIndices, 1));
    
    this.originalMaterial = this.createParticleMaterial();
    
    this.particles = new THREE.Points(particleGeometry, this.originalMaterial);
    this.particles.visible = false; // Start hidden (survey mode)
    
    this.scene.add(this.particles);
  }
  
  /**
   * Initialize particle data arrays
   */
  initializeParticleData(particlePositions, particleVelocities, particleSizes) {
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      
      particlePositions[i3] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x);
      particlePositions[i3 + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y);
      particlePositions[i3 + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
      
      const baseCurrentX = 0.00001;
      const baseCurrentY = -0.000005;
      const baseCurrentZ = 0.000005;
      
      particleVelocities[i3] = baseCurrentX + (Math.random() - 0.5) * 0.00002;
      particleVelocities[i3 + 1] = baseCurrentY + (-Math.random() * 0.00001 - 0.000005);
      particleVelocities[i3 + 2] = baseCurrentZ + (Math.random() - 0.5) * 0.00002;
      
      // Vary particle sizes - most small, some medium, few large
      const rand = Math.random();
      if (rand < 0.7) {
        particleSizes[i] = 0.0075 + Math.random() * 0.005; // Small particles (0.0075-0.0125)
      } else if (rand < 0.9) {
        particleSizes[i] = 0.0125 + Math.random() * 0.0075; // Medium particles (0.0125-0.02)
      } else {
        particleSizes[i] = 0.02 + Math.random() * 0.01; // Large particles (0.02-0.03)
      }
    }
  }
  
  /**
   * Create particle material with GPU shaders
   */
  createParticleMaterial() {
    // Create circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Draw a white circle with soft edges
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    
    const circleTexture = new THREE.CanvasTexture(canvas);
    circleTexture.needsUpdate = true;
    
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointTexture: { value: circleTexture },
        color: { value: new THREE.Color(0xffffff) },
        opacity: { value: 1.0 },
        size: { value: 2.0 },
        boundsMin: { value: this.particleBounds.min.clone() },
        boundsMax: { value: this.particleBounds.max.clone() },
        fogColor: { value: new THREE.Color(0x041729) },
        fogDensity: { value: 0.0 }
      },
      vertexShader: `
        uniform float time;
        uniform float size;
        uniform vec3 boundsMin;
        uniform vec3 boundsMax;
        
        attribute float originalSize;
        attribute vec3 velocity;
        attribute float particleIndex;
        
        varying float vOpacity;
        varying float vFogFactor;
        
        void main() {
          // Calculate animated position
          vec3 animatedPosition = position;
          
          // Apply constant velocity drift
          animatedPosition += velocity * time;
          
          // Add gentle wave motion
          float waveX = sin(time * 0.00025 + particleIndex * 0.01) * 0.5;
          float waveY = cos(time * 0.0002 + particleIndex * 0.008) * 0.25;
          float waveZ = sin(time * 0.0003 + particleIndex * 0.012) * 0.5;
          animatedPosition += vec3(waveX, waveY, waveZ);
          
          // Boundary wrapping
          vec3 boundsSize = boundsMax - boundsMin;
          animatedPosition = boundsMin + mod(animatedPosition - boundsMin, boundsSize);
          
          // Size calculation
          float finalSize = originalSize * size;
          
          // Transform to screen space
          vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = finalSize * (300.0 / -mvPosition.z);
          
          // Calculate fog factor for exponential squared fog
          float fogDistance = -mvPosition.z;
          vFogFactor = 1.0 - exp(-fogDistance * fogDistance * 0.0064);
          vFogFactor = clamp(vFogFactor, 0.0, 1.0);
          
          // Simple opacity variation
          vOpacity = 0.8 + sin(particleIndex * 0.1) * 0.2;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        uniform vec3 color;
        uniform float opacity;
        uniform vec3 fogColor;
        
        varying float vOpacity;
        varying float vFogFactor;
        
        void main() {
          // Sample the circular texture
          vec4 textureColor = texture2D(pointTexture, gl_PointCoord);
          
          // Base particle color
          vec3 finalColor = color;
          
          // Apply fog mixing
          finalColor = mix(finalColor, fogColor, vFogFactor);
          
          // Final alpha with fog consideration
          float finalAlpha = textureColor.a * opacity * vOpacity * (1.0 - vFogFactor * 0.8);
          
          gl_FragColor = vec4(finalColor, finalAlpha);
          
          // Alpha test
          if (gl_FragColor.a < 0.01) discard;
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
      fog: false
    });
  }
  
  /**
   * Enable particles
   */
  enable() {
    if (this.particles) {
      // Ensure we're using the shader material with time uniform
      this.particles.material = this.originalMaterial;
      this.particles.visible = true;
    }
  }
  
  /**
   * Disable particles
   */
  disable() {
    if (this.particles) {
      this.particles.visible = false;
    }
  }
  
  /**
   * Update particle system (call in animation loop)
   */
  update(time) {
    // Update shader uniforms with current time
    if (this.particles && this.particles.material && this.particles.material.uniforms) {
      this.particles.material.uniforms.time.value = time;
    }
  }
  
  /**
   * Update particle boundaries based on model
   */
  updateBounds(model) {
    if (!model) return;
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    // Expand bounds to 2.5x the model size (like wrecksploration)
    const expansion = 2.5;
    const halfExpandedSize = size.clone().multiplyScalar(expansion * 0.5);
    this.particleBounds.min.copy(center).sub(halfExpandedSize);
    this.particleBounds.max.copy(center).add(halfExpandedSize);
    // Calculate new particle count based on bounds
    const newParticleCount = this.calculateParticleCount(new THREE.Box3(this.particleBounds.min, this.particleBounds.max));
    // If particle count changed significantly, recreate the system
    if (Math.abs(newParticleCount - this.particleCount) > this.particleCount * 0.2) {
      if (this.particles) {
        this.scene.remove(this.particles);
        if (this.particles.geometry) this.particles.geometry.dispose();
        if (this.particles.material) this.particles.material.dispose();
        this.particles = null;
      }
      this.particleCount = newParticleCount;
      this.createParticleSystem();
    } else {
      // Redistribute particles within new bounds
      this.redistributeParticles();
    }
  }
  
  /**
   * Redistribute particles within current bounds
   */
  redistributeParticles() {
    if (!this.particles || !this.particles.geometry.attributes.position) return;
    
    const positions = this.particles.geometry.attributes.position.array;
    
    for (let i = 0; i < this.particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions within bounds
      positions[i3] = this.particleBounds.min.x + Math.random() * (this.particleBounds.max.x - this.particleBounds.min.x);
      positions[i3 + 1] = this.particleBounds.min.y + Math.random() * (this.particleBounds.max.y - this.particleBounds.min.y);
      positions[i3 + 2] = this.particleBounds.min.z + Math.random() * (this.particleBounds.max.z - this.particleBounds.min.z);
    }
    
    // Mark geometry for update
    this.particles.geometry.attributes.position.needsUpdate = true;
    
    // Update material bounds uniforms
    if (this.particles.material.uniforms) {
      this.particles.material.uniforms.boundsMin.value.copy(this.particleBounds.min);
      this.particles.material.uniforms.boundsMax.value.copy(this.particleBounds.max);
    }
  }
  
  /**
   * Update fog uniforms for shader material
   */
  updateFog(fog) {
    if (this.particles && this.particles.material && this.particles.material.uniforms) {
      if (fog) {
        this.particles.material.uniforms.fogColor.value.copy(fog.color);
        this.particles.material.uniforms.fogDensity.value = fog.density;
      } else {
        this.particles.material.uniforms.fogDensity.value = 0.0;
      }
    }
  }
  
  /**
   * Dispose of particle system
   */
  dispose() {
    if (this.particles) {
      this.scene.remove(this.particles);
      if (this.particles.geometry) {
        this.particles.geometry.dispose();
      }
      if (this.particles.material) {
        this.particles.material.dispose();
      }
      this.particles = null;
    }
  }
}