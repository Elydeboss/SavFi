import React, { useState } from 'react';

// Utility for status colors
const statusColors: Record<string, string> = {
  Success: 'bg-green-100 text-green-600',
  Pending: 'bg-yellow-100 text-yellow-600',
  Failed: 'bg-red-100 text-red-600',
};

// Utility for source colors
const sourceColors: Record<string, string> = {
  Naira: 'bg-orange-100 text-orange-600',
  Interest: 'bg-purple-100 text-purple-600',
  Crypto: 'bg-blue-100 text-blue-600',
  Referral: 'bg-green-100 text-green-600',
  System: 'bg-gray-200 text-gray-700',
};

export default function TransactionsTable() {
  const [page, setPage] = useState(1);

  const transactions = [
    {
      date: 'Nov 15, 2025',
      type: 'Deposit',
      amount: '+₦50,000',
      status: 'Success',
      source: 'Naira',
    },
    {
      date: 'Nov 15, 2025',
      type: 'Interest',
      amount: '+86 USDT',
      status: 'Pending',
      source: 'Interest',
    },
    {
      date: 'Nov 15, 2025',
      type: 'Conversion',
      amount: '₦100,000',
      status: 'Failed',
      source: 'Crypto',
    },
    {
      date: 'Nov 15, 2025',
      type: 'Referral bonus',
      amount: '+86 USDT',
      status: 'Success',
      source: 'Referral',
    },
    {
      date: 'Nov 15, 2025',
      type: 'Deposit',
      amount: '+86 USDT',
      status: 'Success',
      source: 'Crypto',
    },
    {
      date: 'Nov 15, 2025',
      type: 'Withdrawal',
      amount: '-₦100,000',
      status: 'Success',
      source: 'Naira',
    },
    {
      date: 'Nov 15, 2025',
      type: 'System adjustment',
      amount: '-0.1 USDT',
      status: 'Success',
      source: 'System',
    },
  ];

  return (
    <div className="w-full p-4 md:p-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div className="w-full md:w-1/3 relative">
          <input
            type="text"
            placeholder="Search plans, type, amount, status e.t.c."
            className="w-full h-11 rounded-full bg-slate-100 pl-5 pr-12 text-sm focus:outline-none"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white w-9 h-9 flex items-center justify-center rounded-full">
            🔍
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 rounded-full bg-black text-white text-sm flex items-center gap-2 shadow-sm">
            Export CSV ↗
          </button>
          <button className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm flex items-center gap-2 shadow-sm">
            Export PDF 📄
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-6 text-sm mb-4">
        <div className="flex items-center gap-2">
          <span className="font-medium">Transaction Type:</span>
          <select className="border p-1 rounded-md text-sm bg-white">
            <option>All</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">Date range:</span>
          <select className="border p-1 rounded-md text-sm bg-white">
            <option>Recent</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left text-sm text-slate-600 border-b">
              <th className="py-3">Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Source</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="text-sm border-b hover:bg-slate-50">
                <td className="py-3">{tx.date}</td>
                <td>{tx.type}</td>
                <td
                  className={
                    tx.amount.includes('-') ? 'text-red-600' : 'text-green-600'
                  }
                >
                  {tx.amount}
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      statusColors[tx.status]
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      sourceColors[tx.source]
                    }`}
                  >
                    {tx.source}
                  </span>
                </td>
                <td className="text-xl cursor-pointer">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
        <p>Showing 1-20 of 120 transactions</p>

        <div className="flex items-center gap-2">
          <span>Transactions per page: 20</span>

          <div className="flex items-center gap-1">
            <button className="px-2 py-1 border rounded-md">&lt;</button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                className={`px-3 py-1 border rounded-md ${
                  page === n ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}

            <span className="px-2">...</span>
            <button className="px-2 py-1 border rounded-md">6</button>
            <button className="px-2 py-1 border rounded-md">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
