import { useState, useEffect } from "react";
import DepositEnterAmount from "./DepositEnterAmount";
import DepositBankDetails from "./DepositBankDetails";
import DepositVerifyingTransfer from "./DepositVerifyingTransfer";
import DepositAwaitingConfirmation from "./DepositAwaitingConfirmation";
import DepositSuccess from "./DepositSuccess";

type DepositFlowProps = {
  onBack?: () => void;
  onClose?: () => void;
};

type ModalState = "none" | "verifying" | "awaiting" | "success" | "receipt";

type ReceiptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack?: () => void;
  amount: number;
  usdt: number;
  reference: string;
  date: string;
};

const ModalWrapper: React.FC<{
  isOpen: boolean;
  children: React.ReactNode;
}> = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full p-6">
        {children}
      </div>
    </div>
  );
};

function ReceiptModal({
  isOpen,
  onClose,
  onBack,
  amount,
  usdt,
  reference,
  date,
}: ReceiptModalProps) {
  return (
    <ModalWrapper isOpen={isOpen}>
      <div className="flex flex-col space-y-4">
        <h2
          id="receipt-title"
          className="text-xl font-semibold text-foreground"
        >
          Transaction Receipt
        </h2>
        <div>
          <p>
            <strong>Amount (NGN):</strong> ₦{amount.toLocaleString()}
          </p>
          <p>
            <strong>Amount (USDT):</strong> {usdt.toFixed(2)} USDT
          </p>
          <p>
            <strong>Reference:</strong> {reference}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-md bg-blue-600 text-white hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Close
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="flex-1 h-10 rounded-md border border-gray-300 hover:bg-blue-500 hover:text-white transition"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
}

export default function DepositFlow({ onBack, onClose }: DepositFlowProps) {
  const [step, setStep] = useState<"enter" | "bank">("enter");
  const [amountNgn, setAmountNgn] = useState(0);
  const [amountUsdt, setAmountUsdt] = useState(0);
  const [modal, setModal] = useState<ModalState>("none");
  const [reference, setReference] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<
    "pending" | "success" | "failure"
  >("pending");

  useEffect(() => {
    if (modal === "success") {
      // Generate transaction reference when success modal shows
      setReference("TXN-" + Math.floor(Math.random() * 999999));
    }
  }, [modal]);

  const handleBankContinue = () => {
    setModal("verifying");
    setTransactionStatus("pending");

    setTimeout(() => {
      setModal("awaiting");

      // Simulate transaction result after 3s
      setTimeout(() => {
        const didSucceed = Math.random() > 0.5; // replace with real API result
        if (didSucceed) {
          setTransactionStatus("success");
          setModal("success");
        } else {
          setTransactionStatus("failure");
          setModal("awaiting"); // stay on awaiting but mark as failed
        }
      }, 3000);
    }, 2000);
  };

  const receipt = {
    amount: amountNgn,
    usdt: amountUsdt,
    reference,
    date: new Date().toLocaleString(),
  };

  return (
    <div className="w-full">
      {/* Main UI */}
      {modal === "none" && (
        <>
          {step === "enter" && (
            <DepositEnterAmount
              onContinue={(ngn, usdt) => {
                setAmountNgn(ngn);
                setAmountUsdt(usdt);
                setStep("bank");
              }}
              onCancel={() => onBack?.()}
            />
          )}
          {step === "bank" && (
            <DepositBankDetails
              amountToPay={amountNgn}
              amountUsdt={amountUsdt}
              onContinue={handleBankContinue}
              onCancel={() => setStep("enter")}
            />
          )}
        </>
      )}

      {/* Modals */}
      {modal === "verifying" && <DepositVerifyingTransfer isOpen={true} />}
      {modal === "awaiting" && (
        <DepositAwaitingConfirmation
          isOpen={true}
          failed={transactionStatus === "failure"} // <-- use it here
          onRefresh={() => handleBankContinue()}
          onReturn={() => {
            setModal("none");
            setStep("enter");
            onClose?.();
          }}
          onSupport={() => console.log("support")}
        />
      )}

      {modal === "success" && (
        <DepositSuccess
          isOpen={true}
          amountUsdt={amountUsdt}
          onClose={() => {
            setModal("none");
            setStep("enter");
            onClose?.();
          }}
          onViewDetails={() => setModal("receipt")}
        />
      )}

      {modal === "receipt" && (
        <ReceiptModal
          isOpen={true}
          onClose={() => {
            setModal("none");
            setStep("enter");
            onClose?.();
          }}
          onBack={() => setModal("success")}
          amount={receipt.amount}
          usdt={receipt.usdt}
          reference={receipt.reference}
          date={receipt.date}
        />
      )}
    </div>
  );
}
