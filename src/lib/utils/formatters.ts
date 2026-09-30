import { siteConfig } from "@/config/site";

/**
 * Format number as Indian Rupee currency (e.g., 1799 -> "₹1,799")
 */
export function formatPrice(amount: number): string {
  if (isNaN(amount)) return `${siteConfig.currency.symbol}0`;
  return `${siteConfig.currency.symbol}${amount.toLocaleString(siteConfig.currency.locale)}`;
}

/**
 * Format date string to readable format (e.g. "Sep 30, 2026")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(siteConfig.currency.locale, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
}

/**
 * Calculate percentage discount between original and current price
 */
export function calculateDiscount(originalPrice: number, currentPrice: number): number {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Returns formatted GSM badge label (e.g., 280 -> "280 GSM Heavyweight")
 */
export function getGsmBadge(gsm: number): string {
  if (gsm >= 300) return `${gsm} GSM Ultra-Heavyweight`;
  if (gsm >= 260) return `${gsm} GSM Heavyweight French Terry`;
  return `${gsm} GSM Heavyweight Single Jersey`;
}

/**
 * Simple conditional className joiner
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
