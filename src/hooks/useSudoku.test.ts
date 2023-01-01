import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { sudokuKey, sudokuValue } from "@/lib/grid";
import { Resolver } from "@/lib/resolver";

import { useSudoku } from "./useSudoku";

const grid = [
  {
    box: 1 as sudokuKey,
    col: 1 as sudokuKey,
    row: 1 as sudokuKey,
    value: 1 as sudokuValue,
    options: [],
    isConstant: false,
  },
  {
    box: 1 as sudokuKey,
    col: 2 as sudokuKey,
    row: 1 as sudokuKey,
    value: null,
    options: [2 as sudokuValue, 4 as sudokuValue, 6 as sudokuValue],
    isConstant: false,
  },
];

const setup = () => {
  const resolverMock: Resolver = {
    init: vi.fn().mockReturnValue({ grid }),
    resolveStep: vi.fn().mockReturnValue({ grid }),
    getOptionsCount: vi.fn().mockReturnValue(3),
  };
  const {
    result: {
      current: { solveStep, optionsCount, grid: resultGrid },
    },
  } = renderHook(() => useSudoku(grid, resolverMock));

  return { resolverMock, grid: resultGrid, solveStep, optionsCount };
};

describe("useSudoku", () => {
  it("should initialize resolver", () => {
    const { resolverMock } = setup();

    expect(resolverMock.init).toHaveBeenCalledWith(grid);
  });

  it("should return sudoku state", () => {
    const { grid } = setup();

    expect(grid[0]).toEqual(grid[0]);
  });

  it("should return options count", () => {
    const { optionsCount } = setup();

    expect(optionsCount).toEqual(3);
  });

  it("should call resolver resolveStep when solveStep is called", () => {
    const { resolverMock, solveStep } = setup();

    act(() => {
      solveStep();
    });

    expect(resolverMock.resolveStep).toHaveBeenCalled();
  });
});
