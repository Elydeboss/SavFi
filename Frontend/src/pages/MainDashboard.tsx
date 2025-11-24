import MainSidebar from "../components/dashboard/MainSidebar";
import { Outlet } from "react-router-dom";

const MainDashboard = () => {
  return (
    <div className="flex">
      <MainSidebar />
      <div className="flex-1 bg-neutral-200">
        <Outlet />
      </div>
    </div>
  );
};

export default MainDashboard;
