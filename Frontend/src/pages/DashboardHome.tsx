import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { useUserProfile } from "../contexts/UserProfileContext";

// BACKEND URL
const API_BASE = "https://wallet-api-55mt.onrender.com";

type PlanType = "FlexFi" | "GrowFi" | "VaultFi" | "SwiftFi";

interface DisplayPlan {
  type: PlanType;
  duration?: string;
  interest: string;
  balance: number;
  principal?: number;
  interestEarned?: number;
  maturityDate?: string;
  progress?: number;
  isActive: boolean;
  status?: "Active" | "Emergency only";
}

const PLAN_CONFIGS = {
  FlexFi: { duration: "4 months plan", interestDisplay: "+2% interest" },
  GrowFi: { duration: "6 months plan", interestDisplay: "+4% interest" },
  VaultFi: { duration: "1 year plan", interestDisplay: "+8% interest" },
  SwiftFi: { duration: "", interestDisplay: "+0% interest" },
};

const COLOR_BY_PLAN: Record<PlanType, "blue" | "green" | "purple" | "orange"> =
  {
    FlexFi: "blue",
    GrowFi: "green",
    VaultFi: "purple",
    SwiftFi: "orange",
  };

function mapStatusToCardStatus(
  p: DisplayPlan
): "running" | "not-started" | "available" {
  // Example logic:
  // - if there is any balance → running
  // - SwiftFi with 0 balance → available (can add funds anytime)
  // - otherwise → not-started
  if ((p.balance ?? 0) > 0) return "running";
  if (p.type === "SwiftFi") return "available";
  return "not-started";
}

function toSavingPlanCardProps(p: DisplayPlan) {
  return {
    name: p.type, // "FlexFi" etc.
    interest: p.interest, // e.g. "+3% interest"
    color: COLOR_BY_PLAN[p.type], // required by card
    progress: p.progress ?? 0, // default to 0
    available: p.balance ?? 0, // card shows "Available balance"
    principal: p.principal ?? 0,
    interestAmount: p.interestEarned ?? 0, // rename field
    maturity: p.maturityDate ?? "—", // rename field
    status: mapStatusToCardStatus(p), // normalize status enum
  } as const;
}

const DashboardHome = () => {
  const navigate = useNavigate();
  const { profile, wallet, setWallet, refreshProfile } = useUserProfile();
  const [showBalance, setShowBalance] = useState(true);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [currency, setCurrency] = useState<"USDT" | "USDC">("USDT");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const userName = profile?.first_name || profile?.username || "User";
  // const userEmail = profile?.email || "";
  const [displayPlans, setDisplayPlans] = useState<DisplayPlan[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  // Format wallet address for display
  const formattedAddress = (address: string) => {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const walletAddress = wallet?.addresses?.[0] || wallet?.id || "";

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login", { replace: true });
      return;
    }

    // Only show welcome modal for newly registered users
    const isNewUser = localStorage.getItem("isNewUser");
    const profileCompleted = localStorage.getItem("profileCompleted");

    if (isNewUser === "true" && !profileCompleted) {
      setShowWelcomeModal(true);
    } else if (profile?.first_name) {
      localStorage.setItem("profileCompleted", "true");
      setShowWelcomeModal(false);
    }

    // Fetch wallet if not in context
    const fetchWallet = async () => {
      if (!wallet) {
        try {
          const response = await fetch(`${API_BASE}/accounts/wallets/`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            const walletData = Array.isArray(data) ? data[0] : data;
            if (walletData) {
              setWallet(walletData);
            }
          }
        } catch (error) {
          console.error("Error fetching wallet:", error);
        }
      }
    };

    fetchWallet();
    initializeDisplayPlans();
    setIsLoading(false);
  }, [navigate, profile, wallet, setWallet]);

  const initializeDisplayPlans = () => {
    // For now, show all 4 plans in 0% state (fresh account)
    const plans: DisplayPlan[] = [
      {
        type: "FlexFi",
        duration: PLAN_CONFIGS.FlexFi.duration,
        interest: PLAN_CONFIGS.FlexFi.interestDisplay,
        balance: 0,
        isActive: false,
      },
      {
        type: "GrowFi",
        duration: PLAN_CONFIGS.GrowFi.duration,
        interest: PLAN_CONFIGS.GrowFi.interestDisplay,
        balance: 0,
        isActive: false,
      },
      {
        type: "VaultFi",
        duration: PLAN_CONFIGS.VaultFi.duration,
        interest: PLAN_CONFIGS.VaultFi.interestDisplay,
        balance: 0,
        isActive: false,
      },
      {
        type: "SwiftFi",
        interest: PLAN_CONFIGS.SwiftFi.interestDisplay,
        balance: 0,
        isActive: false,
      },
    ];

    setDisplayPlans(plans);
    setTotalBalance(0);
  };

  const handleWelcomeComplete = () => {
    setShowWelcomeModal(false);
    localStorage.removeItem("isNewUser");
    refreshProfile();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);

    setToast({ message: "Copied to clipboard!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen  dark:bg-gray-600 dark:text-white">
      <Navbar title="Dashboard" />
      {/* MAIN */}
      <div className="space-y-6 mt-18 md:mt-0 p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-1 flex items-center gap-2">
            Welcome {userName} 👋
            <span className="text-sm font-normal text-muted-foreground">
              Lock in. Level up.
            </span>
          </h2>
        </div>

        <div className="mb-6 p-4 bg-[#FFF7EE] border border-[#FFAE58] dark:bg-gray-700 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          <Link to="/profile/kyc" className="w-full sm:w-auto">
            <button className="px-6 py-2   bg-foreground text-light dark:text-black-text rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors">
              Complete KYC
            </button>
          </Link>
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
                  {showBalance ? `${totalBalance.toFixed(2)}` : "****"}{" "}
                  {/* Currency Button */}
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
                  <p className="text-sm font-medium text-light">{`₦${(
                    totalBalance * 1600
                  ).toFixed(2)}`}</p>

                  <div className="flex items-center gap-2">
                    <span className="text-xs ">
                      {walletAddress
                        ? formattedAddress(walletAddress)
                        : "No wallet"}
                    </span>
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
                  {displayPlans.filter((p) => p.isActive).length === 0
                    ? "0 plan"
                    : `${displayPlans.filter((p) => p.isActive).length} ${
                        displayPlans.filter((p) => p.isActive).length === 1
                          ? "plan"
                          : "plans"
                      }`}
                </div>
                <p className="text-sm font-medium text-black-text ">
                  {totalBalance > 0
                    ? `Total value: ${totalBalance.toFixed(2)} USDT`
                    : "Start saving today"}
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

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-2xl bg-muted"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayPlans.map((plan, index) => (
                <SavingPlanCard
                  key={`${plan.type}-${index}`}
                  {...toSavingPlanCardProps(plan)}
                />
              ))}
            </div>
          )}
        </div>

        <TransactionsTable />
      </div>

      {showWelcomeModal && <WelcomeModal onComplete={handleWelcomeComplete} />}

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
