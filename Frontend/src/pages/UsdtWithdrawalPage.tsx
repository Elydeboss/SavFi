import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import WithdrawalNavbar from "../components/dashboard/WithdrawalNavbar";

const UsdtWithdrawPage: React.FC = () => {
  const navigate = useNavigate();

  // States for wallet summary
  const [totalBalance] = useState(120.54);
  const [availableBalance] = useState(120.54);
  const [walletAddress] = useState("0x1A2b...C3D4");

  // States for withdraw section
  const [recipientAddress, setRecipientAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [receivedAmount] = useState(89.57);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);

  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };

  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(parseFloat(e.target.value));
  };

  const handleMaxClick = () => {
    setWithdrawAmount(availableBalance);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRecipientAddress(text);
    } catch (error) {
      console.error("Failed to read clipboard content: ", error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("Copied to clipboard!");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    } catch {
      setToastMessage("Unable to copy. Please copy manually.");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-gray-600 pb-10">
      {/* HEADER */}
      <WithdrawalNavbar title="Withdraw USDT" />

      {/* MAIN CONTENT */}
      <div className="pt-[70px] px-4 md:pt-[95px] bg-neutral-200 dark:bg-gray-600 dark:text-white">
        <div className="max-w-4xl mx-auto">
          <button
            className="mt-6 cursor-pointer flex text-[#67686B] dark:text-white items-center gap-3 font-medium text-sm"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={22} />
            <span>Back</span>
          </button>
        </div>

        <div className="max-w-4xl mt-8 mx-auto grid gap-5 md:grid-cols-3 pb-15">
          {/* Left Side: Wallet Summary */}
          <div className="md:col-span-1 h-fit bg-neutral-50 dark:bg-gray-700 dark:text-white p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold">Wallet Summary</h2>

            <div className="space-y-1">
              <p className="text-sm text-[#494A4E] dark:text-white/80">
                Total balance
              </p>
              <p className="text-3xl font-bold">
                {totalBalance} <span className="text-base">USDT</span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-[#494A4E] dark:text-white/80">
                Available to withdraw
              </p>
              <p className="text-3xl font-bold">
                {availableBalance} <span className="text-base">USDT</span>
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm text-[#494A4E] dark:text-white/80">
                Connected wallet
              </p>
              <div className="inline-flex gap-4 items-center">
                <p className="text-sm">{walletAddress}</p>

                <button
                  onClick={() => copyToClipboard(walletAddress)}
                  className="cursor-pointer ml-auto"
                >
                  {/* copy icon */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 9.1665C5 6.80948 5 5.63097 5.73223 4.89874C6.46447 4.1665 7.64298 4.1665 10 4.1665H12.5C14.857 4.1665 16.0355 4.1665 16.7678 4.89874C17.5 5.63097 17.5 6.80948 17.5 9.1665V13.3332C17.5 15.6902 17.5 16.8687 16.7678 17.6009C16.0355 18.3332 14.857 18.3332 12.5 18.3332H10C7.64298 18.3332 6.46447 18.3332 5.73223 17.6009C5 16.8687 5 15.6902 5 13.3332V9.1665Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332V8.33317C2.5 5.19047 2.5 3.61913 3.47631 2.64281C4.45262 1.6665 6.02397 1.6665 9.16667 1.6665H12.5C13.8807 1.6665 15 2.78579 15 4.1665"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                  </svg>
                </button>
              </div>

              {/* TOAST */}
              {toastVisible && (
                <div className="bg-[#9DE7C9] pt-1 pb-2 px-2 mt-2 rounded-md inline-block">
                  <div className="mt-2 text-sm font-medium text-[#12553A]">
                    {toastMessage}
                  </div>
                </div>
              )}

              <div className="text-xs w-fit flex items-center mt-4 text-blue dark:text-[#046dbc] bg-[#E9F4FD] dark:bg-[#b3d9f8] px-3 py-2 rounded-lg">
                <span className="ml-2">Supported network: TRC-20 only</span>
              </div>
            </div>
          </div>

          {/* Right Side: Withdraw */}
          <div className="md:col-span-2 bg-neutral-50 dark:bg-gray-700 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold dark:text-white">
              Withdraw USDT
            </h2>

            {/* Recipient Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-white/80">
                Recipient wallet address
              </label>
              <div className="flex items-center space-x-3 border border-slate-200 dark:border-gray-600 bg-[#EAEDEF] dark:bg-gray-600 rounded-lg p-4">
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={handleRecipientChange}
                  placeholder="Enter recipient TRC-20 address"
                  className="flex-1 text-base bg-transparent outline-none dark:text-white/80"
                />

                <button
                  onClick={handlePaste}
                  className="text-sm text-blue font-medium flex items-center"
                >
                  Paste
                </button>
              </div>
            </div>

            {/* Withdraw Amount */}
            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-white/80">
                Withdraw Amount
              </label>

              <div className="flex items-center border border-slate-200 dark:border-gray-600 bg-[#EAEDEF] dark:bg-gray-600 rounded-lg p-4">
                <input
                  type="text"
                  value={withdrawAmount}
                  onChange={handleWithdrawChange}
                  placeholder="0.00 USDT"
                  className="flex-1 bg-transparent outline-none dark:text-white/80"
                />

                <button onClick={handleMaxClick} className="text-sm text-blue">
                  Max
                </button>
              </div>

              <p className="text-xs text-[#67686B] dark:text-white/80">
                You'll receive:{" "}
                <span className="font-bold text-sm">{receivedAmount} USDT</span>
              </p>
            </div>

            {/* Network (Disabled) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-white/80">
                Network
              </label>

              <div className="flex items-center border border-slate-200 dark:border-gray-600 bg-[#EAEDEF]/50 dark:bg-gray-600/80 rounded-lg p-4 cursor-not-allowed">
                <input
                  disabled
                  value="TRC-20"
                  className="flex-1 bg-transparent outline-none dark:text-white/80"
                />
              </div>

              <div className="text-xs w-fit mt-4 text-blue bg-[#E9F4FD] dark:bg-[#b3d9f8] px-3 py-2 rounded-lg">
                Network fees apply, final amount depends on blockchain
                congestion
              </div>
            </div>

            {/* Withdraw Button */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-[#2092E9] mt-4 cursor-pointer text-white rounded-full py-3 text-sm font-semibold hover:brightness-105"
            >
              Withdraw USDT
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && <WithdrawModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

// WITHDRAW MODAL COMPONENT
const WithdrawModal = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);

    // Simulate withdrawal processing delay
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
    }, 2000);
  };

  // If success modal is active, show only success modal
  if (showSuccess) {
    return <SuccessModal onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-sm w-full shadow-lg">
        <h2 className="text-xl font-semibold dark:text-white">
          Confirm Withdrawal
        </h2>

        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to withdraw USDT?
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg border cursor-pointer dark:border-gray-600 dark:text-white disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-[#2092E9] cursor-pointer text-white flex items-center gap-2 disabled:opacity-40"
          >
            {isLoading ? (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// SUCCESS MODAL COMPONENT
const SuccessModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-7 rounded-2xl max-w-sm w-full shadow-xl text-center">
        {/* Success Icon */}
        <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
          <svg
            className="w-9 h-9 text-green-600 dark:text-green-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-semibold dark:text-white">
          Withdrawal Successful
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          Your USDT withdrawal has been processed successfully.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-[#2092E9] cursor-pointer text-white py-3 rounded-full font-medium hover:brightness-110"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default UsdtWithdrawPage;
