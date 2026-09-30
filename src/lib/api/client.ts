import { siteConfig } from "@/config/site";
import { ApiResponse, ApiError } from "@/types/api";

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  if (!siteConfig.api.useRemoteApi) {
    throw new Error("apiClient called in mock mode without remote API enabled.");
  }

  const url = `${siteConfig.api.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json().catch(() => ({
        code: `HTTP_${res.status}`,
        message: res.statusText || "An unexpected network error occurred",
      }));
      throw errorData;
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
}
