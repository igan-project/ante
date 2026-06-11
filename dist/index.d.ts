//#region src/index.d.ts
declare namespace ante {
  interface Ante {
    /**
     * Creates a clone of the current `Ante` class.
     *
     * NOTE: Ante doesn't support mutability, this function is ported from `Moment.js` & `Day.js`.
     * While `Day.js` does default to immutability, plugins such as `badMutable` allow it, `Ante`
     * does not provide such plugins.
     */
    clone(): Ante;
    /**
     * Get the string value of the class.
     *
     * Equivalent to ante().toString()
     */
    get(): string;
    /**
     * Get the numeric value of the provided unit.
     *
     * NOTE: Equivalent to ante()[unit]().
     *
     * @param { Unit } unit - The unit of the desired value to get.
     */
    get(unit: Unit): number;
    /**
     * Set the numeric value of the provided unit.
     *
     * NOTE: Equivelent to `ante()[unit](value)`.
     *
     * @param { Unit } unit - The unit of the desired value to set.
     * @param { Number } value - The new value.
     */
    set(unit: Unit, value: number): Ante;
    /**
     * Checks if the current Ante object is before the provided object.
     */
    isBefore(that: Ante, unit?: Unit): boolean;
    /**
     * Checks if the current Ante object is same / before the provided object.
     */
    isSameOrBefore(that: Ante, unit?: Unit): boolean;
    /**
     * Checks if the current Ante object is same as the provided object.
     */
    isSame(that: Ante, unit?: Unit): boolean;
    /**
     * Checks if the current Ante object is same / after the provided object.
     */
    isSameOrAfter(that: Ante, unit?: Unit): boolean;
    /**
     * Checks if the current Ante object is after the provided object.
     */
    isAfter(that: Ante, unit?: Unit): boolean;
    /**
     * Formats to a Date class equivelant value of the class.
     */
    toDate(): Date;
    /**
     * Get the validity of the class, opposite of "Invalid Date" in the JS `Date` object.
     *
     * NOTE: Equivalent to !isNaN(ante().valueOf()).
     */
    isValid(): boolean;
    /**
     * Formats to an ISO 8601 string equivelant value of the class.
     *
     * NOTE: Equivelant to `ante().toDate().toISOString()`
     */
    toISOString(): string;
    /**
     * Formats to an string equivelant value of the class.
     *
     * NOTE: Equivelant to `ante().toDate().toString()`
     */
    toString(): string;
    /**
     * Get the number of milliseconds since the Unix Epoch of the Ante class.
     *
     * NOTE: Equivelant to `ante().toDate().valueOf()`
     */
    valueOf(): number;
  }
  interface Factory {
    /**
     * Create a new `Ante` class.
     */
    (config?: Config): Ante;
    new (config?: Config): Ante;
    /**
     * Check if a value is an `Ante` class.
     */
    isAnte(that: unknown): that is Ante;
    unix(value: number): Ante;
  }
  interface ExpandableConfig {
    undefined: undefined;
    null: null;
    dateString: string;
    timestamp: number;
    dateClass: Date;
    itself: Ante;
  }
  type Config = ExpandableConfig[keyof ExpandableConfig];
  namespace Config {}
  type Plugin = <T>(pluginConfig: T, anteClass: Ante, anteFactory: Factory) => void;
  interface ExpandableUnit {
    short: Unit.Short;
    long: Unit.Long;
    longPlural: Unit.Plural;
  }
  type Unit = ExpandableUnit[keyof ExpandableUnit];
  namespace Unit {
    type Short = "ms" | "s" | "m" | "h" | "d" | "w" | "D" | "M" | "q" | "y";
    type Long = "millisecond" | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | "date";
    type Plural = `${Long}s`;
    type Week = "w" | "week" | "weeks";
    type Quarter = "q" | "quarter" | "quarters";
    /**
     * Units that have a numeric value, unlike quarter and week which cannot be represented in a
     * value and are used for numeric _operations_ (addition, subtraction, differentiating etc..)
     *
     * TODO: delete?
     */
    type Base<T = Unit> = Exclude<T, Week | Quarter>;
  }
}
declare const ante: ante.Factory;
declare class Ante implements ante.Ante {
  readonly $isAnteClass: true;
  readonly $valid: boolean;
  readonly $Date: Date;
  readonly ms: number;
  millisecond(): number;
  millisecond(value: number): ante.Ante;
  s: number;
  second(): number;
  second(value: number): ante.Ante;
  m: number;
  minute(): number;
  minute(value: number): ante.Ante;
  h: number;
  hour(): number;
  hour(value: number): ante.Ante;
  d: number;
  day(): number;
  day(value: number): ante.Ante;
  w: number;
  week(): number;
  week(value: number): ante.Ante;
  D: number;
  date(): number;
  date(value: number): ante.Ante;
  M: number;
  month(): number;
  month(value: number): ante.Ante;
  q: number;
  quarter(): number;
  quarter(value: number): ante.Ante;
  y: number;
  year(): number;
  year(value: number): ante.Ante;
  constructor(config?: ante.Config);
  static create(date: Date): ante.Ante;
  clone(): ante.Ante;
  get(): string;
  get(unit: ante.Unit): number;
  set(uglyUnit: ante.Unit, value: number): ante.Ante;
  isBefore(that: ante.Config, uglyUnit?: ante.Unit): boolean;
  isSameOrBefore(that: ante.Config, uglyUnit?: ante.Unit): boolean;
  isSame(that: ante.Config, uglyUnit?: ante.Unit): boolean;
  isSameOrAfter(that: ante.Config, uglyUnit?: ante.Unit): boolean;
  isAfter(that: ante.Config, uglyUnit?: ante.Unit): boolean;
  isValid: () => boolean;
  toDate: () => Date;
  toISOString: () => string;
  toString: () => string;
  valueOf: () => number;
}
//#endregion
export { Ante, ante, ante as default };