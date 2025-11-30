import { X } from "lucide-react";

interface Transaction {
  date: string;
  type: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  source: string;
}

interface TransactionDetailModalProps {
  transaction: Transaction;
  onClose: () => void;
}

const TransactionDetailModal = ({
  transaction,
  onClose,
}: TransactionDetailModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "text-success bg-success/10";
      case "Pending":
        return "text-warning bg-warning/10";
      case "Failed":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-secondary";
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Naira":
        return "text-warning bg-warning/10";
      case "Crypto":
        return "text-brand-blue bg-brand-blue/10";
      case "Interest":
        return "text-brand-purple bg-brand-purple/10";
      case "Referral":
        return "text-brand-green bg-brand-green/10";
      case "System":
        return "text-muted-foreground bg-secondary";
      default:
        return "text-foreground bg-secondary";
    }
  };

  // Generate a transaction ID
  const transactionId = `TXN${Date.now().toString().slice(-8)}`;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-neutral-50 rounded-2xl max-w-md w-full shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">
            Transaction Details
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-2">Amount</p>
            <p className="text-3xl font-bold text-foreground">
              {transaction.amount}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Transaction ID
              </span>
              <span className="text-sm font-medium text-foreground">
                {transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date & Time</span>
              <span className="text-sm font-medium text-foreground">
                {transaction.date}, 2:45 PM
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm font-medium text-foreground">
                {transaction.type}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(
                  transaction.status
                )}`}
              >
                {transaction.status}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Source</span>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${getSourceColor(
                  transaction.source
                )}`}
              >
                {transaction.source}
              </span>
            </div>

            {transaction.status === "Success" && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Transaction Fee
                </span>
                <span className="text-sm font-medium text-foreground">
                  ₦0.00
                </span>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-border">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-blue/90 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
