import { useState, useRef, useEffect } from "react";
import { Send, Bot, Loader2 } from "lucide-react";
import { useUserProfile } from "../contexts/UserProfileContext";
//import Toast from "../components/withdraw/Toast";

import Navbar from "../components/dashboard/Navbar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Knowledge base about SaveFi
const knowledgeBase = {
  about: {
    keywords: [
      "what is savefi",
      "about savefi",
      "tell me about",
      "what does savefi do",
      "savefi about",
      "about",
      "what is this",
      "explain savefi",
      "how does savefi work",
      "what's savefi",
    ],
    response:
      "**What is SaveFi?** 🏦\n\nSaveFi is a decentralized savings platform that helps you grow your wealth through smart savings plans. We offer:\n\n• **Multiple Savings Plans** - Choose from FlexFi, GrowFi, VaultFi, or SwiftFi based on your goals\n• **Competitive Interest Rates** - Earn up to 8% APY on your deposits\n• **USDT-Based Savings** - Save in stablecoins to protect against volatility\n• **Secure & Transparent** - Your funds are protected with bank-grade security\n• **Referral Rewards** - Earn SFP points by inviting friends\n\nSaveFi makes saving simple, secure, and rewarding. Start your savings journey today!",
  },
  greetings: {
    keywords: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
    ],
    response:
      "Hello! 👋 I'm SaveBot, your SaveFi assistant. I can help you with:\n\n• Savings plans (FlexFi, GrowFi, VaultFi, SwiftFi)\n• Deposits and withdrawals\n• Wallet connection\n• Referral program\n• Transactions\n\nWhat would you like to know?",
  },
  plans: {
    keywords: ["plan", "plans", "savings", "saving", "options", "types"],
    response:
      "SaveFi offers 4 unique savings plans:\n\n**FlexFi** - Flexible savings with no lock period. Withdraw anytime with 2% APY.\n\n**GrowFi** - Growth-focused plan with 4% APY. 30-day minimum lock period.\n\n**VaultFi** - High-yield vault with 8% APY. 90-day lock period for maximum returns.\n\n**SwiftFi** - Quick savings for short-term goals. 6% APY with 14-day lock.\n\nWould you like details about any specific plan?",
  },
  flexfi: {
    keywords: ["flexfi", "flex fi", "flexible"],
    response:
      "**FlexFi Plan** 🔄\n\n• APY: 2%\n• Lock Period: None (withdraw anytime)\n• Minimum Deposit: $10 USDT\n• Best For: Emergency funds, everyday savings\n\nFlexFi gives you complete flexibility - access your funds whenever you need them while still earning interest!",
  },
  growfi: {
    keywords: ["growfi", "grow fi", "growth"],
    response:
      "**GrowFi Plan** 📈\n\n• APY: 4%\n• Lock Period: 30 days minimum\n• Minimum Deposit: $50 USDT\n• Best For: Medium-term goals, vacation funds\n\nGrowFi offers double FlexFi's returns with just a 30-day commitment. Perfect for planned expenses!",
  },
  vaultfi: {
    keywords: ["vaultfi", "vault fi", "vault", "high yield"],
    response:
      "**VaultFi Plan** 🏦\n\n• APY: 8%\n• Lock Period: 90 days\n• Minimum Deposit: $100 USDT\n• Best For: Long-term savings, wealth building\n\nVaultFi offers our highest returns for committed savers. Lock your funds for 90 days and watch them grow!",
  },
  swiftfi: {
    keywords: ["swiftfi", "swift fi", "swift", "quick"],
    response:
      "**SwiftFi Plan** ⚡\n\n• APY: 6%\n• Lock Period: 14 days\n• Minimum Deposit: $25 USDT\n• Best For: Short-term goals, quick savings challenges\n\nSwiftFi is perfect for short sprints - save for 2 weeks and earn solid returns!",
  },
  deposit: {
    keywords: ["deposit", "add money", "fund", "add funds", "top up"],
    response:
      "**How to Deposit** 💰\n\n1. Go to your Dashboard or Savings Plan page\n2. Click the 'Deposit' button on any plan card\n3. Enter the amount you want to deposit\n4. Confirm the transaction\n\nDeposits are processed instantly and your balance updates immediately. You'll receive a notification once complete!",
  },
  withdraw: {
    keywords: ["withdraw", "withdrawal", "take out", "cash out", "remove"],
    response:
      "**How to Withdraw** 💸\n\n1. Navigate to your plan details\n2. Click the 'Withdraw' button\n3. Enter the withdrawal amount\n4. Confirm the transaction\n\n⚠️ **Note:** Early withdrawals from locked plans (GrowFi, VaultFi, SwiftFi) may incur penalties. FlexFi has no withdrawal restrictions!",
  },
  wallet: {
    keywords: ["wallet", "connect", "connection", "metamask", "crypto"],
    response:
      "**Wallet Connection** 🔗\n\nSaveFi supports multiple wallet options:\n\n• MetaMask\n• Trust Wallet\n• Coinbase Wallet\n• WalletConnect\n\nTo connect:\n1. Click 'Connect Wallet' on the homepage\n2. Select your preferred wallet\n3. Approve the connection request\n\nYour wallet address will be securely linked to your SaveFi account!",
  },
  referral: {
    keywords: [
      "referral",
      "refer",
      "invite",
      "friend",
      "bonus",
      "sfp",
      "points",
    ],
    response:
      "**Referral Program** 🎁\n\n• Earn SFP (SaveFi Points) for every friend you refer\n• Get bonus rewards when they make their first deposit\n• Track your referrals in the Referrals page\n• Redeem SFP for exclusive benefits\n\nShare your unique referral link and start earning rewards today!",
  },
  transactions: {
    keywords: ["transaction", "transactions", "history", "activity", "records"],
    response:
      "**Transactions** 📊\n\nView all your account activity in the Transactions page:\n\n• Deposits\n• Withdrawals\n• Interest earnings\n• Referral bonuses\n\nFilter by type, date, or status. Click any transaction to see full details including timestamps, amounts, and confirmation status.",
  },
  interest: {
    keywords: [
      "interest",
      "apy",
      "yield",
      "returns",
      "earn",
      "earning",
      "rate",
      "rates",
    ],
    response:
      "**Interest & APY** 💹\n\nInterest is calculated daily and compounded:\n\n• FlexFi: 2% APY\n• GrowFi: 4% APY\n• SwiftFi: 6% APY\n• VaultFi: 8% APY\n\nAPY = Annual Percentage Yield. Your actual daily earnings depend on your deposited amount and the plan's rate. Interest accrues automatically!",
  },
  security: {
    keywords: ["security", "safe", "secure", "protection", "insurance"],
    response:
      "**Security** 🔒\n\nYour funds are protected by:\n\n• Bank-grade encryption\n• Multi-signature wallets\n• Regular security audits\n• 2FA authentication option\n\nSaveFi prioritizes the safety of your assets. We never store your private keys!",
  },
  kyc: {
    keywords: ["kyc", "verification", "verify", "identity", "documents"],
    response:
      "**KYC Verification** 📝\n\nKYC (Know Your Customer) verification:\n\n1. Go to Profile > Security\n2. Upload required documents\n3. Wait for review (usually 24-48 hours)\n4. Get verified status\n\nVerified accounts enjoy higher limits and full platform access!",
  },
  support: {
    keywords: ["support", "help", "contact", "issue", "problem", "assistance"],
    response:
      "**Need Help?** 🆘\n\n• Visit Help & Support in your profile\n• Check our FAQ section\n• Email: support@savefi.com\n• Response time: Within 24 hours\n\nI'm also here to answer your questions! What can I help you with?",
  },
  fees: {
    keywords: ["fee", "fees", "cost", "charge", "charges", "penalty"],
    response:
      "**Fees & Charges** 💵\n\n• Deposits: FREE\n• Withdrawals: Small network fee only\n• Early withdrawal penalty: 2-5% (on locked plans)\n• Account maintenance: FREE\n\nWe keep fees minimal so you keep more of your earnings!",
  },
  dashboard: {
    keywords: ["dashboard", "overview", "home", "main"],
    response:
      "**Dashboard** 📱\n\nYour Dashboard shows:\n\n• Total balance across all plans\n• Active savings plans\n• Recent transactions\n• Quick deposit/withdraw actions\n• Earnings summary\n\nIt's your command center for managing all SaveFi activities!",
  },
};

const findBestResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase().trim();

  // Check each category for keyword matches
  let bestMatch = { score: 0, response: "" };

  for (const category of Object.values(knowledgeBase)) {
    const matchCount = category.keywords.filter((keyword) =>
      normalizedInput.includes(keyword)
    ).length;

    if (matchCount > bestMatch.score) {
      bestMatch = { score: matchCount, response: category.response };
    }
  }

  // Return best match or default response
  if (bestMatch.score > 0) {
    return bestMatch.response;
  }

  // Default response for unrecognized queries
  return "I'm not sure I understand that question. Here's what I can help you with:\n\n• **Savings Plans** - FlexFi, GrowFi, VaultFi, SwiftFi\n• **Deposits & Withdrawals** - How to add or remove funds\n• **Wallet** - Connecting your crypto wallet\n• **Referrals** - Earning rewards by inviting friends\n• **Transactions** - Viewing your activity history\n• **Security & KYC** - Account protection and verification\n\nTry asking about any of these topics!";
};

export default function Savebot2() {
  const { profile } = useUserProfile();
  /* const [toast, setToast] = useState<{
    message: string;
    description?: string;
    type: "success" | "error";
  } | null>(null); */

  // Extract user name for the greeting
  const userName = profile?.first_name || profile?.username || "";

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi ${userName}! 👋 I'm SaveBot, your SaveFi assistant. I can help you with questions about savings plans, deposits, withdrawals, referrals, and more. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate typing delay for natural feel
    setTimeout(() => {
      const response = findBestResponse(input);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      setIsLoading(false);
    }, 500 + Math.random() * 500);
  };

  const suggestedQuestions = [
    "What savings plans are available?",
    "How do I deposit funds?",
    "Tell me about FlexFi",
    "How does the referral program work?",
  ];

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-black dark:text-white">
      <Navbar title="SaveBot" />

      <div className="space-y-4 flex flex-col h-[calc(100vh-5rem)] max-w-4xl mx-auto">
        {/* Chat Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto pr-2 space-y-4 pb-4"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Bot className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">SaveBot</h1>
              <p className="text-sm text-muted-foreground">
                Your SaveFi AI Assistant
              </p>
            </div>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center ${
                  message.role === "assistant"
                    ? "bg-primary/10"
                    : "bg-secondary"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <span className="text-xs font-semibold text-foreground">
                    U
                  </span>
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl px-4 py-2.5 bg-muted">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Questions */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2 py-4">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestion(question)}
                className="px-3 py-1.5 text-xs rounded-full border border-border hover:bg-muted transition-colors text-foreground"
              >
                {question}
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 pt-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask SaveBot anything..."
            disabled={isLoading}
            className="flex-1 h-10 px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="h-10 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
