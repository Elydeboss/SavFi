import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import UsdtWithdrawPage from "./pages/UsdtWithdrawalPage";
import Savebot from "./pages/SaveBot";
import Signup from "./pages/Signup";
//import NotFound from "./pages/notfound";
import Login from "./components/login";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usdt-withdrawal" element={<UsdtWithdrawPage />} />
      <Route path="/savebot" element={<Savebot />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/*<Route path="*" element={<NotFound />} />*/}
    </Routes>
  );
};

export default App;
