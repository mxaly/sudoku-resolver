import { createFromString } from "@/lib/grid";
import { render } from "@testing-library/react";
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
    const cols = wrapper.getAllByTestId("cell");
    expect(cols).toMatchSnapshot();
  });
});
