import React, { ReactComponentElement } from "react";

interface Props {
  body: JSX.Element;
}

export function Modal({ body }: Props) {
  return <div className="modal__container">{body}</div>;
}
