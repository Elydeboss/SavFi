// DepositVerifyingTransfer.tsx
import React from 'react';
import DepositModalWrapper from './DepositModalWrapper';

type Props = { isOpen: boolean };

export default function DepositVerifyingTransfer({ isOpen }: Props) {
  return (
    <DepositModalWrapper isOpen={isOpen}>
      <div className="flex flex-col items-center justify-center text-center py-6">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>

        <h2 className="text-lg font-semibold text-slate-800">
          Verifying Transfer…
        </h2>
        <p className="text-slate-500 text-sm mt-2">
          Please wait while we confirm your payment.
        </p>
      </div>
    </DepositModalWrapper>
  );
}
