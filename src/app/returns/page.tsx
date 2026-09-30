import React from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-[#F7F4EE] min-h-screen py-10 sm:py-16">
      <div className="container-vastra max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-[#111111] font-display mb-6">
          Returns & Exchanges Policy
        </h1>
        <div className="rounded-xl border border-[#D8D3CA] bg-white p-8 space-y-6 text-xs text-[#4F4B45] leading-relaxed shadow-xs">
          <div>
            <h2 className="text-sm font-bold text-[#111111] mb-2">7-Day Return Window</h2>
            <p>
              We want you to love your oversized fit. If your garment doesn&apos;t fit your expectations, you may initiate a return or size exchange within 7 days of receiving your package.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#111111] mb-2">Condition of Returned Items</h2>
            <p>
              Garments must be returned in their original condition: unworn, unwashed, unaltered, and with all original VASTRA tags and polybags intact.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#111111] mb-2">Refund Processing</h2>
            <p>
              Once your returned item arrives at our fulfillment facility and passes quality inspection (usually within 48 hours of receipt), your refund is immediately transferred back to your original payment method or UPI handle.
            </p>
          </div>

          <div className="pt-4 border-t border-[#D8D3CA]">
            <Link
              href="/account"
              className="inline-flex rounded bg-black px-6 py-2.5 text-xs font-semibold text-white uppercase tracking-wider"
            >
              Go to Account to Request Return
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
