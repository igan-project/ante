import "antejs";

declare module "antejs" {
  export namespace ante {
    export type Mutable = { -readonly [K in keyof ante.Ante]: ante.Ante[K] };
  }
}
