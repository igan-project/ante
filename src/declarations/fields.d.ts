import "antejs";

declare module "antejs" {
  export namespace ante {
    export namespace Fields {
      /**
       * The marker of the class, made to check if a type provided is an instance of Ante.
       *
       * @constant true
       */
      export type Marker = "$isAnteClass";

      /*
       * A boolean that marks the Ante class and valid (not "Invalid Date").
       */
      export type Valid = "$valid";

      /**
       * The constant date value of the class.
       */
      export type Date = "$Date";

      export type Values = Record<Unit.Short, number>;

      export type Mutators = Record<Unit.Long, (value: number) => Ante>;

      export type Accessors = Record<Unit.Long, () => number>;
    }

    // NOTE: `D` (date) refrences the month date, while `d` (day) refrences the weekday.
    export interface Fields extends Readonly<
      Record<Fields.Marker, true> &
        Record<Fields.Date, Date> &
        Record<Fields.Valid, boolean> &
        Fields.Values &
        Fields.Mutators &
        Fields.Accessors
    > {}

    export interface Ante extends Fields {}
  }
}
