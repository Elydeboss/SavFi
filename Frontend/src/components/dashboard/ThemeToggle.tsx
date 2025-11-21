import useTheme from "../../hooks/useTheme";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const modes = ["light", "dark"];

  const handleToggle = () => {
    const index = modes.indexOf(theme);
    const next = modes[(index + 1) % modes.length];
    setTheme(next);
  };

  return (
    <button
      onClick={handleToggle}
      className="cursor-pointer p-2 md:p-3 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
    >
      {theme === "light" && <FiMoon className="h-4 w-4" />}
      {theme === "dark" && <FiSun className="h-4 w-4" />}
    </button>
  );
};

export default ThemeToggle;
