import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Register() {
  const nav = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.email || !form.password) {
      setErr("All fields are required.");
      return;
    }
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", form);
      setUser(data);
      nav("/", { replace: true });
    } catch (e) {
      setErr(e?.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold mb-2">Create account</h1>
        <p className="text-sm text-neutral-500 mb-6">Start organizing your tasks</p>

        {err && (
          <div className="mb-4 text-sm rounded-lg px-3 py-2 border border-red-300/60 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-200">
            {err}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={16} />
            <input
              type="text"
              placeholder="Full name"
              className="w-full pl-9 pr-3 py-3 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={16} />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-9 pr-3 py-3 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={16} />
            <input
              type={showPwd ? "text" : "password"}
              placeholder="Password (min 6 chars)"
              className="w-full pl-9 pr-10 py-3 rounded-lg border border-neutral-300 dark:border-neutral-800 bg-transparent"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-neutral-800 transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Create account
          </button>
        </form>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
