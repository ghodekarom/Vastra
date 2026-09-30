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
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const adminNav = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products & SKUs", href: "/admin/products", icon: Shirt },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingBag },
    { label: "Inventory Stock", href: "/admin/inventory", icon: Boxes },
    { label: "AI Insights", href: "/admin/ai", icon: Sparkles },
  ];

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
            PROTOTYPE v1.0
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-[#B8B0A4] hidden sm:inline">Store: India (INR ₹)</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#252525] font-bold text-xs">
            OP
          </div>
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
