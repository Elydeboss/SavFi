import React from 'react';
import awaiting from '../../assets/menu/awaiting.png';

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

const DepositModalWrapper: React.FC<DepositModalWrapperProps> = ({
  isOpen,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-40 transition-opacity">
      <div
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full transform transition-all overflow-hidden"
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
        <div className="flex justify-center mb-4">
          <img src={awaiting} alt="success icon" className="h-12 w-" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Awaiting Confirmation
        </h2>

        {/* Message */}
        <p className="text-sm text-muted-foreground mb-6">
          We haven’t received confirmation from your bank yet. This can take a
          little longer depending on your bank.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onRefresh}
            className="w-full h-11 rounded-full bg-blue hover:bg-blue-300 text-white font-semibold transition duration-150 shadow-md"
          >
            Refresh status
          </button>
          <button
            onClick={onReturn}
            className="w-full h-11 rounded-full bg-neutral-200 dark:bg-gray-700 hover:bg-neutral-300 dark:hover:bg-gray-600 text-foreground font-semibold transition duration-150 border border-border"
          >
            Return to dashboard
          </button>
        </div>

        {/* Support Link */}
        <button
          onClick={onSupport}
          className="mt-4 text-sm text-muted-foreground underline hover:text-foreground transition duration-150"
        >
          Contact support
        </button>
      </div>
    </DepositModalWrapper>
  );
}
