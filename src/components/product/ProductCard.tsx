"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

interface ProductCardProps {
  product: Product;
  aspectRatio?: "4/5" | "1/1";
}

export default function ProductCard({
  product,
  aspectRatio = "4/5",
}: ProductCardProps) {
  const { isInWishlist, toggleWishlist, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [isHovered, setIsHovered] = useState(false);
  const isSaved = isInWishlist(product.id);

  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      color: selectedColor,
      size: "L", // default size
      quantity: 1,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
    });
  };

  return (
    <div className="group relative flex flex-col">
      {/* Product Image Wrapper */}
      <div
        className="relative w-full overflow-hidden rounded-md bg-[#EBE7DF] transition-all duration-300 shimmer-card"
        style={{ aspectRatio }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            priority={product.featured}
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badges?.map((badge, idx) => (
            <span
              key={idx}
              className="inline-block rounded px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase bg-black/85 backdrop-blur-xs shimmer-pill"
            >
              {badge}
            </span>
          ))}
          {product.discountPercentage > 0 && (
            <span className="inline-block rounded px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase bg-[#A63D35] shimmer-pill">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs transition-all duration-200 hover:scale-110 active:scale-95 ${
            isSaved ? "text-[#A63D35]" : "text-[#111111] hover:text-[#A63D35]"
          }`}
        >
          <Heart
            className="h-4 w-4"
            fill={isSaved ? "currentColor" : "none"}
            strokeWidth={1.75}
          />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:block opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-2 rounded bg-black py-2.5 px-4 text-xs font-medium text-white shadow-md transition-colors hover:bg-[#252525] active:scale-98"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Quick Add (Size L)
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="mt-3 flex flex-col">
        <Link href={`/product/${product.slug}`} className="group-hover:underline">
          <h3 className="text-sm font-medium text-[#111111] leading-snug line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-[#77736D] line-clamp-1">
          {product.subtitle}
        </p>

        {/* Price Row */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-[#111111]">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-[#77736D] line-through">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedColor(c.name)}
              title={c.name}
              className={`h-3.5 w-3.5 rounded-full border transition-transform duration-150 ${
                selectedColor === c.name
                  ? "scale-125 border-black ring-1 ring-black/40"
                  : "border-black/20 hover:scale-110"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
