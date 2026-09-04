"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  ShieldCheck,
  Save,
  CheckCircle2,
  Lock,
  Mail,
  Building,
  Phone,
} from "lucide-react";
import { SiteConfig } from "@/types";
import { fetchEntityData, updateEntityData } from "@/lib/api-client";
import { HARDCODED_USERS } from "@/lib/auth";

export default function AdminSettingsPage() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfig() {
      try {
        const data = await fetchEntityData<SiteConfig>("site");
        setSiteConfig(data);
      } catch (err) {
        console.error("Failed to load site config:", err);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteConfig) return;
    setSaving(true);

    try {
      await updateEntityData("site", siteConfig);
      showToast("Site configuration saved successfully!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save site configuration";
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        <div className="w-6 h-6 border-2 border-[#EE2435] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        Loading settings...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-medium animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-[#EE2435]" />
          <span>System Settings & User Role Matrix</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Global site parameters, official contact details, and role-based credential directory.
        </p>
      </div>

      {/* User Accounts & Role Matrix (Super Admin View) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>System User Credentials Directory</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(HARDCODED_USERS).map(([email, record]) => (
            <div key={email} className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{record.user.name}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    record.user.role === "super_admin"
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : record.user.role === "admin"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  }`}
                >
                  {record.user.role}
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{email}</span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Password: {record.passwordHash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Site Contact & Configuration Form */}
      {siteConfig && (
        <form onSubmit={handleSaveConfig} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            <span>General Site Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Organization Name</label>
              <input
                type="text"
                value={siteConfig.name}
                onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-[#EE2435] mb-1">Tagline</label>
              <input
                type="text"
                value={siteConfig.tagline}
                onChange={(e) => setSiteConfig({ ...siteConfig, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Site Description</label>
            <textarea
              rows={2}
              value={siteConfig.description}
              onChange={(e) => setSiteConfig({ ...siteConfig, description: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Contact & Headquarters Details</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Official Email</label>
                <input
                  type="email"
                  value={siteConfig.contact?.email || ""}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Helpline</label>
                <input
                  type="text"
                  value={siteConfig.contact?.phone || ""}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Emergency Toll-Free Line</label>
                <input
                  type="text"
                  value={siteConfig.contact?.emergencyLine || ""}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, emergencyLine: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location Address</label>
                <input
                  type="text"
                  value={siteConfig.contact?.location || ""}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, location: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Working Hours</label>
                <input
                  type="text"
                  value={siteConfig.contact?.workingHours || ""}
                  onChange={(e) =>
                    setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, workingHours: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-[#EE2435]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#EE2435] hover:bg-[#d41c2c] text-white font-semibold rounded-xl text-sm shadow-lg shadow-[#EE2435]/25 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save Settings"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
