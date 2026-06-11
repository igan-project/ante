import "antejs";

declare module "antejs" {
  export namespace ante {
    export interface Factory {
      utils: Utils;
    }

    export interface Utils {
      /**
       * Converts any unit into the short variation of it.
       */
      readonly short: {
        ms: "ms";
        millisecond: "ms";
        milliseconds: "ms";
        s: "s";
        second: "s";
        seconds: "s";
        m: "m";
        minute: "m";
        minutes: "m";
        h: "h";
        hour: "h";
        hours: "h";
        d: "d";
        day: "d";
        days: "d";
        w: "w";
        week: "w";
        weeks: "w";
        D: "D";
        date: "D";
        dates: "D";
        M: "M";
        month: "M";
        months: "M";
        q: "q";
        quarter: "q";
        quarters: "q";
        y: "y";
        year: "y";
        years: "y";
      };

      /**
       * Converts a short unit into it's native (Date) name.
       */
      readonly native: {
        y: "FullYear";
        M: "Month";
        D: "Date";
        d: "Day";
        h: "Hours";
        m: "Minutes";
        s: "Seconds";
        ms: "Milliseconds";
      };

      /**
       * The default format the parser uses.
       *
       * @constant "YYYY-MM-DDTHH:mm:ssZ"
       */
      readonly format: string;

      /**
       * Extracts a date out of the provided config and the provided format.
       */
      parse(config?: Config, format?: string): ante.Ante;

      /**
       * Cascades for each of the ante's fields and sets them to the date's value.
       *
       * If a unit is provided it will be the starting point of the cascade.
       *
       * @example
       *   "h" -> ["h", "d", "D", "M", "y"]
       */
      cascade(ante: Mutable): Ante;
    }

    export namespace Unit {
      export type Native =
        | "FullYear"
        | "Month"
        | "Date"
        | "Day"
        | "Hours"
        | "Minutes"
        | "Seconds"
        | "Milliseconds";
    }
  }
}
