import { simple } from "../examples";
import { createFromString } from "./grid";
import { init, resolveStep } from "./resolver";
describe("resolver", () => {
  test("init", () => {
    const grid = createFromString(simple);

    expect(init(grid)).toMatchSnapshot();
  });

  test("resolveStep", () => {
    let grid = createFromString(simple);
    grid = init(grid);
    grid = resolveStep(grid);
    expect(grid).toMatchSnapshot();
    expect(resolveStep(grid)).toMatchSnapshot();
  });
});
