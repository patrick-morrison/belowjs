---
layout: doc
sidebar: true
---

[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / EventSystem

# Class: EventSystem

Defined in: [utils/EventSystem.js:36](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L36)

EventSystem - Simple event emitter for BelowJS components

Provides event-driven communication between BelowJS components with error
handling and a chainable API. Used as a base class for all major BelowJS classes.

 EventSystem

## Examples

```ts
// Extend EventSystem for your own classes
class MyViewer extends EventSystem {
  constructor() {
    super();
  }
  
  loadModel() {
    this.emit('loading-start');
    this.emit('model-loaded', { model });
  }
}
```

```ts
// Listen to events
viewer.on('model-loaded', (data) => {
  // Handle loaded model
});

// Remove specific listener
viewer.off('model-loaded', myCallback);

// Remove all listeners for an event
viewer.off('model-loaded');
```

## Since

1.0.0

## Extended by

- [`BelowViewer`](BelowViewer.md)
- [`ModelViewer`](ModelViewer.md)
- [`Camera`](Camera.md)

## Constructors

### Constructor

> **new EventSystem**(): `EventSystem`

Defined in: [utils/EventSystem.js:40](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L40)

Creates a new EventSystem instance

#### Returns

`EventSystem`

## Properties

### events

> **events**: `object`

Defined in: [utils/EventSystem.js:41](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L41)

## Methods

### emit()

> **emit**(`event`, `data?`): `EventSystem`

Defined in: [utils/EventSystem.js:121](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L121)

Emit an event to all listeners

#### Parameters

##### event

`string`

Event name to emit

##### data?

`any`

Data to pass to event listeners

#### Returns

`EventSystem`

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

***

### off()

> **off**(`event`, `callback?`): `EventSystem`

Defined in: [utils/EventSystem.js:90](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L90)

Remove an event listener

#### Parameters

##### event

`string`

Event name

##### callback?

`Function`

Specific callback to remove (optional)

#### Returns

`EventSystem`

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

***

### on()

> **on**(`event`, `callback`): `EventSystem`

Defined in: [utils/EventSystem.js:65](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L65)

Add an event listener

#### Parameters

##### event

`string`

Event name to listen for

##### callback

`Function`

Callback function to execute

#### Returns

`EventSystem`

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

***

### removeAllListeners()

> **removeAllListeners**(): `EventSystem`

Defined in: [utils/EventSystem.js:146](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/utils/EventSystem.js#L146)

Remove all event listeners

#### Returns

`EventSystem`

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
