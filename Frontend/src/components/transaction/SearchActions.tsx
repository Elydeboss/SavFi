import { motion } from 'framer-motion';

type Props = {
  query: string;
  setQuery: (s: string) => void;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
};

export default function SearchActions({
  query,
  setQuery,
  onExportCSV,
  onExportPDF,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 dark:text-white"
    >
      <div className="relative w-full md:w-1/2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search plans, type, amount, status e.t.c."
          className="w-full h-11 rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white pl-4 pr-12 text-sm placeholder:text-black dark:placeholder:text-gray-300 focus:outline-none"
        />
        <button
          title="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue text-white w-9 h-9 flex items-center justify-center rounded-full shadow-sm dark:bg-blue-600"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21l-4.35-4.35"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx="11"
              cy="11"
              r="6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExportCSV}
          className="px-4 py-2 rounded-full bg-black text-white text-sm flex items-center gap-2 shadow-sm dark:bg-gray-800 dark:text-white hover:scale-105 transition-transform"
        >
          Export CSV ↗
        </button>
        <button
          onClick={onExportPDF}
          className="px-4 py-2 rounded-full bg-blue text-white text-sm flex items-center gap-2 shadow-sm dark:bg-blue-600 dark:text-white hover:scale-105 transition-transform"
        >
          Export PDF
        </button>
      </div>
    </motion.div>
  );
}
