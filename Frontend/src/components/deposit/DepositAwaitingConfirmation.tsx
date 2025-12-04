import React from 'react';
import awaiting from '../../assets/menu/awaiting.png';

// --- Type Definitions ---
type DepositAwaitingConfirmationProps = {
  isOpen: boolean;
  failed: boolean;
  onRefresh: () => void; // make required so it's always interactive
  onReturn: () => void;
  onSupport: () => void;
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4  bg-opacity-40 transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="awaiting-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full transform transition-all overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// --- Component: DepositAwaitingConfirmation ---
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
          <img
            src={awaiting}
            alt="awaiting icon"
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Title */}
        <h2
          id="awaiting-title"
          className="text-lg font-semibold text-foreground mb-2"
        >
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
            className="w-full h-11 rounded-full bg-blue hover:opacity-85 text-white font-semibold transition duration-150 shadow-md"
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
