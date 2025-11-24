import { NavLink } from "./Navlink";
import { Menu, X } from "lucide-react";
import widget from "../../assets/menu/widget.png";
import logo from "../../assets/SavFi-logo.png";
import wallet from "../../assets/menu/cube.png";
import receipt from "../../assets/menu/receipt-2.png";
import userGroup from "../../assets/menu/Users Group Rounded.png";
import bot from "../../assets/menu/fluent_bot-16-regular.png";
import cn from "../../lib/utils";
import { useState } from "react";
import { FiGift } from "react-icons/fi";

const menuItems = [
  { title: "Dashboard", icon: widget, path: "/dashboard" },
  {
    title: "Savings plan",
    icon: wallet,
    path: "/savings",
    badge: true,
  },
  { title: "Transactions", icon: receipt, path: "/transactions" },
  { title: "Referrals", icon: userGroup, path: "/referrals" },
  {
    title: "SaveBot",
    icon: bot,
    path: "/savebot",
    disabled: false,
  },
];

export default function MainSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2  rounded-lg bg-neutral-50 dark:bg-gray-600 dark:text-white/80"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-neutral-200/80 dark:bg-gray-600/10 backdrop-blur-xs z-41"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 z-42 h-screen  w-64 md:w-75 bg-neutral-50 dark:bg-gray-700 text-black-text dark:text-white transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="p-6 pb-1 pl-15 md:pl-6">
          <img
            src={logo}
            alt="SavFi logo"
            className="w-auto h-6 md:h-[30px] cursor-pointer"
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col h-[calc(100vh-88px)]">
          <nav className="flex-1 p-6">
            <div className="mb-5">
              <h2 className="text-sm md:text-base font-medium lg:text-[17px] text-gray-500 dark:text-white/80">
                MAIN MENU
              </h2>
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm md:text-base font-medium transition-colors",
                      "hover:bg-[#e8e8e9]/50 dark:hover:bg-gray-600 text-sidebar-foreground",
                      item.disabled &&
                        "opacity-50 cursor-not-allowed pointer-events-none"
                    )}
                    activeClassName="bg-gray-200 dark:bg-gray-600 text-primary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-blue before:rounded-r-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-5 h-5 object-contain dark:bg-white rounded-sm"
                    />
                    <span className="flex-1">{item.title}</span>
                    {item.badge && (
                      <span className="w-2 h-2 rounded-full bg-destructive" />
                    )}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Account Section */}
            <div>
              <h2 className="text-sm md:text-base font-medium lg:text-[17px] text-gray-500 dark:text-white/80">
                ACCOUNT
              </h2>
              <div className="space-y-1">
                <NavLink
                  to="/profile"
                  className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm md:text-base font-medium transition-colors hover:bg-[#e8e8e9]/50 dark:hover:bg-gray-600 text-sidebar-foreground"
                  activeClassName="bg-gray-200 dark:bg-gray-600 text-primary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-blue before:rounded-r-full"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src={userGroup}
                    className="w-5 h-5 object-contain dark:bg-white rounded-sm"
                  />
                  <span>Profile</span>
                </NavLink>
              </div>
            </div>
          </nav>

          {/* Invite Card */}
          <section className="w-full flex justify-center px-3">
            <div
              className="
                max-w-[268px] rounded-xl p-4 shadow-sm
                bg-[#EAF4FF] dark:bg-[#1E293B]
              "
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="
                    w-7 h-7 rounded-md flex items-center justify-center font-semibold
                    bg-[#D6EBFF] dark:bg-[#334155]
                  "
                >
                  <FiGift
                    className="
                      h-6 w-6 p-1 rounded-sm text-lg
                      text-[#007AFF] dark:text-[#60A5FA]
                      bg-[#D6EBFF] dark:bg-[#334155]
                    "
                  />
                </div>

                <h2
                  className="
                    text-sm md:text-[16px] lg:text-[18px]
                    text-black-text dark:text-gray-100
                  "
                >
                  Invite and Earn Reward
                </h2>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                Get bonuses when your invited friends save.
              </p>

              <button
                className="
                  w-full py-2 text-white text-sm font-medium rounded-full transition cursor-pointer
                  bg-[#007AFF] hover:bg-[#0067dc]
                  dark:bg-[#3B82F6] dark:hover:bg-[#2563EB]
                "
              >
                Invite Now
              </button>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
