import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/message.css";

type MessageType = "success" | "error" | "warning" | "info";

interface MessageProps {
  type?: MessageType;
  message: string;
  show: boolean;
  onClose: () => void; 
  duration?: number;
}

const Message: React.FC<MessageProps> = ({
  type = "info",
  message,
  show,
  onClose,
  duration = 4000, // tempo até sumir automaticamente
}) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const messageContent = (
    <div className={`message message-${type}`}>
      <span>{message}</span>
      <button className="message-close" onClick={onClose}>
        ✖
      </button>
    </div>
  );

  return ReactDOM.createPortal(messageContent, document.body);
};

export default Message;
