---
layout: doc
sidebar: true
---

[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / BelowViewer

# Class: BelowViewer

Defined in: [core/BelowViewer.js:81](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L81)

BelowViewer - Core 3D rendering engine for BelowJS

The low-level viewer that provides direct access to Three.js scene, camera, 
and renderer with VR capabilities and model loading. This is the foundation
class that powers ModelViewer and can be used directly for custom implementations.

 BelowViewer

## Param

DOM element to render into

## Param

Configuration options

## Fires

BelowViewer#initialized - Fired when viewer is fully initialized

## Fires

BelowViewer#model-loaded - Fired when a model is loaded successfully

## Fires

BelowViewer#model-load-progress - Fired during model loading

## Fires

BelowViewer#model-load-error - Fired when model loading fails

## Fires

BelowViewer#vr-session-start - Fired when VR session begins

## Fires

BelowViewer#vr-session-end - Fired when VR session ends

## Fires

BelowViewer#camera-change - Fired when camera position changes

## Example

```ts
// Basic usage
const viewer = new BelowViewer(document.getElementById('container'), {
  scene: {
    background: { type: 'color', value: '#041729' }
  },
  camera: {
    fov: 65,
    position: { x: 0, y: 5, z: 10 }
  },
  vr: {
    enabled: true
  }
});

// Load a model
viewer.loadModel('path/to/model.glb');

// Access Three.js objects directly
const scene = viewer.sceneManager.scene;
const camera = viewer.cameraManager.camera;
const renderer = viewer.renderer;
```

## Since

1.0.0

## Extends

- [`EventSystem`](EventSystem.md)

## Constructors

### Constructor

> **new BelowViewer**(`container`, `config?`): `BelowViewer`

Defined in: [core/BelowViewer.js:88](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L88)

Creates a new BelowViewer instance

#### Parameters

##### container

`HTMLElement`

DOM element to render into

##### config?

`BelowViewerConfig` = `{}`

Configuration options

#### Returns

`BelowViewer`

#### Overrides

[`EventSystem`](EventSystem.md).[`constructor`](EventSystem.md#constructor)

## Properties

### cameraManager

> **cameraManager**: [`Camera`](Camera.md)

Defined in: [core/BelowViewer.js:155](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L155)

***

### config

> **config**: `any`

Defined in: [core/BelowViewer.js:151](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L151)

***

### container

> **container**: `HTMLElement`

Defined in: [core/BelowViewer.js:91](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L91)

***

### currentAbortController

> **currentAbortController**: `AbortController`

Defined in: [core/BelowViewer.js:164](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L164)

***

### dolly

> **dolly**: `any`

Defined in: [core/BelowViewer.js:160](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L160)

***

### events

> **events**: `object`

Defined in: [utils/EventSystem.js:41](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/utils/EventSystem.js#L41)

#### Inherited from

[`EventSystem`](EventSystem.md).[`events`](EventSystem.md#events)

***

### isInitialized

> **isInitialized**: `boolean`

Defined in: [core/BelowViewer.js:162](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L162)

***

### isVREnabled

> **isVREnabled**: `boolean`

Defined in: [core/BelowViewer.js:159](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L159)

***

### loadedModels

> **loadedModels**: `any`[]

Defined in: [core/BelowViewer.js:163](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L163)

***

### modelLoader

> **modelLoader**: [`ModelLoader`](ModelLoader.md)

Defined in: [core/BelowViewer.js:156](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L156)

***

### renderer

> **renderer**: `any`

Defined in: [core/BelowViewer.js:153](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L153)

***

### sceneManager

> **sceneManager**: [`Scene`](Scene.md)

Defined in: [core/BelowViewer.js:154](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L154)

***

### vrManager

> **vrManager**: [`VRManager`](VRManager.md)

Defined in: [core/BelowViewer.js:157](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L157)

## Methods

### applyDesktopPositions()

> **applyDesktopPositions**(`positions`): `void`

Defined in: [core/BelowViewer.js:695](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L695)

#### Parameters

##### positions

`any`

#### Returns

`void`

***

### applyInitialPositions()

> **applyInitialPositions**(`positions`): `void`

Defined in: [core/BelowViewer.js:803](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L803)

#### Parameters

##### positions

`any`

#### Returns

`void`

***

### centerModelAndRecalculateBounds()

> **centerModelAndRecalculateBounds**(`model`): `Vector3`

Defined in: [core/BelowViewer.js:450](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L450)

Centers the model at the origin and recalculates its bounding box.
Note: This method modifies the model's position as a side effect.

#### Parameters

##### model

`Object3D`

The model to center.

#### Returns

`Vector3`

The original center offset for reference.

***

### clearModels()

> **clearModels**(): `void`

Defined in: [core/BelowViewer.js:584](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L584)

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: [core/BelowViewer.js:634](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L634)

Clean up and dispose of all resources

Properly disposes of the renderer, scene, models, and all associated resources.
Call this when you're done with the viewer to prevent memory leaks.

#### Returns

`void`

#### Method

dispose

#### Example

```ts
// Clean up when done
viewer.dispose();
```

#### Since

1.0.0

***

### emit()

> **emit**(`event`, `data?`): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:121](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/utils/EventSystem.js#L121)

Emit an event to all listeners

#### Parameters

##### event

`string`

Event name to emit

##### data?

`any`

Data to pass to event listeners

#### Returns

[`EventSystem`](EventSystem.md)

Returns this for chaining

#### Method

emit

#### Example

```ts
// Emit event with data
this.emit('model-loaded', { 
  model: loadedModel, 
  loadTime: Date.now() - startTime 
});

// Emit event without data
this.emit('rendering-complete');
```

#### Since

1.0.0

#### Inherited from

[`EventSystem`](EventSystem.md).[`emit`](EventSystem.md#emit)

***

### frameModel()

> **frameModel**(`model`): `void`

Defined in: [core/BelowViewer.js:430](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L430)

#### Parameters

##### model

`any`

#### Returns

`void`

***

### getCamera()

> **getCamera**(): `any`

Defined in: [core/BelowViewer.js:516](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L516)

Get the Three.js camera instance

#### Returns

`any`

The Three.js camera or null if not initialized

#### Method

getCamera

#### Example

```ts
// Access camera directly
const camera = viewer.getCamera();
if (camera) {
  camera.position.set(10, 5, 15);
}
```

#### Since

1.0.0

***

### getCurrentModel()

> **getCurrentModel**(): `any`

Defined in: [core/BelowViewer.js:571](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L571)

Get the most recently loaded model

#### Returns

`any`

The current model object or null if none loaded

#### Method

getCurrentModel

#### Example

```ts
// Get current model and modify it
const model = viewer.getCurrentModel();
if (model) {
  model.visible = false;
}
```

#### Since

1.0.0

***

### getLoadedModels()

> **getLoadedModels**(): `any`[]

Defined in: [core/BelowViewer.js:552](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L552)

Get all loaded models

#### Returns

`any`[]

Array of loaded model objects with metadata

#### Method

getLoadedModels

#### Example

```ts
// List all loaded models
const models = viewer.getLoadedModels();
// Process models array (length: models.length)
```

#### Since

1.0.0

***

### getRenderer()

> **getRenderer**(): `any`

Defined in: [core/BelowViewer.js:535](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L535)

Get the Three.js WebGL renderer instance

#### Returns

`any`

The Three.js renderer or null if not initialized

#### Method

getRenderer

#### Example

```ts
// Configure renderer directly
const renderer = viewer.getRenderer();
if (renderer) {
  renderer.shadowMap.enabled = true;
}
```

#### Since

1.0.0

***

### getScene()

> **getScene**(): `any`

Defined in: [core/BelowViewer.js:497](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L497)

#### Returns

`any`

***

### getVRComfortSettings()

> **getVRComfortSettings**(): `any`

Defined in: [core/BelowViewer.js:779](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L779)

Get current VR comfort settings

#### Returns

`any`

Current VR comfort settings or null if VR not enabled

#### Method

getVRComfortSettings

#### Example

```ts
// Check current settings
const settings = viewer.getVRComfortSettings();
// Access comfort settings: settings?.enableComfort
```

#### Since

1.0.0

***

### getVRManager()

> **getVRManager**(): [`VRManager`](VRManager.md)

Defined in: [core/BelowViewer.js:736](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L736)

#### Returns

[`VRManager`](VRManager.md)

***

### init()

> **init**(): `void`

Defined in: [core/BelowViewer.js:169](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L169)

#### Returns

`void`

***

### initRenderer()

> **initRenderer**(): `void`

Defined in: [core/BelowViewer.js:201](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L201)

#### Returns

`void`

***

### initVR()

> **initVR**(): `void`

Defined in: [core/BelowViewer.js:235](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L235)

#### Returns

`void`

***

### isVRPresenting()

> **isVRPresenting**(): `boolean`

Defined in: [core/BelowViewer.js:732](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L732)

#### Returns

`boolean`

***

### loadModel()

> **loadModel**(`url`, `options?`): `Promise`\<`Object3D`\>

Defined in: [core/BelowViewer.js:356](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L356)

Load a 3D model from a URL

#### Parameters

##### url

`string`

Path to the GLB model file

##### options?

Loading options

###### initialPositions?

`any`

Camera positions for this model

###### onProgress?

`Function`

Progress callback function

###### signal?

`AbortSignal`

AbortSignal for cancelling the load

#### Returns

`Promise`\<`Object3D`\>

Promise that resolves to the loaded model

#### Async

#### Method

loadModel

#### Fires

BelowViewer#model-loaded - When model loads successfully

#### Fires

BelowViewer#model-load-progress - During loading progress

#### Fires

BelowViewer#model-load-error - When loading fails

#### Example

```ts
// Load a model with progress tracking
try {
  const model = await viewer.loadModel('model.glb', {
    onProgress: (progress) => {
      // Update loading UI with progress percentage
      const percent = Math.round(progress.loaded / progress.total * 100);
    }
  });
  // Model loaded successfully
} catch (error) {      
  console.error('Failed to load model:', error);
}
```

#### Since

1.0.0

***

### off()

> **off**(`event`, `callback?`): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:90](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/utils/EventSystem.js#L90)

Remove an event listener

#### Parameters

##### event

`string`

Event name

##### callback?

`Function`

Specific callback to remove (optional)

#### Returns

[`EventSystem`](EventSystem.md)

Returns this for chaining

#### Method

off

#### Example

```ts
// Remove specific callback
viewer.off('model-loaded', myCallback);

// Remove all listeners for an event
viewer.off('model-loaded');
```

#### Since

1.0.0

#### Inherited from

[`EventSystem`](EventSystem.md).[`off`](EventSystem.md#off)

***

### on()

> **on**(`event`, `callback`): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:65](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/utils/EventSystem.js#L65)

Add an event listener

#### Parameters

##### event

`string`

Event name to listen for

##### callback

`Function`

Callback function to execute

#### Returns

[`EventSystem`](EventSystem.md)

Returns this for chaining

#### Method

on

#### Example

```ts
// Listen for model loading events
viewer.on('model-loaded', (data) => {
  // Process loaded model
});

// Chain multiple listeners
viewer
  .on('model-loaded', onLoaded)
  .on('model-error', onError);
```

#### Since

1.0.0

#### Inherited from

[`EventSystem`](EventSystem.md).[`on`](EventSystem.md#on)

***

### onWindowResize()

> **onWindowResize**(): `void`

Defined in: [core/BelowViewer.js:312](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L312)

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**(): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:146](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/utils/EventSystem.js#L146)

Remove all event listeners

#### Returns

[`EventSystem`](EventSystem.md)

Returns this for chaining

#### Method

removeAllListeners

#### Example

```ts
// Clean up all listeners
viewer.removeAllListeners();
```

#### Since

1.0.0

#### Inherited from

[`EventSystem`](EventSystem.md).[`removeAllListeners`](EventSystem.md#removealllisteners)

***

### removeModel()

> **removeModel**(`model`): `void`

Defined in: [core/BelowViewer.js:575](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L575)

#### Parameters

##### model

`any`

#### Returns

`void`

***

### setupEventListeners()

> **setupEventListeners**(): `void`

Defined in: [core/BelowViewer.js:302](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L302)

#### Returns

`void`

***

### setVRComfortPreset()

> **setVRComfortPreset**(`preset`): `void`

Defined in: [core/BelowViewer.js:796](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L796)

Apply a predefined VR comfort preset

#### Parameters

##### preset

`string`

Preset name ('conservative', 'moderate', 'advanced')

#### Returns

`void`

#### Method

setVRComfortPreset

#### Example

```ts
// Use conservative comfort settings
viewer.setVRComfortPreset('conservative');
```

#### Since

1.0.0

***

### setVRComfortSettings()

> **setVRComfortSettings**(`settings`): `void`

Defined in: [core/BelowViewer.js:760](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L760)

Set VR comfort settings for motion sickness reduction

#### Parameters

##### settings

VR comfort configuration

###### comfortRadius?

`number`

Radius of comfort zone

###### enableComfort?

`boolean`

Enable comfort features

###### fadeDistance?

`number`

Distance for fade effect

#### Returns

`void`

#### Method

setVRComfortSettings

#### Example

```ts
// Configure VR comfort
viewer.setVRComfortSettings({
  enableComfort: true,
  comfortRadius: 0.4
});
```

#### Since

1.0.0

***

### startRenderLoop()

> **startRenderLoop**(): `void`

Defined in: [core/BelowViewer.js:468](https://github.com/patrick-morrison/belowjs/blob/03f7a8be425170900ce7223be2af24ddc822ead2/src/core/BelowViewer.js#L468)

#### Returns

`void`
