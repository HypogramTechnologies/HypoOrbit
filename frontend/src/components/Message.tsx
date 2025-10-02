import React, { useEffect } from "react";
import "../styles/message.css";

type MessageType = "success" | "error" | "warning" | "info";

interface MessageProps {
  type?: MessageType;
  message: string;
  show: boolean;
  onClose?: () => void;
  duration?: number;
}

const Message: React.FC<MessageProps> = ({
  type = "info",
  message,
  show,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    if (show && duration && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className={`message message-${type}`}>
      <span>{message}</span>
      {onClose && (
        <button className="message-close" onClick={onClose}>
          ✖
        </button>
      )}
    </div>
  );
};

export default Message;
