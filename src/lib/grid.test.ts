import { createGrid } from "./grid";
import { describe, it, expect } from "vitest";

describe("Grid", () => {
  test("createGrid", () => {
    expect(createGrid().cells).toMatchSnapshot();
  });

  test("set", () => {
    const grid = createGrid();

    grid.set([0, 0], { value: 3 });
    expect(grid.cells[0]).toEqual({
      box: 0,
      col: 0,
      options: [],
      row: 0,
      value: 3,
    });
  });

  test("get", () => {
    const grid = createGrid();

    expect(grid.get([8, 8])).toEqual({
      box: 8,
      col: 8,
      options: [],
      row: 8,
      value: null,
    });

    expect(grid.get([4, 6])).toEqual({
      box: 5,
      col: 6,
      options: [],
      row: 4,
      value: null,
    });
  });
});
