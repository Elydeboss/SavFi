type Props = {
  page: number;
  setPage: (n: number) => void;
  totalPages: number;
};

export default function Pagination({ page, setPage, totalPages }: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm dark:text-white">
      <div>
        Showing {(page - 1) * 20 + 1}-{Math.min(page * 20, totalPages * 20)} of{' '}
        {totalPages * 20} transactions
      </div>

      <div className="flex items-center gap-2 ml-0 md:ml-6">
        <div className="text-slate-600 dark:text-white">
          Transactions per page: 20
        </div>

        {/* Previous */}
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          className="px-2 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          &lt;
        </button>

        {/* Page numbers */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 border rounded-md transition-colors ${
              p === page
                ? 'bg-blue text-white dark:bg-blue-600'
                : 'bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          className="px-2 py-1 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
