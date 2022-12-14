import { Cell as CellData } from "@/lib/grid";

import styles from "./Box.module.scss";
import { Cell } from "./Cell";

interface Props {
  cells: CellData[];
}

export function Box({ cells }: Props) {
  const renderCells = cells.map(({ row, col, value, options, isConstant }) => {
    return (
      <Cell
        key={`${row}${col}`}
        value={value}
        options={options}
        isConstant={isConstant}
      />
    );
  });

  return (
    <div className={styles.box} data-testid="box">
      {renderCells}
    </div>
  );
}
