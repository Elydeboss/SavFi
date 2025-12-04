import { useState } from "react";

import Share from "../assets/referral/Share.svg";
import User from "../assets/referral/user-add.svg";
import Cubes from "../assets/referral/3dcube.svg";
import Gift from "../assets/referral/gift.svg";
import { ChevronDown, ChevronRight } from "lucide-react";
import Navbar from "../components/dashboard/Navbar";
import { useUserProfile } from "../contexts/UserProfileContext";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

const faqs: FaqItem[] = [
  {
    id: "what-is",
    question: "What is SaveFi point?",
    answer:
      "SaveFi points (SFP) are rewards you earn when you and your friends save using eligible plans. You can later convert them to USDT or withdraw to your wallet once unlocked.",
  },
  {
    id: "why-5",
    question: "Why 5 referrals to unlock?",
    answer:
      "You need a total of 5 successful referrals to unlock withdrawals. A referral is successful when your friend signs up, completes KYC and saves with any eligible plan.",
  },
  {
    id: "point-usdt",
    question: "Point to USDT conversion rules",
    answer:
      "The conversion rate is based on the current SaveFi point valuation shown in your dashboard. When you convert, SFP will be deducted and equivalent USDT will be credited to your balance.",
  },
  {
    id: "swiftfi",
    question: "Why doesn’t the emergency plan (SwiftFi) count",
    answer:
      "SwiftFi plans are designed for instant access and do not participate in long-term savings rewards, so they are excluded from the referral bonus calculation.",
  },
];

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className = "",
}) => (
  <div
    className={`bg-neutral-50 rounded-2xl shadow-card px-4 dark:bg-gray-700 dark:text-white py-8 ${className}`}
  >
    {children}
  </div>
);

const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <h2 className="text-lg font-semibold  text-slate-900 dark:text-white mb-4">
    {children}
  </h2>
);

