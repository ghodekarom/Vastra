"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, Tag, Check } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
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

  const [couponCode, setCouponCode] = useState("");

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1999;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#F7F4EE] shadow-2xl flex flex-col justify-between border-l border-[#D8D3CA] animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#D8D3CA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#111111]" />
              <h2 className="text-base font-semibold text-[#111111]">
                My Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1 text-[#4F4B45] hover:text-[#111111] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free Shipping Bar */}
          <div className="bg-[#EAE4D9] px-6 py-3 border-b border-[#D8D3CA]">
            <div className="flex justify-between text-xs font-medium text-[#4F4B45] mb-1.5">
              <span>
                {remainingForFreeShipping === 0
                  ? "🎉 You unlocked FREE standard delivery!"
                  : `Add ₹${remainingForFreeShipping.toLocaleString(
                      "en-IN"
                    )} more for FREE shipping`}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#D8D0C3] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#111111] transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#D8D3CA]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="h-16 w-16 rounded-full bg-[#EAE4D9] flex items-center justify-center text-[#77736D] mb-4">
                  <ShoppingBag className="h-8 w-8 stroke-1" />
                </div>
                <h3 className="text-base font-semibold text-[#111111]">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-xs text-[#77736D] max-w-xs">
                  Discover the modern oversized silhouettes crafted for effortless everyday comfort.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="mt-6 inline-flex items-center gap-2 rounded bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#252525]"
                >
                  Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Item Image */}
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded bg-[#E4DDD0]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="text-xs font-semibold text-[#111111] hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#77736D] hover:text-[#A63D35] p-1 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#77736D] mt-0.5">
                        {item.color} | Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center rounded border border-[#D8D3CA] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#F1EEE7] transition-colors"
                        >
                          <Minus className="h-3 w-3 text-[#111111]" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-[#F1EEE7] transition-colors"
                        >
                          <Plus className="h-3 w-3 text-[#111111]" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-semibold text-[#111111]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="border-t border-[#D8D3CA] bg-[#F1EEE7] p-6 flex flex-col gap-4">
              {/* Coupon Row */}
              <div>
                {activeCoupon ? (
                  <div className="flex items-center justify-between rounded border border-[#626854]/30 bg-[#626854]/10 px-3 py-2 text-xs">
                    <div className="flex items-center gap-2 text-[#626854] font-medium">
                      <Tag className="h-3.5 w-3.5" />
                      <span>Code <strong>{activeCoupon}</strong> applied</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-[11px] font-semibold text-[#A63D35] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (try VASTRA10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 rounded border border-[#D8D3CA] bg-white px-3 py-1.5 text-xs text-[#111111] placeholder-[#77736D] uppercase focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      className="rounded bg-black px-4 py-1.5 text-xs font-medium text-white hover:bg-[#252525]"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#4F4B45]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#3F6B4B] font-medium">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#4F4B45]">
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                </div>
                <div className="border-t border-[#D8D3CA] pt-2 flex justify-between text-sm font-bold text-[#111111]">
                  <span>Total</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 rounded bg-black py-3.5 px-6 text-xs font-bold text-white uppercase tracking-wider shadow-md hover:bg-[#252525] active:scale-98 transition-all"
              >
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
