"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    finalTotal,
    activeCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();

  const [couponInput, setCouponInput] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display pb-4 mb-8 border-b border-[#D8D3CA]">
          Shopping Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-[#D8D3CA] bg-white p-12 text-center max-w-md mx-auto my-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1EEE7] text-[#77736D] mb-4">
              <ShoppingBag className="h-6 w-6 stroke-1" />
            </div>
            <h2 className="text-base font-bold text-[#111111]">
              Your cart is waiting for something good
            </h2>
            <p className="mt-1 text-xs text-[#77736D]">
              Explore our dropped-shoulder oversized tees and find your ideal fit.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#252525]"
            >
              Shop Oversized Tees <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 rounded-xl border border-[#D8D3CA] bg-white divide-y divide-[#D8D3CA] shadow-xs">
              {cart.map((item) => (
                <div key={item.id} className="p-4 sm:p-6 flex gap-4 sm:gap-6 items-center">
                  <div className="relative h-28 w-24 flex-shrink-0 rounded bg-[#E4DDD0] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-sm font-semibold text-[#111111] hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-xs text-[#77736D] mt-1">
                        Color: {item.color} | Size: {item.size}
                      </p>
                      <span className="text-xs font-bold text-[#111111] mt-2 block sm:hidden">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-4 sm:gap-8">
                      <div className="flex items-center rounded border border-[#D8D3CA] bg-[#F7F4EE]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-white transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-black">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-white transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="text-right hidden sm:block">
                        <span className="text-sm font-bold text-[#111111] block">
                          ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-[#77736D]">
                            ₹{item.price.toLocaleString("en-IN")} each
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#77736D] hover:text-[#A63D35] p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary (4 cols) */}
            <div className="lg:col-span-4 rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs space-y-6">
              <h2 className="text-base font-bold text-[#111111]">
                Order Summary
              </h2>

              {/* Coupon box */}
              <div>
                {activeCoupon ? (
                  <div className="flex items-center justify-between rounded bg-[#626854]/10 border border-[#626854]/30 px-3 py-2 text-xs">
                    <span className="text-[#626854] font-medium">
                      Coupon <strong>{activeCoupon}</strong> applied
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[#A63D35] font-semibold hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 rounded border border-[#D8D3CA] px-3 py-2 text-xs uppercase focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="rounded bg-black px-4 py-2 text-xs font-semibold text-white"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs divide-y divide-[#F1EEE7]">
                <div className="flex justify-between py-1 text-[#4F4B45]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-1 text-[#3F6B4B] font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between py-1 text-[#4F4B45]">
                  <span>Delivery Charges</span>
                  <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-bold text-[#111111]">
                  <span>Estimated Total</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 rounded bg-black py-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-md hover:bg-[#252525] transition-all"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#77736D]">
                <ShieldCheck className="h-4 w-4 text-[#3F6B4B]" />
                <span>SSL 256-bit bank encrypted checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
