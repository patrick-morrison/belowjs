---
layout: doc
sidebar: true
---

[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / VRManager

# Class: VRManager

Defined in: [core/VRManager.js:35](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L35)

## Constructors

### Constructor

> **new VRManager**(`renderer`, `camera`, `scene`, `audioPath?`, `enableAudio?`, `container?`): `VRManager`

Defined in: [core/VRManager.js:45](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L45)

Creates a new VRManager instance

#### Parameters

##### renderer

`WebGLRenderer`

Three.js WebGL renderer with XR enabled

##### camera

`PerspectiveCamera`

Three.js camera for VR dolly system

##### scene

`Scene`

Three.js scene for VR objects

##### audioPath?

`string` = `'./sound/'`

Path to VR audio files

##### enableAudio?

`boolean` = `false`

Enable VR audio system

##### container?

`any` = `null`

#### Returns

`VRManager`

## Properties

### \_comfortSettingsInitialized

> **\_comfortSettingsInitialized**: `boolean`

Defined in: [core/VRManager.js:172](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L172)

***

### \_preVRCameraState

> **\_preVRCameraState**: `object`

Defined in: [core/VRManager.js:69](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L69)

#### autoRotate

> **autoRotate**: `any` = `null`

#### autoRotateSpeed

> **autoRotateSpeed**: `any` = `null`

#### controls

> **controls**: `any` = `null`

#### dampingFactor

> **dampingFactor**: `any` = `null`

#### enableDamping

> **enableDamping**: `any` = `null`

#### enablePan

> **enablePan**: `any` = `null`

#### enableRotate

> **enableRotate**: `any` = `null`

#### enableZoom

> **enableZoom**: `any` = `null`

#### maxDistance

> **maxDistance**: `any` = `null`

#### minDistance

> **minDistance**: `any` = `null`

#### position

> **position**: `any` = `null`

#### target

> **target**: `any` = `null`

#### zoom

> **zoom**: `any` = `null`

***

### audioPath

> **audioPath**: `string`

Defined in: [core/VRManager.js:49](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L49)

***

### camera

> **camera**: `PerspectiveCamera`

Defined in: [core/VRManager.js:47](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L47)

***

### container

> **container**: `any`

Defined in: [core/VRManager.js:51](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L51)

***

### controller1

> **controller1**: `any`

Defined in: [core/VRManager.js:61](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L61)

***

### controller2

> **controller2**: `any`

Defined in: [core/VRManager.js:62](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L62)

***

### controllerGrip1

> **controllerGrip1**: `any`

Defined in: [core/VRManager.js:63](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L63)

***

### controllerGrip2

> **controllerGrip2**: `any`

Defined in: [core/VRManager.js:64](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L64)

***

### controllerGrips

> **controllerGrips**: `any`[]

Defined in: [core/VRManager.js:66](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L66)

***

### controllers

> **controllers**: `any`[]

Defined in: [core/VRManager.js:65](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L65)

***

### enableAudio

> **enableAudio**: `boolean`

Defined in: [core/VRManager.js:50](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L50)

***

### isVRPresenting

> **isVRPresenting**: `boolean`

Defined in: [core/VRManager.js:60](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L60)

***

### isVRSupported

> **isVRSupported**: `boolean`

Defined in: [core/VRManager.js:59](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L59)

***

### lastComfortLog

> **lastComfortLog**: `number`

Defined in: [core/VRManager.js:86](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L86)

***

### onModeToggle

> **onModeToggle**: `any`

Defined in: [core/VRManager.js:88](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L88)

***

### onMovementStart

> **onMovementStart**: `any`

Defined in: [core/VRManager.js:89](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L89)

***

### onMovementStop

> **onMovementStop**: `any`

Defined in: [core/VRManager.js:90](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L90)

***

### onMovementUpdate

> **onMovementUpdate**: `any`

Defined in: [core/VRManager.js:91](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L91)

***

### renderer

> **renderer**: `WebGLRenderer`

Defined in: [core/VRManager.js:46](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L46)

***

### scene

> **scene**: `Scene`

Defined in: [core/VRManager.js:48](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L48)

***

### vrAudio

> **vrAudio**: `VRAudio`

Defined in: [core/VRManager.js:57](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L57)

***

### vrControllers

> **vrControllers**: `VRControllers`

Defined in: [core/VRManager.js:54](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L54)

***

### vrCore

> **vrCore**: `VRCore`

Defined in: [core/VRManager.js:53](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L53)

***

### vrLocomotion

> **vrLocomotion**: `VRLocomotion`

Defined in: [core/VRManager.js:56](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L56)

***

### vrTeleport

> **vrTeleport**: `VRTeleport`

Defined in: [core/VRManager.js:55](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L55)

## Methods

### \_restoreCameraState()

> **\_restoreCameraState**(): `void`

Defined in: [core/VRManager.js:351](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L351)

Restore camera state after exiting VR

#### Returns

`void`

***

### \_saveCameraState()

> **\_saveCameraState**(): `void`

Defined in: [core/VRManager.js:327](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L327)

Save current camera state before entering VR

#### Returns

`void`

***

### applyVRPositions()

> **applyVRPositions**(`positions`): `void`

Defined in: [core/VRManager.js:298](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L298)

#### Parameters

##### positions

`any`

#### Returns

`void`

***

### checkVRSupport()

> **checkVRSupport**(): `Promise`\<`any`\>

Defined in: [core/VRManager.js:441](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L441)

#### Returns

`Promise`\<`any`\>

***

### dispose()

> **dispose**(): `void`

Defined in: [core/VRManager.js:426](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L426)

Clean up and dispose of all VR resources

Properly disposes of all VR modules, controllers, audio systems, and
clears event callbacks. Call this when done with VR functionality.

#### Returns

`void`

#### Method

dispose

#### Example

```ts
// Clean up VR system
vrManager.dispose();
```

#### Since

1.0.0

***

### ensureComfortSettingsApplied()

> **ensureComfortSettingsApplied**(): `void`

Defined in: [core/VRManager.js:284](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L284)

#### Returns

`void`

***

### getComfortSettings()

> **getComfortSettings**(): `any`

Defined in: [core/VRManager.js:262](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L262)

Get current VR comfort settings

#### Returns

`any`

Current comfort settings object

#### Method

getComfortSettings

#### Example

```ts
// Check current settings
const settings = vrManager.getComfortSettings();
// Comfort status: settings.enableComfort
```

#### Since

1.0.0

***

### getVRStatus()

> **getVRStatus**(): `object`

Defined in: [core/VRManager.js:379](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L379)

#### Returns

`object`

##### audio

> **audio**: \{ `ambiencePlaying`: `boolean`; `boostPlaying`: `boolean`; `contextState`: `any`; `enabled`: `boolean`; `movementPlaying`: `boolean`; \} \| \{ `enabled`: `boolean`; \} = `audioStatus`

##### comfort

> **comfort**: `object` = `comfortSettings`

###### comfort.comfortSpeed

> **comfortSpeed**: `number` = `0.5`

###### comfort.locomotionMode

> **locomotionMode**: `string` = `'smooth'`

###### comfort.reducedMotion

> **reducedMotion**: `boolean` = `false`

###### comfort.showTeleportArc

> **showTeleportArc**: `boolean` = `true`

###### comfort.snapTurnAngle

> **snapTurnAngle**: `number` = `30`

###### comfort.turningMode

> **turningMode**: `string` = `'smooth'`

##### isQuest2

> **isQuest2**: `boolean`

##### isQuest3

> **isQuest3**: `boolean`

##### movement

> **movement**: `object` = `movementState`

###### movement.currentBoostLevel

> **currentBoostLevel**: `number`

###### movement.currentSpeed

> **currentSpeed**: `number`

###### movement.isMoving

> **isMoving**: `boolean`

###### movement.targetBoostLevel

> **targetBoostLevel**: `number`

###### movement.targetSpeed

> **targetSpeed**: `number`

##### presenting

> **presenting**: `boolean`

##### supported

> **supported**: `boolean`

***

### init()

> **init**(): `void`

Defined in: [core/VRManager.js:96](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L96)

#### Returns

`void`

***

### normalizeAngle()

> **normalizeAngle**(`angle`): `any`

Defined in: [core/VRManager.js:446](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L446)

#### Parameters

##### angle

`any`

#### Returns

`any`

***

### resetTeleportState()

> **resetTeleportState**(): `void`

Defined in: [core/VRManager.js:406](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L406)

#### Returns

`void`

***

### setAudioMuted()

> **setAudioMuted**(`muted`): `void`

Defined in: [core/VRManager.js:393](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L393)

#### Parameters

##### muted

`any`

#### Returns

`void`

***

### setAudioVolumeMultipliers()

> **setAudioVolumeMultipliers**(`base`, `boost`, `ambience`): `void`

Defined in: [core/VRManager.js:399](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L399)

#### Parameters

##### base

`any`

##### boost

`any`

##### ambience

`any`

#### Returns

`void`

***

### setComfortPreset()

> **setComfortPreset**(`preset`): `void`

Defined in: [core/VRManager.js:279](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L279)

Apply a predefined comfort preset

#### Parameters

##### preset

`string`

Preset name ('conservative', 'moderate', 'advanced')

#### Returns

`void`

#### Method

setComfortPreset

#### Example

```ts
// Use conservative comfort settings for sensitive users
vrManager.setComfortPreset('conservative');
```

#### Since

1.0.0

***

### setComfortSettings()

> **setComfortSettings**(`settings`): `void`

Defined in: [core/VRManager.js:245](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L245)

Set VR comfort settings for motion sickness reduction

#### Parameters

##### settings

Comfort configuration object

###### comfortRadius?

`number`

Radius of comfort zone

###### enableComfort?

`boolean`

Enable comfort features

###### fadeDistance?

`number`

Distance for fade effect

###### maxSpeed?

`number`

Maximum movement speed

#### Returns

`void`

#### Method

setComfortSettings

#### Example

```ts
// Configure comfort settings
vrManager.setComfortSettings({
  enableComfort: true,
  comfortRadius: 0.4,
  fadeDistance: 0.15,
  maxSpeed: 2.0
});
```

#### Since

1.0.0

***

### setControls()

> **setControls**(`controls`): `void`

Defined in: [core/VRManager.js:320](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L320)

Set the orbit controls reference for camera state preservation

#### Parameters

##### controls

`any`

OrbitControls instance

#### Returns

`void`

***

### setupModuleConnections()

> **setupModuleConnections**(): `void`

Defined in: [core/VRManager.js:106](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L106)

#### Returns

`void`

***

### startMovement()

> **startMovement**(`type`): `void`

Defined in: [core/VRManager.js:177](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L177)

#### Parameters

##### type

`string` = `'forward'`

#### Returns

`void`

***

### stopMovement()

> **stopMovement**(): `void`

Defined in: [core/VRManager.js:181](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L181)

#### Returns

`void`

***

### syncLegacyProperties()

> **syncLegacyProperties**(): `void`

Defined in: [core/VRManager.js:208](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L208)

#### Returns

`void`

***

### update()

> **update**(`deltaTime`): `void`

Defined in: [core/VRManager.js:186](https://github.com/patrick-morrison/belowjs/blob/3ac9f62272d4d9399615250b738e7ad3182509e8/src/core/VRManager.js#L186)

#### Parameters

##### deltaTime

`any`

#### Returns

`void`
