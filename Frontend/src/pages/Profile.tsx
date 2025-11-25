import MainSidebar from "../components/dashboard/MainSidebar";
import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import { useLocation } from "react-router-dom";
const Profile = () => {
  const { pathname } = useLocation();

  const titleMap: Record<string, string> = {
    "/profile": "Overview",
    "/profile/overview": "Overview",
    "/profile/edit": "Edit profile",
    "/profile/kyc": "KYC verification",
    "/profile/security": "Security",
    "/profile/preferences": "Preferences",
    "/profile/wallets": "Wallets & accounts",
    "/profile/help": "Help & support",
    "/profile/settings": "Settings",
  };

  const pageTitle = titleMap[pathname] || "";

  return (
    <div className="flex min-h-screen w-full bg-neutral-200 dark:bg-gray-600">
      <MainSidebar />

      <div className="flex flex-col flex-1">
        <Navbar title={pageTitle} />
        <div className="flex flex-1 p-4">
          <ProfileSidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
