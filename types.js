export { };

/**
 * Represents a valid JSON value.
 * 
 * @typedef {string | number | boolean | null | JsonObject | JsonArray} JsonValue
 */

/**
 * Represents a JSON object.
 * 
 * @typedef {{ [key: string]: JsonValue }} JsonObject
 */

/**
 * Represents an array of JSON values.
 * 
 * @typedef {Array<JsonValue>} JsonArray
 */

/**
 * Represents a value that could be `undefined`.
 * 
 * @template T
 * @typedef { T | undefined } Optional
 */

/**
 * Represents a value that could be `null`.
 * 
 * @template T
 * @typedef { T | null } MaybeNull
 */

/**
 * Represents a value that could be a `Promise`.
 * 
 * @template T
 * @typedef { T | Promise<T> } MaybePromise
 */

/**
 * Represents a value that could be `void`.
 * 
 * @template T
 * @typedef { T | void } MaybeVoid
 */