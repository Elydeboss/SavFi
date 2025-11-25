import { useState, useEffect, useRef } from 'react';

type Props = {
  onView: () => void;
  onDownload: () => void;
  onDelete: () => void;
  onReport: () => void;
};

export default function TransactionRowActions({
  onView,
  onDownload,
  onDelete,
  onReport,
}: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on ESC key
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent table row click
          setOpen((s) => !s);
        }}
        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-gray-600"
        aria-label="actions"
      >
        ⋮
      </button>

      {open && (
        <div
          className="
            absolute right-0 mt-2
            w-48 sm:w-56 md:w-64
            max-w-[90vw]
            bg-white dark:bg-gray-700
            rounded-lg shadow-lg border dark:border-gray-600
            z-20 animate-fadeIn
          "
        >
          <ul className="py-2 text-sm">
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onView();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-600 dark:text-white"
              >
                View details
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onDownload();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-600 dark:text-white"
              >
                Download receipt
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onDelete();
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-slate-50 dark:hover:bg-gray-600"
              >
                Delete transaction
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onReport();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-600 dark:text-white"
              >
                Report issue
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
