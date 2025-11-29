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

  // States for the withdraw section
  const [recipientAddress, setRecipientAddress] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  //const [network, setNetwork] = useState("TRC-20");
  const [receivedAmount] = useState(89.57);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Handle input change for recipient address
  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };

  // Handle input change for withdraw amount
  const handleWithdrawChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawAmount(parseFloat(e.target.value));
  };

  // Set the withdraw amount to available balance when "Max" is clicked
  const handleMaxClick = () => {
    setWithdrawAmount(availableBalance);
  };

  // Handle Paste function
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText(); // Read text from the clipboard
      setRecipientAddress(text);
    } catch (error) {
      console.error("Failed to read clipboard content: ", error);
    }
  };

  // Handle Copy to Clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastMessage("Copied to clipboard!");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
    } catch {
      setToastMessage("Unable to copy. Please copy manually.");
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 2000);
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
            className="mt-6 cursor-pointer  flex text-[#67686B] dark:text-white  items-center gap-3 font-medium text-sm"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={22} />
            <span>Back</span>
          </button>
        </div>
        <div className="max-w-4xl mt-8 mx-auto grid gap-5  md:grid-cols-3 pb-15">
          {/* Left Side: Wallet Summary */}
          <div className="md:col-span-1 h-fit bg-neutral-50 dark:bg-gray-700 dark:text-white p-6 rounded-xl space-y-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Wallet Summary
            </h2>
            <div className="space-y-1">
              <p className="text-sm text-[#494A4E] font-medium dark:text-white/80">
                Total balance
              </p>
              <p className="text-3xl font-bold">
                {totalBalance}{" "}
                <span className="text-base font-semibold">USDT</span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#494A4E] font-medium dark:text-white/80">
                Available to withdraw
              </p>
              <p className="text-3xl font-bold">
                {availableBalance}{" "}
                <span className="text-base font-semibold">USDT</span>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#494A4E] font-medium dark:text-white/80">
                Connected wallet
              </p>
              <div className="inline-flex gap-4 items-center">
                <p className="text-sm font-medium text-[#494A4E] dark:text-white">
                  {walletAddress}
                </p>
                <button
                  onClick={() => copyToClipboard(`${walletAddress}`)}
                  className="cursor-pointer ml-auto"
                  aria-label="Copy referral link"
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

              {/* TOAST MESSAGE */}
              {toastVisible && (
                <div className="bg-[#9DE7C9] pt-1 pb-2 px-2 mt-2 rounded-md inline-block">
                  <div className="mt-2 text-sm font-medium text-[#12553A]">
                    {toastMessage}
                  </div>
                </div>
              )}

              <div className="text-xs w-fit flex items-center mt-4 text-blue dark:text-[#046dbc] bg-[#E9F4FD] dark:bg-[#b3d9f8] px-3 py-2 rounded-lg">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_963_4080)">
                    <circle
                      cx="8.00065"
                      cy="8.00004"
                      r="6.66667"
                      stroke="#1D85D4"
                      stroke-width="1.5"
                    />
                    <path
                      d="M8 4.66663V8.66663"
                      stroke="#1D85D4"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <circle
                      cx="8.00065"
                      cy="10.6667"
                      r="0.666667"
                      fill="#1D85D4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_963_4080">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-2">Supported network: TRC-20 only</span>
              </div>
            </div>
          </div>

          {/* Right Side: Withdraw USDT */}
          <div className="md:col-span-2 bg-neutral-50 dark:bg-gray-700 p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Withdraw USDT
            </h2>

            {/* Recipient Wallet Address */}
            <div className="space-y-2">
              <label className="block text-sm text-black-text font-medium dark:text-white/80">
                Recipient wallet address
              </label>
              <div className="flex items-center space-x-3 border border-slate-200 dark:border-gray-600 bg-[#EAEDEF] dark:bg-gray-600 rounded-lg  p-4">
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={handleRecipientChange}
                  placeholder="Enter recipient TRC-20 address"
                  className="flex-1 text-base text-slate-700 dark:text-white/80 placeholder:text-[#979799] dark:placeholder:text-white/85 bg-transparent outline-none"
                />
                <button
                  onClick={handlePaste}
                  className="text-sm text-blue font-medium flex items-center justify-center"
                >
                  <div className="text-[#494A4E] dark:text-white/85">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.666 2.29163C13.255 2.29163 14.3839 2.29295 15.2403 2.40809C16.0787 2.52081 16.5618 2.7322 16.9144 3.08488C17.3204 3.49083 17.4971 3.80551 17.595 4.36649C17.7053 4.99879 17.7077 5.90072 17.7077 7.49996C17.7077 7.84514 17.9875 8.12496 18.3327 8.12496C18.6779 8.12496 18.9577 7.84514 18.9577 7.49996L18.9577 7.4197C18.9577 5.92038 18.9578 4.90471 18.8263 4.15162C18.6802 3.31384 18.3687 2.77136 17.7983 2.201C17.1747 1.57736 16.3839 1.3006 15.4069 1.16924C14.4575 1.0416 13.2445 1.04161 11.713 1.04163H11.666C11.3208 1.04163 11.041 1.32145 11.041 1.66663C11.041 2.0118 11.3208 2.29163 11.666 2.29163Z"
                        fill="currentColor"
                      />
                      <path
                        d="M1.66602 11.875C2.0112 11.875 2.29102 12.1548 2.29102 12.5C2.29102 14.0992 2.29342 15.0011 2.40376 15.6334C2.50164 16.1944 2.67833 16.5091 3.08427 16.915C3.43695 17.2677 3.91999 17.4791 4.75839 17.5918C5.61478 17.707 6.74367 17.7083 8.33269 17.7083C8.67787 17.7083 8.95769 17.9881 8.95769 18.3333C8.95769 18.6785 8.67787 18.9583 8.33269 18.9583H8.28568C6.75421 18.9583 5.54118 18.9583 4.59183 18.8307C3.61482 18.6993 2.82403 18.4226 2.20039 17.7989C1.63003 17.2286 1.31855 16.6861 1.17236 15.8483C1.04095 15.0952 1.04098 14.0796 1.04102 12.5803L1.04102 12.5C1.04102 12.1548 1.32084 11.875 1.66602 11.875Z"
                        fill="currentColor"
                      />
                      <path
                        d="M18.3327 11.875C18.6779 11.875 18.9577 12.1548 18.9577 12.5L18.9577 12.5802C18.9577 14.0795 18.9578 15.0952 18.8263 15.8483C18.6802 16.6861 18.3687 17.2286 17.7983 17.7989C17.1747 18.4226 16.3839 18.6993 15.4069 18.8307C14.4575 18.9583 13.2445 18.9583 11.713 18.9583H11.666C11.3208 18.9583 11.041 18.6785 11.041 18.3333C11.041 17.9881 11.3208 17.7083 11.666 17.7083C13.255 17.7083 14.3839 17.707 15.2403 17.5918C16.0787 17.4791 16.5618 17.2677 16.9144 16.915C17.3204 16.5091 17.4971 16.1944 17.595 15.6334C17.7053 15.0011 17.7077 14.0992 17.7077 12.5C17.7077 12.1548 17.9875 11.875 18.3327 11.875Z"
                        fill="currentColor"
                      />
                      <path
                        d="M8.28567 1.04163H8.33269C8.67787 1.04163 8.95769 1.32145 8.95769 1.66663C8.95769 2.0118 8.67787 2.29163 8.33269 2.29163C6.74367 2.29163 5.61478 2.29295 4.75839 2.40809C3.91999 2.52081 3.43695 2.7322 3.08427 3.08488C2.67833 3.49083 2.50164 3.80551 2.40376 4.36649C2.29342 4.99879 2.29102 5.90072 2.29102 7.49996C2.29102 7.84514 2.0112 8.12496 1.66602 8.12496C1.32084 8.12496 1.04102 7.84514 1.04102 7.49996L1.04102 7.4197C1.04098 5.9204 1.04095 4.90471 1.17236 4.15162C1.31855 3.31384 1.63003 2.77136 2.20039 2.201C2.82403 1.57736 3.61482 1.3006 4.59183 1.16924C5.54118 1.0416 6.75421 1.04161 8.28567 1.04163Z"
                        fill="currentColor"
                      />
                      <path
                        d="M1.66602 9.37496C1.32084 9.37496 1.04102 9.65478 1.04102 9.99996C1.04102 10.3451 1.32084 10.625 1.66602 10.625H18.3327C18.6779 10.625 18.9577 10.3451 18.9577 9.99996C18.9577 9.65478 18.6779 9.37496 18.3327 9.37496H1.66602Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <span className="ml-3">Paste</span>
                </button>
              </div>
            </div>

            {/* Withdraw Amount */}
            <div className="space-y-2">
              <label className="block text-sm text-black-text font-medium dark:text-white/80">
                Withdraw Amount
              </label>
              <div className="flex items-center space-x-3 border border-slate-200 dark:border-gray-600  bg-[#EAEDEF] dark:bg-gray-600 rounded-lg p-4">
                <input
                  type="text"
                  value={withdrawAmount}
                  onChange={handleWithdrawChange}
                  placeholder="0.00 USDT"
                  className="flex-1 text-base text-slate-700 dark:text-white/80 placeholder:text-[#979799] dark:placeholder:text-white/85  bg-transparent outline-none"
                />

                <button
                  onClick={handleMaxClick}
                  className="text-sm text-blue font-medium"
                >
                  Max
                </button>
              </div>
              <p className="text-xs text-[#67686B] dark:text-white/80">
                You'll receive:{" "}
                <span className="font-bold text-sm text-black-text dark:text-white">
                  {receivedAmount} USDT
                </span>
              </p>
            </div>

            {/* Network */}
            <div className="space-y-2">
              <label className="block text-sm text-black-text font-medium dark:text-white/80">
                Network
              </label>
              <div className="flex items-center space-x-3 border border-slate-200 dark:border-gray-600/80 bg-[#EAEDEF]/50 dark:bg-gray-600/80 rounded-lg  p-4 cursor-not-allowed">
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={handleRecipientChange}
                  placeholder="TRC-20"
                  className="flex-1 text-base text-slate-700 placeholder:text-[#979799] dark:placeholder:text-white/85 bg-transparent outline-none"
                  disabled
                />
                <button className="text-sm text-[#979799] dark:text-white/85 flex items-center justify-center">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.75736 10 5.17157 10 8 10H16C18.8284 10 20.2426 10 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16Z"
                      stroke="currentColor"
                      stroke-width="1.5"
                    />
                    <path
                      d="M6 10V8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V10"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="text-xs w-fit flex items-center mt-4 text-blue dark:text-[#046dbc] bg-[#E9F4FD] dark:bg-[#b3d9f8] px-3 py-2 rounded-lg">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_963_4080)">
                    <circle
                      cx="8.00065"
                      cy="8.00004"
                      r="6.66667"
                      stroke="#1D85D4"
                      stroke-width="1.5"
                    />
                    <path
                      d="M8 4.66663V8.66663"
                      stroke="#1D85D4"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <circle
                      cx="8.00065"
                      cy="10.6667"
                      r="0.666667"
                      fill="#1D85D4"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_963_4080">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ml-2">
                  Network fees apply, final amount will be based on blockchain
                  congestion
                </span>
              </div>
            </div>

            {/* Withdraw Button */}
            <button className="w-full bg-[#2092E9] mt-4 text-white rounded-full cursor-pointer py-3 text-sm font-semibold focus:outline-none hover:brightness-105 transition">
              Withdraw USDT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsdtWithdrawPage;
