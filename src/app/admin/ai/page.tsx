"use client";

import React, { useState } from "react";
import { Sparkles, TrendingUp, ThumbsUp, MessageSquare, Wand2, Copy, Check } from "lucide-react";

export default function AdminAIPage() {
  const [selectedProductPrompt, setSelectedProductPrompt] = useState("Vastra Heavy Oversized Tee in Vintage Sage");
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCopy(
        `Crafted from 240 GSM organic French terry cotton, the Vintage Sage Oversized Tee fuses brutalist streetwear aesthetics with cloud-soft breathability. Features our signature 2.5-inch dropped shoulder contour, a dense non-sag ribbed collar, and subtle chest typographic embroidery. Pre-shrunk with natural silicone enzymes for an enduring drape that commands attention without effort.`
      );
      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = () => {
    if (generatedCopy) {
      navigator.clipboard.writeText(generatedCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-[#D8D3CA]">
        <div className="flex items-center gap-2 text-[#555A46] font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="h-4 w-4" />
          <span>Decision Support Engine</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
          AI Retail & Brand Intelligence
        </h1>
        <p className="text-xs text-[#77736D] mt-0.5">
          Predictive demand signals, customer review sentiment extraction, and automated editorial copywriting.
        </p>
      </div>

      {/* Grid of 3 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Demand Prediction */}
        <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-[#555A46] uppercase">Inventory Forecast</span>
              <TrendingUp className="h-4 w-4 text-[#3F6B4B]" />
            </div>
            <h3 className="text-sm font-bold text-black">
              Restock Urgency: Better Days Ahead Tee
            </h3>
            <p className="mt-2 text-xs text-[#4F4B45] leading-relaxed">
              At current run-rate of 14 units/day, inventory in Size L will deplete in 48 hours. Projected stockout revenue loss: ₹84,000.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1EEE7]">
            <span className="text-[11px] font-semibold text-[#3F6B4B]">
              Recommended Batch: 150 Units
            </span>
          </div>
        </div>

        {/* Card 2: Sentiment Extraction */}
        <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-[#555A46] uppercase">Review Sentiment</span>
              <ThumbsUp className="h-4 w-4 text-[#3F6B4B]" />
            </div>
            <h3 className="text-sm font-bold text-black">
              94.2% Positive Sentiment (240 GSM Fabric)
            </h3>
            <p className="mt-2 text-xs text-[#4F4B45] leading-relaxed">
              Top keywords across 240+ verified buyer reviews: &quot;thick collar&quot;, &quot;doesn&apos;t shrink&quot;, &quot;perfect drape&quot;, &quot;luxury streetwear feel&quot;.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1EEE7]">
            <span className="text-[11px] font-semibold text-[#111111]">
              Collar Durability Score: 4.9 / 5.0
            </span>
          </div>
        </div>

        {/* Card 3: Colorway Velocity */}
        <div className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-bold text-[#555A46] uppercase">Style Velocity</span>
              <Sparkles className="h-4 w-4 text-[#555A46]" />
            </div>
            <h3 className="text-sm font-bold text-black">
              Charcoal & Olive Outperforming Neutrals
            </h3>
            <p className="mt-2 text-xs text-[#4F4B45] leading-relaxed">
              Urban dark palettes are moving 1.8x faster than traditional cream blanks among Tier-1 metro buyers (Bengaluru, Mumbai).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-[#F1EEE7]">
            <span className="text-[11px] font-semibold text-[#555A46]">
              Action: Increase Olive run by 25%
            </span>
          </div>
        </div>
      </div>

      {/* Interactive AI Editorial Copywriter Tool */}
      <div className="rounded-2xl border border-[#D8D3CA] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Wand2 className="h-5 w-5 text-[#555A46]" />
          <h2 className="text-base font-bold text-[#111111] font-display">
            AI Product Copy & Storytelling Generator
          </h2>
        </div>
        <p className="text-xs text-[#77736D] mb-6">
          Draft high-converting, brand-aligned editorial descriptions with technical 240 GSM specifications automatically.
        </p>

        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="text-xs font-semibold text-black block mb-1">
              Garment Concept & Color
            </label>
            <input
              type="text"
              value={selectedProductPrompt}
              onChange={(e) => setSelectedProductPrompt(e.target.value)}
              className="w-full rounded border border-[#D8D3CA] p-2.5 text-xs text-black focus:border-black focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded bg-black px-6 py-2.5 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#252525] disabled:opacity-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isGenerating ? "Synthesizing Copy..." : "Generate Editorial Copy"}</span>
          </button>

          {generatedCopy && (
            <div className="mt-6 rounded-xl bg-[#F7F4EE] border border-[#D8D3CA] p-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#555A46] uppercase tracking-wider">
                  Generated Editorial Description
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-black font-semibold hover:underline"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#3F6B4B]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy to Clipboard</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#252525] leading-relaxed italic bg-white p-4 rounded-lg border border-[#D8D3CA]">
                &ldquo;{generatedCopy}&rdquo;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
