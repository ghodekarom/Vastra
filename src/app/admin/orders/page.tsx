"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, Search, Filter, Truck, Check, Eye } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function AdminOrdersPage() {
  const { orders } = useStore();
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "all") return true;
    return o.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D3CA]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
            Order Fulfillment & Dispatch
          </h1>
          <p className="text-xs text-[#77736D] mt-0.5">
            Monitor real-time customer purchases, tracking numbers, and delivery milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded border border-[#D8D3CA] bg-white px-3 py-2 text-xs font-semibold"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="PLACED">Placed</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-xl border border-[#D8D3CA] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F4EE] border-b border-[#D8D3CA] text-[#77736D] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EEE7]">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-black">
                    #{ord.id}
                  </td>
                  <td className="py-3 px-4 text-[#77736D]">{ord.date}</td>
                  <td className="py-3 px-4">
                    <strong className="text-black block">
                      {ord.shippingAddress.fullName}
                    </strong>
                    <span className="text-[10px] text-[#77736D]">
                      {ord.shippingAddress.city}, {ord.shippingAddress.state}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#4F4B45]">
                    {ord.items.length} item(s)
                  </td>
                  <td className="py-3 px-4 text-[#4F4B45]">
                    {ord.paymentMethod}
                  </td>
                  <td className="py-3 px-4">
                    <span className="rounded bg-[#555A46]/15 text-[#555A46] px-2 py-0.5 text-[10px] font-bold uppercase">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-black">
                    ₹{ord.total.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/order/${ord.id}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 rounded border border-[#D8D3CA] px-2.5 py-1 text-[11px] font-semibold text-black hover:border-black"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Track</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
