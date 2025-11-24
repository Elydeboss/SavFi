import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { Outlet } from "react-router-dom";
const Profile = () => {
  return (
    <div className="flex flex-1 p-4 gap-6 ">
      <ProfileSidebar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
