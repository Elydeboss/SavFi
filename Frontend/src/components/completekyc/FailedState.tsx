import React from 'react';
import fail from '../../assets/menu/Container-1.png';

interface FailedStateProps {
  onRetry: () => void;
}

export const FailedState: React.FC<FailedStateProps> = ({ onRetry }) => (
  <div className="text-center">
    <div className="flex justify-center items-center mb-4">
      <img src={fail} alt="failed logo" className="w-12 h-12" />
    </div>
    <h2 className="font-semibold text-lg">Verification failed</h2>
    <p className="text-sm mt-2">
      We couldn't verify your details. Check your records and try again.
    </p>
    <button
      onClick={onRetry}
      className="mt-5 w-full bg-blue text-white p-2 rounded-full"
    >
      Retry Verification
    </button>
  </div>
);
