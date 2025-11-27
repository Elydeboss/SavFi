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

  // Close on outside click
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
      {/* Three-dots button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevents row click
          setOpen((s) => !s);
        }}
        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-gray-600"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        ⋮
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          className="
            absolute right-0 mt-2
            w-48 sm:w-56 md:w-64
            max-w-[90vw]
            bg-white dark:bg-gray-700
            rounded-lg shadow-lg border dark:border-gray-600
            z-50
            origin-top-right
            animate-scaleFade
          "
        >
          <ul className="py-2 text-sm dark:text-white">
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onView();
                }}
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-600"
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
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-600"
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
                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-gray-600"
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
