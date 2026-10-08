import { siteConfig } from "@/config/site";
import { apiClient } from "./client";

export interface CustomerProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
}

export interface CustomerAddressItem {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export async function fetchCustomerProfile(token: string): Promise<CustomerProfile | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const res = await apiClient<CustomerProfile>("/account/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchCustomerAddresses(token: string): Promise<CustomerAddressItem[]> {
  if (!siteConfig.api.useRemoteApi) return [];
  const res = await apiClient<CustomerAddressItem[]>("/account/addresses", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function addCustomerAddress(
  address: Omit<CustomerAddressItem, "id">,
  token: string
): Promise<CustomerAddressItem | null> {
  if (!siteConfig.api.useRemoteApi) return null;
  const res = await apiClient<CustomerAddressItem>("/account/addresses", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(address),
  });
  return res.data;
}

export async function deleteCustomerAddress(
  addressId: string,
  token: string
): Promise<void> {
  if (!siteConfig.api.useRemoteApi) return;
  await apiClient<void>(`/account/addresses/${addressId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}
