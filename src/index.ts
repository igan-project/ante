import { utils } from "./utils.js";
import { isUndefined, valueOfPossibleUnit } from "./internal.js";

declare namespace ante {
  export interface Ante {
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
     * NOTE: Equivalent to `ante()[unit](value)`.
     *
     * @param { Unit } unit - The unit of the desired value to set.
     * @param { Number } value - The new value.
     */
    set(unit: Unit, value: number): Ante;

    /**
     * Checks if the current Ante object is before the provided object.
     */
    isBefore(that: Parsable, unit?: Unit): boolean;

    /**
     * Checks if the current Ante object is same / before the provided object.
     */
    isSameOrBefore(that: Parsable, unit?: Unit): boolean;

    /**
     * Checks if the current Ante object is same as the provided object.
     */
    isSame(that: Parsable, unit?: Unit): boolean;

    /**
     * Checks if the current Ante object is same / after the provided object.
     */
    isSameOrAfter(that: Parsable, unit?: Unit): boolean;

    /**
     * Checks if the current Ante object is after the provided object.
     */
    isAfter(that: Parsable, unit?: Unit): boolean;

    /**
     * Formats to a Date class equivalent value of the class.
     */
    toDate(): Date;

    /**
     * Get the validity of the class, opposite of "Invalid Date" in the JS `Date` object.
     *
     * NOTE: Equivalent to !isNaN(ante().valueOf()).
     */
    isValid(): boolean;

    /**
     * Formats to an ISO 8601 string equivalent value of the class.
     *
     * NOTE: Equivalent to `ante().toDate().toISOString()`
     */
    toISOString(): string;

    /**
     * Formats to an string equivalent value of the class.
     *
     * NOTE: Equivalent to `ante().toDate().toString()`
     */
    toString(): string;

    /**
     * Get the number of milliseconds since the Unix Epoch of the Ante class.
     *
     * NOTE: Equivalent to `ante().toDate().valueOf()`
     */
    valueOf(): number;
  }

  export interface Config {
    parsable?: Parsable;
    format?: string;
    utc?: boolean;
  }

  export interface Factory {
    /**
     * Create a new `Ante` class.
     */
    (parsable?: Parsable): Ante;
    (parsable: Parsable, format: string): Ante;

    /**
     * Check if a value is an `Ante` class.
     */
    isAnte(that: unknown): that is Ante;

    /**
     * Create a Ante object from a Unix timestamp, 10 digits, seconds since the Unix Epoch.
     */
    unix(value: number): Ante;

    /**
     * Extend an extension into the ante class.
     */
    extend<T = never>(
      extension: ante.Extension<T>,
      ...args: T extends never ? [] : T extends undefined ? [] : [config: T]
    ): void;

    /**
     * Plug a plugin into the ante factory.
     */
    plug<T = never>(
      extension: ante.Plugin<T>,
      ...args: T extends never ? [] : T extends undefined ? [] : [config: T]
    ): void;
  }

  export interface ExpandableParsable {
    undefined: undefined;
    null: null;
    dateString: string;
    timestamp: number;
    dateClass: Date;
    itself: Ante;
  }

  export type Parsable = ExpandableParsable[keyof ExpandableParsable];

  export type Unit = Unit.Short | Unit.Long | Unit.Plural;

  export namespace Unit {
    export interface Map {
      ms: "millisecond";
      s: "second";
      m: "minute";
      h: "hour";
      d: "day";
      D: "date";
      w: "week";
      M: "month";
      q: "quarter";
      y: "year";
    }

    export type Short = keyof Map;

    export type Long = Map[keyof Map];

    export type Plural = `${Long}s`;
  }

  /**
   * A plugin is used to create separate structures to the ante.
   */
  export type Plugin<TConfig> = (pluginConfig: TConfig, anteFactory: Factory) => void;
  export type Extension<TConfig> = (extensionConfig: TConfig, anteClass: Ante) => void;
}

const ante = ((parsable?: ante.Parsable, format?: string): ante.Ante =>
  new Ante({ parsable, format })) as ante.Factory;

const isAnte = (that: unknown): that is ante.Ante =>
  !!that &&
  typeof that === "object" &&
  (("$isAnteClass" satisfies ante.Fields.Marker) in that || that instanceof Ante);

ante.utils = utils;

ante.isAnte = isAnte;

export default ante;
export { ante };

export const definePlugin = <TConfig>(plugin: ante.Plugin<TConfig>): ante.Plugin<TConfig> => plugin;

