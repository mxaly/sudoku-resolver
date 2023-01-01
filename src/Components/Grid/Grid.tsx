import { getBox, Grid as GridData, KEYS } from "@/lib/grid";

import { Box } from "./Box";
import styles from "./Grid.module.scss";

interface Props {
  grid: GridData;
}

export function Grid({ grid }: Props) {
  const boxes = KEYS.map((key) => <Box key={key} cells={getBox(grid, key)} />);

  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>{boxes}</div>
    </div>
  );
}
