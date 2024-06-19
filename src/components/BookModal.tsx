// src/components/BookModal.tsx
import React from 'react';

interface BookModalProps {
  title: string;
  content: string;
  onClose: () => void;
  onConfirm: () => void;
}

const BookModal: React.FC<BookModalProps> = ({ title, content, onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onConfirm}>Xác nhận</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default BookModal;
