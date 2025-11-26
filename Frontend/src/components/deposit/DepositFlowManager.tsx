// DepositFlowManager.tsx

import React, { useState } from 'react';

import DepositVerifyingTransfer from './DepositVerifyingTransfer';
import DepositAwaitingConfirmation from './DepositAwaitingConfirmation';
import DepositSuccess from './DepositSuccess';

type FlowStep =
  | 'none'
  | 'details'
  | 'verifying'
  | 'awaiting'
  | 'success'
  | 'failed';

export default function DepositFlowManager() {
  const [step, setStep] = useState<FlowStep>('none');
  const [amountToPay, setAmountToPay] = useState<number>(0);

  // Public function — call it from DepositBankDetails
  const openDepositFlow = (amount: number) => {
    setAmountToPay(amount);
    setStep('details');
  };

  const closeAll = () => setStep('none');

  // Flow transitions
  const handleTransferMade = () => setStep('verifying');

  const handleVerificationDone = () => setStep('awaiting');

  const handleConfirmed = () => setStep('success');

  const handleFailed = () => setStep('failed');

  return (
    <>
      {/* TEMP button to test flow */}
      <button
        onClick={() => openDepositFlow(150000)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Start Deposit Flow
      </button>

      {/* 1. Deposit Details Modal */}
      <DepositDetailsModal
        isOpen={step === 'details'}
        amount={amountToPay}
        onClose={closeAll}
        onContinue={handleTransferMade}
      />

      {/* 2. Verifying Modal */}
      <DepositVerifyingTransfer
        isOpen={step === 'verifying'}
        // Auto-move to awaiting after 3 seconds (optional)
        onComplete={() => handleVerificationDone()}
      />

      {/* 3. Awaiting Confirmation */}
      <DepositAwaitingConfirmation
        isOpen={step === 'awaiting'}
        onClose={closeAll}
        onConfirmed={handleConfirmed}
        onFailed={handleFailed}
      />

      {/* 4. Success */}
      <DepositSuccess isOpen={step === 'success'} onClose={closeAll} />
    </>
  );
}
