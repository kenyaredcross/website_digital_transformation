"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Handshake,
  MessageSquare,
  Globe2,
  Layers,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  User as UserIcon,
  Menu,
  X,
} from "lucide-react";
import { User, UserRole, canAccessRoute } from "@/lib/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Blog Posts",
    href: "/admin/blogs",
    icon: FileText,
    roles: ["super_admin", "admin", "blogger"],
  },
  {
    label: "Projects Portfolio",
    href: "/admin/projects",
    icon: Briefcase,
    roles: ["super_admin", "admin"],
  },
  {
    label: "People & Team",
    href: "/admin/people",
    icon: Users,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Partnerships",
    href: "/admin/partners",
    icon: Handshake,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquare,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Countries & Coverage",
    href: "/admin/countries",
    icon: Globe2,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Thematic Areas",
    href: "/admin/thematic-areas",
    icon: Layers,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Media & Assets",
    href: "/admin/media",
    icon: ImageIcon,
    roles: ["super_admin", "admin"],
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["super_admin"],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(pathname !== "/admin/login");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      return;
    }

    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!data.authenticated || !data.user) {
          router.push("/admin/login");
          return;
        }

        if (isMounted) {
          setUser(data.user);
        }

        // Strict role access guard check
        if (!canAccessRoute(data.user.role, pathname)) {
          if (data.user.role === "blogger") {
            router.push("/admin/blogs");
          } else {
            router.push("/admin");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#011E41] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-[#EE2435] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-medium text-slate-300">Loading Red Cross Admin Portal...</p>
      </div>
    );
  }

  if (!user) return null;

  const filteredNavItems = NAV_ITEMS.filter((item) => item.roles.includes(user.role));

  const roleBadgeColors: Record<UserRole, string> = {
    super_admin: "bg-red-500/20 text-red-400 border-red-500/30",
    admin: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    blogger: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  const roleLabels: Record<UserRole, string> = {
    super_admin: "Super Admin",
    admin: "Admin",
    blogger: "Blogger (Blogs Only)",
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="h-16 bg-[#011E41] border-b border-slate-800 sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:text-white lg:hidden cursor-pointer"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-white shadow-md shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo/KRCS_logo.jpeg" alt="KRCS logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-white font-bold text-sm leading-tight">Kenya Red Cross</span>
              <span className="text-[#EE2435] text-[10px] uppercase tracking-wider font-semibold">Admin Portal</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* User Profile Capsule */}
          <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-white">{user.name}</div>
              <span
                className={`inline-block px-2 py-0.5 rounded text-[9px] font-semibold border ${
                  roleBadgeColors[user.role]
                }`}
              >
                {roleLabels[user.role]}
              </span>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center text-slate-300">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-4 h-4" />
              )}
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 text-slate-400 hover:text-[#EE2435] hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#011E41]/90 lg:bg-[#011E41] border-r border-slate-800 backdrop-blur-xl flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#EE2435]" />
            <span>Management Console</span>
          </div>

          <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#EE2435] text-white shadow-lg shadow-[#EE2435]/25"
                      : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Active Role Disclaimer */}
          <div className="p-4 m-3 bg-slate-900/90 border border-slate-800 rounded-xl text-xs">
            <div className="font-semibold text-slate-200 mb-1">Role Permission:</div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {user.role === "blogger"
                ? "You have Blogger access. You can add, edit, or delete blog posts."
                : user.role === "admin"
                ? "You have Admin access to all data files except site configuration."
                : "You have Super Admin full access."}
            </p>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-950">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
