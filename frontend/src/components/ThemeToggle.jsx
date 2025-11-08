import { Sun, Moon } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-3 py-2 rounded-lg 
                 border border-neutral-300 dark:border-neutral-700
                 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span className="text-sm">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>
  );
}
