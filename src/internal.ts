import ante from "antejs";

/**
 * NOTE: The purpose of these functions is to minimize the overall size of the library. They are not
 * exported for that reason.
 */

/**
 * Checks if the provided value is undefined.
 */
export const isUndefined = (value: unknown): value is undefined => value === undefined;

/**
 * Returns the value of the provided unit in the ante class, if no unit is provided will return the
 * value of the class itself.
 */
export const valueOfPossibleUnit = (that: ante.Parsable, unit: ante.Unit | undefined): number =>
  +(unit ? ante(that)[ante.utils.short[unit]] : ante.utils.parse(that));
