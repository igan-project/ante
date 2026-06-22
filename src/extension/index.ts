import type ante from "antejs";

export const defineExtension = <TConfig>(
  extension: ante.Extension<TConfig>
): ante.Extension<TConfig> => extension;
