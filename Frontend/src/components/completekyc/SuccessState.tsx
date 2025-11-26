import React from 'react';

interface SuccessStateProps {
  onClose: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ onClose }) => (
  <div className="text-center">
    <div className="text-4xl mb-4">✔️</div>
    <h2 className="font-semibold text-lg">NIN successfully verified</h2>
    <p className="text-sm mt-2">
      Your identity has been verified. You now have full access to all features.
    </p>
    <button
      onClick={onClose}
      className="mt-5 w-full bg-blue-500 text-white p-2 rounded-lg"
    >
      Finish
    </button>
  </div>
);
