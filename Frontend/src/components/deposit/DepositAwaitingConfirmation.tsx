import React from 'react';

// --- Type Definitions ---
type DepositAwaitingConfirmationProps = {
  isOpen: boolean;
  onRefresh?: () => void;
  onReturn?: () => void;
  onSupport?: () => void;
};

type DepositModalWrapperProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

// --- Helper Component: DepositModalWrapper ---
// This component simulates the external modal wrapper required by the user's component.
// It is included here to make the DepositAwaitingConfirmation component runnable in isolation.
const DepositModalWrapper: React.FC<DepositModalWrapperProps> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-40 transition-opacity">
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

// --- Component: DepositAwaitingConfirmation (Exact Replica) ---
export default function DepositAwaitingConfirmation({
  isOpen,
  onRefresh,
  onReturn,
  onSupport,
}: DepositAwaitingConfirmationProps) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center text-center py-6 px-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
          {/* Using a simple clock SVG icon for consistency */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-yellow-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Awaiting Confirmation
        </h2>

        {/* Message */}
        <p className="text-sm text-slate-600 mb-6">
          We haven’t received confirmation from your bank yet. This can take a
          little longer depending on your bank.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onRefresh}
            className="w-full h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-150 shadow-md"
          >
            Refresh status
          </button>
          <button
            onClick={onReturn}
            className="w-full h-11 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold transition duration-150 border border-slate-300"
          >
            Return to dashboard
          </button>
        </div>

        {/* Support Link */}
        <button
          onClick={onSupport}
          className="mt-4 text-sm text-slate-500 underline hover:text-slate-600 transition duration-150"
        >
          Contact support
        </button>
      </div>
    </DepositModalWrapper>
  );
}
