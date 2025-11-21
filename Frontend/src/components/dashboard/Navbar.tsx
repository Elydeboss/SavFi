import React, { useState, useRef, useEffect } from 'react';
import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiX,
  FiChevronDown,
} from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import type { NavbarProps } from '../../interfaces';

const Navbar: React.FC<NavbarProps> = ({ title, profileImage }) => {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const toggleAvatar = () => setAvatarOpen((prev) => !prev);

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
  const handleSearch = () => console.log('Search for:', searchValue);

  return (
    <header className="fixed top-0 right-0 left-0  md:left-65 md:h-[88px] lg:left-[332px] flex flex-col md:flex-row items-start md:items-center justify-between px-3 py-4 bg-neutral-50 gap-2 md:gap-4 dark:bg-gray-700 dark:text-white z-40">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-2 md:gap-6">
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 transition-all duration-300 dark:text-white ${
            searchActive ? 'md:block' : 'block'
          }`}
        >
          {title}
        </h1>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleSearch}
            aria-label={searchActive ? 'Close search' : 'Open search'}
            className={`p-2 md:p-3 rounded-full bg-gray-200 text-gray-600 transition  flex items-center justify-center  dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white cursor-pointer ${
              searchActive
                ? 'mr-14 bg-blue-500 text-white '
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {searchActive ? <FiX className=" dark:tex-white" /> : <FiSearch />}
          </button>

          {!searchActive && (
            <>
              <div className="relative">
                <button
                  aria-label="Notifications"
                  className="p-2 md:p-3 rounded-full bg-gray-200 text-gray-600 transition  flex items-center justify-center  dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
                >
                  <FiBell className="" />
                </button>

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:[10px] font-semibold px-1.5 py-0.5 rounded-full">
                  8
                </span>
              </div>

              <div className="mr-12">
                <ThemeToggle />
              </div>
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
            placeholder="Search plan, transaction e.t.c"
            className="flex-1 px-3 pr-10 py-2 border text-black-text dark:text-white dark:bg-neutral-800 border-gray-300 bg-gray focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <button
            onClick={handleSearch}
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-white"
          >
            <FiSearch className="cursor-pointer" />
          </button>
        </div>
      )}

      <div className="hidden md:flex items-center gap-3 relative">
        <div className="relative flex items-center">
          <button
            onClick={toggleSearch}
            aria-label="Open search"
            className={`p-2 md:p-3 lg:p-3 rounded-full flex items-center justify-center transition dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white z-10 cursor-pointer ${
              searchActive
                ? 'relative  mr-5 md:-top-0.5 lg:top-0.5 md:right-1 bg-blue-500 text-white '
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {searchActive ? <FiX /> : <FiSearch />}
          </button>

          {/* Expanded input for md/lg */}
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search plan, transaction e.t.c"
            className={`absolute -top-1 md:right-0 lg:top-0 lg:right-0 mr-5 px-3 py-2 md:py-2.5 border border-gray-500 focus:outline-none focus:ring-2 text-black-text focus:ring-blue-500 transition-all duration-300 rounded-full dark:text-white
              ${
                searchActive
                  ? 'w-56 md:w-80 lg:min-w-[500px] opacity-100'
                  : 'w-0 opacity-0 pointer-events-none'
              }`}
          />
        </div>

        <div
          className={`items-center gap-3 ${
            searchActive ? 'md:hidden lg:flex' : 'flex'
          }`}
        >
          <div className="relative">
            <button
              aria-label="Notifications"
              className="p-2 md:p-3 rounded-full bg-gray-200 text-gray-600 transition  flex items-center justify-center  dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
            >
              <FiBell className="" />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:[10px] font-semibold px-1.5 py-0.5 rounded-full">
              8
            </span>
          </div>
          <ThemeToggle />
          {/* DATE */}
          <div className="flex items-center text-sm md:text-base lg:text-lg font-semibold text-gray-700 gap-2 dark:text-white">
            <FiCalendar className="" />
            {currentDate}
          </div>

          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleAvatar}
          >
            <img
              src={
                profileImage ||
                'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff&size=32'
              }
              alt="User Avatar"
              className="w-8 h-8 md:w-9 md:h-9 rounded-full"
            />
            <FiChevronDown
              className={`transition-transform duration-300 ${
                avatarOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
