"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useStore } from "@/context/StoreContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { showToast } = useStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSubmitting(true);
    const result = await register({
      fullName,
      email,
      password,
      phone: phone || undefined,
    });

    if (result.success) {
      showToast("Account created successfully. Welcome to VASTRA.");
      router.push("/account");
    } else {
      setError(result.error || "Failed to create account. Please try again.");
    }
    setSubmitting(false);
  };

  const perks = [
    "10% welcome coupon applied on your first drop order",
    "Real-time BlueDart tracking timeline with SMS milestones",
    "7-day priority size exchange and reverse studio pickup",
    "Reserved early access for 300+ GSM French Terry releases",
  ];

  return (
    <div className="bg-[#F7F4EE] min-h-[calc(100vh-80px)] py-12 sm:py-20 flex items-center justify-center">
      <div className="container-vastra max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl border border-[#D8D3CA] bg-white overflow-hidden shadow-sm">
          {/* Left Brand Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#111111] p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
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
                MEMBERSHIP REGISTRATION
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-display leading-tight mb-4">
                Join the Heavyweight Syndicate.
              </h2>
              <p className="text-xs text-[#99948D] leading-relaxed">
                Create your VASTRA passport to access curated oversized silhouettes and priority fulfillment across India.
              </p>
            </div>

            {/* Membership Perks */}
            <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
              <span className="text-[10px] uppercase tracking-wider text-[#A8B294] font-bold block mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span>Member Privileges</span>
              </span>

              {perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#CFCBC4]">
                  <CheckCircle2 className="h-4 w-4 text-[#A8B294] mt-0.5 flex-shrink-0" />
                  <span className="text-[11px] leading-relaxed">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form (7 cols) */}
          <div className="lg:col-span-7 p-8 sm:p-14 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
                  Create Account
                </h1>
                <p className="mt-1 text-xs text-[#77736D]">
                  Enter your details to generate your customer credentials.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 flex items-start gap-3">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="font-bold block">Registration Error</strong>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#77736D]" />
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D3CA] bg-[#F7F4EE]/50 pl-10 pr-4 py-3 text-xs text-[#111111] placeholder:text-[#99948D] focus:border-black focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
                  >
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-[#77736D]" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-[#D8D3CA] bg-[#F7F4EE]/50 pl-10 pr-4 py-3 text-xs text-[#111111] placeholder:text-[#99948D] focus:border-black focus:bg-white focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-1.5"
                  >
                    Password (Min. 6 Characters)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#77736D]" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
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
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Navigation */}
              <div className="mt-8 pt-6 border-t border-[#F1EEE7] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#77736D]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-black underline underline-offset-4 hover:opacity-75"
                  >
                    Sign In
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
