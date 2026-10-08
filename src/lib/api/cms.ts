import { siteConfig } from "@/config/site";
import { apiClient } from "./client";

export interface FaqCategory {
  category: string;
  items: { q: string; a: string }[];
}

export interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedBuyer: boolean;
  createdAt: string;
}

export async function fetchFaqs(): Promise<FaqCategory[]> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<FaqCategory[]>("/cms/faqs");
    return res.data;
  }
  return [
    {
      category: "Sizing & Fit",
      items: [
        {
          q: "How do VASTRA oversized t-shirts fit?",
          a: "Our oversized tees are engineered with dropped shoulders, broader chests, and proportional length.",
        },
      ],
    },
  ];
}

export async function submitSupportInquiry(inquiry: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<void> {
  if (siteConfig.api.useRemoteApi) {
    await apiClient<void>("/support/inquiries", {
      method: "POST",
      body: JSON.stringify(inquiry),
    });
  }
}

export async function fetchProductReviews(productId: string): Promise<ReviewItem[]> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<ReviewItem[]>(`/products/${productId}/reviews`);
    return res.data;
  }
  return [];
}

export async function submitProductReview(
  productId: string,
  review: { userName: string; rating: number; comment: string }
): Promise<ReviewItem | null> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<ReviewItem>(`/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(review),
    });
    return res.data;
  }
  return null;
}
