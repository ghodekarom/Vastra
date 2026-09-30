"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  CheckCircle2,
  Clock,
  Truck,
  PackageCheck,
  RotateCcw,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders, showToast } = useStore();

  const [returnRequested, setReturnRequested] = useState(false);
  const [returnReason, setReturnReason] = useState("Size too large");
  const [showReturnModal, setShowReturnModal] = useState(false);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const steps = [
    { title: "Order Placed", date: "28 Sep, 10:45 AM", completed: true },
    { title: "Confirmed", date: "28 Sep, 11:20 AM", completed: true },
    { title: "Processing & Quality Check", date: "29 Sep, 02:15 PM", completed: true },
    { title: "Shipped via Blue Dart", date: "30 Sep, 09:30 AM", completed: true, active: true },
    { title: "Out for Delivery", date: "Expected Tomorrow", completed: false },
    { title: "Delivered", date: "Estimated 02 Oct", completed: false },
  ];

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReturnRequested(true);
    setShowReturnModal(false);
    showToast("Return request submitted. Courier pickup will be scheduled.");
  };

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#77736D] mb-6">
          <Link href="/account" className="hover:text-black">Account</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/account/orders" className="hover:text-black">Orders</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#111111] font-medium">{order?.id || orderId}</span>
        </nav>

        {/* Top Order Overview Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#D8D3CA] gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-[#111111] font-display">
                Order #{order?.id || orderId}
              </h1>
              <span className="rounded bg-[#555A46]/15 px-2.5 py-0.5 text-xs font-semibold text-[#555A46] uppercase">
                {order?.status || "SHIPPED"}
              </span>
            </div>
            <p className="mt-1 text-xs text-[#77736D]">
              Placed on {order?.date || "28 Sep 2026"} • Tracking: {order?.trackingNumber || "DEL-IND-882199"}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowReturnModal(true)}
              disabled={returnRequested}
              className="rounded border border-[#D8D3CA] bg-white px-4 py-2 text-xs font-semibold text-[#111111] hover:border-black transition-colors disabled:opacity-60"
            >
              {returnRequested ? "Return Requested" : "Request Return / Exchange"}
            </button>
          </div>
        </div>

        {/* Return Alert Banner if active */}
        {returnRequested && (
          <div className="mb-8 rounded-lg bg-[#555A46]/10 border border-[#555A46]/30 p-4 flex items-center gap-3 text-xs text-[#555A46]">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
            <div>
              <strong>Return initiated for pickup.</strong> Reason: {returnReason}. Our courier partner will collect the parcel in original packaging within 48 hours.
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tracking Milestone Timeline (7 cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#D8D3CA] bg-white p-6 sm:p-8 shadow-xs">
            <h2 className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Shipment Progress</span>
            </h2>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EAE4D9]">
              {steps.map((st, i) => (
                <div key={i} className="relative flex items-start gap-4">
                  <div
                    className={`absolute -left-6 top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      st.completed
                        ? "bg-[#111111] border-[#111111] text-white"
                        : "bg-white border-[#D8D3CA]"
                    }`}
                  >
                    {st.completed && <CheckCircle2 className="h-3 w-3" />}
                  </div>
                  <div>
                    <h3
                      className={`text-xs font-bold ${
                        st.active ? "text-[#555A46] text-sm font-display" : "text-[#111111]"
                      }`}
                    >
                      {st.title} {st.active && "• Current Status"}
                    </h3>
                    <p className="text-[11px] text-[#77736D] mt-0.5">{st.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items & Shipping Address (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Items */}
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">
                Items ({order?.items.length || 1})
              </h3>
              <div className="divide-y divide-[#F1EEE7]">
                {order?.items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <div className="relative h-16 w-12 rounded bg-[#E4DDD0] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-[#111111]">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#77736D]">
                        {item.color} | Size: {item.size} × {item.quantity}
                      </p>
                      <span className="text-xs font-bold text-[#111111] mt-1 block">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#D8D3CA] space-y-1.5 text-xs text-[#4F4B45]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order?.subtotal.toLocaleString("en-IN") || "2,199"}</span>
                </div>
                <div className="flex justify-between font-bold text-black pt-2 border-t border-[#F1EEE7]">
                  <span>Total Paid</span>
                  <span>₹{order?.total.toLocaleString("en-IN") || "1,979"}</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs text-xs">
              <h3 className="font-bold text-[#111111] uppercase tracking-wider mb-2">
                Shipping Destination
              </h3>
              <p className="font-semibold text-black">
                {order?.shippingAddress.fullName || "Aarav Sharma"}
              </p>
              <p className="text-[#4F4B45] mt-0.5">
                {order?.shippingAddress.street || "B-402, Highline Residences, Indiranagar"}
              </p>
              <p className="text-[#4F4B45]">
                {order?.shippingAddress.city || "Bengaluru"},{" "}
                {order?.shippingAddress.state || "Karnataka"} -{" "}
                {order?.shippingAddress.pincode || "560038"}
              </p>
              <p className="text-[#77736D] mt-2">
                Phone: {order?.shippingAddress.phone || "+91 98765 43210"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Return Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowReturnModal(false)}
          />
          <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-2xl z-10 border border-[#D8D3CA]">
            <h3 className="text-base font-bold text-[#111111]">
              Request Doorstep Return / Exchange
            </h3>
            <p className="mt-1 text-xs text-[#77736D]">
              Garments must be unworn with original tags attached.
            </p>

            <form onSubmit={handleReturnSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Reason for Return</label>
                <select
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="w-full rounded border border-[#D8D3CA] p-2 bg-white"
                >
                  <option value="Size too large">Size too large (Oversized fit too big)</option>
                  <option value="Size too small">Size too small</option>
                  <option value="Color shade difference">Color shade difference</option>
                  <option value="Changed my mind">Changed my mind</option>
                </select>
              </div>

              <div>
                <label className="font-semibold block mb-1">Additional Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us more about the fit or preferred replacement size..."
                  className="w-full rounded border border-[#D8D3CA] p-2 focus:outline-none focus:border-black"
                />
              </div>

              <div className="pt-4 border-t border-[#D8D3CA] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReturnModal(false)}
                  className="rounded border border-[#D8D3CA] px-4 py-2 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-black px-5 py-2 font-bold text-white uppercase"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
