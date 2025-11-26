import React, { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div
      className="
        absolute inset-0 z-40
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        p-4
      "
    >
      <div
        className="
          bg-white dark:bg-gray-700 dark:text-white
          rounded-2xl w-full max-w-md p-6 shadow-xl relative
        "
      >
        {children}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-600 dark:text-gray-300"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
