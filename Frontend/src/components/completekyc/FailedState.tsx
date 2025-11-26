import React from 'react';

interface FailedStateProps {
  onRetry: () => void;
}

export const FailedState: React.FC<FailedStateProps> = ({ onRetry }) => (
  <div className="text-center">
    <div className="text-4xl mb-4">❌</div>
    <h2 className="font-semibold text-lg">Verification failed</h2>
    <p className="text-sm mt-2">
      We couldn't verify your details. Check your records and try again.
    </p>
    <button
      onClick={onRetry}
      className="mt-5 w-full bg-blue-500 text-white p-2 rounded-lg"
    >
      Retry Verification
    </button>
  </div>
);
