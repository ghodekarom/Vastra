"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      showToast("Thank you for joining the VASTRA Insider community!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111111] text-[#E7E0D4] pt-16 pb-12 border-t border-black">
      <div className="container-vastra">
        {/* Top Trust Pillars Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#252525]">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] text-white">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide">
                Complimentary Shipping
              </h5>
              <p className="text-[11px] text-[#B8B0A4]">On all orders above ₹1,999</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] text-white">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide">
                7-Day Hassle-Free Returns
              </h5>
              <p className="text-[11px] text-[#B8B0A4]">Easy doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide">
                240 GSM Heavy Cotton
              </h5>
              <p className="text-[11px] text-[#B8B0A4]">Dense weave, enduring shape</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#252525] text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide">
                Authentic Craftsmanship
              </h5>
              <p className="text-[11px] text-[#B8B0A4]">Engineered & made in India</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-[#252525]">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <Link href="/" className="text-2xl font-bold tracking-widest text-white uppercase">
                VASTRA
              </Link>
              <p className="mt-3 text-xs text-[#B8B0A4] max-w-sm leading-relaxed">
                Bigger Fits. Bolder Moves. An editorial apparel house dedicated to perfecting the oversized silhouette through heavy 240 GSM organic cotton and modern urban tailoring.
              </p>
            </div>

            {/* Newsletter form */}
            <div className="mt-8">
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Join The Vastra Circle
              </h5>
              <p className="text-xs text-[#B8B0A4] mb-3">
                Be the first to know about secret drops, editorial lookbooks, and exclusive private sales.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 rounded bg-[#3F6B4B]/20 border border-[#3F6B4B]/40 px-3.5 py-2.5 text-xs text-[#8CD19D]">
                  <Check className="h-4 w-4" />
                  <span>You are on the VIP drop list. Welcome!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 rounded-l border border-[#333333] bg-[#1A1A1A] px-3.5 py-2.5 text-xs text-white placeholder-[#77736D] focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="rounded-r bg-white px-5 py-2.5 text-xs font-bold text-black uppercase tracking-wider hover:bg-[#E7E0D4] transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Shop Drops
            </h5>
            <ul className="space-y-2.5 text-xs text-[#B8B0A4]">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Oversized Tees
                </Link>
              </li>
              <li>
                <Link href="/shop/graphic-tees" className="hover:text-white transition-colors">
                  Graphic Series
                </Link>
              </li>
              <li>
                <Link href="/shop/minimal-tees" className="hover:text-white transition-colors">
                  Minimal Blanks
                </Link>
              </li>
              <li>
                <Link href="/shop/essentials" className="hover:text-white transition-colors">
                  Daily Essentials
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  The Horizon Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Assistance
            </h5>
            <ul className="space-y-2.5 text-xs text-[#B8B0A4]">
              <li>
                <Link href="/account/orders" className="hover:text-white transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Size Guide & FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform & Admin */}
          <div>
            <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company & Admin
            </h5>
            <ul className="space-y-2.5 text-xs text-[#B8B0A4]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About VASTRA
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors">
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#8CD19D] hover:underline"
                >
                  <span>Admin Dashboard</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#77736D] gap-4">
          <p>© 2026 VASTRA Apparel Inc. All rights reserved. Crafted with Next.js & GSAP.</p>
          <div className="flex gap-6">
            <Link href="/shipping" className="hover:text-[#B8B0A4]">Privacy Policy</Link>
            <Link href="/returns" className="hover:text-[#B8B0A4]">Terms of Service</Link>
            <Link href="/faq" className="hover:text-[#B8B0A4]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
