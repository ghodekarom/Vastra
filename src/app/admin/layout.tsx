"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Shirt,
  ShoppingBag,
  Boxes,
  Sparkles,
  ArrowLeft,
  Bell,
  Sliders,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isAuthenticated, isAdmin, quickLoginAs, logout } = useAuth();

  const adminNav = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products & SKUs", href: "/admin/products", icon: Shirt },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingBag },
    { label: "Inventory Stock", href: "/admin/inventory", icon: Boxes },
    { label: "AI Insights", href: "/admin/ai", icon: Sparkles },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex flex-col justify-center items-center p-6">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 text-center relative overflow-hidden backdrop-blur-md">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 mb-6 border border-red-500/20">
            <ShieldAlert className="h-8 w-8" />
          </div>

          <span className="inline-block rounded border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-[10px] font-mono tracking-widest text-red-400 uppercase mb-3">
            RBAC ACCESS RESTRICTED
          </span>

          <h1 className="text-2xl font-bold font-display text-white mb-2">
            Master Admin Required
          </h1>
          <p className="text-xs text-[#99948D] leading-relaxed mb-6">
            The VASTRA Admin HQ requires <code className="text-white bg-white/10 px-1 py-0.5 rounded">ROLE_ADMIN</code> clearance. You are currently identified as {isAuthenticated ? `"${user?.fullName}" (${user?.role})` : "Guest"}.
          </p>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => quickLoginAs("admin")}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-xs font-bold text-black uppercase tracking-wider hover:bg-[#EAE4D9] transition-colors cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Elevate to Admin Passport (1-Click)</span>
            </button>

            <Link
              href="/login"
              className="block w-full rounded-xl border border-white/15 bg-white/5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Sign In with Custom Credentials
            </Link>

            <Link
              href="/"
              className="block text-xs text-[#99948D] hover:text-white transition-colors pt-2"
            >
              ← Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1EEE7] flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-black text-white px-6 py-3.5 flex items-center justify-between border-b border-black">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-[#B8B0A4] hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Storefront</span>
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-sm font-bold tracking-widest uppercase">
            VASTRA ADMIN HQ
          </span>
          <span className="rounded bg-[#555A46] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
            ROLE_ADMIN
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#B8B0A4] hidden sm:inline">{user?.email}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Admin Subnav */}
      <div className="bg-white border-b border-[#D8D3CA] px-6 py-2 flex items-center gap-2 overflow-x-auto">
        {adminNav.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-black text-white"
                  : "text-[#4F4B45] hover:bg-[#F7F4EE] hover:text-black"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Main Admin View */}
      <main className="flex-1 p-4 sm:p-8 container-vastra">{children}</main>
    </div>
  );
}
