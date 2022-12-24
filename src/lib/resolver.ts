import { unique } from "./common";
import {
  Cell,
  Grid,
  OPTIONS,
  set,
  sudokuValue,
  getBox,
  getOptionsCount,
} from "./grid";

interface Resolver {
  grid: Grid;
}

export function init(grid: Grid): Resolver {
  grid = fillOptions(grid);
  grid = cleanOptions(grid);
  return { grid };
}

export function resolveStep(resolver: Resolver): Resolver {
  let { grid } = resolver;
  const cell = findBestCells(grid).cells[0];

  grid = set(grid, [cell.row, cell.col], {
    value: cell.options[0],
    options: [],
  });
  grid = fillOptions(grid);
  grid = cleanOptions(grid);
  return { grid: [...grid] };
}

function fillOptions(grid: Grid): Grid {
  grid
    .filter((c) => c.value === null)
    .forEach((cell) => {
      const options = getOptions(grid, cell);
      grid = set(grid, [cell.row, cell.col], { options });
    });

  return grid;
}

function cleanOptions(grid: Grid): Grid {
  const optionsCount = getOptionsCount([...grid]);
  grid = cleanOptionsByArea(grid);
  grid = cleanOptionsByBoxes(grid);
  const newOptionsCount = getOptionsCount([...grid]);
  if (optionsCount !== newOptionsCount) return cleanOptions(grid);
  return [...grid];
}

function cleanOptionsByBoxes(grid: Grid): Grid {
  for (let boxID = 0; boxID < 9; boxID++) {
    const box = getBox(grid, boxID);
    const optionsPerRow: Map<number, number[]> = new Map();
    const optionsPerCol: Map<number, number[]> = new Map();

    for (const opt of OPTIONS) {
      for (const cell of box) {
        if (cell.options.includes(opt)) {
          optionsPerRow.set(
            opt,
            unique([...(optionsPerRow.get(opt) || []), cell.row])
          );
          optionsPerCol.set(
            opt,
            unique([...(optionsPerCol.get(opt) || []), cell.col])
          );
        }
      }
    }

    optionsPerRow.forEach((rows, option) => {
      if (rows.length === 1) {
        grid = cleanRowOptions(grid, rows[0], option, { box: boxID });
      }
    });

    optionsPerCol.forEach((cols, option) => {
      if (cols.length === 1) {
        grid = cleanColOptions(grid, cols[0], option, { box: boxID });
      }
    });
  }
  return [...grid];
}

function cleanColOptions(
  grid: Grid,
  col: number,
  option: number,
  exclude?: { box?: number }
): Grid {
  for (const cell of grid) {
    if (cell.box !== exclude?.box && cell.col === col) {
      set(grid, [cell.row, cell.col], {
        options: cell.options.filter((o) => o !== option),
      });
    }
  }
  return grid;
}

function cleanRowOptions(
  grid: Grid,
  row: number,
  option: number,
  exclude?: { box?: number }
): Grid {
  for (const cell of grid) {
    if (cell.box !== exclude?.box && cell.row === row) {
      set(grid, [cell.row, cell.col], {
        options: cell.options.filter((o) => o !== option),
      });
    }
  }
  return grid;
}

function cleanOptionsByArea(grid: Grid): Grid {
  const rows: Record<sudokuValue, Cell[]>[] = Array(9);
  const cols: Record<sudokuValue, Cell[]>[] = Array(9);
  const boxes: Record<sudokuValue, Cell[]>[] = Array(9);
  for (const cell of grid.filter((c) => c.value === null)) {
    for (const opt of cell.options) {
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
  return [...grid];
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
