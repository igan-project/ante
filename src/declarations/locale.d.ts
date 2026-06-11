import "antejs";

declare module "antejs" {
  export namespace ante {
    export interface Locale {
      ordinal: (number: number, token?: string) => string;
    }
  }
}
