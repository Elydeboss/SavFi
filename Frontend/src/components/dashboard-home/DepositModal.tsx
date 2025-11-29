import { Building2, Wallet, ChevronRight, X } from "lucide-react";

interface DepositModalProps {
  onClose: () => void;
}

const DepositModal = ({ onClose }: DepositModalProps) => {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-neutral-50 rounded-2xl w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">
              Deposit funds
            </h2>
            <button
              onClick={onClose}
              className="p-2 cursor-pointer rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <div className="p-6 space-y-3">
            <button className="w-full p-4 bg-neutral-200 hover:bg-neutral-200/80 cursor-pointer rounded-xl transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-0.5">
                    Deposit in NGN
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use your Nigerian bank account to fund your USDT balance
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>

            <button className="w-full p-4 bg-neutral-200 hover:bg-neutral-200/80 cursor-pointer rounded-xl transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-foreground" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-0.5">
                    Deposit USDT
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Send USDT directly from any crypto wallet into your balance
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositModal;
