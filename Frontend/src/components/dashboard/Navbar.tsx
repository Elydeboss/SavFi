import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiX,
  FiChevronDown,
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { NotificationPanel } from "./NotificationPanel";
import type { Notification } from "./NotificationPanel";
import { HelpCircle, LogOut } from "lucide-react";
import { toast } from "sonner";
import { useUserProfile } from "../../contexts/UserProfileContext";

type NavbarProps = {
  title: string;
};

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const { profile, clearProfile } = useUserProfile();

  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const userName = profile?.first_name || profile?.username || "User";
  const email = profile?.email || "";
  const avatarUrl = profile?.avatar || "";

  const getInitials = () => {
    if (!userName) return "U";
    return userName.charAt(0).toUpperCase();
  };

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "system",
      title: "KYC submitted",
      message:
        "Your verification documents have been received, please wait while we review them.",
      timestamp: "30 mins ago",
      read: false,
      icon: "kyc",
    },
    {
      id: "2",
      type: "transaction",
      title: "Deposit Successful",
      message:
        "Your deposit of ₦25,000 has been received, and converted to 19.23 USDT.",
      timestamp: "2 hrs ago",
      read: false,
      icon: "deposit",
    },
    {
      id: "3",
      type: "transaction",
      title: "Withdrawal Successful",
      message:
        "Your verification documents have been received, please wait while we review them.",
      timestamp: "6 hrs ago",
      read: false,
      icon: "withdrawal",
    },
    {
      id: "4",
      type: "transaction",
      title: "Plan funded",
      message: "You have added 20 USDT to your GrowFi plan.",
      timestamp: "1d ago",
      read: false,
      icon: "plan",
    },
    {
      id: "5",
      type: "system",
      title: "KYC submitted",
      message:
        "Your verification documents have been received, please wait while we review them.",
      timestamp: "3d ago",
      read: false,
      icon: "kyc",
    },
    {
      id: "6",
      type: "transaction",
      title: "Deposit Failed",
      message:
        "Your deposit could not be processed, please retry or contact support.",
      timestamp: "2w ago",
      read: true,
      icon: "error",
    },
  ]);

  // NOTIFICATION COUNT
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
    }
    if (isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserDropdownOpen]);

  useEffect(() => {
    if (searchActive) inputRef.current?.focus();
  }, [searchActive]);

  const today = new Date();
  const currentDate = today
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(",", "");

  // SEARCH helpers (restored exactly)
  const toggleSearch = () => setSearchActive((prev) => !prev);
  const handleSearch = () => console.log("Search for:", searchValue);

  const handleLogout = () => {
    // Clear all localStorage data
    clearProfile();

    toast.info("Logged out successfully. See you soon!");

    navigate("/login", { replace: true });
  };

  return (
    <header className=" fixed  md:sticky top-0 right-0 left-0 h-18  md:left-65 md:h-18 lg:left-75 flex flex-col md:flex-row items-start md:items-center justify-between px-3.5 py-4 bg-neutral-50 gap-2 md:gap-4 dark:bg-gray-700 dark:text-white z-40 ">
      <div className="flex items-center w-full md:w-auto justify-between md:justify-start gap-2 md:gap-6">
        <h1
          className={`text-lg sm:text-2xl md:text-3xl font-semibold ml-15 md:ml-0 text-gray-800 transition-all duration-300 dark:text-white ${
            searchActive ? "md:block" : "block"
          }`}
        >
          {title}
        </h1>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleSearch}
            aria-label={searchActive ? "Close search" : "Open search"}
            className={`cursor-pointer p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 ${
              searchActive ? "mr-14 bg-blue-500 text-white " : ""
            }`}
          >
            {searchActive ? (
              <FiX className=" dark:tex-white" />
            ) : (
              <FiSearch className="" />
            )}
          </button>

          {!searchActive && (
            <>
              {/*  Notifications with working badge count */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  aria-label="Notifications"
                  className="cursor-pointer p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
                >
                  <FiBell className="" />
                </button>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>

              <div className="">
                <ThemeToggle />
              </div>
            </>
          )}
          <div className="relative" ref={userDropdownRef}>
            <button
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials()}
                </div>
              )}
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  isUserDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/*  Custom dropdown menu */}
            {isUserDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-100"
                  onClick={() => setIsUserDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-6 w-80 bg-neutral-50  rounded-2xl shadow-2xl z-40 p-6">
                  {/*  User profile section */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-18 h-18 rounded-full bg-linear-to-br from-primary to-blue-700 flex items-center justify-center mb-4">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-2xl">
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {userName}
                    </h3>
                    <p className="text-muted-foreground mb-4">{email}</p>

                    {/*  Status badges */}
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                        KYC: Unverified
                      </div>
                      <div className="px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                        0 SFP
                      </div>
                    </div>
                  </div>

                  {/*  Menu items */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/profile/help");
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      <HelpCircle className="w-5 h-5 text-foreground" />
                      <span className="text-foreground font-medium">
                        Help & Support
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg hover:bg-red-50 dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
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
            className="flex-1 px-3 pr-10 py-2 border text-black-text border-gray-300 bg-gray focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
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

      <div className="relative flex-1 flex items-center ">
        {searchActive && (
          <input
            ref={inputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search plan, transaction e.t.c"
            className="hidden md:flex flex-1 rounded-full ml-5 px-3 py-2 border border-gray-500 focus:outline-none focus:ring-2 text-black-text focus:ring-blue-500   transition-all duration-300 dark:text-white "
          />
        )}

        <button
          onClick={toggleSearch}
          aria-label="Open search"
          className={`absolute hidden md:block  md:right-0.5 p-2 md:p-3 lg:p-3 rounded-full  items-center justify-center transition dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white z-10 cursor-pointer ${
            searchActive
              ? " bg-blue-500 text-white "
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          <FiSearch className="" />
        </button>
      </div>

      <div className="hidden md:flex items-center gap-3 relative">
        <div
          className={`items-center gap-3 ${
            searchActive ? "md:hidden lg:flex" : "flex"
          }`}
        >
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              aria-label="Notifications"
              className="p-2 md:p-3 rounded-full bg-gray-200 text-gray-600 transition  flex items-center justify-center  dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer dark:text-white"
            >
              <FiBell className="" />
            </button>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs md:[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <ThemeToggle />
          {/* DATE */}
          <div className="flex items-center text-sm md:text-base font-medium text-muted-foreground gap-2 ">
            <FiCalendar className="" />
            {currentDate}
          </div>

          <div className="relative" ref={userDropdownRef}>
            <button
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-blue-700 flex items-center justify-center text-white font-bold text-lg">
                  {getInitials()}
                </div>
              )}
              <FiChevronDown
                className={`transition-transform duration-300 ${
                  isUserDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/*  Custom dropdown menu */}
            {isUserDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsUserDropdownOpen(false)}
                />
                <div className="absolute right-0 top-full mt-6 w-80 bg-neutral-50  rounded-2xl shadow-2xl z-40 p-6">
                  {/*  User profile section */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-18 h-18 rounded-full bg-linear-to-br from-primary to-blue-700 flex items-center justify-center mb-4">
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="User Avatar"
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-2xl">
                          {getInitials()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {userName}
                    </h3>
                    <p className="text-muted-foreground mb-4">{email}</p>

                    {/*  Status badges */}
                    <div className="flex items-center gap-3">
                      <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
                        KYC: Unverified
                      </div>
                      <div className="px-4 py-2 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                        0 SFP
                      </div>
                    </div>
                  </div>

                  {/*  Menu items */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/profile/help");
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      <HelpCircle className="w-5 h-5 text-foreground" />
                      <span className="text-foreground font-medium">
                        Help & Support
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setIsUserDropdownOpen(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg hover:bg-red-50 dark:hover:bg-gray-600 transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="text-red-600 font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/*  Notification Panel Component */}
      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllAsRead}
        onMarkAsRead={handleMarkAsRead}
      />

      {showLogoutModal && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 w-[90%] max-w-sm rounded-2xl p-6 shadow-xl text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Log out
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to log out your account?
            </p>

            <div className="flex items-center justify-between px-4">
              <button
                onClick={handleLogout}
                className="text-red-600 font-semibold cursor-pointer"
              >
                Log out
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="text-muted-foreground cursor-pointer font-semibold "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
