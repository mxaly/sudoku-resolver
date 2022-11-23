export type sudokuValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type cellAddress = [number, number];

interface CellData {
  value: sudokuValue;
  options: sudokuValue[];
}

export interface Cell extends CellData {
  row: number;
  col: number;
  box: number;
}

export interface Grid {
  get: (addr: cellAddress) => Cell;
  set: (addr: cellAddress, data: Partial<CellData>) => void;
  readonly cells: Cell[];
}

const GRID_SIZE = 9;

export function createCell({
  row,
  col,
  value,
  options,
}: {
  row: number;
  col: number;
  value?: sudokuValue;
  options?: sudokuValue[];
}): Cell {
  return {
    value: value || null,
    options: options || [],
    row,
    col,
    box: getBoxIndex([row, col]),
  };
}

export function createGrid(): Grid {
  const cells: Cell[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      cells.push(createCell({ row, col }));
    }
  }
  return {
    set: (addr: cellAddress, data: Partial<CellData>) =>
      setCell(cells, addr, data),
    get: (addr: cellAddress) => getCell(cells, addr),
    cells,
  };
}

function getCell(cells: Cell[], addr: cellAddress): Cell {
  return cells[getIndex(addr)];
}

function setCell(cells: Cell[], addr: cellAddress, data: Partial<CellData>) {
  const cell = cells[getIndex(addr)];
  cells[getIndex(addr)] = { ...cell, ...data };
}

function getBoxIndex([rowIndex, colIndex]: cellAddress): number {
  const row = Math.floor(rowIndex / 3);
  const column = Math.floor(colIndex / 3);
  return row * 3 + column;
}

function getIndex([row, col]: [number, number]) {
  return row * GRID_SIZE + col;
}
