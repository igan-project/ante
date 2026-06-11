import ante, { Ante } from "antejs";
import { isUndefined } from "./internal.js";
// TODO: extract `Date` class into a value inside the object to allow changing it in cases like UTC
export const utils: ante.Utils = {
  short: {
    ms: "ms",
    millisecond: "ms",
    milliseconds: "ms",
    s: "s",
    second: "s",
    seconds: "s",
    m: "m",
    minute: "m",
    minutes: "m",
    h: "h",
    hour: "h",
    hours: "h",
    d: "d",
    day: "d",
    days: "d",
    w: "w",
    week: "w",
    weeks: "w",
    D: "D",
    date: "D",
    dates: "D",
    M: "M",
    month: "M",
    months: "M",
    q: "q",
    quarter: "q",
    quarters: "q",
    y: "y",
    year: "y",
    years: "y",
  } as const,
  native: {
    y: "FullYear",
    M: "Month",
    D: "Date",
    d: "Day",
    h: "Hours",
    m: "Minutes",
    s: "Seconds",
    ms: "Milliseconds",
  } as const,
  tokensMap: {
    YYYY: "(\\d{4})",
    YY: "(\\d{2})",
    MM: "(\\d{2})",
    M: "(\\d{1,2})",
    DD: "(\\d{2})",
    D: "(\\d{1,2})",
    Q: "([1-4])",
    d: "([0-6])",
    HH: "(\\d{2})",
    H: "(\\d{1,2})",
    hh: "(\\d{2})",
    h: "(\\d{1,2})",
    mm: "(\\d{2})",
    m: "(\\d{1,2})",
    ss: "(\\d{2})",
    s: "(\\d{1,2})",
    SSS: "(\\d{3})",
    A: "([A-Za-z]{2})",
    a: "([a-zA-Z]{2})",
  } as const,
  format: "YYYY-MM-DDTHH:mm:ssZ" as const,
  cascade(ante) {
    const date = ante.$Date;

    // TODO: check performance and bundle size impacts of using `for(const [key, native] in Object.Entries(this.native))`
    ante.ms = date.getMilliseconds();
    ante.s = date.getSeconds();
    ante.m = date.getMinutes();
    ante.h = date.getHours();
    ante.d = date.getDay();
    ante.D = date.getDate();
    ante.M = date.getMonth();
    ante.q = ((ante.M / 3) | 0) + 1; // TODO: extract
    ante.y = date.getFullYear();

    ante.w = Math.ceil(
      ((+new Date(ante.y, ante.M, ante.D + 4 - ante.d) -
        +new Date(new Date(ante.y, ante.M, ante.D + 4 - ante.d).getFullYear(), 0, 1)) /
        86400000 +
        1) /
        7
    ); // TODO: extract

    return ante;
  },
  parse(config, format) {
    const now = new Date();
    config = isUndefined(config) ? now : config;

    if (config === null) return Ante.create(new Date(NaN)); // NOTE: null is an `Invalid Date`.
    if (typeof config === "string") {
      format ??= this.format;

      format = format.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const tokensRegex = new RegExp(
        Object.keys(this.tokensMap)
          .sort((a, b) => b.length - a.length)
          .join("|"),
        "g"
      );

      const tokenOrder: string[] = [];
      const regexString = format.replace(tokensRegex, (match) => {
        tokenOrder.push(match);
        return this.tokensMap[match] ?? ""; // NOTE: ?? is not actually possible, just for typesafety
      });

      const parserRegex = new RegExp(`^${regexString}$`);

      const match = parserRegex.exec(config);

      if (!match) return Ante.create(new Date(config));

      const result = Object.values(this.native)
        .filter((native) => native !== "Day")
        .map((native) => now[`get${native}`]()) as [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
      ];

      let am: boolean | undefined = undefined;

      tokenOrder.forEach((token, index) => {
        const rawValue = match[index + 1] ?? "";
        const value = parseInt(rawValue, 10);

        switch (token) {
          case "YYYY":
            result[0] = value;
            break;
          case "YY":
            // TODO: why 68?
            result[0] = value > 68 ? 1900 + value : 2000 + value;
            break;
          case "MM":
          case "M":
            result[1] = value - 1;
            break;
          case "Q":
            result[1] = (value - 1) * 3 + 1;
            break;
          case "DD":
          case "D":
            result[2] = value;
            break;
          // TODO: "d", "ddd", "ddddd"
          case "HH":
          case "H":
            result[3] = value;
            break;
          case "hh":
          case "h":
            result[3] = value;
            am = true;
            break;
          case "mm":
          case "m":
            result[4] = value;
            break;
          case "ss":
          case "s":
            result[5] = value;
            break;
          case "SSS":
            result[6] = value;
            break;
          case "A":
          case "a":
            am = rawValue.toLowerCase() === "am";
            break;
        }
      });

      if (!isUndefined(am)) {
        if (am && result[4] < 12) {
          result[4] += 12;
        } else if (!am && result[4] === 12) {
          result[4] = 0;
        }
      }

      return Ante.create(new Date(...result));
    }
    if (ante.isAnte(config)) return Ante.create(config.$Date);

    return Ante.create(new Date(config));
  },
};
