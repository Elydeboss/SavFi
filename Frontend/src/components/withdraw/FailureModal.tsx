import { Clock } from "lucide-react";

interface FailureModalProps {
  onClose: () => void;
  onRetry: () => void;
}

const FailureModal = ({ onClose, onRetry }: FailureModalProps) => {
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
          {/* Error Icon */}
          <div className="w-16 h-16 bg-[#FFEBEA] rounded-full flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-red-700" />
          </div>

          <h3 className="text-2xl font-bold text-foreground mb-3">
            Withdrawal unsuccessful
          </h3>
          <p className="text-sm text-muted-foreground mb-8">
            We couldn't complete your withdrawal. This maybe due to network
            delays, account issues. If this persists, contact support.
          </p>

          {/* Buttons */}
          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onRetry}
              className="w-full py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-full transition-colors"
            >
              Try again
            </button>
            <button
              onClick={onClose}
              className="w-full text-center text-sm text-foreground hover:text-primary underline transition-colors"
            >
              Contact support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;
