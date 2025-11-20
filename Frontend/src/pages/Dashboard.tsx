import { useState } from 'react';
import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';
import DashboardHome from '../pages/DashboardHome';

const Dashboard: React.FC = () => {
  const [title, setTitle] = useState('Dashboard'); // 🔵 ADDED
  const [currentPage, setCurrentPage] = useState(<DashboardHome />); // 🔵 ADDED

  return (
    <div className="bg-neutral-200 min-h-screen">
      <Sidebar
        onTitleChange={setTitle} // 🔵 ADDED
        onPageChange={setCurrentPage} // 🔵 ADDED
      />

      <div className="md:ml-65 lg:ml-[332px] flex flex-col flex-1 bg-neutral-50">
        <Navbar title={title} />

        {/* 🔵 This now changes without routing */}
        <div className="p-6">{currentPage}</div>
      </div>
    </div>
  );
};

export default Dashboard;
