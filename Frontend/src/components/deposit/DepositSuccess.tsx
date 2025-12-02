import React from 'react';
import success from '../../assets/menu/Container.png';

type DepositSuccessProps = {
  isOpen: boolean;
  onClose: () => void;
  onViewDetails: () => void;
  amountUsdt: number;
};

const DepositModalWrapper: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deposit-success-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-sm w-full transform overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default function DepositSuccess({
  isOpen,
  onClose,
  onViewDetails,
  amountUsdt,
}: DepositSuccessProps) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center text-center py-8 px-6">
        <img
          src={success}
          alt="success icon"
          className="h-16 w-16 object-contain mb-4"
        />
        <h2
          id="deposit-success-title"
          className="text-xl font-bold text-foreground mb-2"
        >
          Deposit successful
        </h2>
        <p className="text-base text-muted-foreground mb-8">
          Your account has been credited with{' '}
          <span className="font-semibold">{amountUsdt.toFixed(2)} USDT</span>.
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-blue text-white font-semibold hover:bg-blue/90 shadow-md transition"
          >
            Return to dashboard
          </button>
          <button
            onClick={onViewDetails}
            className="w-full h-12 rounded-xl bg-white dark:bg-gray-700 text-blue font-semibold border border-blue hover:bg-neutral-50 dark:hover:bg-gray-600 transition"
          >
            View transaction details
          </button>
        </div>
      </div>
    </DepositModalWrapper>
  );
}
