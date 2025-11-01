// Modal.tsx
import React from "react";
import "../styles/modal.css";
import type { ModalProps } from '../types/Modal';

const Modal: React.FC<ModalProps & { title?: string }> = ({ isOpen, onClose, children, title,isFiltroVisible }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isFiltroVisible ? "shifted" : ""}`}>
      <div className="modal-container">
        {title && <h2 className="modal-title">{title}</h2>}

        <button className="modal-close-button" onClick={onClose}>X</button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
