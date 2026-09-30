"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra">
        <div className="flex items-end justify-between pb-6 mb-8 border-b border-[#D8D3CA]">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
              Saved Pieces
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#77736D]">
              {savedProducts.length} items saved in your private collection
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-semibold text-[#111111] hover:underline uppercase tracking-wider"
          >
            Continue Shopping
          </Link>
        </div>

        {savedProducts.length === 0 ? (
          <div className="rounded-2xl border border-[#D8D3CA] bg-white p-12 text-center max-w-md mx-auto my-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1EEE7] text-[#77736D] mb-4">
              <Heart className="h-6 w-6 stroke-1" />
            </div>
            <h2 className="text-base font-bold text-[#111111]">
              Nothing saved yet
            </h2>
            <p className="mt-1 text-xs text-[#77736D]">
              Save pieces you want to come back to. Find a fit worth keeping in your rotation.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#252525]"
            >
              Explore Drops <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-lg border border-[#D8D3CA] bg-white p-3 shadow-xs"
              >
                <div className="relative aspect-[4/5] rounded overflow-hidden bg-[#EAE4D9]">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 text-[#A63D35] hover:scale-110 shadow-xs transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-xs font-semibold text-[#111111] hover:underline line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs font-bold text-[#111111] mt-1 block">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        color: product.colors[0]?.name || "Charcoal",
                        size: "L",
                        quantity: 1,
                        price: product.price,
                        originalPrice: product.originalPrice,
                        image: product.images[0],
                      })
                    }
                    className="mt-3 w-full flex items-center justify-center gap-1.5 rounded bg-black py-2 text-xs font-semibold text-white hover:bg-[#252525] transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
