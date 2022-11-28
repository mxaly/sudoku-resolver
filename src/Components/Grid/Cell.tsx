import { sudokuValue } from "@/lib/grid";
import classNames from "classnames";

import "./Cell.scss";

const EMPTY_OPTIONS = Array(9).fill(null);

interface Props {
  value: sudokuValue | null;
  options: sudokuValue[];
  isBottomEdge: boolean;
  isRightEdge: boolean;
  isConstant: boolean;
}
export function Cell({
  value,
  options,
  isConstant,
  isBottomEdge,
  isRightEdge,
}: Props) {
  const optionsList = EMPTY_OPTIONS.map((opt, index) => (
    <div className="option" key={index}>
      {options.includes((index + 1) as sudokuValue) ? index + 1 : ""}
    </div>
  ));

  const cellClass = classNames({
    cell: true,
    "is-bottom-edge": isBottomEdge,
    "is-right-edge": isRightEdge,
    "is-constant": isConstant,
  });

  return (
    <div className={cellClass} data-testid="cell">
      {value ? value : <div className="options-grid">{optionsList}</div>}
    </div>
  );
}
