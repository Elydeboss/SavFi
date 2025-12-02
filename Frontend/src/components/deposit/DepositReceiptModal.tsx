import React from 'react';

type ReceiptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  amount: number;
  usdt: number;
  reference: string;
  date: string;
};

const ModalWrapper: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6">
        {children}
      </div>
    </div>
  );
};

export default function ReceiptModal({
  isOpen,
  onClose,
  onBack,
  amount,
  usdt,
  reference,
  date,
}: ReceiptModalProps) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-foreground">
          Transaction Receipt
        </h2>
        <div>
          <p>
            <strong>Amount (NGN):</strong> ₦{amount.toLocaleString()}
          </p>
          <p>
            <strong>Amount (USDT):</strong> {usdt.toFixed(2)} USDT
          </p>
          <p>
            <strong>Reference:</strong> {reference}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-md bg-blue text-white hover:opacity-80 transition"
          >
            Close
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="flex-1 h-10 rounded-md border border-gray-300  hover:bg-blue transition"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}
