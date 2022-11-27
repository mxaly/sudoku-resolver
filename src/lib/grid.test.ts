import {
  createFromString,
  createGrid,
  get,
  getOptionsCount,
  set,
} from "./grid";
import { describe, it, expect } from "vitest";
import { fillOptions } from "./resolver";
import { getBox } from "./grid";

describe("Grid", () => {
  test("createGrid", () => {
    expect(createGrid()).toMatchSnapshot();
  });

  test("createFromString", () => {
    const testStr = `
      123456789
      234567891
      345678912
      456789123
      567891234
      678912345
      789123456
      891234567
      000000000
    `;

    expect(createFromString(testStr)).toMatchSnapshot();
  });

  test("set", () => {
    const grid = createGrid();

    set(grid, [0, 0], { value: 3 });
    expect(grid[0]).toEqual({
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

    expect(get(grid, [8, 8])).toEqual({
      box: 8,
      col: 8,
      isConstant: false,
      options: [],
      row: 8,
      value: null,
    });

    expect(get(grid, [4, 6])).toEqual({
      box: 5,
      col: 6,
      isConstant: false,
      options: [],
      row: 4,
      value: null,
    });
  });
});

test("getBox", () => {
  const grid = createGrid();
  expect(getBox(grid, 0)).toMatchSnapshot();
  expect(getBox(grid, 5)).toMatchSnapshot();
});

test("getOptionsCount", () => {
  let grid = createGrid();
  expect(getOptionsCount(grid)).toEqual(0);
  grid = set(grid, [0, 0], { options: [1, 3, 5] });
  grid = set(grid, [5, 5], { options: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
  expect(getOptionsCount(grid)).toEqual(12);
});
