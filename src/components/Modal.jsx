import React from 'react';
import './Modal.css';
import { IoClose } from 'react-icons/io5';

export const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <IoClose size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

