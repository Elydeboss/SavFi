import { useState } from "react";
// import { ChevronRight } from "lucide-react";

interface TwoFactorModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const TwoFactorModal = ({ onClose, onConfirm }: TwoFactorModalProps) => {
  const [code, setCode] = useState("");

  const handleConfirm = () => {
    if (code.length === 6) {
      onConfirm();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-neutral-50/95  rounded-2xl max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Enter your 2-FA code
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Enter 6 digits code from your google authenticator
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="w-40 h-40 bg-muted rounded-lg flex items-center justify-center">
              <svg className="w-32 h-32" viewBox="0 0 128 128" fill="none">
                {/* Simple QR code pattern */}
                <rect x="0" y="0" width="40" height="40" fill="currentColor" />
                <rect x="8" y="8" width="24" height="24" fill="white" />
                <rect x="16" y="16" width="8" height="8" fill="currentColor" />

                <rect x="88" y="0" width="40" height="40" fill="currentColor" />
                <rect x="96" y="8" width="24" height="24" fill="white" />
                <rect x="104" y="16" width="8" height="8" fill="currentColor" />

                <rect x="0" y="88" width="40" height="40" fill="currentColor" />
                <rect x="8" y="96" width="24" height="24" fill="white" />
                <rect x="16" y="104" width="8" height="8" fill="currentColor" />

                <rect x="48" y="48" width="8" height="8" fill="currentColor" />
                <rect x="64" y="48" width="8" height="8" fill="currentColor" />
                <rect x="80" y="48" width="8" height="8" fill="currentColor" />
                <rect x="48" y="64" width="8" height="8" fill="currentColor" />
                <rect x="80" y="64" width="8" height="8" fill="currentColor" />
                <rect x="48" y="80" width="8" height="8" fill="currentColor" />
                <rect x="64" y="80" width="8" height="8" fill="currentColor" />
                <rect x="80" y="80" width="8" height="8" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Code Input */}
          <div className="mb-6">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Enter 6 digit authentication code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) =>
                setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="000000"
              className="flex  w-full rounded-lg bg-neutral-200  px-3 py-2.5 text-base  placeholder:text-[#979799]  focus:outline-none focus:ring-2 focus:ring-blue"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-neutral-200 text-gray-800 font-semibold cursor-pointer rounded-full transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={code.length !== 6}
              className="flex-1 py-3 bg-blue hover:bg-blue/80 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm withdrawal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorModal;
