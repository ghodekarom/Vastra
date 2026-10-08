import { siteConfig } from "@/config/site";
import { apiClient } from "./client";

export async function fetchRemoteWishlist(token?: string): Promise<string[]> {
  if (!siteConfig.api.useRemoteApi) return [];
  const res = await apiClient<string[]>("/wishlist", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return res.data;
}

export async function toggleRemoteWishlist(
  productId: string,
  token?: string
): Promise<{ saved: boolean; productId: string; wishlistProductIds: string[] } | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const res = await apiClient<{ saved: boolean; productId: string; wishlistProductIds: string[] }>(
    "/wishlist/toggle",
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: JSON.stringify({ productId }),
    }
  );
  return res.data;
}
