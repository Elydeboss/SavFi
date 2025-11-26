import React from 'react';

interface KycFormProps {
  onVerify: () => void;
}

export const KycForm: React.FC<KycFormProps> = ({ onVerify }) => (
  <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-600 dark:text-white p-6 rounded-xl shadow-md mt-6">
    <h2 className="text-xl font-bold mb-4 text-center">Complete your KYC</h2>
    <p className="text-center text-sm mb-5">
      Enter your correct details to verify your identity.
    </p>

    <div className="space-y-4">
      <input
        placeholder="First name"
        className="w-full p-3 rounded-lg border dark:bg-gray-500"
      />
      <input
        placeholder="Last name"
        className="w-full p-3 rounded-lg border dark:bg-gray-500"
      />
      <input
        placeholder="Enter 11 digit NIN"
        className="w-full p-3 rounded-lg border dark:bg-gray-500"
      />
    </div>

    <button
      onClick={onVerify}
      className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg"
    >
      Verify NIN
    </button>
    <p className="text-center text-xs mt-3 opacity-70">
      Your information is secure.
    </p>
  </div>
);
