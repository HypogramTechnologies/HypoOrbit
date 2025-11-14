import React, { createContext, useContext, useState, type ReactNode } from "react";
import Modal from "../components/Modal";

interface ModalContextProps {
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [modalTitle, setModalTitle] = useState<string>("");

  const openModal = (content: ReactNode, title?: string) => {
    setModalContent(content);
    setModalTitle(title || "");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalTitle("");
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={modalTitle}
        isFiltroVisible={false}
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useGlobalModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useGlobalModal deve ser usado dentro de um ModalProvider");
  }
  return context;
};
