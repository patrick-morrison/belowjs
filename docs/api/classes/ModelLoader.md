---
layout: doc
sidebar: true
---

[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / ModelLoader

# Class: ModelLoader

Defined in: [models/ModelLoader.js:7](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L7)

## Constructors

### Constructor

> **new ModelLoader**(`renderer`): `ModelLoader`

Defined in: [models/ModelLoader.js:8](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L8)

#### Parameters

##### renderer

`any` = `null`

#### Returns

`ModelLoader`

## Properties

### cache

> **cache**: `Map`\<`any`, `any`\>

Defined in: [models/ModelLoader.js:18](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L18)

***

### dracoLoader

> **dracoLoader**: `any`

Defined in: [models/ModelLoader.js:11](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L11)

***

### ktx2Loader

> **ktx2Loader**: `any`

Defined in: [models/ModelLoader.js:12](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L12)

***

### ktx2SetupComplete

> **ktx2SetupComplete**: `boolean`

Defined in: [models/ModelLoader.js:20](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L20)

***

### loader

> **loader**: `any`

Defined in: [models/ModelLoader.js:10](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L10)

***

### renderer

> **renderer**: `any`

Defined in: [models/ModelLoader.js:9](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L9)

***

### sharedKTX2Loader

> `static` **sharedKTX2Loader**: `any`

Defined in: [models/ModelLoader.js:227](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L227)

***

### sharedKTX2SetupComplete

> `static` **sharedKTX2SetupComplete**: `boolean`

Defined in: [models/ModelLoader.js:228](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L228)

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [models/ModelLoader.js:216](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L216)

#### Returns

`void`

***

### load()

> **load**(`url`, `onProgress`, `signal`): `Promise`\<`any`\>

Defined in: [models/ModelLoader.js:71](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L71)

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

Defined in: [models/ModelLoader.js:209](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L209)

#### Parameters

##### material

`any`

#### Returns

`void`

***

### processModel()

> **processModel**(`gltf`): `any`

Defined in: [models/ModelLoader.js:118](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L118)

#### Parameters

##### gltf

`any`

#### Returns

`any`

***

### setRenderer()

> **setRenderer**(`renderer`): `void`

Defined in: [models/ModelLoader.js:52](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L52)

#### Parameters

##### renderer

`any`

#### Returns

`void`

***

### setupKTX2Loader()

> **setupKTX2Loader**(): `void`

Defined in: [models/ModelLoader.js:24](https://github.com/patrick-morrison/belowjs/blob/303f195918c8aa23c55f3b9dffc55c8bc17f9e21/src/models/ModelLoader.js#L24)

#### Returns

`void`
