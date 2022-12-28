import classNames from "classnames";
import { Children, HTMLProps, ReactElement } from "react";
import "./Button.scss";

interface BaseProps {
  onClick: () => void;
  size?: "small" | "medium";
  type?: "primary" | "secondary";
}

type Labeled =
  | (BaseProps & {
      label: string;
      icon?: ReactElement;
    })
  | (BaseProps & {
      label?: string;
      icon: ReactElement;
    });

interface Custom extends BaseProps {
  children: ReactElement;
}

type Props = Labeled | Custom;

export function Button(props: Props) {
  const { onClick, size = "medium", type = "primary" } = props;
  const cn = classNames({
    button: true,
    [`is-${type}-type`]: true,
    [`is-${size}-size`]: true,
  });

  const body = () => {
    if ("children" in props) {
      return props.children;
    }
    return (
      <>
        {props.icon && <span className="icon">{props.icon}</span>}
        {props.label && <span className="label">{props.label}</span>}
      </>
    );
  };

  return (
    <button className={cn} onClick={onClick}>
      {body()}
    </button>
  );
}
