export type sudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type cellAddress = [number, number];

interface CellData {
  value: sudokuValue | null;
  options: sudokuValue[];
  isConstant: boolean;
}

export interface Cell extends CellData {
  row: number;
  col: number;
  box: number;
}

export type Grid = Cell[];

const GRID_SIZE = 9;
export const OPTIONS = [...Array(9).keys()].map((k) => (k + 1) as sudokuValue);

export function createGrid(): Cell[] {
  const cells: Cell[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
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
      const row = Math.floor(index / 9);
      const col = index - row * 9;
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
  row: number;
  col: number;
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

function getBoxIndex([rowIndex, colIndex]: cellAddress): number {
  const row = Math.floor(rowIndex / 3);
  const column = Math.floor(colIndex / 3);
  return row * 3 + column;
}

function getIndex([row, col]: [number, number]) {
  return row * GRID_SIZE + col;
}
