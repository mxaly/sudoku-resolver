import "./PageLayout.scss";

import classNames from "classnames";

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
