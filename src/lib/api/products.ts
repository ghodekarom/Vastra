import { siteConfig } from "@/config/site";
import { PRODUCTS } from "@/data/products";
import { Product, ProductFilterParams } from "@/types/product";
import { apiClient } from "./client";

/**
 * Fetch catalog products with optional filtering and sorting
 */
export async function fetchProducts(filters?: ProductFilterParams): Promise<Product[]> {
  if (siteConfig.api.useRemoteApi) {
    const params = new URLSearchParams();
    if (filters?.category && filters.category !== "all") params.set("category", filters.category);
    if (filters?.collection && filters.collection !== "all") params.set("collection", filters.collection);
    if (filters?.minGsm) params.set("minGsm", filters.minGsm.toString());
    if (filters?.maxGsm) params.set("maxGsm", filters.maxGsm.toString());
    if (filters?.sort) params.set("sort", filters.sort);
    if (filters?.searchQuery) params.set("q", filters.searchQuery);

    const res = await apiClient<Product[]>(`/products?${params.toString()}`);
    return res.data;
  }

  // Prototype Mock Adapter
  let results = [...PRODUCTS];

  if (filters) {
    if (filters.category && filters.category !== "all") {
      results = results.filter((p) => p.category === filters.category);
    }
    if (filters.collection && filters.collection !== "all") {
      results = results.filter((p) => p.collection === filters.collection);
    }
    if (filters.minGsm) {
      results = results.filter((p) => p.gsm >= filters.minGsm!);
    }
    if (filters.maxGsm) {
      results = results.filter((p) => p.gsm <= filters.maxGsm!);
    }
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gsm.toString().includes(q)
      );
    }
    if (filters.sort) {
      if (filters.sort === "price-asc") {
        results.sort((a, b) => a.price - b.price);
      } else if (filters.sort === "price-desc") {
        results.sort((a, b) => b.price - a.price);
      } else if (filters.sort === "newest") {
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      }
    }
  }

  return results;
}

/**
 * Fetch a single product by its URL slug
 */
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<Product>(`/products/${slug}`);
    return res.data;
  }

  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

/**
 * Fetch featured products for hero/home carousel
 */
export async function fetchFeaturedProducts(): Promise<Product[]> {
  if (siteConfig.api.useRemoteApi) {
    const res = await apiClient<Product[]>("/products/featured");
    return res.data;
  }

  return PRODUCTS.filter((p) => p.featured || p.isBestseller);
}

/**
 * Fetch list of curated collections
 */
export async function fetchCollections(): Promise<
  { title: string; slug: string; count: number; image: string; description: string; gsmRange: string }[]
> {
  return [
    {
      title: "The Horizon Collection",
      slug: "horizon",
      count: 4,
      image: "/images/editorial/horizon-green.jpg",
      description: "Architectural cuts meets earth-toned luxury. 280–320 GSM combed French Terry.",
      gsmRange: "280–320 GSM",
    },
    {
      title: "Oversized Classics",
      slug: "classics",
      count: 6,
      image: "/images/hero/hero-cinematic.jpg",
      description: "Timeless drop-shoulder silhouettes designed for relaxed daily luxury.",
      gsmRange: "240–260 GSM",
    },
    {
      title: "Graphic Syndicate",
      slug: "graphic-series",
      count: 3,
      image: "/images/products/vortex-print.jpg",
      description: "High-density puff and screen prints on dense single jersey cotton.",
      gsmRange: "260 GSM",
    },
    {
      title: "Textured Heavyweight",
      slug: "textured-drops",
      count: 2,
      image: "/images/editorial/brand-mountains.jpg",
      description: "Dense waffle and looped Terry fabrics offering maximum drape and structure.",
      gsmRange: "300–320 GSM",
    },
  ];
}
