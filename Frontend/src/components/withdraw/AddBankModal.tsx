import { useState } from "react";
import { ChevronDown, Info, AlertCircle, ChevronRight } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

interface AddBankModalProps {
  onClose: () => void;
  onAdd: (bank: BankAccount) => void;
  onError: (message: string) => void;
}

const nigerianBanks = [
  "Access Bank",
  "Citibank",
  "Ecobank",
  "Fidelity Bank",
  "First Bank",
  "FCMB",
  "GTBank",
  "Heritage Bank",
  "Keystone Bank",
  "Opay Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC",
  "Standard Chartered",
  "Sterling Bank",
  "Union Bank",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
];

const AddBankModal = ({ onClose, onAdd, onError }: AddBankModalProps) => {
  const [selectedBank, setSelectedBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [showErrorState, setShowErrorState] = useState(false);

  const handleContinue = () => {
    if (!selectedBank || !accountNumber || !accountName) {
      return;
    }

    // Simulate name verification - randomly show error for demo
    if (Math.random() > 0.7) {
      setShowErrorState(true);
      return;
    }

    const newBank: BankAccount = {
      id: Date.now().toString(),
      bankName: selectedBank,
      accountNumber,
      accountName,
    };

    onAdd(newBank);
  };

  const handleContactSupport = () => {
    onError("Please contact support for assistance");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-neutral-50 rounded-2xl max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 dark:text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1">
                Add bank account
              </h3>
              <p className="text-sm text-muted-foreground">
                Add a Nigerian naira bank account to receive your withdrawal
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {/* Bank Selector */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Select bank
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowBankDropdown(!showBankDropdown)}
                  className="flex w-full items-center justify-between rounded-md bg-neutral-200 px-3 py-2.5 text-base placeholder:text-[#979799] focus:outline-none focus:ring-2 focus:ring-blue"
                >
                  <span
                    className={
                      selectedBank ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {selectedBank || "Choose bank"}
                  </span>
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </button>

                {showBankDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-neutral-200  rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {nigerianBanks.map((bank) => (
                      <button
                        key={bank}
                        onClick={() => {
                          setSelectedBank(bank);
                          setShowBankDropdown(false);
                        }}
                        className="flex w-full items-center justify-between rounded-md bg-neutral-200  px-3 py-2.5 text-base placeholder:text-[#979799] focus:outline-none focus:ring-2 focus:ring-blue"
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Enter account number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) =>
                  setAccountNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
                placeholder="e.g 0123456789"
                className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>

            {/* Account Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Account name
              </label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="John Doe"
                className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>

            {/* Info/Error Message */}
            {!showErrorState ? (
              <div className="flex items-start gap-2 p-2 bg-[#E9F4FD] text-[#1D85D4] rounded-lg">
                <Info className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" />
                <p className="text-[11px] text-accent-foreground">
                  Your bank name must match your KYC to avoid failed withdrawals
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2 p-2 bg-[#FFEBEA] text-[#E8362C] rounded-lg">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-[11px]">
                  Your bank name does not match your profile name. Please check
                  account details and try again.
                </p>
              </div>
            )}

            {/* Buttons */}
            <button
              onClick={handleContinue}
              disabled={!selectedBank || !accountNumber || !accountName}
              className="w-full py-3 bg-blue hover:bg-blue/80 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              Continue
              <ChevronRight className="w-5 h-5" />
            </button>

            {showErrorState && (
              <button
                onClick={handleContactSupport}
                className="w-full text-center text-sm text-foreground hover:text-primary underline transition-colors"
              >
                Contact support
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBankModal;
