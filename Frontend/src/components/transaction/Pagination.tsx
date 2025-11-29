type Props = {
  page: number;
  setPage: (n: number) => void;
  totalPages: number;
};

export default function Pagination({ page, setPage, totalPages }: Props) {
  const perPage = 20;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // --- Utility: show fewer buttons with ellipsis ---
  const visiblePages = pages.filter((p) => {
    if (totalPages <= 7) return true; // show all if few pages
    if (p === 1 || p === totalPages) return true; // first + last
    if (Math.abs(p - page) <= 1) return true; // current, prev, next
    return false;
  });

  const formatPages = () => {
    const output: (number | '...')[] = [];
    let last: number | null = null;

    visiblePages.forEach((p) => {
      if (last && p - last > 1) {
        output.push('...');
      }
      output.push(p);
      last = p;
    });

    return output;
  };

  const finalPages = formatPages();

  // --- Range display ---
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, totalPages * perPage);
  const totalItems = totalPages * perPage;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-base dark:text-white">
      {/* Showing X to Y of Z */}
      <div>
        Showing {start}-{end} of {totalItems} transactions
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-2 ml-0 md:ml-6">
        <div className="text-slate-600 dark:text-white">
          Transactions per page: {perPage}
        </div>

        {/* Previous */}
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-2 py-1 border rounded-md transition-colors disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          &lt;
        </button>

        {/* Dynamic Page Numbers With Ellipsis */}
        {finalPages.map((p, i) =>
          p === '...' ? (
            <div key={i} className="px-3 text-gray-500 dark:text-gray-300">
              ...
            </div>
          ) : (
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
          )
        )}

        {/* Next */}
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded-md transition-colors disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
