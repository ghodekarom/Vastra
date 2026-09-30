"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ShieldCheck, Truck, CreditCard, Smartphone, Banknote, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, shippingFee, finalTotal, createOrder } = useStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Aarav Sharma",
    phone: "9876543210",
    street: "B-402, Highline Residences, 12th Main",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560038",
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 bg-[#F7F4EE]">
        <h2 className="text-xl font-bold text-[#111111]">No items in cart</h2>
        <p className="mt-2 text-xs text-[#77736D]">
          Please add garments to your bag before checking out.
        </p>
        <Link
          href="/shop"
          className="mt-6 rounded bg-black px-6 py-2.5 text-xs font-semibold text-white"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const shippingCost = shippingMethod === "express" ? 99 : shippingFee;
  const grandTotal = subtotal - discount + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        shippingAddress: formData,
        paymentMethod:
          paymentMethod === "upi"
            ? `UPI (${upiId})`
            : paymentMethod === "card"
            ? "Credit Card (Simulated)"
            : "Cash on Delivery",
      });
      router.push(`/order/${order.id}/confirmation`);
    }, 1200);
  };

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra">
        {/* Checkout Stepper Header */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between text-xs font-semibold text-[#111111]">
            <div className="flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                step >= 1 ? "bg-black text-white" : "bg-[#D8D3CA] text-black"
              }`}>
                1
              </span>
              <span>Shipping Address</span>
            </div>
            <div className="h-0.5 w-12 bg-[#D8D3CA]" />
            <div className="flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                step >= 2 ? "bg-black text-white" : "bg-[#D8D3CA] text-black"
              }`}>
                2
              </span>
              <span>Delivery Method</span>
            </div>
            <div className="h-0.5 w-12 bg-[#D8D3CA]" />
            <div className="flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full ${
                step >= 3 ? "bg-black text-white" : "bg-[#D8D3CA] text-black"
              }`}>
                3
              </span>
              <span>Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Checkout Form Left (8 cols) */}
          <div className="lg:col-span-8 rounded-xl border border-[#D8D3CA] bg-white p-6 sm:p-8 shadow-xs">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#111111] font-display">
                  1. Shipping Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-semibold text-[#111111] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full rounded border border-[#D8D3CA] p-2.5 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#111111] block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full rounded border border-[#D8D3CA] p-2.5 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-[#111111] block mb-1">
                      Street Address / Flat / Floor
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) =>
                        setFormData({ ...formData, street: e.target.value })
                      }
                      className="w-full rounded border border-[#D8D3CA] p-2.5 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#111111] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full rounded border border-[#D8D3CA] p-2.5 focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#111111] block mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, pincode: e.target.value })
                      }
                      className="w-full rounded border border-[#D8D3CA] p-2.5 focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-[#D8D3CA] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 rounded bg-black px-6 py-3 text-xs font-bold text-white uppercase tracking-wider"
                  >
                    Continue to Delivery <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-[#111111] font-display">
                  2. Select Delivery Speed
                </h2>
                <div className="space-y-3">
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      shippingMethod === "standard"
                        ? "border-black bg-[#F7F4EE]"
                        : "border-[#D8D3CA] hover:border-black/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "standard"}
                        onChange={() => setShippingMethod("standard")}
                        className="text-black focus:ring-black"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#111111] block">
                          Standard Ground Delivery
                        </span>
                        <span className="text-[11px] text-[#77736D]">
                          Delivery in 3–5 business days
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#111111]">
                      {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      shippingMethod === "express"
                        ? "border-black bg-[#F7F4EE]"
                        : "border-[#D8D3CA] hover:border-black/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === "express"}
                        onChange={() => setShippingMethod("express")}
                        className="text-black focus:ring-black"
                      />
                      <div>
                        <span className="text-xs font-bold text-[#111111] block">
                          Express Air Priority
                        </span>
                        <span className="text-[11px] text-[#77736D]">
                          Delivery in 1–2 business days via Blue Dart
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#111111]">₹99</span>
                  </label>
                </div>

                <div className="pt-6 border-t border-[#D8D3CA] flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-semibold text-[#77736D] hover:text-black"
                  >
                    ← Back to Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 rounded bg-black px-6 py-3 text-xs font-bold text-white uppercase tracking-wider"
                  >
                    Continue to Payment <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6">
                <h2 className="text-lg font-bold text-[#111111] font-display">
                  3. Payment Simulation
                </h2>

                <div className="space-y-3">
                  {/* UPI */}
                  <label
                    className={`flex flex-col p-4 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === "upi"
                        ? "border-black bg-[#F7F4EE]"
                        : "border-[#D8D3CA]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                          className="text-black"
                        />
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-[#111111]" />
                          <span className="text-xs font-bold text-[#111111]">
                            Instant UPI (Google Pay, PhonePe, Paytm)
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-[#3F6B4B]">
                        Fastest
                      </span>
                    </div>

                    {paymentMethod === "upi" && (
                      <div className="mt-4 pt-3 border-t border-[#D8D3CA]">
                        <label className="text-[11px] font-semibold text-[#4F4B45] block mb-1">
                          UPI ID / VPA
                        </label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full max-w-sm rounded border border-[#D8D3CA] bg-white p-2 text-xs"
                        />
                      </div>
                    )}
                  </label>

                  {/* Card */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "border-black bg-[#F7F4EE]"
                        : "border-[#D8D3CA]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-black"
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-[#111111]" />
                        <span className="text-xs font-bold text-[#111111]">
                          Credit / Debit Card (Simulated Sandbox)
                        </span>
                      </div>
                    </div>
                  </label>

                  {/* COD */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                      paymentMethod === "cod"
                        ? "border-black bg-[#F7F4EE]"
                        : "border-[#D8D3CA]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-black"
                      />
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-[#111111]" />
                        <span className="text-xs font-bold text-[#111111]">
                          Cash on Delivery
                        </span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-6 border-t border-[#D8D3CA] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs font-semibold text-[#77736D] hover:text-black"
                  >
                    ← Back to Delivery
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="inline-flex items-center gap-2 rounded bg-black px-8 py-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-lg hover:bg-[#252525] transition-all disabled:opacity-50"
                  >
                    {isProcessing ? "Authorizing Order..." : `Pay ₹${grandTotal.toLocaleString("en-IN")}`}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Summary Sidebar (4 cols) */}
          <div className="lg:col-span-4 rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#111111]">
              Cart Items ({cart.length})
            </h3>
            <div className="divide-y divide-[#F1EEE7] max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center gap-3">
                  <div className="relative h-12 w-10 rounded overflow-hidden bg-[#E4DDD0] flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#111111] truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-[#77736D]">
                      {item.color} / {item.size} × {item.quantity}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#111111]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#D8D3CA] space-y-2 text-xs text-[#4F4B45]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#3F6B4B] font-medium">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#F1EEE7] text-sm font-bold text-[#111111]">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
