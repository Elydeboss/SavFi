import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-neutral-200 min-h-screen">
      <Sidebar />

      {/* MAIN CONTENT: push right to avoid overlap */}
      <div className=" md:ml-[332px] flex flex-col flex-1 bg-neutral-50">
        <Navbar title="Dashboard" />

        {/* PAGE CONTENT */}
        <div className="p-6">Dashboard content...</div>
      </div>
    </div>
  );
};

export default Dashboard;
