import { CartItem } from "./cart";

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  email?: string;
  isDefault?: boolean;
}

export type PaymentMethodType = "UPI" | "CARD" | "NETBANKING" | "COD";

export interface OrderItem {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  trackingNumber: string;
  estimatedDelivery: string;
  courierPartner?: string;
}

export interface CreateOrderPayload {
  items: CartItem[];
  shippingAddress: ShippingAddress;
  shippingMethod: "STANDARD" | "EXPRESS";
  paymentMethod: PaymentMethodType;
  discountCode?: string;
}
