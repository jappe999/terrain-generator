/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 */
export const randomFloat = (min: number, max: number): number => Math.random() * (max - min) + min;
/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 */
export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
