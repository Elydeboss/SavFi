import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHome from "../pages/DashboardHome";
import { sidebarItems } from "../data/sidebar";

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState("Dashboard");
  const [currentPage, setCurrentPage] = useState<React.ReactNode>(
    <DashboardHome />
  );

  return (
    <div className="bg-neutral-200 min-h-screen">
      <Sidebar
        items={sidebarItems}
        onTitleChange={setTitle}
        onPageChange={setCurrentPage}
      />

      <div className="md:ml-65 lg:ml-[332px] flex flex-col flex-1 bg-neutral-50">
        <Navbar title={title} />

        <div className="px-3 pt-[70px] md:pt-[95px] bg-neutral-200 dark:bg-gray-600 dark:text-white">
          {currentPage}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
