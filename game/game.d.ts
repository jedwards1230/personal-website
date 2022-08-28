/* tslint:disable */
/* eslint-disable */
/**
*/
export class Universe {
  free(): void;
/**
* @param {CanvasRenderingContext2D} ctx
*/
  tick(ctx: CanvasRenderingContext2D): void;
/**
* @param {number} width
* @param {number} height
* @param {number} resolution
* @returns {Universe}
*/
  static new(width: number, height: number, resolution: number): Universe;
/**
* @param {any} primary_color
* @param {any} secondary_color
* @param {any} inactive_color
*/
  set_style(primary_color: any, secondary_color: any, inactive_color: any): void;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  height(): number;
/**
* @returns {number}
*/
  cells(): number;
}
