import React from "react";
import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="bg-[#F7F4EE] min-h-screen py-10 sm:py-16">
      <div className="container-vastra max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-[#111111] font-display mb-6">
          Shipping & Delivery Policy
        </h1>
        <div className="rounded-xl border border-[#D8D3CA] bg-white p-8 space-y-6 text-xs text-[#4F4B45] leading-relaxed shadow-xs">
          <div>
            <h2 className="text-sm font-bold text-[#111111] mb-2">Delivery Timelines</h2>
            <p>
              All orders are processed and verified within 24 hours of placement. Standard delivery takes 3–5 business days for metro areas (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata) and 5–7 days for non-metro locations across India.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#111111] mb-2">Shipping Charges</h2>
            <p>
              We provide complimentary standard delivery on all domestic orders valued at ₹1,999 and above. Orders below ₹1,999 incur a flat nominal shipping fee of ₹99.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#111111] mb-2">Courier Partners & Tracking</h2>
            <p>
              We partner with trusted logistics providers including Blue Dart, Delhivery, and Xpressbees. Once your parcel has left our facility, an SMS and email notification containing your live tracking ID is automatically dispatched.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