export const defineExtension = <TConfig>(
  extension: ante.Extension<TConfig>
): ante.Extension<TConfig> => extension;

export class Ante implements ante.Ante {
  readonly $isAnteClass = true as const;

  readonly $valid!: boolean;

  readonly $Date!: Date;

  readonly ms!: number;
  millisecond(): number;
  millisecond(value: number): ante.Ante;
  millisecond(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.ms;

    return this.set("ms", value);
  }

  s!: number;
  second(): number;
  second(value: number): ante.Ante;
  second(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.s;

    return this.set("s", value);
  }

  m!: number;
  minute(): number;
  minute(value: number): ante.Ante;
  minute(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.m;

    return this.set("m", value);
  }

  h!: number;
  hour(): number;
  hour(value: number): ante.Ante;
  hour(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.h;

    return this.set("h", value);
  }

  d!: number;
  day(): number;
  day(value: number): ante.Ante;
  day(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.d;

    return this.set("d", value);
  }

  w!: number;
  week(): number;
  week(value: number): ante.Ante;
  week(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.d;

    return this.set("w", value);
  }

  D!: number;
  date(): number;
  date(value: number): ante.Ante;
  date(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.D;

    return this.set("D", value);
  }

  M!: number;
  month(): number;
  month(value: number): ante.Ante;
  month(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.M;

    return this.set("M", value);
  }

  q!: number;
  quarter(): number;
  quarter(value: number): ante.Ante;
  quarter(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.M;

    return this.set("q", value);
  }

  y!: number;
  year(): number;
  year(value: number): ante.Ante;
  year(value?: number): number | ante.Ante {
    if (isUndefined(value)) return this.y;

    return this.set("y", value);
  }

  constructor({ parsable, format }: ante.Config) {
    return ante.utils.parse(parsable, format);
  }

  static create(date: Date): ante.Ante {
    const instance: ante.Mutable = Object.create(Ante.prototype);
    instance.$isAnteClass = true;
    instance.$valid = !Number.isNaN(+date);
    instance.$Date = date;

    return ante.utils.cascade(instance);
  }

  clone(): ante.Ante {
    return Ante.create(this.$Date);
  }

  get(): string;
  get(unit: ante.Unit): number;
  get(uglyUnit?: ante.Unit): string | number {
    if (isUndefined(uglyUnit)) return this.toString();

    return this[ante.utils.short[uglyUnit]];
  }

  set(uglyUnit: ante.Unit, value: number): ante.Ante {
    const nextDate = new Date(this.$Date.getTime());

    const unit = ante.utils.short[uglyUnit];

    if (unit === "d") {
      nextDate.setDate(nextDate.getDate() + (value - nextDate.getDay()));
    } else if (unit === "w") {
      nextDate.setMonth(0, 4 - this.d + 1 + (value - 1) * 7 + (this.d - 1));
    } else if (unit === "q") {
      nextDate.setMonth((value - 1) * 3 + (this.M % 3));
    } else {
      nextDate[`set${ante.utils.native[unit]}`](value);
    }

    return Ante.create(nextDate);
  }

  isBefore(that: ante.Parsable, uglyUnit?: ante.Unit): boolean {
    return valueOfPossibleUnit(this, uglyUnit) > valueOfPossibleUnit(that, uglyUnit);
  }

  isSameOrBefore(that: ante.Parsable, uglyUnit?: ante.Unit): boolean {
    return valueOfPossibleUnit(this, uglyUnit) >= valueOfPossibleUnit(that, uglyUnit);
  }

  isSame(that: ante.Parsable, uglyUnit?: ante.Unit): boolean {
    return valueOfPossibleUnit(this, uglyUnit) === valueOfPossibleUnit(that, uglyUnit);
  }

  isSameOrAfter(that: ante.Parsable, uglyUnit?: ante.Unit): boolean {
    return valueOfPossibleUnit(this, uglyUnit) <= valueOfPossibleUnit(that, uglyUnit);
  }

  isAfter(that: ante.Parsable, uglyUnit?: ante.Unit): boolean {
    return valueOfPossibleUnit(this, uglyUnit) < valueOfPossibleUnit(that, uglyUnit);
  }

  isValid(): boolean {
    return this.$valid;
  }

  toDate(): Date {
    return new Date(this.$Date.valueOf());
  }

  toISOString(): string {
    return this.$Date.toISOString();
  }

  toString(): string {
    return this.$Date.toString();
  }

  valueOf(): number {
    return this.$Date.valueOf();
  }
}
