import { SizeOption } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  color: string;
  size: SizeOption | string;
  quantity: number;
  price: number;
  originalPrice: number;
  image: string;
}

export interface CartDiscount {
  code: string;
  percentage?: number;
  fixedAmount?: number;
  description: string;
  minOrderValue?: number;
}

export interface CartSummary {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  isFreeShippingEligible: boolean;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}
