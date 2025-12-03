import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { sidebarItems } from "../../data/sidebar";

const Layout: React.FC = () => {
  const [title, setTitle] = useState<string>("Dashboard");
  const [currentPage, setCurrentPage] = useState<ReactNode>(
    sidebarItems[0].component
  );

  return (
    <div className="flex">
      <Sidebar
        items={sidebarItems}
        onTitleChange={setTitle}
        onPageChange={setCurrentPage}
      />

      <div className="flex-1 md:ml-65 lg:ml-[332px] flex flex-col min-h-screen bg-neutral-50 dark:bg-gray-900">
        <Navbar title={title} />
        <main className="pt-16 p-4">{currentPage}</main>
      </div>
    </div>
  );
};

export default Layout;
