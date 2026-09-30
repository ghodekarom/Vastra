import type { Metadata } from "next";
import { Inter, Syne, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/shopping/CartDrawer";
import SearchModal from "@/components/search/SearchModal";
import Toast from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VASTRA — Premium Men's Oversized T-Shirts",
  description:
    "Bigger Fits. Bolder Moves. An editorial apparel house specializing in heavyweight 240 GSM oversized t-shirts for men.",
  keywords: [
    "oversized t-shirts",
    "streetwear",
    "men's fashion",
    "heavyweight cotton",
    "drop shoulder",
    "vastra",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7F4EE] text-[#111111] selection:bg-black selection:text-white">
        <StoreProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-1 pt-18 sm:pt-20">{children}</main>
            <Footer />
            <CartDrawer />
            <SearchModal />
            <Toast />
          </SmoothScrollProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
