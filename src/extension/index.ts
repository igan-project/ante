import { type ante as anteType } from "antejs";

declare module "antejs" {
  export namespace ante {
    export type Extension<TConfig> = (extensionConfig: TConfig, anteClass: ante.AnteClass) => void;
  }
}

export const defineExtension = <TConfig>(
  extension: anteType.Extension<TConfig>
): anteType.Extension<TConfig> => extension;
