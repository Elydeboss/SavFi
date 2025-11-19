import { Search, Bell, Moon, Calendar, X } from 'lucide-react';
import { FC, useState, useRef, useEffect } from 'react';
import type { NavbarProps } from '../../interfaces';

const Navbar: FC<NavbarProps> = ({ title, profileImage }) => {
  const today = new Date();
  const currentDate = today
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .replace(',', '');

  const [searchActive, setSearchActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchActive) inputRef.current?.focus();
  }, [searchActive]);

  return (
    <div className="flex items-center h-[88px] bg-neutral-50 px-4 md:px-6 gap-4 w-full">
      {/* LEFT: TITLE */}
      <h1 className="text-[28px] md:text-[32px] text-black-text font-semibold truncate">
        {title}
      </h1>

      {/* RIGHT SIDE ICONS */}
      <div className="flex items-center gap-4 md:gap-6 ml-auto">
        {/* Small screens: Bell + Moon */}
        <div className="flex items-center gap-4 md:hidden">
          <Bell
            size={28}
            className="bg-gray text-gray-500 p-2 rounded-full cursor-pointer"
          />
          <Moon
            size={28}
            className="bg-gray text-gray-500 p-2 rounded-full cursor-pointer"
          />

          {/* Search bar opens next to Moon */}
          <div
            className={`flex items-center transition-all duration-300 ${
              searchActive
                ? 'bg-blue-500 p-2 rounded-md w-48'
                : 'w-0 overflow-hidden'
            }`}
          >
            {searchActive && (
              <input
                ref={inputRef}
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-white placeholder-white outline-none px-2"
              />
            )}
            <button
              onClick={() => setSearchActive(false)}
              className="p-2 rounded-full bg-white text-blue-500 ml-2"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search button toggler */}
          {!searchActive && (
            <button
              onClick={() => setSearchActive(true)}
              className="p-2 rounded-full bg-gray-200 text-gray-500"
            >
              <Search size={20} />
            </button>
          )}
        </div>

        {/* Medium+ screens: Search + Bell + Moon + Date + Profile */}
        <div className="hidden md:flex items-center gap-4">
          <Search
            size={45}
            className="bg-gray text-gray-500 p-2 rounded-full cursor-pointer"
          />
          <Bell
            size={45}
            className="bg-gray text-gray-500 p-2 rounded-full cursor-pointer"
          />
          <Moon
            size={45}
            className="bg-gray text-gray-500 p-2 rounded-full cursor-pointer"
          />
          <div className="flex items-center gap-2text-gray-500">
            <Calendar size={30} className="text-gray-600" />
            <span>{currentDate}</span>
          </div>
          <div className="ml-4 w-14 h-14 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={profileImage || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
