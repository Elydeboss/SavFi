import type { ReactElement } from 'react';

export interface NavbarProps {
  title: string;
  profileImage?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  onTitleChange?: (title: string) => void;
  onPageChange?: (page: ReactElement) => void;
}

export interface SidebarItem {
  icon: string;
  label: string;
  component: ReactElement;
}
