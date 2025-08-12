---
layout: doc
sidebar: true
---

[**BelowJS API v1.0.0-rc.1**](../README.md)

***

[BelowJS API](../globals.md) / ConfigValidator

# Class: ConfigValidator

Defined in: [utils/ConfigValidator.js:4](https://github.com/patrick-morrison/belowjs/blob/e0d2339359551c744ccd91c6c9a89c4c86b5b199/src/utils/ConfigValidator.js#L4)

Validates a configuration object against a schema, applying defaults.

## Constructors

### Constructor

> **new ConfigValidator**(`schema`): `ConfigValidator`

Defined in: [utils/ConfigValidator.js:8](https://github.com/patrick-morrison/belowjs/blob/e0d2339359551c744ccd91c6c9a89c4c86b5b199/src/utils/ConfigValidator.js#L8)

#### Parameters

##### schema

`any`

Defines validation rules for each configuration key.

#### Returns

`ConfigValidator`

## Properties

### schema

> **schema**: `any`

Defined in: [utils/ConfigValidator.js:12](https://github.com/patrick-morrison/belowjs/blob/e0d2339359551c744ccd91c6c9a89c4c86b5b199/src/utils/ConfigValidator.js#L12)

## Methods

### isTypeValid()

> **isTypeValid**(`value`, `type`): `boolean`

Defined in: [utils/ConfigValidator.js:61](https://github.com/patrick-morrison/belowjs/blob/e0d2339359551c744ccd91c6c9a89c4c86b5b199/src/utils/ConfigValidator.js#L61)

Checks if a value conforms to the specified type or types.

#### Parameters

##### value

`any`

The value to check.

##### type

The expected type or an array of allowed types.

`string` | `string`[]

#### Returns

`boolean`

***

### validate()

> **validate**(`options`): `any`

Defined in: [utils/ConfigValidator.js:20](https://github.com/patrick-morrison/belowjs/blob/e0d2339359551c744ccd91c6c9a89c4c86b5b199/src/utils/ConfigValidator.js#L20)

Validates an options object against the schema.

#### Parameters

##### options

`any`

The raw options object to validate.

#### Returns

`any`

A validated configuration object with defaults applied.
