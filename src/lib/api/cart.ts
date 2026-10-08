import { siteConfig } from "@/config/site";
import { CartSummary } from "@/types/cart";
import { apiClient } from "./client";

export async function fetchRemoteCart(cartToken?: string, coupon?: string): Promise<CartSummary | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const params = new URLSearchParams();
  if (coupon) params.set("coupon", coupon);
  const res = await apiClient<CartSummary>(`/cart?${params.toString()}`, {
    headers: cartToken ? { "X-Cart-Token": cartToken } : {},
  });
  return res.data;
}

export async function addRemoteCartItem(
  sku: string,
  quantity: number = 1,
  cartToken?: string
): Promise<CartSummary | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const res = await apiClient<CartSummary>("/cart/items", {
    method: "POST",
    headers: cartToken ? { "X-Cart-Token": cartToken } : {},
    body: JSON.stringify({ sku, quantity }),
  });
  return res.data;
}

export async function updateRemoteCartQuantity(
  itemId: string,
  quantity: number,
  cartToken?: string
): Promise<CartSummary | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const res = await apiClient<CartSummary>(`/cart/items/${itemId}`, {
    method: "PATCH",
    headers: cartToken ? { "X-Cart-Token": cartToken } : {},
    body: JSON.stringify({ quantity }),
  });
  return res.data;
}

export async function removeRemoteCartItem(
  itemId: string,
  cartToken?: string
): Promise<CartSummary | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const res = await apiClient<CartSummary>(`/cart/items/${itemId}`, {
    method: "DELETE",
    headers: cartToken ? { "X-Cart-Token": cartToken } : {},
  });
  return res.data;
}