const Referrals = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>("what-is");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const { profile } = useUserProfile();

  const referralData: any[] = [];

  const toggleFaq = (id: string) => {
    setOpenFaqId((current) => (current === id ? null : id));
  };

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

  const referralCode = profile?.username
    ? profile.username.toUpperCase()
    : "SAVEFIUSER";
  const referralLink = `https://savefi.com/invite/${
    profile?.username || "savefiuser"
  }`;

  return (
    <div className="min-h-screen  dark:bg-gray-600 dark:text-white">
      <Navbar title="Referrals" />
      {/* MAIN */}
      <div className="space-y-6 mt-18 md:mt-0 p-4">
        {/* Top grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Invite card */}
          <Card>
            <div className="mb-4">
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                Invite &amp; Earn SaveFi points
              </h1>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed dark:text-white/80">
                Refer 5 friends who save with any plan (except swiftFi) and
                unlock 0.5 SFP your token reward
              </p>
            </div>

            {/* Referral link */}
            <div className="space-y-3">
              <div>
                <p className="text-[11px]  tracking-wide text-[#67886b] font-semibold mb-1 dark:text-white">
                  Your referral link
                </p>
                <div className="flex items-center gap-2 rounded-lg bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-xs text-black-text">
                  <span className="truncate font-medium dark:text-white">
                    {referralLink}
                  </span>
                  <button
                    onClick={() => copyToClipboard(referralLink)}
                    className="cursor-pointer ml-auto"
                    aria-label="Copy referral link"
                  >
                    {/* copy icon */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 9.1665C5 6.80948 5 5.63097 5.73223 4.89874C6.46447 4.1665 7.64298 4.1665 10 4.1665H12.5C14.857 4.1665 16.0355 4.1665 16.7678 4.89874C17.5 5.63097 17.5 6.80948 17.5 9.1665V13.3332C17.5 15.6902 17.5 16.8687 16.7678 17.6009C16.0355 18.3332 14.857 18.3332 12.5 18.3332H10C7.64298 18.3332 6.46447 18.3332 5.73223 17.6009C5 16.8687 5 15.6902 5 13.3332V9.1665Z"
                        stroke="#1D85D4"
                        stroke-width="1.5"
                      />
                      <path
                        d="M5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332V8.33317C2.5 5.19047 2.5 3.61913 3.47631 2.64281C4.45262 1.6665 6.02397 1.6665 9.16667 1.6665H12.5C13.8807 1.6665 15 2.78579 15 4.1665"
                        stroke="#1D85D4"
                        stroke-width="1.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Referral code */}
              <div>
                <p className="text-[11px] tracking-wide text-[#67886b] font-semibold mb-1 dark:text-white">
                  Your referral code
                </p>
                <div className="flex items-center gap-2 rounded-lg  bg-neutral-200 dark:bg-gray-600 px-3 py-2.5 text-xs text-black-text">
                  <span className="font-semibold dark:text-white">
                    {referralCode}
                  </span>
                  <button
                    onClick={() => copyToClipboard(`${referralCode}`)}
                    className="cursor-pointer ml-auto"
                    aria-label="Copy referral code"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 9.1665C5 6.80948 5 5.63097 5.73223 4.89874C6.46447 4.1665 7.64298 4.1665 10 4.1665H12.5C14.857 4.1665 16.0355 4.1665 16.7678 4.89874C17.5 5.63097 17.5 6.80948 17.5 9.1665V13.3332C17.5 15.6902 17.5 16.8687 16.7678 17.6009C16.0355 18.3332 14.857 18.3332 12.5 18.3332H10C7.64298 18.3332 6.46447 18.3332 5.73223 17.6009C5 16.8687 5 15.6902 5 13.3332V9.1665Z"
                        stroke="#1D85D4"
                        stroke-width="1.5"
                      />
                      <path
                        d="M5 15.8332C3.61929 15.8332 2.5 14.7139 2.5 13.3332V8.33317C2.5 5.19047 2.5 3.61913 3.47631 2.64281C4.45262 1.6665 6.02397 1.6665 9.16667 1.6665H12.5C13.8807 1.6665 15 2.78579 15 4.1665"
                        stroke="#1D85D4"
                        stroke-width="1.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* TOAST MESSAGE */}
              {toastVisible && (
                <div className="bg-[#9DE7C9] pt-1 pb-2 px-2 rounded-md inline-block">
                  <div className="mt-2 text-sm font-medium text-[#12553A]">
                    {toastMessage}
                  </div>
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex justify-between font-semibold  items-center gap-2">
                <p className="text-[11px] text-[#67886b] dark:text-white/80 mb-1">
                  Progress
                </p>
                <span className="text-[11px] text-[#67886b] dark:text-white/80">
                  0/5 referrals
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#eaedef]">
                <div className="h-full w-0/5 rounded-full bg-[#2BCB89] " />
              </div>
            </div>
          </Card>

          {/* Balance card */}
          <Card>
            <div className="flex items-start justify-between">
              <SectionTitle>SaveFi point balance</SectionTitle>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="flex gap-2">
                <div className="mt-1">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_527_5088)">
                      <path
                        d="M1.9375 16C1.9375 17.8467 2.30124 19.6753 3.00794 21.3815C3.71465 23.0876 4.75049 24.6379 6.05631 25.9437C7.36214 27.2495 8.91237 28.2853 10.6185 28.9921C12.3247 29.6988 14.1533 30.0625 16 30.0625C17.8467 30.0625 19.6753 29.6988 21.3815 28.9921C23.0876 28.2853 24.6379 27.2495 25.9437 25.9437C27.2495 24.6379 28.2853 23.0876 28.9921 21.3815C29.6988 19.6753 30.0625 17.8467 30.0625 16C30.0625 14.1533 29.6988 12.3247 28.9921 10.6185C28.2853 8.91237 27.2495 7.36214 25.9437 6.05631C24.6379 4.75049 23.0876 3.71465 21.3815 3.00794C19.6753 2.30124 17.8467 1.9375 16 1.9375C14.1533 1.9375 12.3247 2.30124 10.6185 3.00794C8.91237 3.71465 7.36214 4.75049 6.05631 6.05631C4.75049 7.36214 3.71465 8.91237 3.00794 10.6185C2.30124 12.3247 1.9375 14.1533 1.9375 16Z"
                        stroke="#1D85D4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.25 12.875H9.75L14.75 19.125H17.25"
                        stroke="#1D85D4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M14.75 12.875H17.25L22.25 19.125H24.75"
                        stroke="#1D85D4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M7.25 19.125H9.75"
                        stroke="#1D85D4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22.25 12.875H24.75V15.375"
                        stroke="#1D85D4"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_527_5088">
                        <rect width="32" height="32" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div>
                  <div className="text-4xl font-bold text-black dark:text-white">
                    0.0 SFP
                  </div>
                  <p className="mt-1 text-base font-medium text-center text-[#67686B] dark:text-white/80">
                    ~0.00 USDT
                  </p>
                </div>
              </div>

              <div className="mt-3 w-full text-center rounded-full bg-[#FFF7EE] dark:bg-gray-600 px-4 py-3 font-medium text-sm text-[#B57C3E] dark:text-[#f4a44e] ">
                Locked – refer 5 users to unlock withdrawal
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                className="inline-flex flex-1 items-center justify-center rounded-full bg-blue px-2 py-2.5 opacity-60 font-semibold text-white text-[15px] "
                disabled
                onClick={() => alert("Convert to USDT clicked")}
              >
                Convert to USDT
              </button>
              <button
                className="inline-flex flex-1 items-center justify-center rounded-full border border-[#98CDF5] cursor-pointer  px-2 py-2.5 text-[15px] font-semibold text-[#98CDF5] "
                onClick={() => alert("Withdraw to wallet clicked")}
              >
                Withdraw to wallet
              </button>
            </div>
          </Card>
        </div>

        {/* How referral reward works */}
        <Card>
          <SectionTitle>How referral reward works</SectionTitle>
          <div className="mt-4 grid gap-6 md:grid-cols-4">
            {[
              {
                icon: Share,
                title: "1. Share your link",
                desc: "Send your unique referral link or code to your friends",
              },
              {
                icon: User,
                title: "2. Friends join SaveFi",
                desc: "Friends sign up and complete KYC",
              },
              {
                icon: Cubes,
                title: "3. Choose a saving plan",
                desc: "Friends choose any saving plan of their choice except SwiftFi",
              },
              {
                icon: Gift,
                title: "3. You both get rewarded",
                desc: "Once they complete saving, you both receive 0.5 SFP",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#E9F4FD] dark:bg-gray-600">
                  <img src={step.icon} alt="Icon" className="w-6" />
                </div>
                <p className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
                  {step.title}
                </p>
                <p className="text-[13px] leading-relaxed text-slate-500 dark:text-white/80">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Referral history */}
        <div>
          <SectionTitle>Referral History</SectionTitle>

          <div className="mt-3 overflow-hidden rounded-xl">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-[#E5E8EB] dark:bg-[#414c5d] text-[15px] font-medium tracking-wide text-black dark:text-white ">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Tokens earned</th>
                  <th className="px-4 py-3 font-semibold">Date joined</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-slate-200 dark:divide-gray-600 bg-[#F7F8F9] dark:bg-gray-700 text-[15px]">
                {referralData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-6 text-center text-sm text-black-text dark:text-white/80"
                    >
                      No referrals yet — share your link to start earning SFP.
                    </td>
                  </tr>
                ) : (
                  referralData.map((ref, idx) => (
                    <tr key={idx} className="text-sm">
                      <td className="px-4 py-3 text-black-text dark:text-white/80">
                        {ref.name}
                      </td>
                      <td className="px-4 py-3">
                        {ref.status === "saved" ? (
                          <span className="inline-block text-[#27B97D] bg-[#E9F4FD] dark:bg-[#0b2718]/20 rounded-full py-1.5 px-3 text-xs font-medium">
                            Eligible (Saved)
                          </span>
                        ) : ref.status === "kyc" ? (
                          <span className="inline-block text-xs font-medium text-[#1D85D4] bg-[#E9F4FD] dark:bg-[#0f1d28]/20 rounded-full py-1.5 px-3">
                            KYC completed
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full font-medium bg-[#EAEDEF] dark:bg-[#EAEDEF]/10 px-3 py-1.5 text-xs text-black dark:text-white/80">
                            Registered
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-black-text dark:text-white/80">
                        {ref.tokens || "-"}
                      </td>
                      <td className="px-4 py-3 text-black-text dark:text-white/80">
                        {ref.date}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-center">
            <button className="flex items-center gap-1 text-sm font-medium text-[#1D85D4] cursor-pointer">
              See all history
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* FAQ section */}
        <div className="mt-6 pb-10">
          <SectionTitle>Frequently Asked Questions</SectionTitle>

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((item) => {
              const isOpen = openFaqId === item.id;
              return (
                <div key={item.id} className="p-0">
                  <button
                    className="flex w-full items-center bg-neutral-50 dark:bg-gray-700 rounded-tl-lg rounded-tr-lg justify-between px-5 py-3 text-left cursor-pointer"
                    onClick={() => toggleFaq(item.id)}
                  >
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.question}
                    </span>
                    <span
                      className={`ml-4 inline-flex h-7 w-7 items-center justify-center rounded-full text-slate-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown size={24} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="border-t border-slate-100 dark:border-gray-700 px-5 pb-4 pt-2">
                      <p className="text-[12px] leading-relaxed text-slate-500 dark:text-white/80">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referrals;
