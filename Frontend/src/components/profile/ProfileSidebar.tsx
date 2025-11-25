//import ProfileNavLink from "./ProfileNavlink"; // Import ProfileNavLink
import {
  User,
  Edit,
  ShieldCheck,
  Lock,
  Settings as SettingsIcon,
  Wallet,
  HelpCircle,
  CreditCard,
} from "lucide-react"; // Icons import
import cn from "../../lib/utils"; // Tailwind classnames utility

const profileMenuItems = [
  { title: "Overview", icon: User, path: "/profile" },
  { title: "Edit profile", icon: Edit, path: "/profile/edit" },
  { title: "KYC verification", icon: ShieldCheck, path: "/profile/kyc" },
  { title: "Security", icon: Lock, path: "/profile/security" },
  { title: "Preferences", icon: CreditCard, path: "/profile/preferences" },
  { title: "Wallets & accounts", icon: Wallet, path: "/profile/wallets" },
  { title: "Help & support", icon: HelpCircle, path: "/profile/help" },
  { title: "Settings", icon: SettingsIcon, path: "/profile/settings" },
];

export function ProfileSidebar() {
  return (
    <aside className="w-64 bg-neutral-50 dark:bg-gray-700 rounded-xl min-h-screen p-4">
      <nav className="space-y-1">
        {/*
        {profileMenuItems.map((item) => (
          <ProfileNavLink
            key={item.path}
            to={item.path}
            className={cn(
              "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              "hover:opacity-50 text-foreground"
            )}
            activeClassName="bg-gray-200 dark:bg-gray-500 text-primary before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-blue before:rounded-r-full"
          >
            <item.icon className="w-5 h-5" />
            <span className="flex-1">{item.title}</span>
          </ProfileNavLink>
        ))} */}
      </nav>
    </aside>
  );
}
