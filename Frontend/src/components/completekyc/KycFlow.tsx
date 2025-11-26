import { useState } from 'react';
import { Modal } from './Modal';
import { KycForm } from './KycForm';
import { LoadingState } from './LoadingState';
import { SuccessState } from './SuccessState';
import { FailedState } from './FailedState';

export default function KycFlow() {
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
    <div className=" relative w-full h-full">
      {/* Main Form */}
      <KycForm onVerify={startVerification} />

      {/* Loading Modal */}
      <Modal open={modalState === 'loading'} onClose={() => {}}>
        <LoadingState />
      </Modal>

      {/* Success Modal */}
      <Modal
        open={modalState === 'success'}
        onClose={() => setModalState('none')}
      >
        <SuccessState onClose={() => setModalState('none')} />
      </Modal>

      {/* Failed Modal */}
      <Modal
        open={modalState === 'failed'}
        onClose={() => setModalState('none')}
      >
        <FailedState onRetry={startVerification} />
      </Modal>
    </div>
  );
}
