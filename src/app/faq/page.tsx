import React from "react";
import Link from "next/link";
import { HelpCircle, ChevronRight } from "lucide-react";

export default function FAQPage() {
  const faqs = [
    {
      q: "What makes VASTRA oversized t-shirts different from regular tees?",
      a: "Our t-shirts are made from 240 GSM super-combed compact cotton, which is 50-70% denser than standard tees. They feature an engineered 2.5-inch dropped shoulder, reinforced 1.25-inch ribbed neck, and a boxy silhouette that drapes without sagging.",
    },
    {
      q: "How should I choose my size?",
      a: "Our t-shirts have a relaxed, oversized fit by design. If you want the intended modern oversized streetwear look, order your standard size. If you prefer a more tailored, classic fit, order one size down.",
    },
    {
      q: "What are the shipping charges and delivery timelines?",
      a: "We offer complimentary standard shipping on all orders over ₹1,999 (otherwise ₹99). Deliveries take 3–5 business days for major Indian metro cities, and 4–7 days for other regions.",
    },
    {
      q: "What is your return & exchange policy?",
      a: "We offer a 7-day hassle-free return and exchange policy from the date of delivery. Items must be unworn, unwashed, and in original packaging with tags intact. You can request a doorstep pickup directly from your Account page.",
    },
    {
      q: "How should I care for my 240 GSM t-shirt?",
      a: "Machine wash cold with similar dark colors. Wash and iron inside out. Do not bleach or tumble dry on high heat to preserve the silicone bio-wash finish and fabric structure.",
    },
  ];

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-10 sm:py-16">
      <div className="container-vastra max-w-3xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#555A46]">
            HELP & ASSISTANCE
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] font-display">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#77736D]">
            Everything you need to know about sizing, 240 GSM fabric care, shipping, and returns.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs"
            >
              <h3 className="text-sm font-bold text-[#111111] font-display">
                {faq.q}
              </h3>
              <p className="mt-2 text-xs text-[#4F4B45] leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-[#77736D]">
          Still have questions? Reach out to us at{" "}
          <Link href="/contact" className="text-black font-bold underline">
            support@vastra.in
          </Link>
        </div>
      </div>
    </div>
  );
}
