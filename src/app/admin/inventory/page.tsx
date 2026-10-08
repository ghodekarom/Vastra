"use client";

import React, { useState } from "react";
import { Boxes, AlertTriangle, ArrowUpDown, RefreshCw } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function AdminInventoryPage() {
  const { showToast } = useStore();
  const [stockList, setStockList] = useState([
    {
      sku: "VST-SHD-CH-S",
      product: "Shadow Print Oversized Tee",
      color: "Charcoal",
      size: "S",
      inStock: 18,
      reserved: 2,
      status: "OPTIMAL",
    },
    {
      sku: "VST-SHD-CH-M",
      product: "Shadow Print Oversized Tee",
      color: "Charcoal",
      size: "M",
      inStock: 9,
      reserved: 3,
      status: "LOW",
    },
    {
      sku: "VST-SHD-CH-L",
      product: "Shadow Print Oversized Tee",
      color: "Charcoal",
      size: "L",
      inStock: 4,
      reserved: 4,
      status: "CRITICAL",
    },
    {
      sku: "VST-WAV-CH-XL",
      product: "Better Days Ahead Wave Tee",
      color: "Charcoal",
      size: "XL",
      inStock: 3,
      reserved: 1,
      status: "CRITICAL",
    },
    {
      sku: "VST-ESS-CR-L",
      product: "Essential Blank Oversized Tee",
      color: "Cream",
      size: "L",
      inStock: 42,
      reserved: 5,
      status: "OPTIMAL",
    },
    {
      sku: "VST-TER-OL-M",
      product: "Terrain Graphic Oversized Tee",
      color: "Olive",
      size: "M",
      inStock: 25,
      reserved: 2,
      status: "OPTIMAL",
    },
  ]);

  const handleRestock = (sku: string) => {
    import("@/lib/api/admin").then(({ restockSku }) => {
      restockSku(sku, 50).catch((err) => console.warn("Remote restock sync note:", err));
    });
    setStockList((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? { ...item, inStock: item.inStock + 50, status: "OPTIMAL" }
          : item
      )
    );
    showToast(`Restocked 50 units for ${sku}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D3CA]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#111111] font-display">
            Warehouse Inventory & SKU Stock
          </h1>
          <p className="text-xs text-[#77736D] mt-0.5">
            Real-time multi-size inventory breakdown for 240 GSM garments across hubs.
          </p>
        </div>

        <button
          type="button"
          onClick={() => showToast("Warehouse inventory sync triggered across 3 national hubs.")}
          className="inline-flex items-center gap-2 rounded border border-[#D8D3CA] bg-white px-4 py-2 text-xs font-semibold text-black hover:border-black"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync Warehouse ERP</span>
        </button>
      </div>

      <div className="rounded-xl border border-[#D8D3CA] bg-white overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F7F4EE] border-b border-[#D8D3CA] text-[#77736D] font-bold uppercase tracking-wider">
              <th className="py-3 px-4">SKU Code</th>
              <th className="py-3 px-4">Garment</th>
              <th className="py-3 px-4">Colorway</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4">Available Units</th>
              <th className="py-3 px-4">Reserved</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Restock Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1EEE7]">
            {stockList.map((item) => (
              <tr key={item.sku} className="hover:bg-[#F7F4EE]/50 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-black">
                  {item.sku}
                </td>
                <td className="py-3 px-4 font-medium text-black">
                  {item.product}
                </td>
                <td className="py-3 px-4 text-[#4F4B45]">{item.color}</td>
                <td className="py-3 px-4 font-bold text-black">{item.size}</td>
                <td className="py-3 px-4 font-semibold text-black">
                  {item.inStock} units
                </td>
                <td className="py-3 px-4 text-[#77736D]">{item.reserved} units</td>
                <td className="py-3 px-4">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === "OPTIMAL"
                        ? "bg-[#3F6B4B]/15 text-[#3F6B4B]"
                        : item.status === "LOW"
                        ? "bg-[#A16B25]/15 text-[#A16B25]"
                        : "bg-[#A63D35]/15 text-[#A63D35]"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => handleRestock(item.sku)}
                    className="rounded bg-black px-3 py-1 text-[11px] font-semibold text-white hover:bg-[#252525]"
                  >
                    +50 Restock
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
