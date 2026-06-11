import ante from "antejs";
import { describe, expect, it } from "vitest";

describe("Sanity", () => {
  it("Should be an ante", () => expect(ante.isAnte(ante())).toBeTruthy());

  it("Should equal each other", () => {
    const date = new Date();

    expect(+ante(date) === +ante(date)).toBeTruthy();
    expect(ante(date) === ante(date)).toBeFalsy();
  });
});
