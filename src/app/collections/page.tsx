import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  const collections = [
    {
      title: "The Horizon Collection",
      tagline: "Earthy tones, drop shoulders, and back landscape artwork.",
      image: "/images/hero/hero-cinematic.jpg",
      count: "6 styles",
      href: "/shop?collection=horizon",
    },
    {
      title: "Oversized Classics",
      tagline: "Daily essential heavy blanks designed for year-round layering.",
      image: "/images/products/classic-cream.jpg",
      count: "4 styles",
      href: "/shop?collection=classics",
    },
    {
      title: "Graphic Art Series",
      tagline: "High-density discharge prints exploring topographic contours.",
      image: "/images/hero/wave-back.jpg",
      count: "5 styles",
      href: "/shop?collection=graphic",
    },
    {
      title: "Minimal Blanks",
      tagline: "Unbranded silhouettes with generous drape and structured collar.",
      image: "/images/products/minimal-olive.jpg",
      count: "4 styles",
      href: "/shop?collection=minimal",
    },
  ];

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-10 sm:py-16">
      <div className="container-vastra">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#555A46]">
            EDITORIAL LOOKBOOKS
          </span>
          <h1 className="mt-2 text-3xl sm:text-5xl font-bold tracking-tight text-[#111111] font-display">
            Curated Collections
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#4F4B45]">
            Each VASTRA drop is formulated around architectural silhouettes and heavy 240 GSM organic fabrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {collections.map((col, idx) => (
            <Link
              key={idx}
              href={col.href}
              className="group relative h-[420px] rounded-2xl overflow-hidden shadow-sm border border-[#D8D3CA] flex flex-col justify-end p-8 text-white"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8B0A4] block mb-1">
                  {col.count}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display">
                  {col.title}
                </h3>
                <p className="mt-2 text-xs text-[#E7E0D4] max-w-sm">
                  {col.tagline}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group-hover:underline">
                  <span>Explore Drop</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
