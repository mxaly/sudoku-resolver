import { OPTIONS, sudokuValue } from "@/lib/grid";
import classNames from "classnames";

import style from "./Cell.module.scss";

interface Props {
  value: sudokuValue | null;
  options: sudokuValue[];
  isConstant: boolean;
}
export function Cell({ value, options, isConstant }: Props) {
  const optionsList = OPTIONS.map((opt) => (
    <div className={style.option} key={opt}>
      {options.includes(opt as sudokuValue) ? opt : ""}
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
