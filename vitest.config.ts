import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const src = fileURLToPath(new URL("src", import.meta.url));
export default defineConfig({
  test: {
    projects: [
      {
        resolve: {
          alias: [
            {
              find: /^@\/(.+)\.js$/,
              replacement: `${src}/$1`,
            },
          ],
        },
        test: {
          name: "unit",
          include: ["tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
          exclude: ["tests/bundle/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
        },
      },
      {
        test: {
          name: "bundle",
          include: ["tests/bundle/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
          exclude: ["tests/unit/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
        },
      },

      // TODO: browser testing to make sure compatibility stands throughout
    ],
  },
});
