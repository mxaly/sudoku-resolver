import { Cell as CellData } from "@/lib/grid";
import { Cell } from "./Cell";

import "./Grid.scss";

interface Props {
  cells: CellData[];
}

export function Grid({ cells }: Props) {
  const renderCells = cells.map((c) => (
    <Cell
      key={`${c.row}${c.col}`}
      value={c.value}
      options={c.options}
      isRightEdge={isRightEdgeCell(c)}
      isBottomEdge={isBottomEdgeCell(c)}
      isConstant={c.isConstant}
    />
  ));

  return (
    <div className="grid-container">
      <div className="grid">{renderCells}</div>
    </div>
  );
}

function isRightEdgeCell(cell: CellData) {
  return (cell.col + 1) % 3 === 0;
}

function isBottomEdgeCell(cell: CellData) {
  return (cell.row + 1) % 3 === 0;
}
