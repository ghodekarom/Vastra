import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Feather } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#F7F4EE] min-h-screen py-12 sm:py-20">
      <div className="container-vastra max-w-4xl">
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#555A46]">
            THE VASTRA MANIFESTO
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] font-display">
            Bigger Fits. Bolder Moves.
          </h1>
          <p className="mt-4 text-xs sm:text-sm text-[#4F4B45] leading-relaxed">
            Born out of a simple frustration: most streetwear oversized t-shirts either shrink into mediocrity or lose their architectural drape after two washes.
          </p>
        </div>

        {/* Cinematic Imagery */}
        <div className="relative h-[380px] sm:h-[460px] rounded-2xl overflow-hidden shadow-lg mb-16 bg-[#EAE4D9]">
          <Image
            src="/images/hero/hero-cinematic.jpg"
            alt="Vastra Brand Identity"
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Pillars */}
        <div className="space-y-12 text-xs sm:text-sm text-[#4F4B45] leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white border border-[#D8D3CA]">
              <div className="h-10 w-10 rounded-full bg-[#F7F4EE] flex items-center justify-center text-black mb-4">
                <Feather className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-2 font-display">
                240 GSM Fabric Density
              </h3>
              <p>
                We source ultra-clean combed cotton woven at 240 grams per square meter. It provides real drape, structural confidence, and zero translucency.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#D8D3CA]">
              <div className="h-10 w-10 rounded-full bg-[#F7F4EE] flex items-center justify-center text-black mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-2 font-display">
                Engineered Shoulders
              </h3>
              <p>
                The shoulder line is intentionally offset by 2.5 inches. This creates the effortless dropped silhouette that looks relaxed while maintaining broad shoulder presence.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#D8D3CA]">
              <div className="h-10 w-10 rounded-full bg-[#F7F4EE] flex items-center justify-center text-black mb-4">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#111111] mb-2 font-display">
                Crafted in India
              </h3>
              <p>
                All garments are ethically knit, cut, and sewn in historic textile hubs in India, supporting generational artisans and zero toxic byproduct dyeing.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded bg-black px-8 py-3.5 text-xs font-bold text-white uppercase tracking-wider shadow-md hover:bg-[#252525]"
            >
              <span>Explore The Current Collection</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
