import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UsdtWithdrawPage from "./pages/UsdtWithdrawalPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/usdt-withdrawal" element={<UsdtWithdrawPage />} />

      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
