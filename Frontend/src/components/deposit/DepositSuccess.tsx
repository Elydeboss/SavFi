import React from 'react';

// --- Type Definitions ---
type DepositSuccessProps = {
  isOpen: boolean;
  onClose: () => void; // Used for the primary action (Return to dashboard)
  onViewDetails?: () => void; // Added for the secondary action (View transaction details)
};

type DepositModalWrapperProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

// --- Helper Component: DepositModalWrapper ---
// This component simulates the external modal wrapper required by the DepositSuccess component.
const DepositModalWrapper: React.FC<DepositModalWrapperProps> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-40 transition-opacity">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-sm w-full transform transition-all overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
};

// --- Component: DepositSuccess (Replicated from visual design) ---
export default function DepositSuccess({
  isOpen,
  onClose,
  onViewDetails,
}: DepositSuccessProps) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center text-center py-8 px-6">
        {/* Icon */}
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-6">
          {/* Using a Checkmark SVG for better styling matching the image */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Deposit successful
        </h2>

        {/* Message (Adapted from visual design) */}
        <p className="text-base text-slate-600 mb-8">
          Your account has been credited with 500.00 USDT. Funds are now
          available in your total balance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {/* Primary Button: Return to dashboard (using the onClose prop) */}
          <button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-150 shadow-md"
          >
            Return to dashboard
          </button>

          {/* Secondary Button: View transaction details */}
          <button
            onClick={onViewDetails}
            className="w-full h-12 rounded-xl bg-white hover:bg-slate-50 text-blue-600 font-semibold transition duration-150 border border-blue-500"
          >
            View transaction details
          </button>
        </div>
      </div>
    </DepositModalWrapper>
  );
}
