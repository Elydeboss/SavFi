import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SavingsPlan from './pages/SavingsPlan';
import Transaction from './pages/Transaction';
import Referrals from './pages/Referrals';
import SaveBot from './pages/SaveBot';
import Profile from './pages/profile';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/savings-plan" element={<SavingsPlan />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/referrals" element={<Referrals />} />
      <Route path="/savebot" element={<SaveBot />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
