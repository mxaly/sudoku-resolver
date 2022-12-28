import { Cell as CellData } from "@/lib/grid";
import { Cell } from "./Cell";

import styles from "./Box.module.scss";

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

  return <div className={styles.box}>{renderCells}</div>;
}
