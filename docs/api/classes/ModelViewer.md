[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / ModelViewer

# Class: ModelViewer

Defined in: viewers/ModelViewer.js:150

ModelViewer - High-level 3D model viewer with automatic UI management

A complete 3D model viewer that handles multiple models with dropdown selection,
VR support, measurement tools, and underwater exploration features. This class
provides a simple API for creating production-ready 3D viewers with minimal setup.

 ModelViewer

## Param

DOM element or CSS selector for the viewer container

## Param

Configuration options

## Fires

ModelViewer#model-loaded - Fired when a model is successfully loaded

## Fires

ModelViewer#model-load-error - Fired when model loading fails

## Fires

ModelViewer#focus - Fired when camera focuses on a point

## Fires

ModelViewer#camera-reset - Fired when camera is reset to initial position

## Fires

ModelViewer#vr-session-start - Fired when VR session begins

## Fires

ModelViewer#vr-session-end - Fired when VR session ends

## Examples

```ts
// Basic usage with single model
const viewer = new ModelViewer('#viewer-container', {
  models: {
    'wreck': {
      url: 'models/shipwreck.glb',
      name: 'Historic Shipwreck',
      credit: 'Maritime Museum'
    }
  },
  enableVR: true,
  enableMeasurement: true
});
```

```ts
// Multiple models with custom positions
const viewer = new ModelViewer(document.getElementById('viewer'), {
  models: {
    'model1': {
      url: 'path/to/model1.glb',
      name: 'Model 1',
      initialPositions: {
        desktop: {
          camera: { x: 10, y: 5, z: 15 },
          target: { x: 0, y: 0, z: 0 }
        },
        vr: {
          dolly: { x: 0, y: 2, z: 10 },
          rotation: { x: 0, y: 0, z: 0 }
        }
      }
    },
    'model2': {
      url: 'path/to/model2.glb',
      name: 'Model 2'
    }
  },
  enableVR: true,
  enableMeasurement: true,
  enableDiveSystem: true,
  measurementTheme: 'light'
});
```

## Since

1.0.0

## Extends

- [`EventSystem`](EventSystem.md)

## Constructors

### Constructor

> **new ModelViewer**(`container`, `options?`): `ModelViewer`

Defined in: viewers/ModelViewer.js:157

Creates a new ModelViewer instance

#### Parameters

##### container

DOM element or CSS selector for the viewer container

`string` | `HTMLElement`

##### options?

`ModelViewerOptions` = `{}`

Configuration options

#### Returns

`ModelViewer`

#### Overrides

[`EventSystem`](EventSystem.md).[`constructor`](EventSystem.md#constructor)

## Properties

### \_onFullscreenChange()

> **\_onFullscreenChange**: () => `void`

Defined in: viewers/ModelViewer.js:412

#### Returns

`void`

***

### belowViewer

> **belowViewer**: [`BelowViewer`](BelowViewer.md)

Defined in: viewers/ModelViewer.js:199

***

### comfortGlyph

> **comfortGlyph**: `VRComfortGlyph`

Defined in: viewers/ModelViewer.js:202

***

### config

> **config**: `any`

Defined in: viewers/ModelViewer.js:195

***

### container

> **container**: `string` \| `HTMLElement`

Defined in: viewers/ModelViewer.js:162

***

### currentModelKey

> **currentModelKey**: `string`

Defined in: viewers/ModelViewer.js:198

***

### diveSystem

> **diveSystem**: `DiveSystem`

Defined in: viewers/ModelViewer.js:203

***

### events

> **events**: `object`

Defined in: utils/EventSystem.js:41

#### Inherited from

[`EventSystem`](EventSystem.md).[`events`](EventSystem.md#events)

***

### focusEventHandlers

> **focusEventHandlers**: `object`

Defined in: viewers/ModelViewer.js:599

#### onMouseClick()

> **onMouseClick**: (`event`) => `void`

##### Parameters

###### event

`any`

##### Returns

`void`

#### onMouseDown()

> **onMouseDown**: (`event`) => `void`

##### Parameters

###### event

`any`

##### Returns

`void`

#### onMouseMove()

> **onMouseMove**: (`event`) => `void`

##### Parameters

###### event

`any`

##### Returns

`void`

#### onMouseUp()

> **onMouseUp**: () => `void`

##### Returns

`void`

***

### fullscreenButton

> **fullscreenButton**: `HTMLDivElement`

Defined in: viewers/ModelViewer.js:204

***

### lastComfortMode

> **lastComfortMode**: `any`

Defined in: viewers/ModelViewer.js:205

***

### measurementSystem

> **measurementSystem**: `MeasurementSystem`

Defined in: viewers/ModelViewer.js:201

***

### modelReady

> **modelReady**: `boolean`

Defined in: viewers/ModelViewer.js:960

***

### options

> **options**: `any`

Defined in: viewers/ModelViewer.js:196

***

### ui

> **ui**: `object`

Defined in: viewers/ModelViewer.js:200

## Methods

### \_maybeAttachDiveSystem()

> **\_maybeAttachDiveSystem**(): `void`

Defined in: viewers/ModelViewer.js:333

#### Returns

`void`

***

### \_maybeAttachFullscreenButton()

> **\_maybeAttachFullscreenButton**(): `void`

Defined in: viewers/ModelViewer.js:383

#### Returns

`void`

***

### \_maybeAttachMeasurementSystem()

> **\_maybeAttachMeasurementSystem**(): `void`

Defined in: viewers/ModelViewer.js:256

#### Returns

`void`

***

### \_maybeAttachVRComfortGlyph()

> **\_maybeAttachVRComfortGlyph**(): `Promise`\<`void`\>

Defined in: viewers/ModelViewer.js:281

#### Returns

`Promise`\<`void`\>

***

### applyInitialPositions()

> **applyInitialPositions**(`modelConfig`, `_model`): `void`

Defined in: viewers/ModelViewer.js:978

#### Parameters

##### modelConfig

`any`

##### \_model

`any`

#### Returns

`void`

***

### createDiveModeToggle()

> **createDiveModeToggle**(): `void`

Defined in: viewers/ModelViewer.js:789

#### Returns

`void`

***

### createInfoPanel()

> **createInfoPanel**(): `void`

Defined in: viewers/ModelViewer.js:858

#### Returns

`void`

***

### createLoadingIndicator()

> **createLoadingIndicator**(): `void`

Defined in: viewers/ModelViewer.js:840

#### Returns

`void`

***

### createModelSelector()

> **createModelSelector**(): `void`

Defined in: viewers/ModelViewer.js:723

#### Returns

`void`

***

### createStatusIndicator()

> **createStatusIndicator**(): `void`

Defined in: viewers/ModelViewer.js:849

#### Returns

`void`

***

### createUI()

> **createUI**(): `void`

Defined in: viewers/ModelViewer.js:680

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: viewers/ModelViewer.js:1241

Clean up and dispose of all resources

Call this method when you're done with the ModelViewer to free up memory
and remove event listeners. The viewer will not be usable after disposal.

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

Defined in: utils/EventSystem.js:121

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

### focusOn()

> **focusOn**(`point`, `distance?`): `void`

Defined in: viewers/ModelViewer.js:1131

Focus the camera on a specific 3D point

#### Parameters

##### point

3D point to focus on

###### x

`number`

X coordinate

###### y

`number`

Y coordinate

###### z

`number`

Z coordinate

##### distance?

`number` = `null`

Distance from the point (uses default if null)

#### Returns

`void`

#### Method

focusOn

#### Fires

ModelViewer#focus - When camera focus changes

#### Example

```ts
// Focus on a specific point
viewer.focusOn({ x: 10, y: 5, z: 0 }, 15);
```

#### Since

1.0.0

***

### focusOnPoint()

> **focusOnPoint**(`event`): `void`

Defined in: viewers/ModelViewer.js:606

#### Parameters

##### event

`any`

#### Returns

`void`

***

### getCamera()

> **getCamera**(): `any`

Defined in: viewers/ModelViewer.js:1090

Get the Three.js camera instance

#### Returns

`any`

The Three.js camera or null if not initialized

#### Method

getCamera

#### Example

```ts
const camera = viewer.getCamera();
if (camera) {
  // Access camera.position, camera.rotation, etc.
}
```

#### Since

1.0.0

***

### getCurrentModel()

> **getCurrentModel**(): `any`

Defined in: viewers/ModelViewer.js:1072

Get the currently loaded model object

#### Returns

`any`

The current Three.js model object or null if none loaded

#### Method

getCurrentModel

#### Example

```ts
const model = viewer.getCurrentModel();
if (model) {
  // Inspect model properties and children
}
```

#### Since

1.0.0

***

### getScene()

> **getScene**(): `any`

Defined in: viewers/ModelViewer.js:1109

Get the Three.js scene instance

#### Returns

`any`

The Three.js scene or null if not initialized

#### Method

getScene

#### Example

```ts
// Add custom objects to the scene
const scene = viewer.getScene();
if (scene) {
  scene.add(myCustomObject);
}
```

#### Since

1.0.0

***

### getVRComfortSettings()

> **getVRComfortSettings**(): `any`

Defined in: viewers/ModelViewer.js:1219

Get current VR comfort settings

#### Returns

`any`

Current VR comfort settings or null if not available

#### Method

getVRComfortSettings

#### Example

```ts
const settings = viewer.getVRComfortSettings();
// Check settings?.enableComfort
```

#### Since

1.0.0

***

### hideLoading()

> **hideLoading**(): `void`

Defined in: viewers/ModelViewer.js:1026

#### Returns

`void`

***

### init()

> **init**(): `void`

Defined in: viewers/ModelViewer.js:214

#### Returns

`void`

***

### isFullscreen()

> **isFullscreen**(): `boolean`

Defined in: viewers/ModelViewer.js:432

#### Returns

`boolean`

***

### isMeasurementHelper()

> **isMeasurementHelper**(`obj`): `boolean`

Defined in: viewers/ModelViewer.js:646

#### Parameters

##### obj

`any`

#### Returns

`boolean`

***

### loadModel()

> **loadModel**(`modelKey`): `Promise`\<`void`\>

Defined in: viewers/ModelViewer.js:917

Load a model by its key

#### Parameters

##### modelKey

`string`

The key of the model to load (must exist in config.models)

#### Returns

`Promise`\<`void`\>

Promise that resolves when model loading is complete

#### Async

#### Method

loadModel

#### Fires

ModelViewer#model-loaded - When model loads successfully

#### Fires

ModelViewer#model-load-error - When model loading fails

#### Example

```ts
// Load a specific model
await viewer.loadModel('shipwreck');
```

#### Since

1.0.0

***

### off()

> **off**(`event`, `callback?`): [`EventSystem`](EventSystem.md)

Defined in: utils/EventSystem.js:90

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

Defined in: utils/EventSystem.js:65

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

### onModelLoaded()

> **onModelLoaded**(`__namedParameters`): `void`

Defined in: viewers/ModelViewer.js:1047

#### Parameters

##### \_\_namedParameters

###### model

`any`

#### Returns

`void`

***

### onModelLoadError()

> **onModelLoadError**(`__namedParameters`): `void`

Defined in: viewers/ModelViewer.js:1053

#### Parameters

##### \_\_namedParameters

###### error

`any`

#### Returns

`void`

***

### onVRModeToggle()

> **onVRModeToggle**(): `void`

Defined in: viewers/ModelViewer.js:546

#### Returns

`void`

***

### onVRSessionEnd()

> **onVRSessionEnd**(): `void`

Defined in: viewers/ModelViewer.js:515

#### Returns

`void`

***

### onVRSessionStart()

> **onVRSessionStart**(): `void`

Defined in: viewers/ModelViewer.js:484

#### Returns

`void`

***

### populateDropdown()

> **populateDropdown**(): `void`

Defined in: viewers/ModelViewer.js:881

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**(): [`EventSystem`](EventSystem.md)

Defined in: utils/EventSystem.js:146

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

### resetCamera()

> **resetCamera**(): `void`

Defined in: viewers/ModelViewer.js:1152

Reset camera to the initial position for the current model

#### Returns

`void`

#### Method

resetCamera

#### Fires

ModelViewer#camera-reset - When camera is reset

#### Example

```ts
// Reset camera to initial view
viewer.resetCamera();
```

#### Since

1.0.0

***

### setupEventForwarding()

> **setupEventForwarding**(): `void`

Defined in: viewers/ModelViewer.js:445

#### Returns

`void`

***

### setupFocusInteraction()

> **setupFocusInteraction**(): `void`

Defined in: viewers/ModelViewer.js:549

#### Returns

`void`

***

### setVRComfortPreset()

> **setVRComfortPreset**(`preset`): `void`

Defined in: viewers/ModelViewer.js:1201

#### Parameters

##### preset

`any`

#### Returns

`void`

***

### setVRComfortSettings()

> **setVRComfortSettings**(`settings`): `void`

Defined in: viewers/ModelViewer.js:1195

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
// Configure VR comfort settings
viewer.setVRComfortSettings({
  enableComfort: true,
  comfortRadius: 0.4,
  fadeDistance: 0.15
});
```

#### Since

1.0.0

***

### showLoading()

> **showLoading**(`message`): `void`

Defined in: viewers/ModelViewer.js:1019

#### Parameters

##### message

`string` = `'Loading...'`

#### Returns

`void`

***

### toggleFullscreen()

> **toggleFullscreen**(): `void`

Defined in: viewers/ModelViewer.js:417

#### Returns

`void`

***

### updateFullscreenButton()

> **updateFullscreenButton**(): `void`

Defined in: viewers/ModelViewer.js:437

#### Returns

`void`

***

### updateLoadingProgress()

> **updateLoadingProgress**(`__namedParameters`): `void`

Defined in: viewers/ModelViewer.js:1039

#### Parameters

##### \_\_namedParameters

###### progress

`any`

#### Returns

`void`

***

### updateStatus()

> **updateStatus**(`message`): `void`

Defined in: viewers/ModelViewer.js:1032

#### Parameters

##### message

`any`

#### Returns

`void`
