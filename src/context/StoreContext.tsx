"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS } from "@/data/products";
import { siteConfig } from "@/config/site";

import { CartItem, OrderItem } from "@/types";

export type { CartItem, OrderItem };

interface StoreContextType {
  cart: CartItem[];
  wishlist: string[]; // product IDs
  isCartOpen: boolean;
  isSearchOpen: boolean;
  activeCoupon: string | null;
  couponDiscount: number;
  orders: OrderItem[];
  toastMessage: string | null;
  // Actions
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  addToCart: (item: Omit<CartItem, "id">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  createOrder: (orderData: Partial<OrderItem>) => OrderItem;
  showToast: (msg: string) => void;
  // Derived
  subtotal: number;
  discount: number;
  shippingFee: number;
  finalTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "init-1",
      productId: "vst-001",
      name: "Shadow Print Oversized Tee",
      slug: "shadow-print-oversized-tee",
      color: "Charcoal",
      size: "L",
      quantity: 1,
      price: 1799,
      originalPrice: 2499,
      image: "/images/products/shadow-print.jpg",
    },
    {
      id: "init-2",
      productId: "vst-002",
      name: "Essential Blank Oversized Tee",
      slug: "essential-blank-oversized-tee",
      color: "Cream",
      size: "M",
      quantity: 1,
      price: 1499,
      originalPrice: 1999,
      image: "/images/products/classic-cream.jpg",
    },
    {
      id: "init-3",
      productId: "vst-003",
      name: "Terrain Graphic Oversized Tee",
      slug: "terrain-graphic-oversized-tee",
      color: "Olive",
      size: "XL",
      quantity: 1,
      price: 1899,
      originalPrice: 2599,
      image: "/images/products/terrain-graphic.jpg",
    },
  ]);

  const [wishlist, setWishlist] = useState<string[]>(["vst-001", "vst-007"]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState<string | null>("VASTRA10");
  const [couponDiscount, setCouponDiscount] = useState<number>(0.1); // 10%
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "ORD-94281",
      date: "28 Sep 2026",
      status: "SHIPPED",
      items: [
        {
          id: "ord-item-1",
          productId: "vst-008",
          name: "Cinematic Washed Charcoal Tee",
          slug: "cinematic-washed-charcoal-tee",
          color: "Washed Charcoal",
          size: "L",
          quantity: 1,
          price: 2199,
          originalPrice: 2999,
          image: "/images/hero/hero-cinematic.jpg",
        },
      ],
      shippingAddress: {
        fullName: "Aarav Sharma",
        phone: "+91 98765 43210",
        street: "B-402, Highline Residences, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
      },
      subtotal: 2199,
      discount: 220,
      shipping: 0,
      total: 1979,
      paymentMethod: "UPI (Google Pay)",
      trackingNumber: "DEL-IND-882199",
      estimatedDelivery: "02 Oct 2026",
    },
  ]);

  // Hydration-safe localStorage persistence
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("vastra_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCart(parsed);
        }
      }
      const savedWishlist = localStorage.getItem("vastra_wishlist");
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed)) {
          setWishlist(parsed);
        }
      }
    } catch {
      // LocalStorage unavailable in SSR or private mode
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("vastra_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("vastra_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const addToCart = (item: Omit<CartItem, "id">) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) =>
          i.productId === item.productId &&
          i.color === item.color &&
          i.size === item.size
      );
      if (existing) {
        return prev.map((i) =>
          i.id === existing.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      const newItem: CartItem = {
        ...item,
        id: `${item.productId}-${item.color}-${item.size}-${Date.now()}`,
      };
      return [...prev, newItem];
    });
    showToast(`Added ${item.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const willSave = !prev.includes(productId);
      if (siteConfig.api.useRemoteApi) {
        import("@/lib/api/wishlist").then(({ toggleRemoteWishlist }) => {
          toggleRemoteWishlist(productId).catch((err) => console.warn("Remote wishlist sync notice:", err));
        });
      }
      if (!willSave) {
        showToast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to wishlist");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "VASTRA10") {
      setActiveCoupon("VASTRA10");
      setCouponDiscount(0.1);
      showToast("Coupon VASTRA10 applied (10% off)");
      return true;
    } else if (clean === "FRESH20") {
      setActiveCoupon("FRESH20");
      setCouponDiscount(0.2);
      showToast("Coupon FRESH20 applied (20% off)");
      return true;
    }
    showToast("Invalid coupon code");
    return false;
  };

  const removeCoupon = () => {
    setActiveCoupon(null);
    setCouponDiscount(0);
    showToast("Coupon removed");
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * couponDiscount);
  const shippingFee = subtotal >= 1999 || subtotal === 0 ? 0 : 99;
  const finalTotal = subtotal - discount + shippingFee;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const createOrder = (orderData: Partial<OrderItem>): OrderItem => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const trackingNumber = `BD-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newOrder: OrderItem = {
      id: orderId,
      date: "Just now",
      status: "PLACED",
      items: [...cart],
      shippingAddress: orderData.shippingAddress || {
        fullName: "Aarav Sharma",
        phone: "+91 98765 43210",
        street: "B-402, Highline Residences, Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560038",
      },
      subtotal,
      discount,
      shipping: shippingFee,
      total: finalTotal,
      paymentMethod: orderData.paymentMethod || "UPI (Google Pay)",
      trackingNumber,
      estimatedDelivery: "3-4 Business Days",
    };

    if (siteConfig.api.useRemoteApi) {
      import("@/lib/api/orders").then(({ createOrder: apiCreateOrder }) => {
        const paymentMethodUpper = newOrder.paymentMethod.toUpperCase();
        const normalizedPayment: "UPI" | "CARD" | "NETBANKING" | "COD" =
          paymentMethodUpper.includes("CARD")
            ? "CARD"
            : paymentMethodUpper.includes("COD")
            ? "COD"
            : paymentMethodUpper.includes("NET")
            ? "NETBANKING"
            : "UPI";

        apiCreateOrder({
          items: newOrder.items,
          shippingAddress: newOrder.shippingAddress,
          shippingMethod: "STANDARD",
          paymentMethod: normalizedPayment,
          discountCode: activeCoupon || undefined,
        }).then((remoteOrder) => {
          if (remoteOrder) {
            setOrders((prev) => [remoteOrder, ...prev.filter((o) => o.id !== newOrder.id)]);
          }
        }).catch((err) => {
          console.warn("Remote order placement notice:", err);
        });
      });
    }

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isSearchOpen,
        activeCoupon,
        couponDiscount,
        orders,
        toastMessage,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        createOrder,
        showToast,
        subtotal,
        discount,
        shippingFee,
        finalTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return ctx;
}
