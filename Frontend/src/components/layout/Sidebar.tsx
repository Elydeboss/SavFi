import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { sidebarItems as defaultSidebarItems } from '../../data/sidebar';
import type { SidebarProps } from '../../interfaces/index';
import logo from '../../assets/SavFi-logo.png';
import user from '../../assets/menu/profile.png';
import Profile from '../../pages/Profile';
import { FiGift } from 'react-icons/fi';

const Sidebar: FC<SidebarProps> = ({
  items = defaultSidebarItems,
  onTitleChange,
  onPageChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeIndex, setActiveIndex] = useState(() => {
    const saved = localStorage.getItem('activeSidebarIndex');
    return saved !== null ? Number(saved) : 0;
  });

  const [itemHeight, setItemHeight] = useState(40);
  const [topOffset, setTopOffset] = useState(0);
  const [add, setAdd] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemHeight(48);
        setTopOffset(40);
        setAdd(64);
      } else if (width >= 768 && width < 1024) {
        setItemHeight(56);
        setTopOffset(40);
        setAdd(64);
      } else {
        setItemHeight(56);
        setTopOffset(46);
        setAdd(68);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    let currentLabel = 'Profile';
    let currentPage: ReactNode = <Profile />;

    if (activeIndex < items.length) {
      const item = items[activeIndex];
      currentLabel = item.label;
      currentPage = item.component;
    }

    onTitleChange?.(currentLabel);
    onPageChange?.(currentPage);
  }, [activeIndex, items, onTitleChange, onPageChange]);

  const indicatorOffset =
    (activeIndex < items.length
      ? activeIndex * itemHeight
      : items.length * itemHeight + add) + topOffset;

  return (
    <>
      <button
        className="md:hidden fixed top-3 right-2 z-50 p-2 bg-gray-200 h-10 w-8 text-blue rounded-sm dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <aside>
        <div
          className={`fixed top-0 left-0 w-55 md:w-65 lg:w-[332px] py-12 bg-neutral-50 text-black-text p-4 md:p-8 font-medium transform z-50
          ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 dark:bg-gray-700 dark:text-white`}
        >
          <img
            src={logo}
            alt="SavFi logo"
            className="w-auto h-6 md:h-[42px] cursor-pointer"
          />

          <main className="flex flex-col h-full w-[180px] md:w-[200px] justify-between lg:w-full py-12 gap-12 md:pb-16">
            <div className="relative flex flex-col gap-2 max-h-[430px]">
              <div
                className="absolute top-0 left-0 z-10 w-2 h-6 md:h-8 bg-blue-500 rounded-tr-md rounded-br-md transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${indicatorOffset}px)` }}
              />

              <h2 className="text-sm md:base lg:text-[18px] text-gray-500 dark:text-gray-400">
                MAIN MENU
              </h2>

              <ul className="relative list-none">
                {items.map((item, index) => {
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

              <h3 className="text-sm md:base lg:text-[18px] text-gray-500 dark:text-gray-400 mt-6">
                ACCOUNT
              </h3>

              <ul className="list-none">
                <li className="py-2 relative">
                  <button
                    onClick={() => {
                      setActiveIndex(items.length);
                      localStorage.setItem(
                        'activeSidebarIndex',
                        items.length.toString()
                      );
                    }}
                    className={`text-sm md:text-base lg:text-6 group flex items-center gap-3 w-[190px] md:w-[220px] lg:w-full h-10 md:h-12 py-3 px-4 font-medium rounded-xl cursor-pointer transition
                      ${
                        activeIndex === items.length
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

            <section className="w-full flex justify-center">
              <div className="max-w-[268px] rounded-xl p-4 shadow-sm bg-[#EAF4FF] dark:bg-[#1E293B]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center font-semibold bg-[#D6EBFF] dark:bg-[#334155]">
                    <FiGift className="h-6 w-6 p-1 rounded-sm text-lg text-[#007AFF] dark:text-[#60A5FA] bg-[#D6EBFF] dark:bg-[#334155]" />
                  </div>
                  <h2 className="text-sm md:text-[16px] lg:text-[18px] text-black-text dark:text-gray-100">
                    Invite and Earn Reward
                  </h2>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  Get bonuses when your invited friends save.
                </p>
                <button className="w-full py-2 text-white text-sm font-medium rounded-full transition cursor-pointer bg-[#007AFF] hover:bg-[#0067dc] dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]">
                  Invite Now
                </button>
              </div>
            </section>
          </main>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
