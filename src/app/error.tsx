"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global boundary caught error:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-[#F7F4EE] px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#A63D35]/10 text-[#A63D35] mb-2">
          <AlertTriangle className="h-8 w-8 stroke-[1.5]" />
        </div>

        <div>
          <span className="text-xs font-mono font-semibold tracking-widest text-[#A63D35] uppercase">
            Error Occurred
          </span>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111111] font-display">
            Something Went Sideways.
          </h1>
          <p className="mt-3 text-sm text-[#4F4B45] leading-relaxed">
            An unexpected glitch occurred while rendering this view. Our atelier team has been notified.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#111111] px-6 py-3 text-xs font-bold text-white uppercase tracking-wider hover:bg-black transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-[#D8D3CA] bg-white px-6 py-3 text-xs font-bold text-[#111111] uppercase tracking-wider hover:bg-[#F1EEE7] transition-all"
          >
            Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
