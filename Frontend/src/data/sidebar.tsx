import type { SidebarProps } from '../interfaces';

import home from '../assets/menu/Widget.png';
import wallet from '../assets/menu/3dcube.png';
import receipt from '../assets/menu/receipt-2.png';
import userGroup from '../assets/menu/Users Group Rounded.png';
import bot from '../assets/menu/fluent_bot-16-regular.png';

export const sidebarItems: SidebarProps[] = [
  { icon: home, label: 'Dashboard', path: '/dashboard' },
  { icon: wallet, label: 'Savings Plan', path: '/savings-plan' },
  { icon: receipt, label: 'Transaction', path: '/transaction' },
  { icon: userGroup, label: 'Referrals', path: '/referrals' },
  { icon: bot, label: 'SaveBot', path: '/savebot' },
];
