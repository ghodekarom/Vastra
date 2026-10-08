"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole, LoginPayload, RegisterPayload } from "@/types/auth";
import { loginUser, registerUser, fetchCurrentUser } from "@/lib/api/auth";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<{ success: boolean; error?: string }>;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
  quickLoginAs: (targetRole: "customer" | "admin") => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hydration-safe localStorage persistence
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("vastra_auth_token");
      const savedUser = localStorage.getItem("vastra_auth_user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } else {
        // Default demo customer session for seamless prototype review
        const defaultCustomer: UserProfile = {
          id: "usr-cust-01",
          email: "customer@vastra.in",
          fullName: "Aarav Sharma",
          phone: "+91 98765 43210",
          role: "ROLE_CUSTOMER",
        };
        setUser(defaultCustomer);
        setToken("vastra-demo-token-customer");
      }
    } catch {
      // localStorage unavailable in SSR
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (payload: LoginPayload): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await loginUser(payload);
      const userProfile: UserProfile = {
        id: res.userId,
        email: res.email,
        fullName: res.fullName,
        role: res.role,
      };

      setToken(res.token);
      setUser(userProfile);

      localStorage.setItem("vastra_auth_token", res.token);
      localStorage.setItem("vastra_auth_user", JSON.stringify(userProfile));

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || "Invalid credentials. Please verify your email and password.";
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await registerUser(payload);
      const userProfile: UserProfile = {
        id: res.userId,
        email: res.email,
        fullName: res.fullName,
        phone: payload.phone,
        role: res.role,
      };

      setToken(res.token);
      setUser(userProfile);

      localStorage.setItem("vastra_auth_token", res.token);
      localStorage.setItem("vastra_auth_user", JSON.stringify(userProfile));

      return { success: true };
    } catch (err: any) {
      const msg = err?.message || "Registration failed. An account with this email may already exist.";
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const quickLoginAs = async (targetRole: "customer" | "admin"): Promise<void> => {
    if (targetRole === "admin") {
      await login({
        email: "admin@vastra.in",
        password: "Admin123!",
      });
    } else {
      await login({
        email: "customer@vastra.in",
        password: "Password123!",
      });
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    try {
      localStorage.removeItem("vastra_auth_token");
      localStorage.removeItem("vastra_auth_user");
    } catch {}
  };

  const isAuthenticated = Boolean(user && token);
  const isAdmin = user?.role === "ROLE_ADMIN";
  const role = user?.role || null;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        isAdmin,
        isLoading,
        login,
        register,
        quickLoginAs,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
