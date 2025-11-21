import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { sidebarItems } from '../../data/sidebar';
import type { SidebarProps } from '../../interfaces';
import logo from '../../assets/SavFi-logo.png';
import user from '../../assets/menu/profile.png';
import Profile from '../../pages/Profile';

const Sidebar: FC<SidebarProps> = ({ onTitleChange, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(() => {
    const saved = localStorage.getItem('activeSidebarIndex');
    return saved !== null ? Number(saved) : 0;
  });

  const [itemHeight, setItemHeight] = useState(40);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 768) {
        setItemHeight(48);
      } else {
        setItemHeight(56);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    if (activeIndex < sidebarItems.length) {
      const item = sidebarItems[activeIndex];
      onTitleChange?.(item.label);
      onPageChange?.(item.component);
    } else {
      onTitleChange?.('Profile');
      onPageChange?.(<Profile />);
    }
  }, [activeIndex, onTitleChange, onPageChange]);

  const indicatorOffset =
    activeIndex < sidebarItems.length
      ? activeIndex * itemHeight
      : sidebarItems.length * itemHeight + 68;

  return (
    <>
      <button
        className="md:hidden fixed top-3 right-2 z-50 p-2 bg-gray-200 h-10 w-8 text-blue rounded-sm dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <aside className="">
        <div
          className={`fixed  top-0 left-0 w-55 md:w-65 lg:w-[332px] max-h-[1024] bg-neutral-50 text-black-text p-4 md:p-8 font-medium
            transform z-50
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0 dark:bg-gray-700 dark:text-white`}
        >
          <img
            src={logo}
            alt="SavFi logo"
            className="w-auto h-6 md:h-[42px] cursor-pointer"
          />

          <div className="flex flex-col justify-between h-[918px] py-12">
            <main className="flex flex-col gap-3 w-[180px] md:w-[200px] lg:w-full">
              <h2 className="text-sm md:base lg:text-[18px] text-gray-500 dark:text-gray-400">
                MAIN MENU
              </h2>

              <div className="relative flex flex-col gap-2">
                <div
                  className="absolute top-3 left-0 z-10 w-2 h-6 md:h-8 bg-blue-500 rounded-tr-md rounded-br-md transition-all duration-300"
                  style={{
                    transform: `translateY(${indicatorOffset}px)`,
                  }}
                />

                <ul className="relative list-none">
                  {sidebarItems.map((item, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <li key={item.label} className="py-1 relative">
                        <button
                          onClick={() => {
                            setActiveIndex(index);
                            localStorage.setItem(
                              'activeSidebarIndex',
                              index.toString()
                            );
                          }}
                          className={`text-sm md:text-base lg:text-6 group flex items-center gap-3 w-[190px] md:w-[220px] lg:w-full h-10 md:h-12 py-3 px-4 font-medium rounded-xl transition cursor-pointer
                            ${
                              isActive
                                ? 'bg-gray-200 dark:bg-gray-500'
                                : 'hover:opacity-50'
                            }`}
                        >
                          <img
                            src={item.icon}
                            alt={item.label}
                            className="w-5 h-5 object-contain dark:bg-white rounded-sm"
                          />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <h3 className="text-sm md:base lg:text-[18px] text-gray-500 dark:text-gray-400 mt-6">
                ACCOUNT
              </h3>

              <div className="relative flex flex-col gap-2">
                <ul className="relative list-none">
                  <li className="py-1 relative">
                    <button
                      onClick={() => {
                        setActiveIndex(sidebarItems.length);
                        localStorage.setItem(
                          'activeSidebarIndex',
                          sidebarItems.length.toString()
                        );
                      }}
                      className={`text-sm md:text-base lg:text-6 group flex items-center gap-3 w-[190px] md:w-[220px] lg:w-full h-10 md:h-12 py-3 px-4 font-medium rounded-xl cursor-pointer transition
                        ${
                          activeIndex === sidebarItems.length
                            ? 'bg-gray-200 dark:bg-gray-500'
                            : 'hover:opacity-50'
                        }`}
                    >
                      <img
                        src={user}
                        alt="userIcon"
                        className="w-5 h-5 object-contain dark:bg-white rounded-sm"
                      />
                      <p>Profile</p>
                    </button>
                  </li>
                </ul>
              </div>
            </main>

            <div className="mt-auto w-[268px] min-h-[163px]">Invite</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
