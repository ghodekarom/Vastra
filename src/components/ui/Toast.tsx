"use client";

import React from "react";
import { CheckCircle, Info } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center gap-2.5 rounded-full bg-[#111111] px-5 py-3 text-xs font-medium text-[#F7F4EE] shadow-xl border border-white/10">
        <CheckCircle className="h-4 w-4 text-[#8CD19D]" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
