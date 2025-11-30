import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import TransactionDetailModal from "./TransactionDetailModal";
import { useNavigate } from "react-router-dom";

type TransactionType =
  | "All"
  | "Deposit"
  | "Withdrawal"
  | "Conversion"
  | "Interest"
  | "Referral";

interface Transaction {
  date: string;
  type: string;
  amount: string;
  status: "Success" | "Pending" | "Failed";
  source: string;
}

const TransactionsTable = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<TransactionType>("All");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const transactions: Transaction[] = [
    {
      date: "Nov 15, 2025",
      type: "Deposit",
      amount: "+₦50,000",
      status: "Success",
      source: "Naira",
    },
    {
      date: "Nov 15, 2025",
      type: "Interest",
      amount: "+86 USDT",
      status: "Pending",
      source: "Interest",
    },
    {
      date: "Nov 15, 2025",
      type: "Conversion",
      amount: "₦100,000",
      status: "Failed",
      source: "Crypto",
    },
    {
      date: "Nov 15, 2025",
      type: "Referral bonus",
      amount: "+86 USDT",
      status: "Success",
      source: "Referral",
    },
    {
      date: "Nov 15, 2025",
      type: "Deposit",
      amount: "+86 USDT",
      status: "Success",
      source: "Crypto",
    },
    {
      date: "Nov 15, 2025",
      type: "Withdrawal",
      amount: "-₦100,000",
      status: "Success",
      source: "Naira",
    },
    {
      date: "Nov 15, 2025",
      type: "System adjustment",
      amount: "-0.1 USDT",
      status: "Success",
      source: "System",
    },
  ];

  const filters: TransactionType[] = [
    "All",
    "Deposit",
    "Withdrawal",
    "Conversion",
    "Interest",
    "Referral",
  ];

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === "All") return true;
    return t.type.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Success":
        return "text-success bg-green-50";
      case "Pending":
        return "text-[#E89E50] bg-yellow-50";
      case "Failed":
        return "text-red-500 bg-red-50";
      default:
        return "text-muted-foreground bg-gray-100";
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "Naira":
        return "text-[#E89E50] bg-yellow-50";
      case "Crypto":
        return "text-blue bg-blue-50";
      case "Interest":
        return "text-purple-500 bg-purple-50";
      case "Referral":
        return "text-success bg-green-50";
      case "System":
        return "text-muted-foreground bg-gray-100 dark:bg-gray-600 dark:text-white";
      default:
        return "text-foreground  bg-gray-50 dark:bg-neutral-50";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Transactions
        </h3>
        <div className="flex items-center flex-wrap gap-2 p-4 overflow-x-auto">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-blue text-white"
                  : "bg-gray-200 dark:bg-neutral-50 text-muted-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className=" rounded-2xl overflow-hidden">
        {isMobile ? (
          <div className="p-4 space-y-3">
            {filteredTransactions.map((transaction, index) => (
              <div
                key={index}
                onClick={() => setSelectedTransaction(transaction)}
                className="bg-neutral-50 rounded-xl p-4 space-y-3 cursor-pointer hover:bg-neutral-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {transaction.type}
                  </span>
                  <span
                    className={`text-sm font-medium py-1 px-2 rounded-full ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {transaction.date}
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {transaction.amount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${getSourceColor(
                      transaction.source
                    )}`}
                  >
                    {transaction.source}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden mt-6 rounded-xl">
            <table className="min-w-full ">
              <thead className="bg-[#E5E8EB] dark:bg-[#414c5d] rounded-md font-semibold">
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground uppercase tracking-wider">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#F7F8F9] dark:bg-gray-700 ">
                {filteredTransactions.map((transaction, index) => (
                  <tr
                    key={index}
                    onClick={() => setSelectedTransaction(transaction)}
                    className="hover:bg-secondary/90 dark:hover:bg-gray-600 last:hover:bg-transparent last:dark:hover:bg-transparent transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-muted-foreground">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium py-1 px-2 rounded-full ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getSourceColor(
                          transaction.source
                        )}`}
                      >
                        {transaction.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="p-4 mt-3 flex justify-center">
        <button
          onClick={() => navigate("/transactions")}
          className="font-semibold text-blue cursor-pointer flex items-center gap-1"
        >
          See all transactions
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
