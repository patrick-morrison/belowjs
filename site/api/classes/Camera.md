---
layout: doc
sidebar: true
---

[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / Camera

# Class: Camera

Defined in: [core/Camera.js:38](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L38)

Camera - 3D camera management with controls and animation

Manages Three.js PerspectiveCamera with OrbitControls, provides smooth
focus animations, and handles camera positioning and framing operations.

 Camera

## Param

Camera configuration

## Param

Field of view in degrees

## Param

Near clipping plane

## Param

Far clipping plane

## Param

Initial camera position {x, y, z}

## Param

Desktop-specific control settings

## Fires

Camera#focus-start - When focus animation begins

## Fires

Camera#focus-complete - When focus animation completes

## Fires

Camera#controls-change - When camera position changes via controls

## Example

```ts
// Create camera with custom settings
const camera = new Camera({
  fov: 75,
  position: { x: 10, y: 5, z: 15 },
  desktop: {
    enableDamping: true,
    dampingFactor: 0.1
  }
});
```

## Since

1.0.0

## Extends

- [`EventSystem`](EventSystem.md)

## Constructors

### Constructor

> **new Camera**(`config?`): `Camera`

Defined in: [core/Camera.js:44](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L44)

Creates a new Camera instance

#### Parameters

##### config?

`any` = `{}`

Camera configuration

#### Returns

`Camera`

#### Overrides

[`EventSystem`](EventSystem.md).[`constructor`](EventSystem.md#constructor)

## Properties

### camera

> **camera**: `any`

Defined in: [core/Camera.js:47](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L47)

***

### config

> **config**: `any`

Defined in: [core/Camera.js:46](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L46)

***

### controls

> **controls**: `any`

Defined in: [core/Camera.js:48](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L48)

***

### events

> **events**: `object`

Defined in: [utils/EventSystem.js:41](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/utils/EventSystem.js#L41)

#### Inherited from

[`EventSystem`](EventSystem.md).[`events`](EventSystem.md#events)

***

### focusAnimation

> **focusAnimation**: `number`

Defined in: [core/Camera.js:49](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L49)

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [core/Camera.js:219](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L219)

Clean up and dispose of camera resources

Cancels any ongoing animations, disposes of controls, and cleans up
event listeners. Call this when done with the camera.

#### Returns

`void`

#### Method

dispose

#### Example

```ts
// Clean up camera
camera.dispose();
```

#### Since

1.0.0

***

### emit()

> **emit**(`event`, `data?`): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:121](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/utils/EventSystem.js#L121)

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

> **focusOn**(`target`, `_distance`): `void`

Defined in: [core/Camera.js:155](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L155)

Smoothly focus the camera on a target point

#### Parameters

##### target

`any`

Target position to focus on

##### \_distance

`any` = `null`

#### Returns

`void`

#### Method

focusOn

#### Fires

Camera#focus-start - When animation begins

#### Fires

Camera#focus-complete - When animation completes

#### Example

```ts
// Focus on a specific point
camera.focusOn({ x: 10, y: 5, z: 0 });

// Focus with custom distance
camera.focusOn(targetPoint, 15);
```

#### Since

1.0.0

***

### frameObject()

> **frameObject**(`center`, `size`): `void`

Defined in: [core/Camera.js:117](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L117)

Frame an object by positioning the camera to view it optimally

#### Parameters

##### center

`Vector3`

Center point of the object

##### size

`number`

Size/radius of the object

#### Returns

`void`

#### Method

frameObject

#### Example

```ts
// Frame a model based on its bounding box
const box = new THREE.Box3().setFromObject(model);
const center = box.getCenter(new THREE.Vector3());
const size = box.getSize(new THREE.Vector3()).length();
camera.frameObject(center, size);
```

#### Since

1.0.0

***

### getCamera()

> **getCamera**(): `any`

Defined in: [core/Camera.js:92](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L92)

#### Returns

`any`

***

### getControls()

> **getControls**(): `any`

Defined in: [core/Camera.js:96](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L96)

#### Returns

`any`

***

### init()

> **init**(): `void`

Defined in: [core/Camera.js:53](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L53)

#### Returns

`void`

***

### initControls()

> **initControls**(`domElement`): `void`

Defined in: [core/Camera.js:65](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L65)

#### Parameters

##### domElement

`any`

#### Returns

`void`

***

### off()

> **off**(`event`, `callback?`): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:90](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/utils/EventSystem.js#L90)

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

Defined in: [utils/EventSystem.js:65](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/utils/EventSystem.js#L65)

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

### removeAllListeners()

> **removeAllListeners**(): [`EventSystem`](EventSystem.md)

Defined in: [utils/EventSystem.js:146](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/utils/EventSystem.js#L146)

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

### setSize()

> **setSize**(`width`, `height`): `void`

Defined in: [core/Camera.js:87](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L87)

#### Parameters

##### width

`any`

##### height

`any`

#### Returns

`void`

***

### update()

> **update**(): `void`

Defined in: [core/Camera.js:81](https://github.com/patrick-morrison/belowjs/blob/3dad94c9258636bf7e164e6552e8b1768d6eaa22/src/core/Camera.js#L81)

#### Returns

`void`
