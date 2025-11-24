import { motion } from "framer-motion";

interface SavingsOverviewCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  delay?: number;
  color?: string;
}

const SavingsOverviewCard = ({
  title,
  value,
  subtitle,
  icon,
  delay = 0,
  color,
}: SavingsOverviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-neutral-50 dark:bg-gray-700 rounded-xl p-6"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="">
          <img src={icon} alt={title} className="" />
        </div>
      </div>

      <h3 className="text-base font-medium text-[#67686B] dark:text-white/80 mb-1">
        {title}
      </h3>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
        {typeof value === "number" && (
          <span className="text-base font-semibold text-black-text dark:text-white">
            USDT
          </span>
        )}
      </div>

      {subtitle && (
        <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-[#67686B] dark:text-white/80">
          <span className={`${color}`}>{subtitle}</span>
        </div>
      )}
    </motion.div>
  );
};

export default SavingsOverviewCard;
