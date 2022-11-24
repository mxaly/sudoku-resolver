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
      isConstant: false,
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
      isConstant: false,
      options: [],
      row: 8,
      value: null,
    });

    expect(grid.get([4, 6])).toEqual({
      box: 5,
      col: 6,
      isConstant: false,
      options: [],
      row: 4,
      value: null,
    });
  });

  test("getOptions", () => {
    const grid = createGrid();

    grid.set([0, 1], { value: 1 });
    grid.set([0, 2], { value: 2 });
    grid.set([1, 0], { value: 3 });
    grid.set([2, 0], { value: 4 });
    grid.set([2, 2], { value: 5 });

    const cell = grid.get([0, 0]);

    expect(grid.getOptions(cell)).toEqual([6, 7, 8, 9]);
  });
});
