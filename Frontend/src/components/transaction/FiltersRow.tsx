type Props = {
  transactionType: string;
  setTransactionType: (s: string) => void;
  dateRange: string;
  setDateRange: (s: string) => void;
};

export default function FiltersRow({
  transactionType,
  setTransactionType,
  dateRange,
  setDateRange,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm my-4  dark:text-white">
      {/* Transaction Type */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-700 dark:text-white">
          Transaction Type:
        </span>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className="px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:border-slate-400 transition-colors dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="All">All</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdrawal">Withdrawal</option>
          <option value="Conversion" className="font-semibold">
            Conversion
          </option>
          <option value="Referral">Referral Bonus</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="flex items-center gap-2">
        <span className="font-medium text-slate-700 dark:text-white">
          Date range:
        </span>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-700 shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                     hover:border-slate-400 transition-colors dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="Recent">Recent</option>
          <option value="Last 3 days">Last 3 days</option>
          <option value="Last 7 days">Last 7 days</option>
          <option value="Last 30 days">Last 30 days</option>
        </select>
      </div>
    </div>
  );
}
