import ProfileNavLink from "./ProfileNavLink";
import {
  User,
  UserRoundPen,
  ShieldCheck,
  Settings as SettingsIcon,
  HelpCircle,
} from "lucide-react";
import {
  RiEqualizer2Line,
  RiWallet3Line,
  RiShieldStarLine,
} from "react-icons/ri";
import cn from "../../lib/utils";

const profileMenuItems = [
  { title: "Overview", icon: User, path: "/profile" },
  { title: "Edit profile", icon: UserRoundPen, path: "/profile/edit" },
  { title: "KYC verification", icon: ShieldCheck, path: "/profile/kyc" },
  { title: "Security", icon: RiShieldStarLine, path: "/profile/security" },
  {
    title: "Preferences",
    icon: RiEqualizer2Line,
    path: "/profile/preferences",
  },
  {
    title: "Wallets & accounts",
    icon: RiWallet3Line,
    path: "/profile/wallets",
  },
  { title: "Help & support", icon: HelpCircle, path: "/profile/help" },
  { title: "Settings", icon: SettingsIcon, path: "/profile/settings" },
];

export function ProfileSidebar() {
  return (
    <aside className="w-fit md:w-64 sticky top-22 bg-neutral-50 dark:bg-gray-700 text-black-text dark:text-white rounded-xl h-screen p-4">
      <nav className="space-y-1">
        {profileMenuItems.map((item) => (
          <ProfileNavLink
            key={item.path}
            to={item.path}
            end={item.path === "/profile"}
            className={cn(
              "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm md:text-base font-medium transition-colors",
              "hover:bg-[#e8e8e9]/50 dark:hover:bg-gray-600 text-sidebar-foreground"
            )}
            activeClassName="bg-gray-200 dark:bg-gray-600 text-blue before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-blue before:rounded-r-full"
          >
            <item.icon className="w-5 h-5" />
            <span className="hidden md:flex-1 md:flex">{item.title}</span>
          </ProfileNavLink>
        ))}
      </nav>
    </aside>
  );
}
