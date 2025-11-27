import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { savingsPlans } from "../data/savings";
import Breadcrumb from "../components/Breadcrumb";
import { motion, AnimatePresence } from "framer-motion";
import ProgressBar from "../components/savingplans/ProgressBar";
import FlexiFi from "../assets/savingplan/vacation.svg";
import GrowFi from "../assets/savingplan/growfi.svg";
import VaultFi from "../assets/savingplan/december.svg";
import SwiftFi from "../assets/savingplan/emergency.svg";
import Navbar from "../components/dashboard/Navbar";
import { useState } from "react";

// Icon mapping
const iconMap = {
  "piggy-bank": FlexiFi,
  sprout: GrowFi,
  vault: VaultFi,
  zap: SwiftFi,
};

// Plan type configuration - matches SavingsPlanCard
const planTypeConfig = {
  FlexiFi: {
    color: "text-blue",
    bgColor: "bg-[#F2F8FE]",
    borderColor: "border-blue",
    progressColor: "success" as const,
  },
  GrowFi: {
    color: "text-[#27B97D]",
    bgColor: "bg-[#F7FFFB]",
    borderColor: "border-[#27B97D]",
    progressColor: "success" as const,
  },
  VaultFi: {
    color: "text-[#7146E8]",
    bgColor: "bg-[#F8F5FF]",
    borderColor: "border-[#7146E8]",
    progressColor: "purple" as const,
  },
  SwiftFi: {
    color: "text-[#E89E50]",
    bgColor: "bg-[#FFFDFB]",
    borderColor: "border-[#E89E50]",
    progressColor: "warning" as const,
  },
};

// Status configuration - matches SavingsPlanCard
const statusConfig = {
  active: {
    label: "Active",
    bgColor: "bg-[#EAFAF3]",
    textColor: "text-[#27B97D]",
  },
  locked: {
    label: "Locked",
    bgColor: "bg-[#FFF7EE]",
    textColor: "text-[#E89E50]",
  },
  completed: {
    label: "Completed",
    bgColor: "bg-[#E8E8E9]",
    textColor: "text-[#494A4E]",
  },
  awaiting_withdrawal: {
    label: "Awaiting withdrawal",
    bgColor: "bg-[#F2EDFF]",
    textColor: "text-[#5837B5]",
  },
  early_withdrawal: {
    label: "Early withdrawal",
    bgColor: "bg-[#FFEBEA]",
    textColor: "text-[#E8362C]",
  },
};

