import { FC, useState } from 'react';
import { sidebarItems } from '../../data/sidebar';
import logo from '../../assets/SavFi-logo.png';
import user from '../../assets/menu/profile.png';

const Sidebar: FC<{
  onTitleChange: (title: string) => void;
  onPageChange: (page: React.ReactNode) => void;
}> = ({ onTitleChange, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="md:hidden fixed top-3 right-2 z-50 p-2 bg-gray-200 h108 w-8 text-blue rounded-sm dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <aside>
        <div
          className={`
            fixed top-0 left-0 w-55 md:w-65 lg:w-[332px] max-h-[1024]
            bg-neutral-50 text-black-text p-4 md:p-8 font-medium
            transform transition-transform duration-300 ease-in-out z-40
            dark:bg-gray-700 dark:text-white
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0
          `}
        >
          <img
            src={logo}
            alt="SavFi logo"
            className="w-auto h-6 md:h-[42px] cursor-pointer"
          />

          <div className="flex flex-col justify-between h-[918px] py-12">
            <main className="flex flex-col gap-3 w-[180px] md:w-[200px] lg:w-full">
              <h2 className="text-sm md:base lg:text-[18px] text-gray-500 dark:text-white">
                MAIN MENU
              </h2>

              <ul className="flex flex-col gap-2">
                {sidebarItems.map((item) => (
                  <li key={item.label} className="py-1 relative">
                    <button
                      onClick={() => {
                        onTitleChange(item.label); // 🔵 ADDED
                        onPageChange(item.component); // 🔵 ADDED
                      }}
                      className="text-sm md:base group flex items-center gap-3
                                 w-[190px] md:w-[220px] lg:w-full h-10 md:h-12 py-3 px-4
                                 font-medium rounded-xl hover:opacity-70 transition"
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-5 h-5 object-contain dark:bg-white"
                      />
                      <span>{item.label}</span>

                      <span
                        className="absolute right-1 md:-right-2 lg:right-3 w-2 h-2
                                       bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                      ></span>
                    </button>
                  </li>
                ))}
              </ul>

              <section className="mt-6 w-full">
                <h3 className="text-sm md:base lg:text-[18px] text-gray-500 dark:text-white">
                  ACCOUNT
                </h3>

                <button
                  onClick={() => {
                    onTitleChange('Profile'); // 🔵 ADDED
                    onPageChange(<div>Profile Page Coming Soon</div>); // 🔵 ADDED
                  }}
                  className="flex items-center gap-2 p-2 w-[190px] md:w-[220px] lg:w-full rounded-xl hover:opacity-80"
                >
                  <img
                    src={user}
                    alt="userIcon"
                    className="w-5 h-5 dark:bg-white"
                  />
                  <p>Profile</p>
                </button>
              </section>
            </main>

            <div className="mt-auto w-[268px] min-h-[163px]">Invite</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
