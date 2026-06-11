import ante from "@/index.js";
import { describe, expect, it } from "vitest";

describe("Sanity", () => {
  it("Should be an ante", () => expect(ante.isAnte(ante())).toBeTruthy());
  console.log(ante("2024", "YYYY"));
});
