import { siteConfig } from "@/config/site";
import { OrderItem, CreateOrderPayload } from "@/types/order";
import { apiClient } from "./client";

/**
 * Generate a realistic random order ID (e.g. VST-84920)
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `VST-${randomNum}`;
}

/**
 * Generate a realistic courier tracking number (e.g. BLUEDART-8491823)
 */
export function generateTrackingNumber(): string {
  const randomCode = Math.floor(1000000 + Math.random() * 9000000);
  return `BD-${randomCode}`;
}

/**
 * Create order abstraction
 */
export async function createOrder(payload: CreateOrderPayload): Promise<OrderItem> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<OrderItem>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  }

  // Prototype Mock Adapter
  const subtotal = payload.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = payload.discountCode ? Math.round(subtotal * 0.1) : 0;
  const shipping = payload.shippingMethod === "EXPRESS" ? siteConfig.commerce.expressShippingFee : (subtotal >= siteConfig.commerce.freeShippingThreshold ? 0 : siteConfig.commerce.standardShippingFee);
  const total = subtotal - discount + shipping;

  const orderId = generateOrderId();
  const trackingNumber = generateTrackingNumber();

  const newOrder: OrderItem = {
    id: orderId,
    date: new Date().toISOString(),
    status: "CONFIRMED",
    items: payload.items,
    shippingAddress: payload.shippingAddress,
    subtotal,
    discount,
    shipping,
    total,
    paymentMethod: payload.paymentMethod,
    trackingNumber,
    estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    courierPartner: "BlueDart Express",
  };

  return newOrder;
}

/**
 * Fetch an order by its ID
 */
export async function fetchOrderById(orderId: string): Promise<OrderItem | null> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<OrderItem>(`/orders/${orderId}`);
    return res.data;
  }

  // Fallback mock order if not found in state
  return {
    id: orderId,
    date: new Date().toISOString(),
    status: "PROCESSING",
    items: [],
    shippingAddress: {
      fullName: "Om Ghodekar",
      phone: "+91 98765 43210",
      street: "124, 12th Main Road, HAL 2nd Stage",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
    },
    subtotal: 3598,
    discount: 350,
    shipping: 0,
    total: 3248,
    paymentMethod: "UPI",
    trackingNumber: "BD-8829141",
    estimatedDelivery: "Oct 4, 2026",
    courierPartner: "Blue Dart Air Express",
  };
}
