import { useState } from "react";

import { Grid } from "@/lib/grid";
import { Resolver, resolver } from "@/lib/resolver";

export function useSudoku(
  initialGrid: Grid,
  { resolveStep, getOptionsCount, init }: Resolver = resolver
) {
  const [sudoku, setSudoku] = useState(init(initialGrid));

  const solveStep = () => {
    const updated = resolveStep(sudoku);
    setSudoku(updated);
  };

  return {
    grid: sudoku.grid,
    optionsCount: getOptionsCount(sudoku.grid),
    solveStep,
  };
}
