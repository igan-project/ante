import { ante } from "@/index.js";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe.concurrent("Parsing", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    vi.setSystemTime(new Date());

    return () => vi.useRealTimers();
  });

  describe("undefined", () => {
    it("should equal one another, now (date) === now (ante)", () => {
      const nowAnte = ante();
      const nowDate = new Date();

      expect(+nowAnte === +nowDate).toBeTruthy();
    });

    it("should not equal one another, start of time (date) === now (ante)", () => {
      const nowAnte = ante();
      const nowDate = new Date(0);

      expect(+nowAnte === +nowDate).toBeFalsy();
    });
  });

  describe("null", () => {
    it("should be NaN", () => {
      expect(isNaN(+ante(null))).toBeTruthy();
    });
  });

  describe("null", () => {
    it("should be NaN", () => {
      expect(isNaN(+ante(null))).toBeTruthy();
    });
  });
});
