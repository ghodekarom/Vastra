"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut, ShieldCheck } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { openCart, openSearch, cartCount, wishlist } = useStore();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F7F4EE]/92 backdrop-blur-md border-b border-[#D8D3CA] py-3.5 shadow-xs"
            : "bg-[#F7F4EE] border-b border-transparent py-4 sm:py-5"
        }`}
      >
        <div className="container-vastra flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="p-1.5 text-black hover:opacity-70 transition-opacity"
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="p-1.5 text-black hover:opacity-70 transition-opacity sm:hidden"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2.5 group transition-transform duration-200"
            >
              <span className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded bg-black text-white font-black text-xs sm:text-sm font-display shadow-xs group-hover:rotate-6 transition-transform">
                V
              </span>
              <span className="text-lg sm:text-2xl font-extrabold tracking-[0.28em] text-[#111111] uppercase font-display">
                VASTRA
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? "text-[#111111] font-semibold"
                      : "text-[#4F4B45] hover:text-[#111111]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#111111] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Search */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Input Trigger (Desktop) */}
            <button
              type="button"
              onClick={openSearch}
              className="hidden sm:flex items-center gap-2 rounded-full border border-[#D8D3CA] bg-white/70 px-3.5 py-1.5 text-xs text-[#77736D] hover:border-black/50 hover:bg-white transition-all duration-200"
            >
              <Search className="h-3.5 w-3.5 text-[#4F4B45]" />
              <span className="pr-4">Search for products...</span>
              <kbd className="hidden md:inline-block rounded bg-[#F1EEE7] px-1.5 py-0.5 text-[10px] font-mono text-[#77736D]">
                /
              </kbd>
            </button>

            {/* Account Icon / User Menu */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-label="User Account"
                    className="flex items-center gap-1.5 p-1 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#111111] text-white font-bold text-xs font-display">
                      {user?.fullName?.charAt(0) || "U"}
                    </div>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-[#D8D3CA] bg-white p-3 shadow-lg z-50">
                        <div className="px-3 py-2 border-b border-[#F1EEE7] mb-1">
                          <strong className="text-xs font-bold text-black block truncate">
                            {user?.fullName}
                          </strong>
                          <span className="text-[10px] text-[#77736D] block truncate">
                            {user?.email}
                          </span>
                          <span className="inline-block mt-1 rounded bg-[#555A46]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#555A46] uppercase">
                            {isAdmin ? "Master Admin" : "VIP Customer"}
                          </span>
                        </div>

                        <Link
                          href="/account"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#111111] hover:bg-[#F7F4EE] transition-colors"
                        >
                          <User className="h-3.5 w-3.5 text-[#77736D]" />
                          <span>My Profile & Orders</span>
                        </Link>

                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#555A46] hover:bg-[#555A46]/10 transition-colors"
                          >
                            <ShieldCheck className="h-3.5 w-3.5 text-[#555A46]" />
                            <span>Admin Studio</span>
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors mt-1 cursor-pointer"
                        >
                          <LogOut className="h-3.5 w-3.5 text-red-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  aria-label="Sign In"
                  className="p-2 text-[#111111] hover:opacity-75 transition-opacity"
                >
                  <User className="h-5 w-5" strokeWidth={1.8} />
                </Link>
              )}
            </div>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-[#111111] hover:opacity-75 transition-opacity"
            >
              <Heart className="h-5 w-5" strokeWidth={1.8} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCart}
              aria-label="Shopping bag"
              className="relative p-2 text-[#111111] hover:opacity-75 transition-opacity"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#F7F4EE] p-6 shadow-xl flex flex-col justify-between animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D8D3CA]">
                <span className="text-xl font-bold tracking-widest text-[#111111]">
                  VASTRA
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-black hover:opacity-70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-4 text-base font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#111111] hover:text-[#555A46] py-1 border-b border-black/5"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/shop/graphic-tees"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-[#77736D] uppercase tracking-wider pl-2"
                >
                  → Graphic Tees
                </Link>
                <Link
                  href="/shop/minimal-tees"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs text-[#77736D] uppercase tracking-wider pl-2"
                >
                  → Minimal Blanks
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4 text-xs font-semibold text-[#555A46] uppercase tracking-wider border-t border-[#D8D3CA] pt-4"
                >
                  ⚙ Admin Portal
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-[#D8D3CA] text-xs text-[#77736D] flex flex-col gap-2">
              <p>Free express delivery over ₹1,999</p>
              <p>© 2026 VASTRA Apparel Inc.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
