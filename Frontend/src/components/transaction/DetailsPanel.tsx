import type { Transaction } from '../../interfaces/transaction';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  tx?: Transaction | null;
  open: boolean;
  onClose: () => void;
};

export default function DetailsPanel({ tx, open, onClose }: Props) {
  // Close on ESC key
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // ⛔ PREVENT BACKGROUND SCROLL
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && tx && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* PANEL */}
          <motion.aside
            className="
              fixed top-0 right-0 h-full w-full md:w-[360px] md:h-[80vh] md:top-[12%] overflow-hidden
              bg-white dark:bg-gray-700 dark:text-white
              rounded-none md:rounded-3xl shadow-lg z-50 p-6 md:p-10 flex flex-col justify-between
            "
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* HEADER */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold">Transaction Details</h3>
              <button
                onClick={onClose}
                className="text-gray-500 font-bold dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* SUMMARY */}
            <div className="mb-6">
              <div className="bg-neutral-200 dark:bg-gray-600 rounded-xl p-4 text-center">
                <div className="text-base text-slate-500 dark:text-white/70">
                  {tx.type ?? 'Deposit'}
                </div>
                <div className="text-2xl font-bold mt-2">
                  {tx.amount ?? '₦50,000'}
                </div>
                <div className="text text-slate-500 dark:text-white/70 mt-1">
                  {tx.usdt ?? '+32 USDT'}
                </div>
                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-base">
                  {tx.status ?? 'Success'}
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="text-base bg-neutral-200 dark:bg-gray-600 rounded-xl p-4 space-y-2">
              <h3 className="text-lg font-semibold">Transaction Details:</h3>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-white/70">
                  Transaction ID
                </span>
                <span className="font-medium">
                  {tx.details?.txId ?? 'SAV-23388'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-white/70">Date</span>
                <span className="font-medium">
                  {tx.details?.date ?? 'Oct 24, 2025 - 10:45 am'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-white/70">
                  Method
                </span>
                <span className="font-medium">
                  {tx.details?.method ?? 'Bank transfer'}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-white/70">
                  Destination
                </span>
                <span className="font-medium">
                  {tx.details?.destination ?? 'USDT wallet'}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full py-2 rounded-full bg-blue text-white hover:bg-blue-600 transition">
                Download receipt ⤓
              </button>

              <button className="w-full py-2 rounded-full border text-slate-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                Report issue
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
