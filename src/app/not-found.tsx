import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F7F4EE] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/5 text-[#111111] mb-2">
          <Compass className="h-8 w-8 stroke-[1.5]" />
        </div>
        
        <div>
          <span className="text-xs font-mono font-semibold tracking-widest text-[#77736D] uppercase">
            404 — Page Not Found
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111111] font-display">
            Lost in the Cut.
          </h1>
          <p className="mt-3 text-sm text-[#4F4B45] leading-relaxed">
            The drop or page you are looking for has been moved, archived, or does not exist in our catalog.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-xs font-bold text-white uppercase tracking-wider hover:bg-black transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#D8D3CA] bg-white px-6 py-3 text-xs font-bold text-[#111111] uppercase tracking-wider hover:bg-[#F1EEE7] transition-all"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
