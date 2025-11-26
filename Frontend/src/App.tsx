import { Routes, Route } from "react-router-dom";

//import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";
import UsdtWithdrawPage from "./pages/UsdtWithdrawalPage";
import Savebot from "./pages/SaveBot";
import Signup from "./pages/Signup";
import NotFound from "./pages/notfound";
import Login from "./components/login";
import About from "./pages/Aboutus";

import TransactionPage from "./pages/TransactionPage";

import StartNewPlan from "./pages/StartNewPlan";
import SwiftFiPlan from "./pages/SwiftFiPlan";
import VaultFiPlan from "./pages/VaultFiPlan";
import GrowFiPlan from "./pages/GrowFiPlan";
import FlexiFiPlan from "./pages/FlexiFiPlan";
import HelpSupport from "./pages/HelpSupport";
import MainDashboard from "./pages/MainDashboard";
import DashboardHome from "./pages/DashboardHome";
import Referrals from "./pages/Referrals";
import SavingsPlan from "./pages/SavingsPlan";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";
import Settings from "./pages/Settings";
import Preferences from "./pages/Preferences";
<<<<<<< HEAD
import PlanDetails from "./pages/PlanDetails";
import NairaWithdrawal from "./pages/NairaWithdrawal";
=======
import KYCVerification from "./pages/KYCVerification.tsx";
import ProfileEditForm from "./pages/ProfileEditFrom.tsx";
>>>>>>> 91aa36ffbe5071a14be17561b6259721bc996961

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

<<<<<<< HEAD
      <Route path="/withdrawal/usdt" element={<UsdtWithdrawPage />} />
      <Route path="/withdrawal/naira" element={<NairaWithdrawal />} />
=======
      <Route path="/about" element={<About />} />
      <Route path="/usdt-withdrawal" element={<UsdtWithdrawPage />} />
>>>>>>> 91aa36ffbe5071a14be17561b6259721bc996961
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<MainDashboard />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/savings" element={<SavingsPlan />} />
        <Route path="/savings/new" element={<StartNewPlan />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/savings/swiftfi" element={<SwiftFiPlan />} />
        <Route path="/savings/plan/:id" element={<PlanDetails />} />
        <Route path="/savings/vaultfi/create" element={<VaultFiPlan />} />
        <Route path="/savings/growfi/create" element={<GrowFiPlan />} />
        <Route path="/savings/flexfi/create" element={<FlexiFiPlan />} />
        <Route path="transactions" element={<TransactionPage />}></Route>
        <Route path="/savebot" element={<Savebot />} />
      </Route>
      <Route path="/profile" element={<Profile />}>
        <Route index element={<ProfileOverview />} />
        <Route path="help" element={<HelpSupport />} />
        <Route path="settings" element={<Settings />} />
        <Route path="preferences" element={<Preferences />} />
        <Route path="kyc" element={<KYCVerification />} />
        <Route path="edit" element={<ProfileEditForm />} />
      </Route>

      {<Route path="*" element={<NotFound />} />}
    </Routes>
  );
};

export default App;
