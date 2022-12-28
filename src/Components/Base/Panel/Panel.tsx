import { ReactNode } from "react";
import "./Panel.scss";

interface Props {
  children: ReactNode;
}

export function Panel({ children }: Props) {
  return (
    <div className="panel">
      <div className="body">{children}</div>
    </div>
  );
}
