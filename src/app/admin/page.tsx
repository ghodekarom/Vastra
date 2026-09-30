"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function AdminDashboardPage() {
  const { orders } = useStore();

  const metrics = [
    {
      title: "Monthly Gross Revenue",
      value: "₹14,88,450",
      change: "+24.8% vs last month",
      trend: "up",
    },
    {
      title: "Total Orders Fulfilled",
      value: "824",
      change: "+18.2% vs last month",
      trend: "up",
    },
    {
      title: "Average Order Value (AOV)",
      value: "₹1,806",
      change: "Stable (Target ₹1,800)",
      trend: "neutral",
    },
    {
      title: "Store Conversion Rate",
      value: "3.42%",
      change: "+0.6% this week",
      trend: "up",
    },
  ];

  const lowStockAlerts = [
    {
      product: "Better Days Ahead Wave Tee",
      sku: "VST-WAV-CH-XL",
      remaining: 4,
      status: "CRITICAL",
    },
    {
      product: "Shadow Print Oversized Tee",
      sku: "VST-SHD-CH-M",
      remaining: 9,
      status: "LOW",
    },
    {
      product: "Essential Blank Oversized Tee",
      sku: "VST-ESS-CR-S",
      remaining: 7,
      status: "LOW",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner with AI Summary */}
      <div className="rounded-2xl border border-[#555A46]/30 bg-[#555A46]/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-[#555A46] text-white flex-shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wide">
              AI Retail Intelligence Digest
            </h2>
            <p className="text-xs text-[#4F4B45] mt-0.5 max-w-xl">
              &quot;The Horizon Collection&quot; is driving 42% of revenue this week. Customer review sentiment is 94% positive with frequent praise for the 240 GSM collar shape. Recommendation: Restock 150 units of Size L & XL Charcoal immediately.
            </p>
          </div>
        </div>
        <Link
          href="/admin/ai"
          className="rounded bg-black px-4 py-2 text-xs font-semibold text-white whitespace-nowrap self-start sm:self-auto hover:bg-[#252525]"
        >
          View Full AI Report →
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[#77736D] uppercase tracking-wider">
                {m.title}
              </span>
              <div className="mt-2 text-2xl sm:text-3xl font-bold text-[#111111] font-display">
                {m.value}
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#F1EEE7] flex items-center gap-1.5 text-xs font-medium text-[#3F6B4B]">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#D8D3CA] mb-4">
            <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
              Recent Live Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-black hover:underline"
            >
              View All ({orders.length})
            </Link>
          </div>

          <div className="divide-y divide-[#F1EEE7]">
            {orders.map((ord) => (
              <div key={ord.id} className="py-3.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-black">#{ord.id}</strong>
                    <span className="rounded bg-[#555A46]/15 px-2 py-0.5 text-[10px] font-bold text-[#555A46]">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-[#77736D] mt-0.5">
                    {ord.shippingAddress.fullName} • {ord.items.length} item(s)
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-black block">
                    ₹{ord.total.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-[#77736D]">{ord.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#D8D3CA] mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[#A16B25]" />
              <h3 className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                Inventory Alerts
              </h3>
            </div>
            <Link
              href="/admin/inventory"
              className="text-xs font-semibold text-black hover:underline"
            >
              Manage Stock
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockAlerts.map((alert, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[#D8D3CA] p-3.5 bg-[#F7F4EE] flex items-center justify-between text-xs"
              >
                <div>
                  <strong className="text-black block">{alert.product}</strong>
                  <span className="text-[10px] text-[#77736D] font-mono">
                    SKU: {alert.sku}
                  </span>
                </div>
                <div className="text-right">
                  <span className="rounded bg-[#A63D35]/15 text-[#A63D35] px-2 py-0.5 text-[10px] font-bold uppercase block">
                    {alert.remaining} Left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
