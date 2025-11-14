import React, { useRef } from "react";
import Draggable from "react-draggable";
import "../styles/modal.css";
import type { ModalProps } from "../types/Modal";

const Modal: React.FC<ModalProps & { title?: string }> = ({
  isOpen,
  onClose,
  children,
  title,
  isFiltroVisible,
}) => {
  const nodeRef = useRef(null); // ✅ evitar findDOMNode

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isFiltroVisible ? "shifted" : ""}`}>
      <Draggable nodeRef={nodeRef} handle=".modal-header" cancel=".modal-content">
        <div ref={nodeRef} className="modal-container">
          <div className="modal-header">
            {title && <h2 className="modal-title">{title}</h2>}
            <button className="modal-close-button" onClick={onClose}>
              X
            </button>
          </div>

          <div className="modal-content">{children}</div>
        </div>
      </Draggable>
    </div>
  );
};

export default Modal;
