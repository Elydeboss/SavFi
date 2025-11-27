import type { Transaction } from '../../interfaces/transaction';
import TransactionRowActions from './TransactionRowActions';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  transactions: Transaction[];
  onRowClick: (tx: Transaction) => void;
  onView: (tx: Transaction) => void;
  onDownload: (tx: Transaction) => void;
  onDelete: (tx: Transaction) => void;
  onReport: (tx: Transaction) => void;
};

const statusColors: Record<string, string> = {
  Success: 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300',
  Pending:
    'bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-300',
  Failed: 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300',
};

const sourceColors: Record<string, string> = {
  Naira:
    'bg-orange-100 text-orange-600 dark:bg-orange-700 dark:text-orange-300',
  Interest:
    'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-300',
  Crypto: 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300',
  Referral: 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300',
  System: 'bg-gray text-black dark:bg-gray-600 dark:text-white',
};

export default function TransactionsTable({
  transactions,
  onRowClick,
  onView,
  onDownload,
  onDelete,
  onReport,
}: Props) {
  return (
    <div className="flex flex-col w-full gap-4 ">
      {/* MOBILE CARDS */}
      <div className="flex flex-col md:hidden gap-4">
        <AnimatePresence>
          {transactions.map((tx, i) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, delay: i * 0.05 }}
              className="bg-white dark:bg-gray-700 shadow-md rounded-2xl flex p-2 flex-col gap-3 cursor-pointer"
              onClick={() => onRowClick(tx)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700 dark:text-white">
                  {tx.date}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[tx.status]
                  }`}
                >
                  {tx.status}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300 font-medium">
                  {tx.type}
                </span>
                <span
                  className={`font-semibold ${
                    tx.amount.startsWith('+₦')
                      ? 'text-black dark:text-white'
                      : tx.amount.startsWith('-')
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {tx.amount}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sourceColors[tx.source]
                  }`}
                >
                  {tx.source}
                </span>
                <div onClick={(e) => e.stopPropagation()}>
                  <TransactionRowActions
                    onView={() => onView(tx)}
                    onDownload={() => onDownload(tx)}
                    onDelete={() => onDelete(tx)}
                    onReport={() => onReport(tx)}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block w-full rounded-lg  dark:bg-gray-700">
        <table className="w-full table-auto">
          <thead className="bg-gray dark:bg-gray-800">
            <tr className="text-left text-base text-slate-600 dark:text-white">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Source</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {transactions.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  className="text-base hover:bg-blue-hover cursor-pointer dark:hover:bg-gray-600"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  onClick={() => onRowClick(tx)}
                >
                  <td className="py-3 px-4 dark:text-white">{tx.date}</td>
                  <td className="py-3 px-4 dark:text-white">{tx.type}</td>
                  <td
                    className={`py-3 px-4 ${
                      tx.amount.startsWith('+₦')
                        ? 'text-black dark:text-white'
                        : tx.amount.startsWith('-')
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    {tx.amount}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        statusColors[tx.status]
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        sourceColors[tx.source]
                      }`}
                    >
                      {tx.source}
                    </span>
                  </td>
                  <td
                    className="py-3 px-4 text-blue font-bold text-base"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <TransactionRowActions
                      onView={() => onView(tx)}
                      onDownload={() => onDownload(tx)}
                      onDelete={() => onDelete(tx)}
                      onReport={() => onReport(tx)}
                    />
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
