import React, { useState, useRef, useEffect } from 'react';
import { FiSearch, FiBell, FiMoon, FiCalendar, FiX } from 'react-icons/fi';
import type { NavbarProps } from '../../interfaces';

const Navbar: React.FC<NavbarProps> = ({ title, profileImage }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchActive) inputRef.current?.focus();
  }, [searchActive]);

  const today = new Date();
  const currentDate = today
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '');

  const toggleSearch = () => setSearchActive((prev) => !prev);
  const handleSearch = () => {
    console.log('Search for:', searchValue);
  };

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 md:px-4 lg:px-10 py-4 bg-neutral-50 gap-2 md:gap-4">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-2 md:gap-6">
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 transition-all duration-300 ${
            searchActive ? 'md:hidden lg:block' : 'block'
          }`}
        >
          {title}
        </h1>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleSearch}
            aria-label={searchActive ? 'Close search' : 'Open search'}
            className={`p-2 rounded-full w-7 h-7 flex items-center justify-center transition ${
              searchActive
                ? 'mr-14 bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {searchActive ? (
              <FiX className="w-4 h-4" />
            ) : (
              <FiSearch className="w-4 h-4" />
            )}
          </button>

          {!searchActive && (
            <>
              <button
                aria-label="Notifications"
                className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition w-7 h-7 flex items-center justify-center"
              >
                <FiBell className="w-4 h-4" />
              </button>
              <button
                aria-label="Toggle dark mode"
                className="p-2 mr-10 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition w-7 h-7 flex items-center justify-center"
              >
                <FiMoon className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {searchActive && (
        <div className="relative flex w-full md:hidden mt-2">
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-3 pr-10 py-2 rounded-md border border-gray-300 bg-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <FiSearch className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="hidden md:flex items-center gap-5 relative">
        <div className="relative flex items-center">
          <button
            onClick={toggleSearch}
            aria-label="Open search"
            className={`p-2 lg:p-3 rounded-full w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center transition ${
              searchActive
                ? 'mr-5 bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <FiSearch className="lg:w-5 lg:h-5" />
          </button>

          {searchActive && (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="absolute top-0 right-full mr-5 px-3 py-2 md:py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-56 md:w-72 lg:w-75 transition-all duration-300"
            />
          )}
        </div>

        <div
          className={`items-center gap-4 ${
            searchActive ? 'md:hidden lg:flex' : 'flex'
          }`}
        >
          <div className="relative">
            <button
              aria-label="Notifications"
              className="p-2 md:p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition w-10 h-10 md:w-11 md:h-11 flex items-center justify-center"
            >
              <FiBell className="lg:w-5 lg:h-5" />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:[10px] font-semibold px-1.5 py-0.5 rounded-full">
              8
            </span>
          </div>

          <button
            aria-label="Toggle dark mode"
            className="p-2 lg:p-3 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center"
          >
            <FiMoon className="lg:w-5 lg:h-5" />
          </button>

          <div className="flex items-center text-sm md:text-base lg:text-lg font-semibold text-gray-700 gap-2">
            <FiCalendar className="md:w-4 md:h-4 lg:w-6 lg:h-6" />
            {currentDate}
          </div>

          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src={
                profileImage ||
                'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=32'
              }
              alt="User Avatar"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full"
            />
            <span className="text-sm md:text-base text-gray-700">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
