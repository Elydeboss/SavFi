interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const TabButton = ({ active, onClick, children }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium cursor transition-all ${
        active
          ? "bg-blue text-white"
          : "bg-[#E8E8E9] text-[#494A4E] dark:bg-gray-700 dark:text-white"
      }`}
    >
      {children}
    </button>
  );
};
