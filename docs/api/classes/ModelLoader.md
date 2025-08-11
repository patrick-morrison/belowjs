[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / ModelLoader

# Class: ModelLoader

Defined in: models/ModelLoader.js:7

## Constructors

### Constructor

> **new ModelLoader**(`renderer`): `ModelLoader`

Defined in: models/ModelLoader.js:8

#### Parameters

##### renderer

`any` = `null`

#### Returns

`ModelLoader`

## Properties

### cache

> **cache**: `Map`\<`any`, `any`\>

Defined in: models/ModelLoader.js:18

***

### dracoLoader

> **dracoLoader**: `any`

Defined in: models/ModelLoader.js:11

***

### ktx2Loader

> **ktx2Loader**: `any`

Defined in: models/ModelLoader.js:12

***

### ktx2SetupComplete

> **ktx2SetupComplete**: `boolean`

Defined in: models/ModelLoader.js:20

***

### loader

> **loader**: `any`

Defined in: models/ModelLoader.js:10

***

### renderer

> **renderer**: `any`

Defined in: models/ModelLoader.js:9

***

### sharedKTX2Loader

> `static` **sharedKTX2Loader**: `any`

Defined in: models/ModelLoader.js:227

***

### sharedKTX2SetupComplete

> `static` **sharedKTX2SetupComplete**: `boolean`

Defined in: models/ModelLoader.js:228

## Methods

### dispose()

> **dispose**(): `void`

Defined in: models/ModelLoader.js:216

#### Returns

`void`

***

### load()

> **load**(`url`, `onProgress`, `signal`): `Promise`\<`any`\>

Defined in: models/ModelLoader.js:71

#### Parameters

##### url

`any`

##### onProgress

`any` = `null`

##### signal

`any` = `null`

#### Returns

`Promise`\<`any`\>

***

### processMaterial()

> **processMaterial**(`material`): `void`

Defined in: models/ModelLoader.js:209

#### Parameters

##### material

`any`

#### Returns

`void`

***

### processModel()

> **processModel**(`gltf`): `any`

Defined in: models/ModelLoader.js:118

#### Parameters

##### gltf

`any`

#### Returns

`any`

***

### setRenderer()

> **setRenderer**(`renderer`): `void`

Defined in: models/ModelLoader.js:52

#### Parameters

##### renderer

`any`

#### Returns

`void`

***

### setupKTX2Loader()

> **setupKTX2Loader**(): `void`

Defined in: models/ModelLoader.js:24

#### Returns

`void`
