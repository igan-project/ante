import type ante from "antejs";

export const definePlugin = <TConfig>(plugin: ante.Plugin<TConfig>): ante.Plugin<TConfig> => plugin;
