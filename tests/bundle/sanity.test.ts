import { ante } from "antejs";
import { describe, expect, it } from "vitest";

describe("Sanity", () => {
  it("Should be an ante", () => expect(ante.isAnte(ante())).toBeTruthy());

  it("Should equal each other", () => {
    const date = new Date();

    expect(+ante(date) === +ante(date)).toBeTruthy();
    expect(ante(date) === ante(date)).toBeFalsy();
  });

  it("Should contain time value function (`millisecond()`, `second()`, `minute()` etc..)", () => {
    expect(ante().millisecond()).toBeDefined();
    expect(ante().second()).toBeDefined();
    expect(ante().minute()).toBeDefined();
    expect(ante().hour()).toBeDefined();
    expect(ante().day()).toBeDefined();
    expect(ante().week()).toBeDefined();
    expect(ante().month()).toBeDefined();
    expect(ante().quarter()).toBeDefined();
    expect(ante().year()).toBeDefined();
  });
});
