"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      title: "Bigger Fits\nBolder Moves",
      subtitle: "Premium oversized t-shirts for men. Designed for comfort, styled for everyday.",
      tag: "MEN'S OVERSIZED T-SHIRTS",
      image: "/images/hero/hero-model-brown.jpg",
      floatingCard: {
        title: "New Drop",
        subtitle: "The Horizon Collection",
        image: "/images/hero/wave-back.jpg",
        href: "/shop?collection=horizon",
      },
    },
    {
      title: "Architectural\nHeavy Drape",
      subtitle: "Dense 240 GSM organic cotton engineered to maintain its shape all day long.",
      tag: "NEW SEASON 2026",
      image: "/images/hero/hero-cinematic.jpg",
      floatingCard: {
        title: "Signature Series",
        subtitle: "Washed Acid Tees",
        image: "/images/products/pdp-shadow-front.jpg",
        href: "/shop?collection=acid",
      },
    },
  ];

  // GSAP animation for hero entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(heroTextRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });

      // Featured grid reveal
      if (featuredRef.current) {
        gsap.from(featuredRef.current.children, {
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 40,
          stagger: 0.12,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [activeSlide]);

  const featuredProducts = PRODUCTS.slice(0, 4);
  const trendingProducts = PRODUCTS.slice(4, 8);

  const reviews = [
    {
      name: "Kabir Mehta",
      location: "Mumbai",
      rating: 5,
      comment: "The 240 GSM fabric is genuinely thick without feeling stiff. The drop shoulder sits perfectly on the arms.",
      product: "Shadow Print Oversized Tee",
    },
    {
      name: "Rohan Varma",
      location: "Bengaluru",
      rating: 5,
      comment: "Finally an Indian streetwear brand that gets the oversized proportions right. Collar hasn't sagged after 5 washes.",
      product: "Essential Blank Oversized Tee",
    },
    {
      name: "Devansh Nair",
      location: "Delhi",
      rating: 5,
      comment: "The Better Days Ahead back graphic is art gallery level. Arrived in premium matte packaging in 2 days.",
      product: "Better Days Ahead Wave Tee",
    },
  ];

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div ref={heroRef} className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION WITH 3D PERSPECTIVE & EDITORIAL TYPOGRAPHY */}
      <section
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="relative w-full pt-6 pb-14 md:py-16 bg-[#F7F4EE] overflow-hidden"
      >
        <div className="container-vastra">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px] lg:min-h-[640px]">
            {/* Left Hero Text Column with 3D Depth */}
            <div
              ref={heroTextRef}
              className="lg:col-span-6 flex flex-col justify-center z-10 relative"
            >
              {/* Luxury Insignia & Season Drop Archive Pill (Suggestion 1) */}
              <div className="relative z-10 inline-flex items-center gap-2 sm:gap-2.5 rounded-full border border-[#D8D3CA] bg-white/85 px-3.5 py-1.5 backdrop-blur-md shadow-xs mb-5 w-fit shimmer-pill group cursor-pointer hover:border-black/50 hover:shadow-md transition-all">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-black text-white font-display group-hover:rotate-12 transition-transform">
                  V
                </span>
                <span className="text-[11px] font-bold text-[#111111] uppercase tracking-wider font-display">
                  VASTRA ARCHIVE // SS-26
                </span>
                <span className="h-3 w-px bg-[#D8D3CA] hidden sm:inline-block" />
                <span className="text-[10px] font-semibold text-[#626854] uppercase tracking-wide hidden sm:inline-block font-sans group-hover:text-black transition-colors">
                  240 GSM HEAVYWEIGHT
                </span>
                <span className="h-3 w-px bg-[#D8D3CA]" />
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#3F6B4B]">
                  <span className="h-2 w-2 rounded-full bg-[#3F6B4B] animate-pulse" />
                  DROP 01
                </span>
              </div>

              {/* Headline Container with Watermark Confined to Background of Text */}
              <div className="relative w-fit max-w-full">
                {/* Architectural Watermark - strictly behind headline only */}
                <div
                  aria-hidden="true"
                  className="absolute -top-3 sm:-top-5 -left-1 select-none pointer-events-none z-0 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 8}px, 0)`,
                  }}
                >
                  <span className="text-stroke-faint font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-[0.06em] uppercase leading-none block select-none opacity-85">
                    VASTRA
                  </span>
                </div>

                {/* Editorial Streetwear Duo: Syne ExtraBold + Cormorant Italic */}
                <h1 className="relative z-10 text-5xl sm:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-[#111111] leading-[0.98]">
                  <span className="font-display font-extrabold block tracking-tight text-[#111111]">
                    Bigger Fits,
                  </span>
                  <span className="font-serif italic font-normal block text-[#252525] tracking-normal mt-1 sm:mt-2">
                    Bolder Moves.
                  </span>
                </h1>
              </div>

              <p className="mt-5 text-sm sm:text-base text-[#4F4B45] max-w-md leading-relaxed relative z-10">
                {heroSlides[activeSlide].subtitle}
              </p>

              <div className="mt-8 flex items-center gap-4 relative z-10">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded bg-[#111111] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#252525] active:scale-98 transition-all"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 rounded border border-[#D8D3CA] bg-white/70 px-5 py-3.5 text-xs sm:text-sm font-medium text-[#111111] hover:bg-white transition-all backdrop-blur-xs"
                >
                  View Lookbook
                </Link>
              </div>

              {/* Slider Controls */}
              <div className="mt-12 flex items-center gap-4 text-xs font-mono text-[#77736D] relative z-10">
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
                  className="hover:text-black transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  <span className={activeSlide === 0 ? "text-[#111111] font-bold font-display" : "text-[#77736D]"}>
                    — 01
                  </span>
                  <span className={activeSlide === 1 ? "text-[#111111] font-bold font-display" : "text-[#77736D]"}>
                    02
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev === 0 ? 1 : 0))}
                  className="hover:text-black transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Hero Visuals Column with 3D Spatial Perspective */}
            <div className="lg:col-span-6 relative w-full h-[480px] sm:h-[560px] lg:h-[640px] flex items-center justify-center perspective-1200 preserve-3d">
              {/* 3D Tilting Main Model Container */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#E7E0D4] transition-transform duration-300 ease-out preserve-3d"
                style={{
                  transform: `rotateY(${mousePos.x * 9}deg) rotateX(${-mousePos.y * 9}deg) translateZ(10px)`,
                }}
              >
                <Image
                  src={heroSlides[activeSlide].image}
                  alt="Vastra Oversized T-Shirt Model"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover object-top"
                />

                {/* 3D Floating Chrome Streetwear Tag */}
                <div
                  className="absolute top-6 left-6 z-20 hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#1A1A1A] via-[#333333] to-[#111111] border border-white/20 px-3.5 py-1.5 text-white shadow-xl backdrop-blur-md transition-all duration-300 ease-out shimmer-pill cursor-pointer hover:border-white/50 hover:scale-105"
                  style={{
                    transform: `translateZ(35px) rotateY(${mousePos.x * 12}deg)`,
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#E7E0D4]" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E7E0D4] font-display">
                    240 GSM // ARCHITECTURAL DRAPE
                  </span>
                </div>
              </div>

              {/* Floating Preview Card with Counter-Tilt & 3D Layering */}
              <Link
                href={heroSlides[activeSlide].floatingCard.href}
                className="absolute -bottom-4 right-2 sm:bottom-6 sm:right-6 z-30 w-44 sm:w-56 rounded-xl bg-white/95 p-2.5 shadow-2xl backdrop-blur-md border border-[#D8D3CA] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]"
                style={{
                  transform: `translateZ(65px) rotateY(${-mousePos.x * 12}deg) rotateX(${mousePos.y * 12}deg)`,
                }}
              >
                <div className="relative h-44 sm:h-52 w-full rounded-lg overflow-hidden bg-[#E7E0D4]">
                  <Image
                    src={heroSlides[activeSlide].floatingCard.image}
                    alt="New Drop Wave Tee"
                    fill
                    sizes="(max-width: 640px) 176px, 224px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between px-1">
                  <div>
                    <span className="text-[10px] font-semibold text-[#77736D] uppercase tracking-wider block">
                      {heroSlides[activeSlide].floatingCard.title}
                    </span>
                    <span className="text-xs font-bold text-[#111111] block font-display">
                      {heroSlides[activeSlide].floatingCard.subtitle}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[#111111]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION SECTION (Matches rasika1.png middle section) */}
      <section className="py-16 md:py-24 bg-[#F7F4EE]">
        <div className="container-vastra">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#D8D3CA]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
                Featured Collection
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#77736D]">
                Handpicked styles. Timeless essentials.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#555A46] uppercase tracking-wider group"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 4-Card Product Grid */}
          <div ref={featuredRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. DUAL EDITORIAL STORYTELLING SECTION (Matches rasika1.png bottom banner) */}
      <section className="py-12 bg-[#F1EEE7]">
        <div className="container-vastra">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner 1: The Horizon Collection */}
            <div className="relative h-[340px] sm:h-[400px] rounded-xl overflow-hidden shadow-md group">
              <Image
                src="/images/editorial/horizon-green.jpg"
                alt="The Horizon Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B8B0A4]">
                  NEW ARRIVALS
                </span>
                <h3 className="mt-1 text-2xl sm:text-3xl font-bold font-display">
                  The Horizon Collection
                </h3>
                <p className="mt-1 text-xs text-[#E7E0D4] max-w-xs">
                  Fresh drops. Same enduring comfort and dropped shoulder tailoring.
                </p>
                <div className="mt-5">
                  <Link
                    href="/shop?collection=horizon"
                    className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-[#E7E0D4] transition-colors"
                  >
                    Explore Collection <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Banner 2: More Than Just Clothing — 240 GSM Atelier Showcase */}
            <div className="relative h-[360px] sm:h-[400px] rounded-xl overflow-hidden shadow-md group border border-white/10">
              <Image
                src="/images/editorial/brand-mountains.jpg"
                alt="More Than Just Clothing"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />

              {/* Floating Architectural Spec Pill in Top Right */}
              <div className="absolute top-5 right-5 z-10 flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-3.5 py-1.5 backdrop-blur-md shadow-sm shimmer-pill cursor-pointer hover:scale-105 hover:border-white/50 transition-all">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3E635] animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E7E0D4] font-display">
                  240 GSM // ARCHIVAL DRAPE
                </span>
              </div>

              {/* Content Area */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#D8D3CA]">
                  ARCHITECTURAL STREETWEAR
                </span>

                <h3 className="mt-1 text-2xl sm:text-3xl font-bold font-display leading-tight">
                  More Than Just Clothing
                </h3>

                <p className="mt-1.5 text-xs text-[#E7E0D4] max-w-sm leading-relaxed">
                  Dense 240 GSM organic cotton engineered in India. Dropped shoulders, reinforced non-sag collar, and pre-shrunk bio-wash.
                </p>

                {/* Technical Micro-Pills */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white border border-white/20 shimmer-pill cursor-pointer hover:scale-105 hover:bg-white/25 transition-all">
                    Bio-Washed
                  </span>
                  <span className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white border border-white/20 shimmer-pill cursor-pointer hover:scale-105 hover:bg-white/25 transition-all">
                    2.5&quot; Drop Seam
                  </span>
                  <span className="rounded-full bg-white/15 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A3E635] border border-[#A3E635]/30 shimmer-pill cursor-pointer hover:scale-105 hover:bg-white/25 transition-all">
                    Shape Retention
                  </span>
                </div>

                {/* Direct High-Impact CTAs */}
                <div className="mt-5 flex items-center gap-3">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 rounded bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-[#E7E0D4] active:scale-95 transition-all shadow-md group"
                  >
                    <span>Shop Heavyweight Fits</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded border border-white/40 bg-white/10 hover:bg-white/20 backdrop-blur-xs px-4 py-2.5 text-xs font-semibold text-white transition-all hover:border-white"
                  >
                    <span>Our Craft</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SILHOUETTE & CRAFTSMANSHIP (240 GSM Technical Pillar) */}
      <section className="py-20 md:py-28 bg-[#F7F4EE]">
        <div className="container-vastra">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D8D3CA] bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#555A46] shadow-xs mb-3 shimmer-pill cursor-pointer hover:border-black/50 hover:scale-102 transition-all">
              <span className="h-1.5 w-1.5 rounded-full bg-[#555A46] animate-pulse" />
              <span>ENGINEERED FOR PROPORTION // 240 GSM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111111] font-display">
              Why <span className="shimmer-text font-black">240 GSM</span> Heavyweight?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-[#4F4B45] leading-relaxed max-w-xl mx-auto">
              Most standard t-shirts range between 140 to 180 GSM, collapsing and clinging to the body. VASTRA garments are woven at a dense 240 GSM, giving the garment natural architectural drape and longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Dropped Shoulders */}
            <div className="group rounded-2xl border border-[#D8D3CA] bg-white p-8 shadow-xs hover:border-black/50 hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 shimmer-card cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F1EEE7]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77736D] group-hover:text-black transition-colors">
                    SPEC // 01
                  </span>
                  <span className="shimmer-pill rounded-full bg-[#F7F4EE] border border-[#D8D3CA] px-2.5 py-0.5 text-[10px] font-bold text-[#111111] uppercase tracking-wide group-hover:bg-black group-hover:text-white transition-colors">
                    +2.5&quot; OFFSET
                  </span>
                </div>

                <div className="h-0.5 w-8 bg-black mt-4 mb-4 group-hover:w-full transition-all duration-500 ease-out" />

                <h3 className="text-2xl font-bold text-[#111111] font-display group-hover:text-black transition-colors">
                  01 / Dropped Shoulders
                </h3>
                <p className="mt-3 text-xs text-[#4F4B45] leading-relaxed">
                  Shoulder seams are offset by exactly 2.5 inches to produce the signature relaxed drape without pulling across the chest or binding the armpits.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1EEE7] flex items-center justify-between text-[11px] font-mono text-[#77736D]">
                <span>Fit Proportions</span>
                <span className="font-semibold text-black flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-[#3F6B4B]" />
                  Architectural Boxy
                </span>
              </div>
            </div>

            {/* Card 2: Non-Sag Ribbed Collar */}
            <div className="group rounded-2xl border border-[#D8D3CA] bg-white p-8 shadow-xs hover:border-black/50 hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 shimmer-card cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F1EEE7]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77736D] group-hover:text-black transition-colors">
                    SPEC // 02
                  </span>
                  <span className="shimmer-pill rounded-full bg-[#F7F4EE] border border-[#D8D3CA] px-2.5 py-0.5 text-[10px] font-bold text-[#111111] uppercase tracking-wide group-hover:bg-black group-hover:text-white transition-colors">
                    1.25&quot; SPANDEX RIB
                  </span>
                </div>

                <div className="h-0.5 w-8 bg-black mt-4 mb-4 group-hover:w-full transition-all duration-500 ease-out" />

                <h3 className="text-2xl font-bold text-[#111111] font-display group-hover:text-black transition-colors">
                  02 / Non-Sag Ribbed Collar
                </h3>
                <p className="mt-3 text-xs text-[#4F4B45] leading-relaxed">
                  Spandex-infused 1.25-inch high-density ribbed collar that stays snug against the neck without wrinkling or sagging through repeated machine cycles.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1EEE7] flex items-center justify-between text-[11px] font-mono text-[#77736D]">
                <span>Neck Retention</span>
                <span className="font-semibold text-black flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-[#3F6B4B]" />
                  50+ Machine Washes
                </span>
              </div>
            </div>

            {/* Card 3: Pre-Shrunk Bio Wash */}
            <div className="group rounded-2xl border border-[#D8D3CA] bg-white p-8 shadow-xs hover:border-black/50 hover:shadow-2xl hover:-translate-y-2.5 transition-all duration-300 shimmer-card cursor-pointer flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#F1EEE7]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#77736D] group-hover:text-black transition-colors">
                    SPEC // 03
                  </span>
                  <span className="shimmer-pill rounded-full bg-[#F7F4EE] border border-[#D8D3CA] px-2.5 py-0.5 text-[10px] font-bold text-[#111111] uppercase tracking-wide group-hover:bg-black group-hover:text-white transition-colors">
                    ZERO SHRINKAGE
                  </span>
                </div>

                <div className="h-0.5 w-8 bg-black mt-4 mb-4 group-hover:w-full transition-all duration-500 ease-out" />

                <h3 className="text-2xl font-bold text-[#111111] font-display group-hover:text-black transition-colors">
                  03 / Pre-Shrunk Bio Wash
                </h3>
                <p className="mt-3 text-xs text-[#4F4B45] leading-relaxed">
                  Treated with natural silicone enzymes to eliminate surface fuzz and lock in dimensions before you ever wear it, guaranteeing true-to-size permanence.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F1EEE7] flex items-center justify-between text-[11px] font-mono text-[#77736D]">
                <span>Fabric Feel</span>
                <span className="font-semibold text-black flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3 text-[#3F6B4B]" />
                  Ultra-Soft Touch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW SEASON DROPS & POPULAR PICKS */}
      <section className="py-16 md:py-20 bg-[#F1EEE7] border-t border-[#D8D3CA]">
        <div className="container-vastra">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#D8D3CA]">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
                New Season Drops
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#77736D]">
                Limited runs crafted for urban everyday statements.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111111] hover:text-[#555A46] uppercase tracking-wider group"
            >
              <span>Explore All</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED CUSTOMER REVIEWS */}
      <section className="py-20 bg-[#F7F4EE]">
        <div className="container-vastra">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="flex justify-center items-center gap-1 text-[#111111] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-black text-black" />
              ))}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
              Tested on the Streets
            </h2>
            <p className="mt-1 text-xs text-[#77736D]">
              Over 2,400+ satisfied customers across India. Rated 4.8 / 5.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#111111] mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-xs text-[#252525] leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F1EEE7] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#111111] block">{rev.name}</span>
                    <span className="text-[11px] text-[#77736D]">{rev.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#3F6B4B] font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
