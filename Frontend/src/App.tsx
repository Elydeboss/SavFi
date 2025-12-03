import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import Vaultfi from "./pages/vaultfi.tsx";
import Growfi from "./pages/Growfi.tsx";
import Flexifi from "./pages/Flexfi.tsx";
//import Dashboard from "./pages/Dashboard";

import Home from "./pages/Home";
import UsdtWithdrawPage from "./pages/UsdtWithdrawalPage";
import Savebot from "./pages/SaveBot";
import Signup from "./pages/Signup";
import NotFound from "./pages/notfound";
//import Llogin from "./components/llogin.tsx";
import Login from "./pages/login.tsx";
import Otp from "./Modal/otp.tsx";
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
import PlanDetails from "./pages/PlanDetails";
import NairaWithdrawal from "./pages/NairaWithdrawal";
import KycVerification from "./pages/KycVerification.tsx";
import ProfileEditForm from "./pages/ProfileEditForm.tsx";
import Security from "./pages/Security.tsx";
import Wallets from "./pages/Wallets.tsx";
import HomePage from "./pages/HomePage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Support from "./pages/Support.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsOfService from "./pages/TermsOfService.tsx";
import SecurityPage from "./pages/SecurityPage.tsx";
import { KycFlow } from "./components/completekyc/verificationManager.tsx";
import RegisterForm from "./features/auth/RegisterForm.tsx";
import DepositEnterAmount from "./components/deposit/DepositEnterAmount.tsx";
import EditProfile from "./pages/EditProfile.tsx";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/support-page" element={<Support />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/security-page" element={<SecurityPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />

        <Route path="/withdrawal/usdt" element={<UsdtWithdrawPage />} />
        <Route path="/withdrawal/naira" element={<NairaWithdrawal />} />
        <Route path="/about" element={<About />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/flexfi" element={<Flexifi />} />
        <Route path="/vaultfi" element={<Vaultfi />} />
        <Route path="/Growfi" element={<Growfi />} />

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
          <Route path="security" element={<Security />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="kyc" element={<KycVerification />} />
          <Route path="/profile/kyc/complete" element={<KycFlow />} />
          <Route path="edit-profile" element={<ProfileEditForm />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>
        <Route path="/depositngn" element={<DepositEnterAmount />}></Route>

        {<Route path="*" element={<NotFound />} />}
      </Routes>
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
