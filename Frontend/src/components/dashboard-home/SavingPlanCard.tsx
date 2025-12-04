import { useNavigate } from "react-router-dom";

interface SavingPlanCardProps {
  name: string;
  interest: string;
  color: "blue" | "green" | "purple" | "orange";
  progress: number;
  available: number;
  principal: number;
  interestAmount: number;
  maturity: string;
  status: "running" | "not-started" | "available";
}

const SavingPlanCard = ({
  name,
  interest,
  color,
  progress,
  available,
  principal,
  interestAmount,
  maturity,
  status,
}: SavingPlanCardProps) => {
  const navigate = useNavigate();

  const colorClasses = {
    blue: {
      bg: "bg-[#F2F8FE]",
      text: "text-blue",
      badge: "bg-blue",
      progress: "text-blue",
      button: "bg-blue hover:bg-blue/90",
      borderColor: "border-primary",
    },
    green: {
      bg: "bg-[#F7FFFB]",
      text: "text-success",
      badge: "bg-success",
      progress: "text-success",
      button: "bg-success hover:bg-success/90",
      borderColor: "border-success",
    },
    purple: {
      bg: "bg-[#F8F5FF]",
      text: "text-[#7146E8]",
      badge: "bg-[#7146E8]",
      progress: "text-[#7146E8]",
      button: "bg-[#7146E8] hover:bg-[#7146E8]/90",
      borderColor: "border-[#7146E8]",
    },
    orange: {
      bg: "bg-[#FFFDFB]",
      text: "text-[#E89E50]",
      badge: "bg-[#E89E50]",
      progress: "text-[#E89E50]",
      button: "bg-[#E89E50] hover:bg-[#E89E50]/90",
      borderColor: "border-[#E89E50]",
    },
  };

  const colors = colorClasses[color];

  const getButtonText = () => {
    if (status === "not-started") return "Start plan";
    if (status === "available") return "Add funds";
    return "View plan";
  };

  const handleClick = () => {
    let route;

    // Map saving plan names to routes
    switch (name.toLowerCase()) {
      case "flexfi":
        route = "/savings/flexfi/create"; // Add the route for FlexFi plan
        break;
      case "growfi":
        route = "/savings/growfi/create"; // Add the route for GrowFi plan
        break;
      case "vaultfi":
        route = "/savings/vaultfi/create"; // Add the route for VaultFi plan
        break;
      case "swiftfi":
        route = "/savings/swiftfi"; // Add the route for SwiftFi plan
        break;
      default:
        route = `/savings/${name.toLowerCase()}`; // Fallback to default route
    }

    navigate(route);
  };

  return (
    <div
      className={`${colors.bg} dark:bg-gray-700 border ${colors.borderColor} rounded-2xl p-5 relative overflow-hidden`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className={`text-lg font-bold ${colors.text} mb-1`}>{name}</h4>
          <span
            className={`text-xs ${colors.badge} text-white px-2 py-1 rounded-full`}
          >
            {interest}
          </span>
        </div>
        <div className="relative w-12 h-12">
          <svg className="transform -rotate-90 w-12 h-12">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-neutral-200"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
              className={colors.progress}
              strokeLinecap="round"
            />
          </svg>
          <span
            className={`absolute inset-0 flex items-center justify-center text-xs font-bold ${colors.text}`}
          >
            {progress}%
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">
            Available balance:
          </p>
          <p className="text-2xl font-bold text-foreground">
            {available} <span className="text-sm font-normal">USDT</span>
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">
            Principal + Interest:
          </p>
          <p className="text-sm font-semibold text-foreground">
            {principal} <span className="text-xs font-normal">USDT</span> +{" "}
            <span className={colors.text}>{interestAmount} USDT</span>
          </p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">
            Matures:{" "}
            <span className="font-medium text-foreground">{maturity}</span>
          </p>
        </div>
      </div>

      <div className="text-end">
        <button
          onClick={handleClick}
          className={` px-4 py-2 text-sm ${colors.button} text-white rounded-full cursor-pointer font-semibold transition-colors`}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
};

export default SavingPlanCard;
