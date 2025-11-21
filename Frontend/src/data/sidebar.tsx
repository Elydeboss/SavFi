import type { SidebarItem } from "../interfaces";

import wallet from "../assets/menu/cube.png";
import receipt from "../assets/menu/receipt-2.png";
import userGroup from "../assets/menu/Users Group Rounded.png";
import bot from "../assets/menu/fluent_bot-16-regular.png";

import SavingsPlan from "../pages/SavingsPlan";
import Transaction from "../pages/Transaction";
import Referrals from "../pages/Referrals";
import SaveBotPage from "../pages/SaveBot";

export const sidebarItems: SidebarItem[] = [
  { icon: wallet, label: "Savings Plan", component: <SavingsPlan /> },
  { icon: receipt, label: "Transaction", component: <Transaction /> },
  { icon: userGroup, label: "Referrals", component: <Referrals /> },
  { icon: bot, label: "SaveBot", component: <SaveBotPage /> },
];
