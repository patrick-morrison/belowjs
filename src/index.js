/*
 * BelowJS - A modular 3D viewer library
 * Copyright (C) 2025 Patrick Morrison
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @fileoverview BelowJS - A modular 3D viewer library for underwater exploration
 * 
 * BelowJS is a comprehensive Three.js-based library that provides high-level
 * and low-level APIs for creating immersive 3D model viewers with VR support,
 * measurement tools, and underwater exploration features.
 * 
 * @version 0.1.3
 * @author Patrick Morrison
 * @license GPL-3.0-or-later
 * 
 * @example
 * // High-level API - Ready-to-use viewer with UI
 * import { ModelViewer } from 'belowjs';
 * 
 * const viewer = new ModelViewer('#container', {
 *   models: {
 *     'wreck': { url: 'shipwreck.glb', name: 'Historic Wreck' }
 *   },
 *   enableVR: true,
 *   enableMeasurement: true
 * });
 * 
 * @example
 * // Low-level API - Custom implementations
 * import { BelowViewer } from 'belowjs';
 * 
 * const viewer = new BelowViewer(container, {
 *   scene: { background: { type: 'color', value: '#041729' } },
 *   vr: { enabled: true }
 * });
 * 
 * viewer.loadModel('model.glb');
 * 
 * @since 1.0.0
 */

// Import CSS styles for bundling
import './styles/index.css';

// Export main classes
export { BelowViewer } from './core/BelowViewer.js';
export { ModelViewer } from './viewers/ModelViewer.js';
export { VRManager } from './core/VRManager.js';
export { Scene } from './core/Scene.js';
export { Camera } from './core/Camera.js';
export { ModelLoader } from './models/ModelLoader.js';
export { EventSystem } from './utils/EventSystem.js';
export { ConfigValidator } from './utils/ConfigValidator.js';


// Export thick line classes for measurement and advanced usage
export { Line2, LineMaterial, LineGeometry } from './measurement/ThickLine.js';
