import { CircleCheckBig } from "lucide-react";
import { useState } from "react";
import TransactionDetailsModal from "./TransactionDetailsModal";

interface SuccessModalProps {
  amount: number;
  onClose: () => void;
}

const SuccessModal = ({ amount, onClose }: SuccessModalProps) => {
  const [showDetails, setShowDetails] = useState(false);

  if (showDetails) {
    return (
      <TransactionDetailsModal
        amount={amount}
        onClose={() => setShowDetails(false)}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-neutral-50/95 rounded-2xl max-w-md w-full p-8 shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-14 h-14 bg-[#FCFDFD] rounded-full flex items-center justify-center mb-6">
            <CircleCheckBig className="w-8 h-8 text-green-500" />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-3">
            Withdrawal successful
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            Your bank account has been credited with ₦{amount.toLocaleString()}.
            Funds are now available in your total balance.
          </p>

          {/* Buttons */}
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue hover:bg-blue/90 text-white font-medium rounded-full transition-colors"
            >
              Return to dashboard
            </button>
            <button
              onClick={() => setShowDetails(true)}
              className="w-full py-3 border-2 border-blue text-blue hover:bg-[#E9F4FD] hover:text-blue font-medium rounded-full transition-colors"
            >
              View transaction details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
