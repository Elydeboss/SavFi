import React from 'react';
import success from '../../assets/menu/Container.png';

type DepositSuccessProps = {
  isOpen: boolean;
  onClose: () => void;
  onViewDetails?: () => void;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-40 transition-opacity">
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

export default function DepositSuccess({
  isOpen,
  onClose,
  onViewDetails,
}: DepositSuccessProps) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center text-center py-8 px-6">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <img src={success} alt="success icon" className="h-12 w-" />
        </div>
        {/* Title */}
        <h2 className="text-xl font-bold text-foreground mb-2">
          Deposit successful
        </h2>

        {/* Message (Adapted from visual design) */}
        <p className="text-base text-muted-foreground mb-8">
          Your account has been credited with 500.00 USDT. Funds are now
          available in your total balance.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 w-full">
          {/* Primary Button: Return to dashboard (using the onClose prop) */}
          <button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-blue hover:bg-blue hover:opacity-80 text-white font-semibold transition duration-150 shadow-md"
          >
            Return to dashboard
          </button>

          {/* Secondary Button: View transaction details */}
          <button
            onClick={onViewDetails}
            className="w-full h-12 rounded-xl bg-white dark:bg-gray-700 hover:bg-neutral-50 dark:hover:bg-gray-600 text-blue font-semibold transition duration-150 border border-blue"
          >
            View transaction details
          </button>
        </div>
      </div>
    </DepositModalWrapper>
  );
}
