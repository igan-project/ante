import { type ante as anteType } from "antejs";

declare module "antejs" {
  export namespace ante {
    /**
     * A plugin is used to create separate structures to the ante.
     */
    export type Plugin<TConfig> = (pluginConfig: TConfig, anteFactory: ante.Factory) => void;
  }
}

export const definePlugin = <TConfig>(plugin: anteType.Plugin<TConfig>): anteType.Plugin<TConfig> =>
  plugin;
