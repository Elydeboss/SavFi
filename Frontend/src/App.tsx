import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
