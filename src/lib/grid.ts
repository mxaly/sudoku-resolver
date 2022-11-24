export type sudokuValue = null | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type cellAddress = [number, number];

interface CellData {
  value: sudokuValue;
  options: sudokuValue[];
  isConstant: boolean;
}

export interface Cell extends CellData {
  row: number;
  col: number;
  box: number;
}

export interface Grid {
  readonly cells: Cell[];
  get: (addr: cellAddress) => Cell;
  set: (addr: cellAddress, data: Partial<CellData>) => void;
  getOptions: (cell: Cell) => sudokuValue[];
}

const GRID_SIZE = 9;
const OPTIONS = [...Array(9).keys()].map((k) => (k + 1) as sudokuValue);

export function createCell({
  row,
  col,
  value,
  options,
  isConstant,
}: {
  row: number;
  col: number;
  value?: sudokuValue;
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

export function createGrid(): Grid {
  const cells: Cell[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      cells.push(createCell({ row, col }));
    }
  }
  return {
    cells,
    set: (addr: cellAddress, data: Partial<CellData>) =>
      setCell(cells, addr, data),
    get: (addr: cellAddress) => getCell(cells, addr),
    getOptions: (cell: Cell) => getOptions(cells, cell),
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

function getOptions(cells: Cell[], { row, col, box }: Cell) {
  const existing = cells
    .filter((c) => c.row === row || c.col === col || c.box === box)
    .map((c) => c.value);

  return OPTIONS.filter((o) => !existing.includes(o)) as sudokuValue[];
}
