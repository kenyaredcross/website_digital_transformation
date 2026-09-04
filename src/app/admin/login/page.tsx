"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldAlert, ArrowRight, UserCheck } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      if (data.user.role === "blogger") {
        router.push("/admin/blogs");
      } else {
        router.push("/admin");
      }
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid credentials";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const setQuickCredentials = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#011E41] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#EE2435]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-3 group">
            <div className="w-12 h-12 bg-[#EE2435] rounded-xl flex items-center justify-center shadow-lg shadow-[#EE2435]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-2xl">⚡</span>
            </div>
            <div className="text-left">
              <span className="block text-white font-bold text-lg leading-none">Kenya Red Cross</span>
              <span className="text-[#EE2435] font-semibold text-xs tracking-wider uppercase">Digital Transformation</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">Admin Portal Login</h1>
          <p className="text-gray-400 text-sm mt-1">Role-Based Content Management System</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          {error && (
            <div className="mb-6 p-4 bg-red-950/60 border border-red-800/60 rounded-xl text-red-200 text-xs sm:text-sm flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-[#EE2435] shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@redcross.or.ke"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#EE2435] text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#EE2435] text-sm transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#EE2435]/25 hover:shadow-[#EE2435]/40 flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Preset Selector for Demo/Evaluation */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-gray-400">Demo Role Quick Select:</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setQuickCredentials("superadmin@redcross.or.ke", "superadmin123")}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-white group-hover:text-[#EE2435]">Super Admin</div>
                <div className="text-[9px] text-gray-400 truncate">All Pages</div>
              </button>

              <button
                type="button"
                onClick={() => setQuickCredentials("admin@redcross.or.ke", "admin123")}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-white group-hover:text-blue-400">Admin</div>
                <div className="text-[9px] text-gray-400 truncate">Data Content</div>
              </button>

              <button
                type="button"
                onClick={() => setQuickCredentials("blogger@redcross.or.ke", "blogger123")}
                className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-left transition-colors cursor-pointer group"
              >
                <div className="text-[11px] font-bold text-white group-hover:text-purple-400">Blogger</div>
                <div className="text-[9px] text-gray-400 truncate">Blogs Only</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
