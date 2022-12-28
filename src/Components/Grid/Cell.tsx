import { sudokuValue } from "@/lib/grid";
import classNames from "classnames";

import style from "./Cell.module.scss";

const EMPTY_OPTIONS = Array(9).fill(null);

interface Props {
  value: sudokuValue | null;
  options: sudokuValue[];
  isConstant: boolean;
}
export function Cell({ value, options, isConstant }: Props) {
  const optionsList = EMPTY_OPTIONS.map((opt, index) => (
    <div className={style.option} key={index}>
      {options.includes((index + 1) as sudokuValue) ? index + 1 : ""}
    </div>
  ));

  const cellClass = classNames({
    [style.cell]: true,
    [style.isConstant]: isConstant,
  });

  return (
    <div className={cellClass} data-testid="cell">
      {value ? value : <div className={style.optionsGrid}>{optionsList}</div>}
    </div>
  );
}
