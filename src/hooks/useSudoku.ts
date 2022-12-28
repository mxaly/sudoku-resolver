import { getOptionsCount, Grid } from "@/lib/grid";
import { init, resolveStep } from "@/lib/resolver";
import { useState } from "react";

export function useSudoku(initialGrid: Grid) {
  const [sudoku, setSudoku] = useState(init(initialGrid))


  const solveStep = () => {
    const updated = resolveStep(sudoku);
    setSudoku(updated);
  };

  return {
    grid: sudoku.grid,
    optionsCount: getOptionsCount(sudoku.grid),
    solveStep
  }
}