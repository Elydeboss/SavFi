import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

import { Modal } from '../components/completekyc/Modal';
import { KycForm } from '../components/completekyc/KycForm';
import { LoadingState } from '../components/completekyc/LoadingState';
import { SuccessState } from '../components/completekyc/SuccessState';
import { FailedState } from '../components/completekyc/FailedState';

export default function KycVerification() {
  const isVerified = false;

  const [modalState, setModalState] = useState<
    'none' | 'form' | 'loading' | 'success' | 'failed'
  >('none');

  const startVerification = () => {
    setModalState('loading');

    setTimeout(() => {
      const passed = Math.random() > 0.5;
      setModalState(passed ? 'success' : 'failed');
    }, 2000);
  };

  // Prevent background scroll
  useEffect(() => {
    if (modalState !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalState]);

  return (
    <div className="">
      <div className="px-2 flex items-center gap-1 font-medium text-sm">
        Profile <span className="text-blue-500">› KYC verification</span>
      </div>

      <motion.div
        className="w-full bg-gray-100 dark:bg-gray-600 dark:text-white min-h-screen p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="w-full flex justify-center mt-4">
          <div className="w-full max-w-3xl space-y-6">
            {/* =====================================
                UNVERIFIED KYC BLOCK
            ====================================== */}
            {!isVerified && (
              <motion.div
                className="bg-white dark:bg-gray-700 shadow rounded-2xl p-6 relative"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <p className="font-semibold text-lg mb-2">
                  Verification status
                </p>

                <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  KYC: Unverified
                </span>

                <p className="text-sm text-black-text dark:text-gray-300 mt-4 leading-relaxed">
                  You have not completed your identity verification. Use your
                  NIN to complete KYC to unlock withdrawals and higher deposit
                  limits.
                </p>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="mt-5 px-5 py-2 text-sm bg-black text-white dark:bg-gray-600 rounded-full font-medium"
                  onClick={() => setModalState('form')}
                >
                  Verify KYC
                </motion.button>
              </motion.div>
            )}

            {/* =====================================
                VERIFIED BLOCK (STATIC)
            ====================================== */}
            {isVerified && (
              <motion.div
                className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6 space-y-4"
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.45 }}
              >
                <div>
                  <p className="font-semibold text-lg">Verification status</p>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    KYC: Verified
                  </span>
                </div>

                <p className="font-semibold text-base pt-2">
                  Verification summary
                </p>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Full Name
                    </span>
                    <span className="flex items-center gap-1">
                      Jolly Akeju <Lock size={14} />
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      NIN
                    </span>
                    <span>234******89</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Verification date
                    </span>
                    <span>18 November, 2025</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300">
                      Verification method
                    </span>
                    <span>NIN lookup</span>
                  </div>
                </div>

                <hr className="border-gray-300/60 dark:border-gray-600 my-3" />

                <p className="text-xs text-gray-500 dark:text-gray-300">
                  To upgrade your KYC information,
                  <button className="text-blue-500 underline ml-1">
                    Contact support
                  </button>
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ===========================================
          MODALS FOR KYC FLOW (STAY ON PAGE)
      ============================================ */}

      {/* FORM MODAL */}
      <Modal open={modalState === 'form'} onClose={() => setModalState('none')}>
        <KycForm onVerify={startVerification} />
      </Modal>

      {/* LOADING MODAL */}
      <Modal open={modalState === 'loading'} onClose={() => {}}>
        <LoadingState />
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal
        open={modalState === 'success'}
        onClose={() => setModalState('none')}
      >
        <SuccessState onClose={() => setModalState('none')} />
      </Modal>

      {/* FAILED MODAL */}
      <Modal
        open={modalState === 'failed'}
        onClose={() => setModalState('none')}
      >
        <FailedState onRetry={startVerification} />
      </Modal>
    </div>
  );
}
