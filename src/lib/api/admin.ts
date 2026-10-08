import { siteConfig } from "@/config/site";
import { AdminKPIs, InventoryAlert } from "@/types/admin";
import { OrderItem } from "@/types/order";
import { apiClient } from "./client";

export async function fetchAdminKpis(): Promise<AdminKPIs | null> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<AdminKPIs>("/admin/kpis");
    return res.data;
  }
  return {
    totalRevenue: 284950,
    totalOrders: 142,
    averageOrderValue: 2006,
    activeProducts: 8,
    lowStockCount: 4,
    returnRate: 2.1,
  };
}

export async function fetchInventoryAlerts(): Promise<InventoryAlert[]> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<InventoryAlert[]>("/admin/inventory/alerts");
    return res.data;
  }
  return [];
}

export async function restockSku(sku: string, quantity: number = 25): Promise<void> {
  if (siteConfig.api.useRemoteApi) {
    await apiClient<string>("/admin/inventory/restock", {
      method: "POST",
      body: JSON.stringify({ sku, quantity }),
    });
  }
}

export async function fetchAdminOrders(status?: string): Promise<OrderItem[]> {
  if (siteConfig.api.useRemoteApi) {
    const params = status ? `?status=${status}` : "";
    const res = await apiClient<OrderItem[]>(`/admin/orders${params}`);
    return res.data;
  }
  return [];
}

export async function updateAdminOrderStatus(
  orderNumber: string,
  status: string
): Promise<OrderItem | null> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<OrderItem>(`/admin/orders/${orderNumber}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  }
  return null;
}

export async function generateAiEditorialCopy(prompt: string): Promise<string> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<string>("/admin/ai/generate-copy", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    return res.data;
  }
  return "Engineered from heavyweight 300 GSM combed cotton. Structured drop-shoulder cut designed for architectural drape and durability.";
}

export async function fetchAiInsights(): Promise<any[]> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<any[]>("/admin/ai/insights");
    return res.data;
  }
  return [];
}
