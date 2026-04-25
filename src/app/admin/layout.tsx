"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  RiDashboardLine,
  RiShoppingBag2Line,
  RiImageLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiCloseLine,
  RiUser3Line,
  RiPriceTag3Line,
  RiChatQuoteLine,
} from "@remixicon/react";

type AdminInfo = { nama: string; email: string; role: string };

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: RiDashboardLine, exact: true },
  { href: "/admin/pemesanan", label: "Pesanan", icon: RiShoppingBag2Line, exact: false },
  { href: "/admin/paket", label: "Paket Layanan", icon: RiPriceTag3Line, exact: false },
  { href: "/admin/portofolio", label: "Portofolio", icon: RiImageLine, exact: false },
  { href: "/admin/testimoni", label: "Testimoni", icon: RiChatQuoteLine, exact: false },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [admin, setAdmin] = useState<AdminInfo | null>(null);
  const [authState, setAuthState] = useState<"loading" | "ok" | "denied">("loading");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthState("ok");
      return;
    }
    fetch("/api/admin/auth/me")
      .then((r) => {
        if (r.status === 401) {
          router.replace("/admin/login");
          setAuthState("denied");
          return null;
        }
        return r.json();
      })
      .then((json) => {
        if (json?.success) {
          setAdmin(json.data);
          setAuthState("ok");
        }
      })
      .catch(() => {
        router.replace("/admin/login");
        setAuthState("denied");
      });
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-30 flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-800">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm font-poppins">U</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm font-poppins leading-tight">Upgrid Admin</p>
            <p className="text-gray-500 text-xs truncate">Panel Administrasi</p>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-gray-500 hover:text-white lg:hidden"
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(href, exact)
                  ? "bg-primary-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Admin info + logout */}
        <div className="border-t border-gray-800 p-4 space-y-3">
          {admin && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                <RiUser3Line size={16} className="text-gray-300" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-medium truncate">{admin.nama}</p>
                <p className="text-gray-500 text-xs truncate">{admin.role}</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-red-900/40 transition-colors"
          >
            <RiLogoutBoxLine size={18} />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-900"
          >
            <RiMenuLine size={22} />
          </button>
          <div className="flex-1" />
          <span className="text-xs text-gray-400 hidden sm:block">
            {admin?.email}
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
