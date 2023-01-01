import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createFromString } from "@/lib/grid";

import { Grid } from "./Grid";

describe("Grid", () => {
  it("should render the grid", () => {
    const grid = createFromString(`
    123456789 
    234567891 
    345678912

    456789123
    567891234
    678912345

    789123456
    891234567
    912345678`);

    const wrapper = render(<Grid grid={grid} />);
    const boxes = wrapper.getAllByTestId("box");
    expect(boxes.length).toEqual(9);

    const cells = wrapper.getAllByTestId("cell");
    expect(cells.length).toEqual(9 * 9);

    expect(cells[0].textContent).toEqual("1");
  });
});
