// KycFlow.tsx
import { useState } from 'react';
import { Modal } from './Modal'; // if you separated Modal
import { KycForm } from './KycForm';
import { LoadingState } from './LoadingState';
import { SuccessState } from './SuccessState';
import { FailedState } from './FailedState';

export default function KycFlow({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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

  if (!open) return null;

  return (
    <>
      <KycForm onVerify={startVerification} />

      <Modal open={modalState === 'loading'} onClose={onClose}>
        <LoadingState />
      </Modal>

      <Modal
        open={modalState === 'success'}
        onClose={() => {
          setModalState('none');
          onClose();
        }}
      >
        <SuccessState
          onClose={() => {
            setModalState('none');
            onClose();
          }}
        />
      </Modal>

      <Modal
        open={modalState === 'failed'}
        onClose={() => setModalState('none')}
      >
        <FailedState onRetry={startVerification} />
      </Modal>
    </>
  );
}
