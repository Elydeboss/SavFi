import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import UsdtWithdrawPage from "./pages/UsdtWithdrawalPage";
import Savebot from "./pages/SaveBot";
import Signup from "./pages/Signup";
//import NotFound from "./pages/notfound";
import Login from "./components/login";

import StartNewPlan from "./pages/StartNewPlan";
import SwiftFiPlan from "./pages/SwiftFiPlan";
import VaultFiPlan from "./pages/VaultFiPlan";
import GrowFiPlan from "./pages/GrowFiPlan";
import FlexiFiPlan from "./pages/FlexiFiPlan";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usdt-withdrawal" element={<UsdtWithdrawPage />} />
      <Route path="/savebot" element={<Savebot />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/savings/new" element={<StartNewPlan />} />
      <Route path="/savings/swiftfi" element={<SwiftFiPlan />} />
      <Route path="/savings/vaultfi/create" element={<VaultFiPlan />} />
      <Route path="/savings/growfi/create" element={<GrowFiPlan />} />
      <Route path="/savings/flexfi/create" element={<FlexiFiPlan />} />

      {/*<Route path="*" element={<NotFound />} />*/}
    </Routes>
  );
};

export default App;
