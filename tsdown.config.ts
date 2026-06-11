import { defineConfig } from "tsdown";
import copy from "rollup-plugin-copy";

export default defineConfig({
  alias: { "@": "./src" },
  entry: ["src/index.ts", "src/plugin/*/index.ts"],
  format: ["esm", "cjs"],
  minify: true,
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
  },
  deps: {
    skipNodeModulesBundle: true,
  },
  outputOptions: { exports: "named" },
  fromVite: "vitest",
  target: false,
  platform: "neutral",
  dts: true,
  plugins: [
    copy({
      targets: [{ src: "src/declarations/*.d.ts", dest: "dist/declarations" }],
      hook: "writeBundle",
    }),
  ],
});
