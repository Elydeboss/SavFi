import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { SavingsPlan } from "../../types/savings";
import ProgressBar from "./ProgressBar";
import FlexiFi from "../../assets/savingplan/vacation.svg";
import GrowFi from "../../assets/savingplan/growfi.svg";
import VaultFi from "../../assets/savingplan/december.svg";
import SwiftFi from "../../assets/savingplan/emergency.svg";

interface SavingsPlanCardProps {
  plan: SavingsPlan;
  delay?: number;
}

const iconMap = {
  "piggy-bank": FlexiFi,
  sprout: GrowFi,
  vault: VaultFi,
  zap: SwiftFi,
};

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

const SavingsPlanCard = ({ plan, delay = 0 }: SavingsPlanCardProps) => {
  const navigate = useNavigate();
  const Icon = iconMap[plan.icon as keyof typeof iconMap] || FlexiFi;
  const statusLabel = statusConfig[plan.status];
  const config = planTypeConfig[plan.planType];

  // Use orange progress bar for all completed states (100% progress)
  // CHANGE: Completed plans (100% progress) should have neutral styling
  const isCompleted = plan.progress === 100;
  const progressColor = isCompleted ? "warning" : config.progressColor;
  const cardBgColor = isCompleted ? "bg-[#D0D3D6]" : config.bgColor;
  const cardBorderColor = isCompleted ? "border-0" : config.borderColor;

  const handleViewDetails = () => {
    console.log("View details for plan:", plan.id);
    navigate(`/plan/${plan.id}`);
  };

  const handleWithdraw = () => {
    console.log("Withdraw from plan:", plan.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`bg-card rounded-2xl p-4 flex flex-col dark:bg-gray-700 dark:text-white  border ${cardBorderColor} ${cardBgColor}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div>
            <img src={Icon} alt={plan.icon} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-base truncate">
              {plan.name}
            </h3>
            <p className="text-xs text-muted-foreground">{plan.planType}</p>
          </div>
        </div>
        <span
          className={`text-xs font-medium ${statusLabel.textColor} whitespace-nowrap px-2 py-1 rounded-2xl ${statusLabel.bgColor}`}
        >
          {statusLabel.label}
        </span>
      </div>

      {/* Financial Details */}
      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Principal Amount</p>
          <p className="text-lg font-bold text-foreground">
            {plan.principalAmount}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              USDT
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {plan.availablePayout !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Available Payout
              </p>
              <p className="text-base font-bold text-foreground">
                {plan.availablePayout.toFixed(2)}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  USDT
                </span>
              </p>
            </div>
          )}

          {plan.interestEarned !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Interest Earned
              </p>
              <p className="text-base font-bold text-[#27B97D]">
                {plan.interestEarned}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  USDT
                </span>
              </p>
            </div>
          )}

          {plan.penalty !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Penalty</p>
              <p className="text-base font-bold text-[#E8362C]">
                {plan.penalty.toFixed(2)}{" "}
                <span className="text-xs font-normal text-[#E8362C]">USDT</span>
              </p>
            </div>
          )}

          {plan.totalPayout !== undefined && (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Payout</p>
              <p className="text-base font-bold text-foreground">
                {plan.totalPayout}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  USDT
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      {plan.progress !== undefined && (
        <div className="mb-4">
          <ProgressBar progress={plan.progress} color={progressColor} />
        </div>
      )}

      {/* Date Info */}
      <p className="text-xs text-muted-foreground mb-4">
        {plan.completedDate && `Completed: ${plan.completedDate}`}
        {plan.withdrawnDate && `Withdrawn: ${plan.withdrawnDate}`}
        {plan.maturityDate &&
          !plan.completedDate &&
          !plan.withdrawnDate &&
          `Mature: ${plan.maturityDate}`}
      </p>

      {/* Actions */}
      {plan.status === "awaiting_withdrawal" ? (
        <button
          onClick={handleWithdraw}
          className="w-full py-2 mt-auto rounded-full border border-[#7146e8] cursor-pointer font-semibold bg-[#7146E8] hover:bg-[#7146E8]/90 hover:border-[#7146e8]/90 text-white"
        >
          Withdraw
        </button>
      ) : (
        <button
          onClick={handleViewDetails}
          className={`w-full border py-2 font-semibold mt-auto cursor-pointer rounded-full ${
            isCompleted
              ? "border-black-text text-black-text hover:text-muted "
              : `${config.borderColor} ${config.color} hover:${config.bgColor}`
          } `}
        >
          View Details
        </button>
      )}
    </motion.div>
  );
};

export default SavingsPlanCard;
