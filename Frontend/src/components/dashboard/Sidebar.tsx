import { FC, useState } from 'react';
import { sidebarItems } from '../../data/sidebar';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/SavFi-logo.png';
import user from '../../assets/menu/profile.png';

const Sidebar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const activeIndex =
    location.pathname === '/profile'
      ? sidebarItems.length
      : sidebarItems.findIndex((item) => item.path === location.pathname);

  const itemHeight = 56;

  return (
    <>
      <button
        className="md:hidden fixed top-5.5 right-2 z-50 p-2 bg-gray-400 h-10 w-10 text-black-text rounded-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      <aside>
        <div
          className={`
          fixed top-0 left-0 w-64 md:w-[332px] max-h-[1024] bg-neutral-50 text-black-text p-4 md:p-8 font-medium
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
        >
          <img
            src={logo}
            alt="SavFi logo"
            className="w-auto h-8 md:h-[42px] cursor-pointer"
          />

          <div className="flex flex-col justify-between h-[918px] py-12">
            <main className="flex flex-col gap-3 w-[268px]">
              <h2 className="text-gray-500">MAIN MENU</h2>
              <div className="relative flex flex-col gap-2">
                <div
                  className="absolute top-3 left-0 z-10 w-2 h-8 bg-blue-500 rounded-tr-md rounded-br-md transition-all duration-300"
                  style={{
                    transform: `translateY(${activeIndex * itemHeight}px)`,
                  }}
                />
                <ul className="relative list-none">
                  {sidebarItems.map((item) => {
                    const isActive =
                      location.pathname === item.path &&
                      location.pathname !== '/profile';
                    return (
                      <li key={item.path} className="py-1 relative">
                        <button
                          onClick={() => navigate(item.path)}
                          className={`group flex items-center gap-3 w-[200px] md:w-full h-12 py-3 px-4 font-medium rounded-xl transition
                          ${isActive ? 'bg-gray-200' : ''}`}
                        >
                          <img
                            src={item.icon}
                            alt={item.label}
                            className="w-5 h-5 object-contain"
                          />
                          <span>{item.label}</span>

                          <span className="absolute right-3 w-2 h-2 bg-red-500 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <section className="flex flex-col gap-3 w-[268px] mt-6">
                <h3 className="text-gray-500">ACCOUNT</h3>
                <div className="relative group">
                  <button
                    onClick={() => navigate('/profile')}
                    className={`flex items-center gap-2 w-full p-2 rounded-xl transition ${
                      location.pathname === '/profile' ? 'bg-gray-200' : ''
                    }`}
                  >
                    <img src={user} alt="userIcon" className="w-5 h-5 m" />
                    <p>Profile</p>

                    <span className="absolute right-3 w-2 h-2 bg-red-500 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
                  </button>
                </div>
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
