export type sudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type sudokuKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type cellAddress = [sudokuKey, sudokuKey];

interface CellData {
  value: sudokuValue | null;
  options: sudokuValue[];
  isConstant: boolean;
}

export interface Cell extends CellData {
  row: sudokuKey;
  col: sudokuKey;
  box: sudokuKey;
}

export type Grid = Cell[];

const GRID_SIZE = 9;
export const KEYS = [
  0 as sudokuKey,
  1 as sudokuKey,
  2 as sudokuKey,
  3 as sudokuKey,
  4 as sudokuKey,
  5 as sudokuKey,
  6 as sudokuKey,
  7 as sudokuKey,
  8 as sudokuKey,
] as const;
export const OPTIONS = [...Array(9).keys()].map((k) => (k + 1) as sudokuValue);

export function createGrid(): Cell[] {
  const cells: Cell[] = [];
  for (const row of KEYS) {
    for (const col of KEYS) {
      cells.push(createCell({ row, col }));
    }
  }
  return cells;
}

export function createFromString(data: string): Cell[] {
  const grid = createGrid();
  data
    .replaceAll(/\s/g, "")
    .split("")
    .forEach((val, index) => {
      const row = Math.floor(index / 9) as sudokuKey;
      const col = (index - row * 9) as sudokuKey;
      const num = parseInt(val);

      if (num > 0) {
        set(grid, [row, col], {
          value: num as sudokuValue,
          isConstant: true,
        });
      }
    });
  return grid;
}

function createCell({
  row,
  col,
  value,
  options,
  isConstant,
}: {
  row: sudokuKey;
  col: sudokuKey;
  value?: sudokuValue | null;
  options?: sudokuValue[];
  isConstant?: boolean;
}): Cell {
  return {
    value: value || null,
    options: options || [],
    row,
    col,
    box: getBoxIndex([row, col]),
    isConstant: !!isConstant,
  };
}

export function get(grid: Grid, addr: cellAddress): Cell {
  return grid[getIndex(addr)];
}

export function set(grid: Grid, addr: cellAddress, data: Partial<CellData>) {
  const cell = grid[getIndex(addr)];
  grid[getIndex(addr)] = { ...cell, ...data };
  return [...grid];
}

export function getBox(grid: Grid, boxID: sudokuKey): Cell[] {
  return grid.filter((c) => c.box === boxID);
}

export function getOptionsCount(grid: Grid): number {
  let sum = 0;
  for (const cell of grid) {
    sum = sum + cell.options.length;
  }
  return sum;
}

function getBoxIndex([rowIndex, colIndex]: cellAddress): sudokuKey {
  const row = Math.floor(rowIndex / 3);
  const column = Math.floor(colIndex / 3);
  return (row * 3 + column) as sudokuKey;
}

function getIndex([row, col]: [sudokuKey, sudokuKey]) {
  return row * GRID_SIZE + col;
}
