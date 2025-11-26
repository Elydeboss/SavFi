import React, { useEffect } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40  backdrop-blur-sm
        animate-fadeIn
        p-4
      "
    >
      <div
        className="
          bg-white dark:bg-gray-700 dark:text-white
          rounded-2xl w-full max-w-md p-6
          shadow-2xl relative
          animate-modalPop
        "
      >
        {children}

        {/* Close button */}
        <button
          onClick={onClose}
          className="
            absolute top-3 right-3
            text-gray-500 dark:text-gray-300
            hover:text-black dark:hover:text-white
            transition
            p-2 rounded-full
          "
        >
          ✕
        </button>
      </div>
    </div>
  );
};
