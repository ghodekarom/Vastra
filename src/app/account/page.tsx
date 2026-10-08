"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Package, MapPin, Bell, LogOut, ChevronRight, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { orders } = useStore();
  const { user, isAuthenticated, isAdmin, logout, quickLoginAs } = useAuth();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "notifications">("orders");

  if (!isAuthenticated) {
    return (
      <div className="bg-[#F7F4EE] min-h-[calc(100vh-80px)] py-12 sm:py-20 flex items-center justify-center">
        <div className="container-vastra max-w-lg text-center">
          <div className="rounded-3xl border border-[#D8D3CA] bg-white p-8 sm:p-12 shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white font-bold text-xl mb-4 font-display">
              <User className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-[#111111] font-display">
              Authentication Required
            </h1>
            <p className="mt-2 text-xs text-[#77736D] leading-relaxed">
              Please sign in to access your order history, delivery addresses, and VIP membership perks.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full rounded-xl bg-black py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#252525] transition-colors"
              >
                Sign In to Account
              </Link>
              <button
                type="button"
                onClick={() => quickLoginAs("customer")}
                className="w-full rounded-xl border border-[#D8D3CA] bg-[#F7F4EE] py-3 text-xs font-semibold text-black hover:border-black transition-colors cursor-pointer"
              >
                Quick Login as VIP Customer (1-Click)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "VP";

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra">
        {/* Profile Card */}
        <div className="rounded-2xl border border-[#D8D3CA] bg-white p-6 sm:p-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#111111] text-white font-bold text-xl font-display">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#111111] font-display">
                  {user?.fullName || "Aarav Sharma"}
                </h1>
                <span className="rounded bg-[#555A46]/15 px-2 py-0.5 text-[10px] font-bold text-[#555A46] uppercase">
                  {isAdmin ? "MASTER ADMIN" : "VASTRA VIP"}
                </span>
              </div>
              <p className="text-xs text-[#77736D] mt-0.5">
                {user?.email || "customer@vastra.in"} • Member since Jan 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="rounded border border-[#555A46] bg-[#555A46]/10 px-4 py-2 text-xs font-semibold text-[#555A46] hover:bg-[#555A46] hover:text-white transition-colors"
              >
                Admin Studio →
              </Link>
            )}
            <button
              type="button"
              onClick={logout}
              className="rounded border border-[#D8D3CA] bg-[#F7F4EE] px-4 py-2 text-xs font-semibold text-red-600 hover:border-red-400 hover:bg-red-50 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Account Nav Tabs */}
        <div className="flex border-b border-[#D8D3CA] mb-8 gap-8 text-xs font-bold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "orders"
                ? "border-black text-[#111111]"
                : "border-transparent text-[#77736D] hover:text-black"
            }`}
          >
            <Package className="h-4 w-4" />
            <span>My Orders ({orders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("addresses")}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "addresses"
                ? "border-black text-[#111111]"
                : "border-transparent text-[#77736D] hover:text-black"
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Saved Addresses (1)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === "notifications"
                ? "border-black text-[#111111]"
                : "border-transparent text-[#77736D] hover:text-black"
            }`}
          >
            <Bell className="h-4 w-4" />
            <span>Notifications (2)</span>
          </button>
        </div>

        {/* Tab 1: Orders List */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#111111]">
                      Order #{ord.id}
                    </span>
                    <span className="rounded bg-[#555A46]/15 px-2 py-0.5 text-[10px] font-bold text-[#555A46] uppercase">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#77736D] mt-1">
                    Placed on {ord.date} • Total: ₹{ord.total.toLocaleString("en-IN")}
                  </p>

                  <div className="mt-4 flex gap-3">
                    {ord.items.map((item) => (
                      <div
                        key={item.id}
                        className="relative h-14 w-12 rounded bg-[#E4DDD0] overflow-hidden"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-3">
                  <Link
                    href={`/order/${ord.id}`}
                    className="inline-flex items-center gap-2 rounded bg-black px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wider hover:bg-[#252525] transition-colors"
                  >
                    <span>View Tracking</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === "addresses" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-black bg-white p-6 shadow-xs relative">
              <span className="absolute top-4 right-4 rounded bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                Default
              </span>
              <h3 className="text-sm font-bold text-[#111111]">Aarav Sharma</h3>
              <p className="text-xs text-[#4F4B45] mt-2 leading-relaxed">
                B-402, Highline Residences, 12th Main Road, Indiranagar, Bengaluru, Karnataka - 560038
              </p>
              <p className="text-xs text-[#77736D] mt-3">Phone: +91 98765 43210</p>
            </div>
          </div>
        )}

        {/* Tab 3: Notifications */}
        {activeTab === "notifications" && (
          <div className="space-y-3 max-w-2xl">
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-4 shadow-xs flex gap-3.5 items-start">
              <div className="p-2 rounded-full bg-[#555A46]/10 text-[#555A46]">
                <Package className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#111111]">
                  Shipment Dispatched — Blue Dart Air
                </h4>
                <p className="text-xs text-[#4F4B45] mt-0.5">
                  Your order #ORD-94281 is en route to Bengaluru. Expected delivery in 48 hours.
                </p>
                <span className="text-[10px] text-[#77736D] mt-1 block">3 hours ago</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#D8D3CA] bg-white p-4 shadow-xs flex gap-3.5 items-start">
              <div className="p-2 rounded-full bg-[#3F6B4B]/10 text-[#3F6B4B]">
                <Bell className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#111111]">
                  Exclusive Drop Alert: Better Days Ahead
                </h4>
                <p className="text-xs text-[#4F4B45] mt-0.5">
                  The back-print wave artwork has arrived in limited inventory.
                </p>
                <span className="text-[10px] text-[#77736D] mt-1 block">1 day ago</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
