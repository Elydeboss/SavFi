import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Copy,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  CirclePlus,
  ChevronDown,
} from "lucide-react";
import WelcomeModal from "../components/dashboard-home/WelcomeModal";
import SavingPlanCard from "../components/dashboard-home/SavingPlanCard";
import TransactionsTable from "../components/dashboard-home/TransactionsTable";
import DepositModal from "../components/dashboard-home/DepositModal";
import WithdrawModal from "../components/dashboard-home/WithdrawModal";
import Navbar from "../components/dashboard/Navbar";
import Toast from "../components/withdraw/Toast";
import Piggy from "../assets/public/fluent_savings-32-filled.svg";
import Tree from "../assets/public/tabler_growth.svg";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currency, setCurrency] = useState<"USDT" | "USDC">("USDT");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcome(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    setToast({ message: "Copied to clipboard!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const savingsPlans = [
    {
      name: "FlexFi",
      interest: "3% interest",
      color: "blue",
      progress: 45,
      available: 75,
      principal: 70.51,
      interestAmount: 4.49,
      maturity: "Nov. 25, 2025",
      status: "running",
    },
    {
      name: "GrowFi",
      interest: "7% interest",
      color: "green",
      progress: 75,
      available: 75,
      principal: 70.51,
      interestAmount: 4.49,
      maturity: "Nov. 25, 2025",
      status: "running",
    },
    {
      name: "VaultFi",
      interest: "3% interest",
      color: "purple",
      progress: 0,
      available: 0,
      principal: 0,
      interestAmount: 0,
      maturity: "Not started",
      status: "not-started",
    },
    {
      name: "SwiftFi",
      interest: "0% interest",
      color: "orange",
      progress: 0,
      available: 75,
      principal: 70.51,
      interestAmount: 0,
      maturity: "Withdraw anytime",
      status: "available",
    },
  ] as const;

  return (
    <div className="min-h-screen  dark:bg-gray-600 dark:text-white">
      <Navbar title="Dashboard" />
      {/* MAIN */}
      <div className="space-y-6 mt-18 md:mt-0 p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-1 flex items-center gap-2">
            Welcome Jolly 👋
            <span className="text-sm font-normal text-muted-foreground">
              Lock in. Level up.
            </span>
          </h2>
        </div>

        <div className="mb-6 p-4 bg-[#FFF7EE] border border-[#FFAE58] dark:bg-gray-700 rounded-xl flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ffead4]  flex items-center justify-center">
              <ShieldCheck className="text-[#FFAE58]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-muted-foreground">
                Complete your KYC to unlock full access
              </p>
              <p className="text-xs text-muted-foreground">
                Verify your NIN to secure your account
              </p>
            </div>
          </div>
          <button className="px-6 py-2 bg-foreground text-light dark:text-black-text rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
            Complete KYC
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1D85D4] rounded-2xl px-6 py-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-light/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-light/10 rounded-full -ml-12 -mb-12"></div>
            <img src={Piggy} className=" h-full right-0 absolute top-0 z-0" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-sm opacity-90">Total balance</span>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-1.5 hover:bg-light/20 cursor-pointer rounded-lg transition-colors"
                >
                  {showBalance ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>

              <div className="mb-2 text-light">
                <div className="text-4xl font-bold flex gap-1 items-center mb-1">
                  {showBalance ? "120.54" : "****"} {/* Currency Button */}
                  <div className="relative">
                    <button
                      onClick={() => setOpenDropdown((prev) => !prev)}
                      className="flex items-center gap-1"
                    >
                      <span className="text-lg font-semibold">{currency}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {/* DROPDOWN MENU */}
                    {openDropdown && (
                      <div className="absolute top-7 p-0 left-0 bg-neutral-50 text-foreground rounded-lg shadow-lg overflow-hidden z-20">
                        <button
                          className="w-full text-sm text-left px-3 py-0.5 hover:bg-neutral-200"
                          onClick={() => {
                            setCurrency("USDT");
                            setOpenDropdown(false);
                          }}
                        >
                          USDT
                        </button>
                        <button
                          className="w-full text-sm text-left px-3 py-0.5 hover:bg-neutral-200"
                          onClick={() => {
                            setCurrency("USDC");
                            setOpenDropdown(false);
                          }}
                        >
                          USDC
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex justify-between flex-wrap">
                  <p className="text-sm font-medium text-light">₦192,845.40</p>

                  <div className="flex items-center gap-2">
                    <span className="text-xs ">0x1A2b...c4D0</span>
                    <button
                      onClick={() => copyToClipboard("0x1A2b...c4D0")}
                      className="p-1 hover:bg-light/20 cursor-pointer rounded transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#D6C8FF] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-light/10 rounded-full -mr-16 -mt-16"></div>
            <img src={Tree} className=" h-full right-0 absolute top-0 z-0" />
            <div className="relative z-10">
              <span className="text-sm text-black-text block mb-8">
                Active savings plan
              </span>

              <div className="mb-2">
                <div className="text-4xl text-black-text font-bold mb-1">
                  3 plans
                </div>
                <p className="text-sm font-medium text-black-text ">
                  Total value: 98.34 USDT
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={() => setShowDepositModal(true)}
            className="flex-1 px-6 py-3 bg-blue cursor-pointer text-white rounded-full font-semibold hover:bg-blue/90 transition-colors flex items-center justify-center gap-2"
          >
            <CirclePlus className="w-5 h-5" />
            Deposit
          </button>
          <button
            onClick={() => navigate("/savings/new")}
            className="flex-1 px-6 py-3 border-2 font-semibold border-blue text-blue rounded-full transition-colors cursor-pointer  flex items-center justify-center gap-2"
          >
            <CirclePlus className="w-5 h-5" />
            Start new plan
          </button>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="flex-1 px-6 py-3 border-2 border-blue cursor-pointer text-blue rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <DollarSign className="w-5 h-5" />
            Withdraw
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">
              Saving Plans
            </h3>
            <button
              onClick={() => navigate("/transactions")}
              className="text-sm cursor-pointer font-medium text-blue flex items-center gap-1"
            >
              See all
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {savingsPlans.map((plan) => (
              <SavingPlanCard key={plan.name} {...plan} />
            ))}
          </div>
        </div>

        <TransactionsTable />
      </div>

      {showWelcome && <WelcomeModal onComplete={handleWelcomeComplete} />}

      {showDepositModal && (
        <DepositModal onClose={() => setShowDepositModal(false)} />
      )}

      {showWithdrawModal && (
        <WithdrawModal onClose={() => setShowWithdrawModal(false)} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default DashboardHome;
