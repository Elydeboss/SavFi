import type { Transaction } from '../../interfaces/transaction';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  tx?: Transaction | null;
  open: boolean;
  onClose: () => void;
};

export default function DetailsPanel({ tx, open, onClose }: Props) {
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
              fixed top-0 right-0 h-full w-full md:w-[360px] md:h-[80vh] md:top-[12%]
              bg-white dark:bg-gray-700 dark:text-white
              rounded-none md:rounded-3xl shadow-lg z-50 p-6 md:p-10  flex flex-col justify-between
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
                className="text-gray-500 font-bold dark:text-white"
              >
                ✕
              </button>
            </div>

            {/* SUMMARY */}
            <div className="mb-6">
              <div className="bg-neutral-200 dark:bg-gray-600 rounded-xl p-4 text-center">
                <div className="text-sm text-slate-500 dark:text-white/70">
                  Deposit
                </div>
                <div className="text-2xl font-bold mt-2">₦50,000</div>
                <div className="text-sm text-slate-500 dark:text-white/70 mt-1">
                  +32 USDT
                </div>
                <div className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                  Success
                </div>
              </div>
            </div>

            {/* DETAILS */}
            <div className="text-sm bg-neutral-200 dark:bg-gray-600 rounded-xl p-4 space-y-2">
              <h3 className="text-lg font-semi">Transaction Details:</h3>
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
              <button className="w-full py-2 rounded-full bg-blue text-white">
                Download receipt ⤓
              </button>
              <button className="w-full py-2 rounded-full border text-slate-700 dark:text-white">
                Report issue
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
