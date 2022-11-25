import { Cell, Grid, OPTIONS, set, sudokuValue } from "./grid";

export function fillOptions(grid: Grid): Grid {
  grid
    .filter((c) => c.value === null)
    .forEach((cell) => {
      const options = getOptions(grid, cell);
      grid = set(grid, [cell.row, cell.col], { options });
    });
  grid = cleanOptions(grid);
  return grid;
}

function cleanOptions(grid: Grid): Grid {
  const rows: Record<sudokuValue, Cell[]>[] = Array(9);
  const cols: Record<sudokuValue, Cell[]>[] = Array(9);
  const boxes: Record<sudokuValue, Cell[]>[] = Array(9);
  for (const cell of grid.filter((c) => c.value === null)) {
    for (const opt of OPTIONS) {
      const row = rows[cell.row] || {};
      const col = cols[cell.col] || {};
      const box = boxes[cell.box] || {};

      row[opt] = [...(row[opt] || []), cell];
      rows[cell.row] = row;

      col[opt] = [...(col[opt] || []), cell];
      cols[cell.col] = col;

      box[opt] = [...(box[opt] || []), cell];
      boxes[cell.box] = box;
    }
  }

  for (let i = 0; i < 9; i++) {
    [rows[i], cols[i], boxes[i]].forEach((dim) => {
      for (const opt of OPTIONS) {
        if (dim && dim[opt]?.length === 1) {
          const cell = dim[opt][0];
          grid = set(grid, [cell.row, cell.col], { options: [opt] });
        }
      }
    });
  }
  return grid;
}

export function resolveStep(grid: Grid): Grid {
  const cell = findBestCells(grid).cells[0];

  grid = set(grid, [cell.row, cell.col], {
    value: cell.options[0],
    options: [],
  });
  grid = fillOptions(grid);
  return grid;
}

function findBestCells(
  grid: Grid,
  size: number = 1
): {
  cells: Cell[];
  //size: number
} {
  const cells = grid.filter((c) => c.options.length === size);
  if (cells.length === 0) {
    throw new Error("can't find solution for this sudoku...");
    // return findBestCells(grid, size + 1);
    // TODO - handle exploration
  }

  return { cells };
}

function getOptions(cells: Cell[], { row, col, box }: Cell) {
  const existing = cells
    .filter((c) => c.row === row || c.col === col || c.box === box)
    .map((c) => c.value);

  return OPTIONS.filter((o) => !existing.includes(o)) as sudokuValue[];
}