export default function PlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showWithdrawDialog, setShowWithdrawDialog] = useState(false);

  const plan = savingsPlans.find((p) => p.id === id);

  if (!plan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Plan not found
          </h1>
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Get configuration for this plan type
  const Icon = iconMap[plan.icon as keyof typeof iconMap] || FlexiFi;
  const statusLabel = statusConfig[plan.status];
  const config = planTypeConfig[plan.planType];
  const isCompleted = plan.progress === 100;
  const progressColor = isCompleted ? "warning" : config.progressColor;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const balance = plan.interestEarned
    ? plan.principalAmount + plan.interestEarned
    : plan.principalAmount;

  return (
    <div className="min-h-screen bg-neutral-200 dark:bg-gray-600 dark:text-white">
      <Navbar title={plan.name} />
      <div className="max-w-6xl mx-auto p-6">
        {/* Breadcrumb & Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Breadcrumb
            items={[
              { label: "Saving plans", href: "/savings" },
              { label: `${plan.planType}` },
            ]}
          />
        </motion.div>

        {/* Header Card - Using plan type colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-6 mb-6 border ${config.borderColor} ${config.bgColor} dark:bg-gray-700 dark:text-white`}
        >
          <div className="grid md:grid-cols-[30%_60%] gap-6 md:gap-[10%]">
            <div className="flex items-start  gap-3">
              <img src={Icon} alt={plan.name} />

              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {plan.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {plan.planType} •{" "}
                  {plan.maturityDate ? "3 months" : "Flexible"}
                </p>
                <p className="text-xs mb-2 text-muted-foreground">
                  Locked saving plan
                </p>
                <span
                  className={`text-xs  font-medium ${statusLabel.textColor} px-3 py-1.5 rounded-full ${statusLabel.bgColor}`}
                >
                  {statusLabel.label}
                </span>
              </div>
            </div>
            {/*  */}
            {/* Key Metrics */}
            <div className="grid grid-cols-3 items-center gap-6 md:border-l-2 md:border-gray-200 dark:md:border-white/80 md:pl-20">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Principal locked
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {plan.principalAmount}{" "}
                  <span className="text-base font-normal">USDT</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Interest earned
                </p>
                <p className="text-2xl font-bold text-[#27B97D]">
                  {plan.interestEarned ? (
                    <span>
                      {plan.interestEarned}{" "}
                      <span className="text-base font-normal">USDT</span>
                    </span>
                  ) : (
                    <span className="">
                      {plan.interestEarned}{" "}
                      <span className="text-base text-center mx-auto font-normal">
                        --
                      </span>
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Total balance
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {balance} <span className="text-base font-normal">USDT</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Progress & Timeline + Plan Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-[62%_35%] gap-6 mb-6">
          <div className=" space-y-3">
            {/* Progress & Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className=" bg-neutral-50 dark:bg-gray-700 rounded-xl py-6 px-4"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Progress & timeline
              </h2>

              <div className="mb-6">
                <ProgressBar progress={plan.progress} color={progressColor} />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Start date</p>
                  <p className="font-medium text-foreground">
                    {formatDate(plan.maturityDate ? "2025-11-25" : undefined)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Timeline</p>
                  <p className="font-medium text-foreground">
                    {plan.maturityDate ? "3 months" : "Flexible"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Maturity</p>
                  <p className="font-medium text-foreground">
                    {formatDate(plan.maturityDate)}
                  </p>
                </div>
              </div>
            </motion.div>
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-neutral-50 dark:bg-gray-700 rounded-xl py-6 px-4"
            >
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Recent Activity
              </h2>

              <div className="overflow-hidden mt-6 rounded-xl">
                <table className="w-full text-sm">
                  <thead className="bg-[#E5E8EB] dark:bg-[#414c5d] rounded-md font-semibold">
                    <tr className="">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#F7F8F9] dark:bg-gray-600 divide-y divide-slate-200 dark:divide-gray-700">
                    <tr className="">
                      <td className="py-3 px-4 text-foreground">
                        Nov 15, 2025
                      </td>
                      <td className="py-3 px-4 text-foreground">Deposit</td>
                      <td className="py-3 px-4 text-[#27B97D] font-medium">
                        +{plan.principalAmount} USDT
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#27B97D] bg-[#EAFAF3] px-2 py-1 rounded-full text-xs">
                          Success
                        </span>
                      </td>
                    </tr>
                    {plan.penalty && (
                      <tr className="">
                        <td className="py-3 px-4 text-foreground">
                          Nov 15, 2025
                        </td>
                        <td className="py-3 px-4 text-foreground">
                          Early withdrawal
                        </td>
                        <td className="py-3 px-4 text-[#E8362C] font-medium">
                          {plan.penalty} USDT
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[#E89E50] bg-[#FFF7EE] px-2 py-1 rounded-full text-xs">
                            Pending
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>

          {/* Plan Detail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-50 dark:bg-gray-700 rounded-xl py-6 px-4"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Plan detail
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan type</span>
                <span className="font-medium text-foreground">
                  {plan.planType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Custom plan name</span>
                <span className="font-medium text-foreground">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Interest rate</span>
                <span className="font-medium text-foreground">5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Early withdrawal penalty
                </span>
                <span className="font-medium text-foreground">
                  Interest removal
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Early withdrawal charges
                </span>
                <span className="font-medium text-foreground">
                  {plan.penalty ? `${plan.penalty} USDT` : "0.5 USDT"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accrual cycle</span>
                <span className="font-medium text-foreground">
                  Daily (0.23%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expected return</span>
                <span className="font-medium text-[#27B97D]">
                  {balance} USDT
                </span>
              </div>
              {/* Important Notice & Withdraw Early Button - Hidden for completed plans */}
              {!isCompleted && (
                <div>
                  <div className="flex items-start gap-3 mb-4  bg-[#FFF7EE] dark:bg-gray-600 p-4 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-[#f4dbc1] flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4 text-[#E89E50]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Important
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {plan.planType} is a{" "}
                        {plan.maturityDate ? "3 month" : "flexible"} saving
                        plan. Your principal cannot be topped up. Withdrawing
                        before maturity will trigger an early withdrawal
                        penalty.
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full px-4 py-2.5 rounded-full font-semibold cursor-pointer border-2 border-[#E8362C] text-[#E8362C] hover:bg-[#FFEBEA]"
                    onClick={() => setShowWithdrawDialog(true)}
                  >
                    Withdraw Early
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Early Withdrawal Modal */}
      <AnimatePresence>
        {showWithdrawDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWithdrawDialog(false)}
              className="fixed inset-0 bg-black/80 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 w-full max-w-[425px] bg-neutral-50 dark:bg-gray-700 rounded-lg p-6 shadow-lg"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-center flex-col gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#FFEBEA] flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-[#E8362C]" />
                  </div>
                  <h2 className="text-lg font-semibold">
                    Early Withdrawal Warning
                  </h2>
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Are you sure you want to withdraw early? This action will:
                </p>
              </div>

              {/* Consequences List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8362C] mt-1" />
                  <p className="text-xs text-muted-foreground">
                    Remove all earned interest ({plan?.interestEarned || 0}{" "}
                    USDT)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8362C] mt-1" />
                  <p className="text-xs text-muted-foreground">
                    Charge an early withdrawal fee ({plan?.penalty || 0.5} USDT)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8362C] mt-1" />
                  <p className="text-xs text-muted-foreground">
                    You'll receive only your principal amount minus the penalty
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-neutral-200 dark:bg-gray-600 rounded-lg p-4 space-y-2 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">
                    Principal Amount:
                  </span>
                  <span className="font-medium">
                    {plan?.principalAmount || 0} USDT
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Penalty:</span>
                  <span className="font-medium text-[#E8362C]">
                    -{plan?.penalty || 0.5} USDT
                  </span>
                </div>
                <div className="border-t border-gray-200 text-sm pt-2 flex justify-between">
                  <span className="font-semibold">You'll Receive:</span>
                  <span className="font-bold text-foreground">
                    {(
                      (plan?.principalAmount || 0) - (plan?.penalty || 0.5)
                    ).toFixed(2)}{" "}
                    USDT
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setShowWithdrawDialog(false)}
                  className="w-full py-2.5 px-4 rounded-full font-semibold cursor-pointer border border-gray-700 text-gray-700 dark:text-white/80 dark:border-white/80"
                >
                  Cancel
                </button>
                <button
                  className="w-full py-2.5 px-4 rounded-full font-semibold cursor-pointer bg-[#E8362C] hover:bg-[#E8362C]/90 text-white"
                  onClick={() => {
                    console.log("Confirming early withdrawal");
                    setShowWithdrawDialog(false);
                  }}
                >
                  Confirm Withdrawal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
