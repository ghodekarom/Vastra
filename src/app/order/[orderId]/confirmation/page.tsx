"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { CheckCircle2, ArrowRight, Package, Truck, MapPin } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { OrderItem } from "@/types";

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;
  const { orders } = useStore();
  const [remoteOrder, setRemoteOrder] = React.useState<OrderItem | null>(null);

  React.useEffect(() => {
    if (orderId && !orders.some((o) => o.id === orderId)) {
      import("@/lib/api/orders").then(({ fetchOrderById }) => {
        fetchOrderById(orderId).then((res) => {
          if (res) setRemoteOrder(res);
        });
      });
    }
  }, [orderId, orders]);

  const order = orders.find((o) => o.id === orderId) || remoteOrder || orders[0];

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-12 sm:py-16">
      <div className="container-vastra max-w-3xl">
        <div className="rounded-2xl border border-[#D8D3CA] bg-white p-6 sm:p-12 shadow-sm text-center">
          {/* Animated Success Badge */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#3F6B4B]/15 text-[#3F6B4B] mb-5">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="text-xs font-bold text-[#3F6B4B] uppercase tracking-wider">
            Payment Confirmed
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-[#111111] font-display">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#77736D]">
            Order #{order?.id || orderId} has been received and is being prepared in our warehouse.
          </p>

          {/* Quick Order Info Card */}
          <div className="mt-8 rounded-xl bg-[#F7F4EE] p-6 text-left border border-[#D8D3CA] grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div>
              <span className="text-[#77736D] block mb-1">Estimated Delivery</span>
              <strong className="text-[#111111] text-sm block">
                {order?.estimatedDelivery || "3–4 Business Days"}
              </strong>
            </div>
            <div>
              <span className="text-[#77736D] block mb-1">Tracking Number</span>
              <strong className="text-[#111111] text-sm block">
                {order?.trackingNumber || "DEL-IND-882199"}
              </strong>
            </div>
            <div>
              <span className="text-[#77736D] block mb-1">Payment Status</span>
              <strong className="text-[#3F6B4B] text-sm block">
                Paid via {order?.paymentMethod || "UPI"}
              </strong>
            </div>
          </div>

          {/* Ordered Items Preview */}
          <div className="mt-8 text-left border-t border-[#F1EEE7] pt-6">
            <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">
              Items in this Shipment
            </h3>
            <div className="divide-y divide-[#F1EEE7]">
              {order?.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-12 rounded bg-[#E4DDD0] overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#111111]">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#77736D]">
                        Color: {item.color} | Size: {item.size} × {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#111111]">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 pt-6 border-t border-[#D8D3CA] flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/order/${order?.id || orderId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded bg-black px-6 py-3 text-xs font-bold text-white uppercase tracking-wider hover:bg-[#252525] transition-all"
            >
              <Package className="h-4 w-4" />
              <span>Track Live Delivery</span>
            </Link>
            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-[#D8D3CA] bg-white px-6 py-3 text-xs font-semibold text-[#111111] hover:bg-[#F1EEE7] transition-all"
            >
              <span>Back to Store</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
