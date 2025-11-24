interface ProgressBarProps {
  progress?: number;
  color?: "success" | "warning" | "purple";
}

const colorMap = {
  success: "bg-[#2BCB89]",
  warning: "bg-[#FFAE58]",
  purple: "bg-[#2bcb89]",
};

const ProgressBar = ({ progress, color = "success" }: ProgressBarProps) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground">Your progress</span>
        <span className="font-medium text-foreground">{progress}%</span>
      </div>
      <div className="h-1.5 bg-[#EAEDEF] rounded-full overflow-hidden">
        <div
          className={`h-full ${colorMap[color]} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
