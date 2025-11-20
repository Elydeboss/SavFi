import Navbar from '../components/dashboard/Navbar';
import Sidebar from '../components/dashboard/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="bg-neutral-200 min-h-screen">
      <Sidebar />

      <div className=" md:ml-65 lg:ml-[332px] flex flex-col flex-1 bg-neutral-50">
        <Navbar title="Dashboard" />
      </div>
    </div>
  );
};

export default Dashboard;
