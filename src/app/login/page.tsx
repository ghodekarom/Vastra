"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="bg-[#F7F4EE] min-h-[calc(100vh-80px)] py-20 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/account";

  const { login, quickLoginAs, isLoading } = useAuth();
  const { showToast } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const result = await login({ email, password });
    if (result.success) {
      showToast("Welcome back to VASTRA");
      if (email.toLowerCase().includes("admin")) {
        router.push("/admin");
      } else {
        router.push(redirectPath);
      }
    } else {
      setError(result.error || "Authentication failed. Check your email and password.");
    }
    setSubmitting(false);
  };

  const handleQuickLogin = async (role: "customer" | "admin") => {
    setError(null);
    setSubmitting(true);
    await quickLoginAs(role);
    showToast(role === "admin" ? "Logged in as Master Admin" : "Logged in as VIP Customer");
    setSubmitting(false);
    if (role === "admin") {
      router.push("/admin");
    } else {
      router.push(redirectPath);
    }
  };

  return (
    <div className="bg-[#F7F4EE] min-h-[calc(100vh-80px)] py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vastra max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-[#D8D3CA] bg-white overflow-hidden shadow-sm">
          {/* Left Hero Brand Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#111111] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#555A46]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-8">
                <span className="flex h-7 w-7 items-center justify-center rounded bg-white text-black font-black text-xs font-display">
                  V
                </span>
                <span className="text-sm font-extrabold tracking-[0.25em] uppercase font-display">
                  VASTRA
                </span>
              </div>

              <span className="inline-block rounded border border-[#555A46]/50 bg-[#555A46]/20 px-2.5 py-1 text-[10px] font-mono tracking-widest text-[#A8B294] uppercase mb-4">
                AUTHENTICATION & RBAC
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display leading-tight mb-4">
                Enter the Heavyweight Collective.
              </h2>
              <p className="text-xs text-[#99948D] leading-relaxed">
                Sign in to manage your order tracking timelines, 7-day size exchanges, and curated drop reservations.
              </p>
            </div>

            {/* Quick Demo Login Cards */}
            <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#77736D] font-bold block mb-1">
                Instant Demo Access (1-Click)
              </span>

              <button
                type="button"
                onClick={() => handleQuickLogin("customer")}
                disabled={submitting || isLoading}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/10 text-white">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">
                      VIP Customer Passport
                    </strong>
                    <span className="text-[10px] text-[#99948D]">
                      customer@vastra.in • Orders & Tracking
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-white/50 group-hover:text-white transition-colors" />
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                disabled={submitting || isLoading}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#555A46]/30 text-[#A8B294]">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-white block">
                      Master Admin Passport
                    </strong>
                    <span className="text-[10px] text-[#99948D]">
                      admin@vastra.in • Inventory, KPIs & AI
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-white/50 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>

          {/* Right Login Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
                  Sign In
                </h1>
                <p className="mt-1 text-xs text-[#77736D]">
                  Access your VASTRA account using your email credentials.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="font-bold block">Access Denied</strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#77736D]" />
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D3CA] bg-[#F7F4EE]/50 pl-10 pr-4 py-3 text-xs text-[#111111] placeholder:text-[#99948D] focus:border-black focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold text-[#111111] uppercase tracking-wider"
                    >
                      Password
                    </label>
                    <span className="text-[11px] text-[#77736D] hover:text-black cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#77736D]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D3CA] bg-[#F7F4EE]/50 pl-10 pr-10 py-3 text-xs text-[#111111] placeholder:text-[#99948D] focus:border-black focus:bg-white focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#77736D] hover:text-black"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || isLoading}
                  className="w-full mt-2 rounded-xl bg-black py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-[#252525] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to VASTRA</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Navigation */}
              <div className="mt-8 pt-6 border-t border-[#F1EEE7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#77736D]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-black underline underline-offset-4 hover:opacity-75"
                  >
                    Create Account
                  </Link>
                </span>

                <Link
                  href="/"
                  className="text-[#77736D] hover:text-black transition-colors"
                >
                  Return to Storefront →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
