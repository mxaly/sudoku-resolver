import classNames from "classnames";

import "./PageLayout.scss";

interface Props {
  children: React.ReactNode;
  flexCenter?: boolean;
}
export function PageLayout({ children, flexCenter }: Props) {
  const layoutClass = classNames({
    "page-layout": true,
    "is-flex-center": flexCenter,
  });
  return <div className={layoutClass}>{children}</div>;
}
