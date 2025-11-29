import React from 'react';
import { Lock } from 'lucide-react';

interface KycFormProps {
  onVerify: () => void;
}

export const KycForm: React.FC<KycFormProps> = ({ onVerify }) => (
  <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-700 dark:text-white p-6 rounded-2xl shadow-md mt-6">
    {/* Title */}
    <h2 className="text-2xl font-semibold text-center">Complete your KYC</h2>
    <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-1">
      Enter your <span className="font-medium">correct details</span> to verify
      your <span className="font-medium">identity</span>.
    </p>

    {/* Form Fields */}
    <div className="mt-6 space-y-4">
      {/* First Name */}
      <div>
        <label className="text-sm font-medium">First name</label>
        <input
          placeholder="Jolly"
          className="w-full mt-1 p-3 rounded-lg border border-gray-200 bg-gray-300 dark:bg-gray-600"
        />
      </div>

      {/* Last Name */}
      <div>
        <label className="text-sm font-medium">Last name</label>
        <input
          placeholder="Akeju"
          className="w-full mt-1 p-3 rounded-lg border border-gray-200 bg-gray-300 dark:bg-gray-600"
        />
        <p className="text-xs text-blue bg-[#E9F4FD] round-md py-1 p-2 mt-1">
          Names must match that on your NIN for successful verification
        </p>
      </div>

      {/* NIN */}
      <div>
        <label className="text-sm font-medium">
          National Identification Number (NIN)
        </label>
        <input
          placeholder="Enter 11 digit pin"
          className="w-full mt-1 p-3 rounded-lg border border-gray-200 bg-gray-300 dark:bg-gray-600"
        />
      </div>
    </div>

    {/* Submit Button */}
    <button
      onClick={onVerify}
      className="
        w-full mt-6 py-3
        bg-blue hover:bg-[#0d8adf]
        text-white text-sm font-medium
        rounded-full transition
      "
    >
      Verify NIN
    </button>

    {/* Security Note */}
    <p className="flex justify-center items-center gap-1 text-xs text-gray-500 dark:text-gray-300 mt-4">
      <Lock size={12} />
      Your information is kept secure and used only for verification
    </p>
  </div>
);
