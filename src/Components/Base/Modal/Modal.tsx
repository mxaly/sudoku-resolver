import React from "react";
import { createPortal } from "react-dom";

import { ReactComponent as CloseIcon } from "@/assets/icons/close-circle.svg";
import "./Modal.scss";
import { Button } from "../Button/Button";

interface Props {
  children: React.ReactNode;
  onClose: () => void;
  isVisible?: boolean;
}

export function Modal({ children, onClose, isVisible = true }: Props) {
  if (!isVisible) return null;
  const modal = (
    <div className="modal" onClick={onClose}>
      <Button
        variant="icon"
        onClick={onClose}
        className="close-btn"
        size="small"
      >
        {<CloseIcon />}
      </Button>

      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
  return createPortal(modal, document.body);
}
