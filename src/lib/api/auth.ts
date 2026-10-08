import { siteConfig } from "@/config/site";
import { AuthResponse, LoginPayload, RegisterPayload, UserProfile } from "@/types/auth";
import { apiClient } from "./client";

/**
 * Authenticate user with email and password
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  }

  // Prototype Mock Auth Adapter
  const emailLower = payload.email.toLowerCase().trim();
  const isAdmin = emailLower.includes("admin");

  return {
    token: `vastra-mock-jwt-${isAdmin ? "admin" : "customer"}-${Date.now()}`,
    userId: isAdmin ? "usr-admin-01" : "usr-cust-01",
    email: payload.email,
    fullName: isAdmin ? "VASTRA Master Admin" : "Aarav Sharma",
    role: isAdmin ? "ROLE_ADMIN" : "ROLE_CUSTOMER",
  };
}

/**
 * Register a new customer account
 */
export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res.data;
  }

  // Prototype Mock Auth Adapter
  return {
    token: `vastra-mock-jwt-customer-${Date.now()}`,
    userId: `usr-new-${Math.floor(1000 + Math.random() * 9000)}`,
    email: payload.email,
    fullName: payload.fullName,
    role: "ROLE_CUSTOMER",
  };
}

/**
 * Fetch authenticated user profile using Bearer JWT
 */
export async function fetchCurrentUser(token: string): Promise<UserProfile | null> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<UserProfile>("/account/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }

  const isAdmin = token.includes("admin");
  return {
    id: isAdmin ? "usr-admin-01" : "usr-cust-01",
    email: isAdmin ? "admin@vastra.in" : "customer@vastra.in",
    fullName: isAdmin ? "VASTRA Master Admin" : "Aarav Sharma",
    phone: "+91 98765 43210",
    role: isAdmin ? "ROLE_ADMIN" : "ROLE_CUSTOMER",
  };
}
