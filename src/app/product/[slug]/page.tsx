"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Star,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Ruler,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";
import { PRODUCTS, SIZE_CHART, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const initialProduct = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [product, setProduct] = useState<Product>(initialProduct);

  React.useEffect(() => {
    import("@/config/site").then(({ siteConfig }) => {
      if (siteConfig.api.useRemoteApi && slug) {
        import("@/lib/api/products").then(({ fetchProductBySlug }) => {
          fetchProductBySlug(slug).then((res) => {
            if (res) setProduct(res);
          }).catch((err) => console.warn("Remote PDP sync:", err));
        });
      }
    });
  }, [slug]);

  const { addToCart, isInWishlist, toggleWishlist } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Charcoal");
  const [selectedSize, setSelectedSize] = useState<string>("L");
  const [activeTab, setActiveTab] = useState<"fit" | "details">("fit");
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[activeImageIndex] || product.images[0],
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-6 sm:py-10">
      <div className="container-vastra">
        {/* Breadcrumb Navigation matching rasika.png */}
        <nav className="flex items-center gap-2 text-xs text-[#77736D] mb-8">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/shop" className="hover:text-black">
            {product.category}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[#111111] font-medium truncate">
            {product.name}
          </span>
        </nav>

        {/* 3-Column PDP Grid Layout matching rasika.png bottom-left quadrant */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          {/* Column 1: Vertical Thumbnails + Main Photo (Lg: 6 cols) */}
          <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical Thumbnail Strip */}
            <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-16 w-14 sm:h-20 sm:w-16 rounded overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? "border-black ring-1 ring-black"
                      : "border-[#D8D3CA] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover object-top"
                  />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#EAE4D9] shadow-sm">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover object-top transition-all duration-300"
              />

              {/* Wishlist Heart on Mobile */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`sm:hidden absolute top-3 right-3 p-2.5 rounded-full bg-white/90 shadow-md ${
                  isSaved ? "text-[#A63D35]" : "text-black"
                }`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isSaved ? "currentColor" : "none"}
                />
              </button>
            </div>
          </div>

          {/* Column 2: Product Info & Actions (Lg: 3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] font-display">
              {product.name}
            </h1>

            {/* Price & Rating */}
            <div className="mt-2.5 flex items-baseline gap-2.5">
              <span className="text-xl font-bold text-[#111111]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#77736D] line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#77736D]">
              <div className="flex text-[#111111]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-black text-black" />
                ))}
              </div>
              <span className="font-semibold text-black">{product.rating}</span>
              <span>({product.reviewCount} reviews)</span>
            </div>

            {/* Editorial Description */}
            <p className="mt-4 text-xs text-[#4F4B45] leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2">
                <span className="font-semibold text-[#111111]">
                  Color: <span className="font-normal text-[#4F4B45]">{selectedColor}</span>
                </span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={`h-6 w-6 rounded-full border transition-all ${
                      selectedColor === c.name
                        ? "scale-110 border-black ring-2 ring-black/40"
                        : "border-black/20 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-6">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold text-[#111111]">Size</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-[#77736D] hover:text-black underline flex items-center gap-1"
                >
                  <Ruler className="h-3 w-3" />
                  <span>Size Guide</span>
                </button>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`flex-1 h-9 rounded text-xs font-semibold border transition-all ${
                      selectedSize === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-[#111111] border-[#D8D3CA] hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 rounded bg-[#111111] py-3.5 px-6 text-xs font-bold text-white uppercase tracking-wider shadow-md hover:bg-[#252525] active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <>
                    <Check className="h-4 w-4" /> Added to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`hidden sm:flex h-11 w-11 items-center justify-center rounded border border-[#D8D3CA] bg-white transition-colors hover:border-black ${
                  isSaved ? "text-[#A63D35]" : "text-[#111111]"
                }`}
              >
                <Heart
                  className="h-4 w-4"
                  fill={isSaved ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Trust Badges matching rasika.png */}
            <div className="mt-8 pt-6 border-t border-[#D8D3CA] space-y-3 text-xs text-[#4F4B45]">
              <div className="flex items-center gap-2.5">
                <Truck className="h-4 w-4 text-[#111111] flex-shrink-0" />
                <span>
                  <strong>Free Shipping</strong> on orders above ₹1,999
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="h-4 w-4 text-[#111111] flex-shrink-0" />
                <span>
                  <strong>Easy Returns</strong> within 7 days of delivery
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-[#111111] flex-shrink-0" />
                <span>
                  <strong>Secure Payments</strong> 100% protected encryption
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Fit & Size / Details Tabs matching rasika.png right column */}
          <div className="lg:col-span-3 rounded-xl border border-[#D8D3CA] bg-white p-6 shadow-xs">
            {/* Tabs Header */}
            <div className="flex border-b border-[#D8D3CA] mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("fit")}
                className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all ${
                  activeTab === "fit"
                    ? "border-black text-[#111111]"
                    : "border-transparent text-[#77736D] hover:text-black"
                }`}
              >
                Fit & Size
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("details")}
                className={`flex-1 pb-2.5 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all ${
                  activeTab === "details"
                    ? "border-black text-[#111111]"
                    : "border-transparent text-[#77736D] hover:text-black"
                }`}
              >
                Details
              </button>
            </div>

            {activeTab === "fit" ? (
              <div className="space-y-6">
                {/* Fit Guide Sketch */}
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                    Fit Guide
                  </h4>
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-[#F7F4EE] border border-[#D8D3CA]">
                    <div className="relative h-12 w-16 flex-shrink-0">
                      <Image
                        src="/images/products/fit-sketch.png"
                        alt="Fit silhouette"
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div className="text-xs">
                      <strong className="text-[#111111] block">Relaxed Fit</strong>
                      <span className="text-[#77736D] block">Dropped shoulders</span>
                      <span className="text-[#77736D] block">Longer length</span>
                    </div>
                  </div>
                </div>

                {/* Model Info */}
                <div className="text-xs text-[#4F4B45]">
                  <strong className="text-[#111111] block mb-1">Model Info</strong>
                  <p>{product.modelInfo}</p>
                </div>

                {/* Mini Size Measurements Table */}
                <div>
                  <strong className="text-xs text-[#111111] block mb-2">
                    Measurements (Inches)
                  </strong>
                  <div className="overflow-x-auto text-[11px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#D8D3CA] text-[#77736D]">
                          <th className="py-1">Size</th>
                          <th className="py-1">Chest</th>
                          <th className="py-1">Length</th>
                          <th className="py-1">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F1EEE7]">
                        {SIZE_CHART.map((row) => (
                          <tr
                            key={row.size}
                            className={
                              selectedSize === row.size
                                ? "bg-[#F7F4EE] font-bold text-black"
                                : "text-[#4F4B45]"
                            }
                          >
                            <td className="py-1.5">{row.size}</td>
                            <td className="py-1.5">{row.chest}&quot;</td>
                            <td className="py-1.5">{row.length}&quot;</td>
                            <td className="py-1.5">{row.shoulder}&quot;</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Fabric & GSM */}
                <div className="pt-4 border-t border-[#D8D3CA] text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <strong className="text-[#111111]">Fabric & GSM</strong>
                    <span className="shimmer-pill rounded-full bg-black text-white text-[10px] font-bold px-2.5 py-0.5 cursor-pointer hover:scale-105 transition-transform">
                      {product.gsm} GSM HEAVYWEIGHT
                    </span>
                  </div>
                  <p className="text-[#4F4B45]">{product.fabric}</p>
                  <p className="text-[#4F4B45] font-semibold">{product.gsm} GSM Dense Architectural Weave</p>
                </div>

                {/* Care Instructions */}
                <div className="text-xs">
                  <strong className="text-[#111111] block mb-1">Care Instructions</strong>
                  <ul className="text-[#77736D] space-y-0.5 list-disc list-inside">
                    {product.careInstructions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <strong className="text-[#111111] block mb-2">Specifications</strong>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="flex justify-between border-b border-[#F1EEE7] pb-1.5">
                        <span className="text-[#77736D]">{key}</span>
                        <span className="text-[#111111] font-medium text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <strong className="text-[#111111] block mb-1">Sustainable Craft</strong>
                  <p className="text-[#4F4B45] leading-relaxed">
                    Crafted using OEKO-TEX certified reactive dyes and locally sourced combed yarn in Tiruppur, India.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-20 pt-12 border-t border-[#D8D3CA]">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#111111] font-display">
              You May Also Like
            </h2>
            <Link
              href="/shop"
              className="text-xs font-semibold text-[#111111] hover:underline uppercase tracking-wider"
            >
              View More
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl z-10 border border-[#D8D3CA]">
            <div className="flex justify-between items-center pb-4 border-b border-[#D8D3CA]">
              <h3 className="text-base font-bold text-[#111111]">
                Size Guide — Oversized Silhouette
              </h3>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-[#77736D] hover:text-black p-1"
              >
                ✕
              </button>
            </div>
            <div className="py-4 text-xs text-[#4F4B45]">
              <p className="mb-4">
                Our oversized tees are intentionally designed with extra room across the chest and dropped shoulders. If you prefer a regular fit, consider sizing down one size.
              </p>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#D8D3CA] text-[#77736D]">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest (in)</th>
                    <th className="py-2">Length (in)</th>
                    <th className="py-2">Shoulder (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EEE7]">
                  {SIZE_CHART.map((r) => (
                    <tr key={r.size}>
                      <td className="py-2 font-bold">{r.size}</td>
                      <td className="py-2">{r.chest}&quot;</td>
                      <td className="py-2">{r.length}&quot;</td>
                      <td className="py-2">{r.shoulder}&quot;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pt-4 border-t border-[#D8D3CA] text-right">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="rounded bg-black px-5 py-2 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Mobile Add To Cart Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md p-3 border-t border-[#D8D3CA] z-30 flex items-center justify-between gap-4 shadow-lg">
        <div>
          <span className="text-[10px] text-[#77736D] block">Price</span>
          <span className="text-sm font-bold text-[#111111]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 rounded bg-black py-2.5 text-xs font-bold text-white uppercase tracking-wider"
        >
          Add to Cart ({selectedSize})
        </button>
      </div>
    </div>
  );
}
