import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  AlertCircle,
  Landmark,
} from "lucide-react";
import AddBankModal from "../components/withdraw/AddBankModal";
import TwoFactorModal from "../components/withdraw/TwoFactorModal";
import VerifyingModal from "../components/withdraw/VerifyingModal";
import SuccessModal from "../components/withdraw/SuccessModal";
import FailureModal from "../components/withdraw/FailureModal";
import BankAccountCard from "../components/withdraw/BankAccountCard";
import Toast from "../components/withdraw/Toast";
import WithdrawalNavbar from "../components/dashboard/WithdrawalNavbar";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

const NairaWithdrawal = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showVerifying, setShowVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);

  const availableBalance = 480;
  const rate = 1450;
  const otcFee = 570;
  const saveFiFee = 2000;

  const amountNum = parseFloat(amount) || 0;
  const receiveAmount = amountNum * rate - otcFee - saveFiFee;
  const hasInsufficientBalance = amountNum > availableBalance;

  const handleAddBank = (bank: BankAccount) => {
    setBankAccounts([...bankAccounts, bank]);
    setShowAddBankModal(false);
    setToast({ message: "Bank account successfully added", type: "success" });
    setTimeout(() => setToast(null), 3000);
  };

  const handleContinue = () => {
    if (!hasInsufficientBalance && amountNum > 0 && selectedBank) {
      setShow2FAModal(true);
    }
  };

  const handleConfirm2FA = () => {
    setShow2FAModal(false);
    setShowVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setShowVerifying(false);
      // Randomly show success or failure for demo
      if (Math.random() > 0.3) {
        setShowSuccess(true);
      } else {
        setShowFailure(false);
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-gray-600">
      {/* Header */}
      <WithdrawalNavbar title="Withdraw NGN" />

      {/* Main Content */}
      <main className="pt-[70px]  max-w-5xl mx-auto md:pt-[95px] bg-neutral-200 dark:bg-gray-600 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <button
            className="mt-6 cursor-pointer  flex text-[#67686B] dark:text-white  items-center gap-3 font-medium text-sm"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={22} />
            <span>Back</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8 pb-20">
          {/* Enter Amount Section */}
          <div className="bg-neutral-50 dark:bg-gray-700 rounded-2xl md:col-span-2 p-6 ">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Enter amount
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Amount to withdraw (USDT)
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0 USDT"
                  className="flex  w-full rounded-lg bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-base  placeholder:text-[#979799] dark:placeholder:text-white/85 focus:outline-none focus:ring-2 focus:ring-blue"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Available Balance: {availableBalance} USDT
                </p>
              </div>

              {hasInsufficientBalance && amountNum > 0 && (
                <div className="flex items-center gap-2 p-3 bg-[#FFEBEA] text-[#E8362C] w-fit rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">
                    Insufficient balance. Please enter a lower amount
                  </p>
                </div>
              )}

              <div className="space-y-3 mt-4 p-4 rounded-lg bg-neutral-200 dark:bg-gray-600">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="text-foreground font-medium">
                    1 USDT = {rate.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">OTC fee</span>
                  <span className="text-foreground font-medium">
                    ₦{otcFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">SaveFi fee</span>
                  <span className="text-foreground font-medium">
                    ₦{saveFiFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base pt-2 ">
                  <span className="text-foreground font-medium">
                    You'll receive
                  </span>
                  <span className="text-foreground font-bold">
                    ₦{receiveAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleContinue}
                disabled={hasInsufficientBalance || !amountNum || !selectedBank}
                className="w-full py-3 bg-blue hover:bg-blue/90 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Select Bank Account Section */}
          <div className="bg-neutral-50 dark:bg-gray-700 rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-bold text-foreground mb-6">
              Select bank account
            </h2>

            <div className="space-y-3">
              {bankAccounts.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center mt-4 p-4 rounded-lg bg-neutral-200 dark:bg-gray-600">
                  <div className=" mb-4">
                    <Landmark className="w-12 h-12 text-gray-500 dark:text-white/80" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No bank account added
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add a bank account to withdraw your funds
                  </p>
                  <button
                    onClick={() => setShowAddBankModal(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue text-blue hover:bg-[#E9F4FD] hover:text-blue rounded-full semibold transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Add bank account
                  </button>
                </div>
              ) : (
                <>
                  {bankAccounts.map((account) => (
                    <BankAccountCard
                      key={account.id}
                      account={account}
                      selected={selectedBank === account.id}
                      onSelect={() => setSelectedBank(account.id)}
                    />
                  ))}

                  <button
                    onClick={() => setShowAddBankModal(true)}
                    className=" mx-auto flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-blue text-blue hover:bg-[#E9F4FD] hover:text-blue rounded-full semibold transition-colors mt-4"
                  >
                    <Plus className="w-5 h-5" />
                    Add bank account
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {showAddBankModal && (
        <AddBankModal
          onClose={() => setShowAddBankModal(false)}
          onAdd={handleAddBank}
          onError={(message) => {
            setToast({ message, type: "error" });
            setTimeout(() => setToast(null), 3000);
          }}
        />
      )}

      {show2FAModal && (
        <TwoFactorModal
          onClose={() => setShow2FAModal(false)}
          onConfirm={handleConfirm2FA}
        />
      )}

      {showVerifying && <VerifyingModal />}

      {showSuccess && (
        <SuccessModal
          amount={receiveAmount}
          onClose={() => setShowSuccess(false)}
        />
      )}

      {showFailure && (
        <FailureModal
          onClose={() => setShowFailure(false)}
          onRetry={() => {
            setShowFailure(false);
            setShow2FAModal(true);
          }}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default NairaWithdrawal;
