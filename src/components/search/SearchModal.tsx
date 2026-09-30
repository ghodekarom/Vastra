"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, Product } from "@/data/products";

export default function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [aiInterpreted, setAiInterpreted] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSearch();
      }
      if (e.key === "/" && !isSearchOpen) {
        // e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 4));
      setAiInterpreted(null);
      return;
    }

    const q = query.toLowerCase();

    // AI query interpretation simulation
    if (q.includes("under") || q.includes("black") || q.includes("minimal") || q.includes("heavy") || q.includes("graphic")) {
      const criteria = [];
      if (q.includes("under")) criteria.push("Budget: < ₹2,000");
      if (q.includes("black") || q.includes("charcoal")) criteria.push("Tone: Dark / Charcoal");
      if (q.includes("graphic")) criteria.push("Category: Graphic Art");
      if (q.includes("minimal")) criteria.push("Category: Clean Minimal");
      setAiInterpreted(criteria.join(" • "));
    } else {
      setAiInterpreted(null);
    }

    const matched = PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(q));
      return matchName || matchDesc || matchCat || matchColor;
    });

    setResults(matched);
  }, [query]);

  if (!isSearchOpen) return null;

  const quickPills = [
    "Oversized Classics",
    "Under ₹1,800",
    "Graphic Tees",
    "240 GSM Heavyweight",
    "Olive & Earth",
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeSearch}
      />

      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 md:p-12">
        <div className="relative w-full max-w-3xl rounded-xl bg-[#F7F4EE] shadow-2xl border border-[#D8D3CA] overflow-hidden mt-8 animate-in fade-in zoom-in-95 duration-200">
          {/* Search Header Bar */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-[#D8D3CA] bg-white">
            <Search className="h-5 w-5 text-[#77736D]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by fit, color, GSM, graphic or try 'Oversized tees under 2000'..."
              className="w-full bg-transparent text-sm sm:text-base text-[#111111] placeholder-[#77736D] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="p-1 text-[#77736D] hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="rounded bg-[#F1EEE7] p-1.5 text-xs text-[#4F4B45] hover:bg-[#EAE4D9]"
            >
              ESC
            </button>
          </div>

          {/* AI Query Interpretation badge */}
          {aiInterpreted && (
            <div className="bg-[#555A46]/10 px-6 py-2 border-b border-[#555A46]/20 flex items-center gap-2 text-xs text-[#555A46] font-medium">
              <Sparkles className="h-3.5 w-3.5 text-[#555A46]" />
              <span>AI Search Filter Applied: {aiInterpreted}</span>
            </div>
          )}

          {/* Quick Filter Pills */}
          <div className="px-6 py-3 bg-[#F1EEE7] flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[#77736D] font-medium flex-shrink-0">Popular:</span>
            {quickPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => setQuery(pill)}
                className="rounded-full bg-white border border-[#D8D3CA] px-3 py-1 text-[11px] font-medium text-[#111111] hover:border-black transition-colors whitespace-nowrap"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Search Results Grid */}
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-semibold text-[#77736D] uppercase tracking-wider">
                {query ? `Results (${results.length})` : "Featured Drops"}
              </h4>
              <Link
                href="/shop"
                onClick={closeSearch}
                className="text-xs font-medium text-[#111111] hover:underline flex items-center gap-1"
              >
                Browse Full Catalog <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {results.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-semibold text-[#111111]">
                  No matching garments found
                </p>
                <p className="mt-1 text-xs text-[#77736D]">
                  Try searching for &quot;Oversized&quot;, &quot;Graphic&quot;, &quot;240 GSM&quot;, or &quot;Charcoal&quot;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="flex gap-3 rounded-lg border border-[#D8D3CA] p-2.5 bg-white/70 hover:bg-white hover:border-black/50 transition-all duration-150"
                  >
                    <div className="relative h-20 w-16 flex-shrink-0 rounded bg-[#E4DDD0] overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h5 className="text-xs font-semibold text-[#111111] line-clamp-1">
                        {product.name}
                      </h5>
                      <p className="text-[11px] text-[#77736D] line-clamp-1 mt-0.5">
                        {product.subtitle}
                      </p>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-xs font-bold text-[#111111]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[10px] text-[#77736D] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
