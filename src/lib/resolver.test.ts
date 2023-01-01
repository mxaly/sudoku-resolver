import { simple } from "../examples";
import { createFromString } from "./grid";
import { init, resolveStep } from "./resolver";
import { describe, test, expect } from "vitest";

describe("resolver", () => {
  test("init", () => {
    const grid = createFromString(simple);

    expect(init(grid)).toMatchSnapshot();
  });

  test("resolveStep", () => {
    const grid = createFromString(simple);
    let resolver = init(grid);
    resolver = resolveStep(resolver);
    expect(resolver).toMatchSnapshot();
    expect(resolveStep(resolver)).toMatchSnapshot();
  });
});
