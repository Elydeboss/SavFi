import React from 'react';
import success from '../../assets/menu/Container.png';

interface SuccessStateProps {
  onClose: () => void;
}

export const SuccessState: React.FC<SuccessStateProps> = ({ onClose }) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">
      <img src={success} alt="success icon" className="h-12 w-" />
    </div>
    <h2 className="font-semibold text-lg">NIN successfully verified</h2>
    <p className="text-sm mt-2">
      Your identity has been verified. You now have full access to all features.
    </p>
    <button
      onClick={onClose}
      className="mt-5 w-full bg-blue text-white p-2 rounded-full"
    >
      Finish
    </button>
  </div>
);
