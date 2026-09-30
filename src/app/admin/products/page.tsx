"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Filter, Edit, Eye, Trash2, CheckCircle2 } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function AdminProductsPage() {
  const { showToast } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat =
      selectedCategory === "all" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D3CA]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
            Product Catalog & SKUs
          </h1>
          <p className="text-xs text-[#77736D] mt-0.5">
            Manage 240 GSM oversized tees, colorways, inventory status, and pricing.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Prototype: New Product modal opened.")}
          className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-xs font-semibold text-white uppercase tracking-wider hover:bg-[#252525]"
        >
          <Plus className="h-4 w-4" />
          <span>Add New T-Shirt</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="rounded-xl border border-[#D8D3CA] bg-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-[#77736D]" />
          <input
            type="text"
            placeholder="Search garment or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-[#D8D3CA] pl-9 pr-3 py-2 focus:border-black focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded border border-[#D8D3CA] bg-white px-3 py-2 text-xs focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="Oversized T-Shirts">Oversized T-Shirts</option>
            <option value="Graphic Tees">Graphic Tees</option>
            <option value="Minimal Tees">Minimal Tees</option>
            <option value="Essentials">Essentials</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-[#D8D3CA] bg-white overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7F4EE] border-b border-[#D8D3CA] text-[#77736D] font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Garment</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Fabric GSM</th>
                <th className="py-3 px-4">Available Colors</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EEE7]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#F7F4EE]/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-10 rounded overflow-hidden bg-[#E4DDD0] flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div>
                        <strong className="text-black block">{product.name}</strong>
                        <span className="text-[10px] text-[#77736D] font-mono">
                          ID: {product.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-[#4F4B45]">
                    {product.category}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-black">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[10px] text-[#77736D] line-through block">
                      ₹{product.originalPrice.toLocaleString("en-IN")}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-[#4F4B45] font-semibold">
                    {product.gsm} GSM
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="h-3.5 w-3.5 rounded-full border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="rounded bg-[#3F6B4B]/15 text-[#3F6B4B] px-2 py-0.5 text-[10px] font-bold uppercase">
                      Active In Stock
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-[#77736D]">
                      <Link
                        href={`/product/${product.slug}`}
                        target="_blank"
                        className="p-1 hover:text-black"
                        title="View Live"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => showToast(`Edit mode opened for: ${product.name}`)}
                        className="p-1 hover:text-black"
                        title="Edit Product"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
