import React, { useState } from 'react';
import { Modal } from './Modal';
import { LoadingState } from './LoadingState';
import { SuccessState } from './SuccessState';
import { FailedState } from './FailedState';
import { KycForm } from './KycForm';

export const KycFlow: React.FC = () => {
  const [modalState, setModalState] = useState<
    'none' | 'loading' | 'success' | 'failed'
  >('none');

  const startVerification = () => {
    setModalState('loading');
    setTimeout(() => {
      const passed = Math.random() > 0.5;
      setModalState(passed ? 'success' : 'failed');
    }, 2000);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-700 dark:text-white flex justify-center items-start">
      <KycForm onVerify={startVerification} />

      <Modal
        open={modalState === 'loading'}
        onClose={() => setModalState('none')}
      >
        <LoadingState />
      </Modal>

      <Modal
        open={modalState === 'success'}
        onClose={() => setModalState('none')}
      >
        <SuccessState onClose={() => setModalState('none')} />
      </Modal>

      <Modal
        open={modalState === 'failed'}
        onClose={() => setModalState('none')}
      >
        <FailedState onRetry={startVerification} />
      </Modal>
    </div>
  );
};
