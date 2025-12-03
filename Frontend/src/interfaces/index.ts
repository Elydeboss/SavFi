import type { ReactNode } from "react";

export interface SidebarProps {
  onTitleChange?: (title: string) => void;

  onPageChange?: (page: ReactNode) => void;
}

export interface SidebarItem {
  label: string;
  icon: string;
  component: ReactNode;
}
