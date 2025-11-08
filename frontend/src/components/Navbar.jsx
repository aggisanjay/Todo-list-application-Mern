import { ListChecks, LogOut } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Navbar() {
  const { user, setUser } = useAuth();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white/70 dark:bg-neutral-950/60 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black text-white">
            <ListChecks size={18} />
          </div>
          <span className="font-semibold tracking-tight">Focus Tasks</span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user && (
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition"
            >
              <LogOut size={16} />
              <span className="text-sm">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
