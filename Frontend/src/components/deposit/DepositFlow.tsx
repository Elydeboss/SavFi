// DepositFlow.tsx
// Controls the entire deposit process flow

import React, { useState } from 'react';
import DepositEnterAmount from './DepositEnterAmount';
import DepositBankDetails from './DepositBankDetails';
import DepositVerifyingTransfer from './DepositVerifyingTransfer';
import DepositAwaitingConfirmation from './DepositAwaitingConfirmation';
import DepositSuccess from './DepositSuccess';

export default function DepositFlow() {
  const [step, setStep] = useState<'enter' | 'bank'>('enter');
  const [amountNgn, setAmountNgn] = useState<number>(0);
  const [amountUsdt, setAmountUsdt] = useState<number>(0);

  const [modal, setModal] = useState<
    'none' | 'verifying' | 'awaiting' | 'success' | 'failed'
  >('none');

  const handleBankContinue = () => {
    setModal('verifying');
    setTimeout(() => {
      setModal('awaiting');
      setTimeout(() => {
        const isSuccess = Math.random() > 0.3;
        setModal(isSuccess ? 'success' : 'failed');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="w-full">
      {step === 'enter' && (
        <DepositEnterAmount
          onContinue={(ngn, usdt) => {
            setAmountNgn(ngn);
            setAmountUsdt(usdt);
            setStep('bank');
          }}
          onCancel={() => console.log('Cancel pressed')}
        />
      )}

      {step === 'bank' && (
        <DepositBankDetails
          amountToPay={amountNgn}
          onContinue={handleBankContinue}
          onCancel={() => setStep('enter')}
        />
      )}

      {/* Modals */}
      <DepositVerifyingTransfer isOpen={modal === 'verifying'} />
      <DepositAwaitingConfirmation isOpen={modal === 'awaiting'} />
      <DepositSuccess
        isOpen={modal === 'success'}
        onClose={() => {
          setModal('none');
          setStep('enter');
        }}
      />
    </div>
  );
}
