/**
 * Validates a configuration object against a schema, applying defaults.
 */
export class ConfigValidator {
  /**
     * @param {object} schema - Defines validation rules for each configuration key.
     */
  constructor(schema) {
    if (!schema || typeof schema !== 'object') {
      throw new Error('A valid schema object is required.');
    }
    this.schema = schema;
  }

  /**
     * Validates an options object against the schema.
     * @param {object} options - The raw options object to validate.
     * @returns {object} A validated configuration object with defaults applied.
     */
  validate(options) {
    const config = {};
    const rawOptions = options || {};

    for (const key in this.schema) {
      const rule = this.schema[key];
      const value = rawOptions[key];

      if (rule.type === 'object' && rule.schema) {
        const objectToValidate = (value === undefined || value === null) ? rule.default : value;
        config[key] = new ConfigValidator(rule.schema).validate(objectToValidate || {});
      } else if (value === undefined || value === null) {
        config[key] = rule.default;
      } else if (this.isTypeValid(value, rule.type)) {
        config[key] = value;
      } else {
        const expectedType = Array.isArray(rule.type) ? rule.type.join(' or ') : rule.type;
        console.warn(
          `ConfigValidator: Invalid type for option '${key}'. ` +
                    `Expected '${expectedType}', but received '${typeof value}'. ` +
                    `Using default value: ${JSON.stringify(rule.default)}.`
        );
        config[key] = rule.default;
      }
    }

    for (const key in rawOptions) {
      if (!Object.prototype.hasOwnProperty.call(this.schema, key)) {
        console.warn(`ConfigValidator: Unknown option '${key}' will be ignored.`);
      }
    }

    return config;
  }

  /**
     * Checks if a value conforms to the specified type or types.
     * @param {*} value The value to check.
     * @param {string|string[]} type The expected type or an array of allowed types.
     * @returns {boolean}
     */
  isTypeValid(value, type) {
    const check = (val, t) => {
      if (t === 'array') {
        return Array.isArray(val);
      }
      if (t === 'object') {
        return val !== null && typeof val === 'object' && !Array.isArray(val);
      }
      return typeof val === t;
    };

    if (Array.isArray(type)) {
      return type.some(t => check(value, t));
    }
    return check(value, type);
  }
}
