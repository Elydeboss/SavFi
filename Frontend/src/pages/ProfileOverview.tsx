import { ChevronRight, Copy, PlusCircle, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { toast } from "sonner";
import { useUserProfile } from "../contexts/UserProfileContext";
import { useEffect, useState } from "react";

// BACKEND URL
const API_BASE = "https://wallet-api-55mt.onrender.com";

export default function ProfileOverview() {
  const { profile, wallet, setWallet } = useUserProfile();

  const [isLoadingWallet, setIsLoadingWallet] = useState(false);

  // Fetch wallet on mount if not cached
  useEffect(() => {
    const fetchWallet = async () => {
      if (wallet) return; // Already have wallet

      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      setIsLoadingWallet(true);
      try {
        const response = await fetch(`${API_BASE}/wallet/info`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Handle if it's an array or single object
          const walletData = Array.isArray(data) ? data[0] : data;
          if (walletData) {
            setWallet(walletData);
          }
        }
      } catch (error) {
        console.error("Error fetching wallet:", error);
      } finally {
        setIsLoadingWallet(false);
      }
    };

    fetchWallet();
  }, [wallet, setWallet]);

  const formatWalletAddress = (address: string) => {
    if (!address || address.length < 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleCopyWallet = () => {
    const address = wallet?.addresses?.[0] || wallet?.id || "";
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Wallet address copied to clipboard");
    }
  };

  const getInitials = () => {
    if (profile?.first_name) {
      return profile.first_name.charAt(0).toUpperCase();
    }
    if (profile?.username) {
      return profile.username.charAt(0).toUpperCase();
    }
    return "U";
  };

  const displayName =
    profile?.first_name && profile?.second_name
      ? `${profile.first_name} ${profile.second_name}`
      : profile?.username || "User";

  const walletAddress = wallet?.addresses?.[0] || wallet?.id || "No wallet";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full overflow-x-hidden"
    >
      {/* Breadcrumb */}
      <div className="px-4 flex items-center gap-1 text-sm sm:text-base font-medium">
        <Breadcrumb
          items={[
            { label: "Profile", href: "/profile" },
            { label: "Overview" },
          ]}
        />
      </div>

      {/* Outer container */}
      <div className="w-full bg-gray dark:bg-gray-600 dark:text-white p-4 flex justify-center">
        <div
          className="
            w-full space-y-6
            max-w-full
            sm:max-w-[620px]
            md:max-w-[750px]
            lg:max-w-[900px]
          "
        >
          {/* Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="
              bg-white dark:bg-gray-700 shadow rounded-2xl
              p-4 sm:p-6 md:p-6
              flex flex-col sm:flex-row md:flex-col lg:flex-row
              items-center sm:items-start gap-4
            "
          >
            <div className="h-20 w-20 relative rounded-full bg-primary text-white overflow-hidden flex items-center justify-center text-3xl font-semibold">
              {profile?.avatar ? (
                <img
                  src={profile?.avatar}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{getInitials()}</span>
              )}
            </div>

            <div className="flex-1 w-full text-center sm:text-left">
              <p className="text-sm text-gray-500 dark:text-gray-300">
                SaveFi ID: SF-
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>

              <h1 className="text-xl sm:text-2xl font-semibold">
                {displayName}
              </h1>

              <p className="text-sm text-gray-500 font-medium break-all">
                {profile?.email}
              </p>

              <div className="flex justify-between flex-wrap gap-3 items-center pt-2">
                <p className="text-sm text-neutral-500 dark:text-white bg-gray py-1 px-1.5 dark:bg-gray-700 font-medium rounded">
                  Signed up from Google
                </p>
                <Link to="edit">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-1.5 px-3 py-1 bg-blue text-white text-base rounded-full font-medium"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Edit Profile
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Wallet + Points */}
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 md:gap-6 w-full">
            {/* Wallet */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 shadow rounded-2xl p-4 sm:p-5 md:p-6 space-y-3"
            >
              <p className="font-medium text-sm text-foreground">
                Auto-generated SaveFi wallet
              </p>

              {isLoadingWallet ? (
                <div className="animate-pulse h-6 bg-muted rounded w-32 mb-2"></div>
              ) : wallet ? (
                <>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-sm md:text-base text-foreground">
                      {formatWalletAddress(walletAddress)}
                    </span>
                    <button
                      onClick={handleCopyWallet}
                      className="p-1 hover:bg-muted rounded"
                    >
                      <Copy className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="p-2 rounded-xl text-gray-500 bg-gray w-fit">
                    TRC-20 / ERC-20
                  </p>
                </>
              ) : (
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    No wallet created
                  </span>
                </div>
              )}
              <button className="flex items-center gap-1 text-sm text-primary hover:underline">
                Manage connected wallets
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Points */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-700 shadow rounded-2xl p-4 sm:p-5 md:p-6 space-y-3"
            >
              <p className="font-medium text-sm text-foreground">
                SaveFi point balance
              </p>
              <div className="flex items-center gap-1">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-blue dark:text-blue-300"
                >
                  <g clipPath="url(#clip0_527_5088)">
                    <path
                      d="M1.9375 16C1.9375 17.8467 2.30124 19.6753 3.00794 21.3815C3.71465 23.0876 4.75049 24.6379 6.05631 25.9437C7.36214 27.2495 8.91237 28.2853 10.6185 28.9921C12.3247 29.6988 14.1533 30.0625 16 30.0625C17.8467 30.0625 19.6753 29.6988 21.3815 28.9921C23.0876 28.2853 24.6379 27.2495 25.9437 25.9437C27.2495 24.6379 28.2853 23.0876 28.9921 21.3815C29.6988 19.6753 30.0625 17.8467 30.0625 16C30.0625 14.1533 29.6988 12.3247 28.9921 10.6185C28.2853 8.91237 27.2495 7.36214 25.9437 6.05631C24.6379 4.75049 23.0876 3.71465 21.3815 3.00794C19.6753 2.30124 17.8467 1.9375 16 1.9375C14.1533 1.9375 12.3247 2.30124 10.6185 3.00794C8.91237 3.71465 7.36214 4.75049 6.05631 6.05631C4.75049 7.36214 3.71465 8.91237 3.00794 10.6185C2.30124 12.3247 1.9375 14.1533 1.9375 16Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.25 12.875H9.75L14.75 19.125H17.25"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.75 12.875H17.25L22.25 19.125H24.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.25 19.125H9.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.25 12.875H24.75V15.375"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <defs>
                    <clipPath id="clip0_527_5088">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <p className="text-xl font-semibold text-foreground">0 SFP</p>
              </div>

              <p className="text-sm text-muted-foreground gap-1 flex items-center">
                ~0 USDT
              </p>

              <button className="text-blue font-medium text-base flex items-center gap-1">
                View referral rewards <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* KYC */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-700 shadow rounded-2xl p-4 sm:p-5 md:p-6 space-y-2"
          >
            <p className="text-sm font-medium">
              KYC status:{" "}
              <span className="text-sm text-yellow-600 py-0.5 px-1.5 bg-[#FFE6CB] rounded-3xl">
                KYC: Unverified
              </span>
            </p>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 dark:text-gray-300 max-w-[65%]">
                Verify your identity for full access
              </p>
              <Link to="kyc">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-base font-medium px-3 py-1 bg-black text-white rounded-xl dark:bg-gray-600"
                >
                  Verify
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Savings snapshot */}
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="bg-white dark:bg-gray-700 shadow rounded-2xl p-4 sm:p-5 md:p-6"
          >
            <h2 className="font-semibold text-base sm:text-lg mb-4">
              Savings snapshot
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Total saved:
                </p>
                <p className="text-xl font-semibold">0 USDT</p>
                <p className="text-sm text-gray-500">~₦0.00</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Total plans
                </p>
                <p className="text-xl font-semibold">0</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Your saving streaks
                </p>
                <p className="text-base font-semibold">
                  Start saving to build streaks!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
