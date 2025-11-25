import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import SearchActions from '../components/transaction/SearchActions';
import FiltersRow from '../components/transaction/FiltersRow';
import TransactionsTable from '../components/transaction/TransactionsTable';
import DetailsPanel from '../components/transaction/DetailsPanel';
import Pagination from '../components/transaction/Pagination';
import type { Transaction } from '../interfaces/transaction';
import Navbar from '../components/dashboard/Navbar';

const demoTransactions: Transaction[] = [
  {
    id: '1',
    date: 'Nov 15, 2025',
    type: 'Deposit',
    amount: '+₦50,000',
    status: 'Success',
    source: 'Naira',
    details: {},
  },
  {
    id: '2',
    date: 'Nov 15, 2025',
    type: 'Interest',
    amount: '+86 USDT',
    status: 'Pending',
    source: 'Interest',
    details: {},
  },
  {
    id: '3',
    date: 'Nov 15, 2025',
    type: 'Conversion',
    amount: '₦100,000',
    status: 'Failed',
    source: 'Crypto',
    details: {},
  },
  {
    id: '4',
    date: 'Nov 15, 2025',
    type: 'Referral bonus',
    amount: '+86 USDT',
    status: 'Success',
    source: 'Referral',
    details: {},
  },
  {
    id: '5',
    date: 'Nov 15, 2025',
    type: 'Deposit',
    amount: '+86 USDT',
    status: 'Success',
    source: 'Crypto',
    details: {},
  },
  {
    id: '6',
    date: 'Nov 15, 2025',
    type: 'Withdrawal',
    amount: '-₦100,000',
    status: 'Success',
    source: 'Naira',
    details: {},
  },
  {
    id: '7',
    date: 'Nov 15, 2025',
    type: 'System adjustment',
    amount: '-0.1 USDT',
    status: 'Success',
    source: 'System',
    details: {},
  },
];

export default function TransactionsPage() {
  const [query, setQuery] = useState('');
  const [transactionType, setTransactionType] = useState('All');
  const [dateRange, setDateRange] = useState('Recent');
  const [page, setPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return demoTransactions.filter((t) => {
      if (transactionType !== 'All' && t.type !== transactionType) return false;
      if (
        q &&
        !(
          t.type.toLowerCase().includes(q) ||
          t.amount.toLowerCase().includes(q) ||
          t.source.toLowerCase().includes(q)
        )
      )
        return false;
      return true;
    });
  }, [query, transactionType]);

  const onRowClick = (tx: Transaction) => {
    setSelectedTx(tx);
    setDetailsOpen(true);
  };

  return (
    <div className="flex flex-col justify-between pb-10 h-full w-full dark:bg-gray-600 dark:text-white">
      <div className="flex-1 flex flex-col">
        <Navbar title="Transaction" />

        <div className="flex flex-1 flex-col p-4">
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="w-full space-y-4"
          >
            <SearchActions
              query={query}
              setQuery={setQuery}
              onExportCSV={() => alert('export csv')}
              onExportPDF={() => alert('export pdf')}
            />
            <FiltersRow
              transactionType={transactionType}
              setTransactionType={setTransactionType}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </motion.div>

          <div className="flex flex-col gap-6 mt-4">
            {/* MOBILE CARDS */}
            <div className="flex flex-col md:hidden gap-4">
              <AnimatePresence>
                {filtered.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="bg-white dark:bg-gray-700 shadow-md rounded-2xl p-4 flex flex-col gap-2 cursor-pointer"
                    onClick={() => onRowClick(tx)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700 dark:text-white">
                        {tx.date}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.status === 'Success'
                            ? 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300'
                            : tx.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-700 dark:text-yellow-300'
                            : 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300'
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
                          tx.source === 'Naira'
                            ? 'bg-orange-100 text-orange-600 dark:bg-orange-700 dark:text-orange-300'
                            : tx.source === 'Interest'
                            ? 'bg-purple-100 text-purple-600 dark:bg-purple-700 dark:text-purple-300'
                            : tx.source === 'Crypto'
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-300'
                            : tx.source === 'Referral'
                            ? 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300'
                            : 'bg-gray text-black dark:bg-gray-600 dark:text-white'
                        }`}
                      >
                        {tx.source}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
              <TransactionsTable
                transactions={filtered}
                onRowClick={onRowClick}
                onView={setSelectedTx}
                onDownload={(tx) => alert('Download: ' + tx.id)}
                onDelete={(tx) => alert('Delete: ' + tx.id)}
                onReport={(tx) => alert('Report issue: ' + tx.id)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4">
        <Pagination page={page} setPage={setPage} totalPages={6} />

        {/* DESKTOP DETAILS PANEL */}
        <AnimatePresence>
          {selectedTx && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35 }}
              className="hidden md:block w-[360px] h-[75vh] overflow-y-auto"
            >
              <div className="sticky top-20">
                <DetailsPanel
                  tx={selectedTx}
                  open={true}
                  onClose={() => setSelectedTx(null)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE SLIDE-OVER PANEL */}
        <AnimatePresence>
          {detailsOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <DetailsPanel
                tx={selectedTx ?? undefined}
                open={detailsOpen}
                onClose={() => setDetailsOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
