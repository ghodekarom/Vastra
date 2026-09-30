"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ContactPage() {
  const { showToast } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Your message has been dispatched to our concierge team.");
  };

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-10 sm:py-16">
      <div className="container-vastra max-w-4xl">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#555A46]">
            CONCIERGE & SUPPORT
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] font-display">
            Contact VASTRA
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#77736D]">
            Have inquiries regarding size advice, custom orders, or collaborations? We&apos;re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Info Card (5 cols) */}
          <div className="md:col-span-5 rounded-xl border border-[#D8D3CA] bg-white p-6 sm:p-8 space-y-6 shadow-xs text-xs text-[#4F4B45]">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-black flex-shrink-0" />
              <div>
                <strong className="text-black block">Email Support</strong>
                <p>concierge@vastra.in</p>
                <span className="text-[11px] text-[#77736D]">Response within 12 hours</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-black flex-shrink-0" />
              <div>
                <strong className="text-black block">Phone & WhatsApp</strong>
                <p>+91 (080) 4122-8920</p>
                <span className="text-[11px] text-[#77736D]">Mon–Sat: 10:00 AM – 7:00 PM IST</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-black flex-shrink-0" />
              <div>
                <strong className="text-black block">Studio & Headquarters</strong>
                <p>VASTRA Apparel Studio, 100 Feet Road, Indiranagar, Bengaluru, KA 560038</p>
              </div>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 rounded-xl border border-[#D8D3CA] bg-white p-6 sm:p-8 shadow-xs">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-12 w-12 text-[#3F6B4B] mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#111111]">
                  Message Received
                </h3>
                <p className="mt-1 text-xs text-[#77736D]">
                  Our style advisor will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-black block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    className="w-full rounded border border-[#D8D3CA] p-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    className="w-full rounded border border-[#D8D3CA] p-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="font-semibold text-black block mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="How can we assist with your order or sizing?"
                    className="w-full rounded border border-[#D8D3CA] p-2.5 focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded bg-black px-6 py-3 text-xs font-bold text-white uppercase tracking-wider shadow-sm hover:bg-[#252525] transition-colors"
                >
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
