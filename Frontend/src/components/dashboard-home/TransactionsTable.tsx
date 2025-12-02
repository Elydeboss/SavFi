import { useState, useEffect, useMemo } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import TransactionDetailModal from "./TransactionDetailModal";
import { useNavigate } from "react-router-dom";

type TransactionFilter =
  | "All"
  | "Deposit"
  | "Withdrawal"
  | "Conversion"
  | "Interest"
  | "Referral";
type TxStatus = "Success" | "Pending" | "Failed";

interface Transaction {
  date: string;
  type: string;
  amount: string;
  status: TxStatus;
  source: string;
}

interface TransactionsTableProps {
  transactions?: Transaction[]; // optional;
  loading?: boolean; // optional
}

const TransactionsTable = ({
  transactions: incomingTransactions = [], //  default to empty (no dummy data)
  loading = false,
}: TransactionsTableProps) => {
  const navigate = useNavigate();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //  Use only what is passed in
  const transactions = incomingTransactions;

  // Filters
  const filters: TransactionFilter[] = [
    "All",
    "Deposit",
    "Withdrawal",
    "Conversion",
    "Interest",
    "Referral",
  ];
  const [activeFilter, setActiveFilter] = useState<TransactionFilter>("All");

  const getCategory = (tx: Transaction): TransactionFilter => {
    const t = tx.type.toLowerCase();
    if (t.includes("deposit")) return "Deposit";
    if (t.includes("withdrawal")) return "Withdrawal";
    if (t.includes("conversion")) return "Conversion";
    if (t.includes("interest")) return "Interest";
    if (t.includes("referral")) return "Referral";
    return "All";
  };

  const filteredTransactions = useMemo(() => {
    if (activeFilter === "All") return transactions;
    return transactions.filter((t) => getCategory(t) === activeFilter);
  }, [transactions, activeFilter]);

  const hasAnyTransactions = transactions.length > 0;
  const hasFilteredResults = filteredTransactions.length > 0;

  const getStatusColor = (status: TxStatus) => {
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
        return "text-foreground bg-gray-50 dark:bg-neutral-50";
    }
  };

  const EmptyNewUser = () => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-600 p-10 text-center bg-neutral-50 dark:bg-gray-700">
      <div className="text-2xl font-semibold text-foreground mb-2">
        No transactions yet
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        When you deposit, convert to USDT/USDC, or start a plan, your activity
        will appear here.
      </p>
    </div>
  );

  const EmptyFilter = () => (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-600 p-10 text-center bg-neutral-50 dark:bg-gray-700">
      <div className="text-2xl font-semibold text-foreground mb-2">
        No “{activeFilter}” found
      </div>
      <p className="text-sm text-muted-foreground max-w-md">
        Try a different filter or clear filters to see all your transactions.
      </p>
      <button
        onClick={() => setActiveFilter("All")}
        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90"
      >
        Clear filter
      </button>
    </div>
  );

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

      {loading ? (
        <div className="grid gap-3">
          {[...Array(isMobile ? 3 : 5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : !hasAnyTransactions ? (
        <EmptyNewUser />
      ) : !hasFilteredResults ? (
        <EmptyFilter />
      ) : (
        <div className="rounded-2xl overflow-hidden">
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
      )}

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
