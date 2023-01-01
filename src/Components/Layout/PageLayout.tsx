import classNames from "classnames";

import style from "./PageLayout.module.scss";

interface Props {
  children: React.ReactNode;
  flexCenter?: boolean;
}

export function PageLayout({ children, flexCenter }: Props) {
  const layoutClass = classNames({
    [style.pageLayout]: true,
    [style.isFlexCenter]: flexCenter,
  });
  return <div className={layoutClass}>{children}</div>;
}
