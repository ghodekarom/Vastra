export type SizeOption = "S" | "M" | "L" | "XL" | "XXL";

export interface ColorOption {
  name: string;
  hex: string;
}

export type Category = 
  | "Oversized T-Shirts" 
  | "Graphic Tees" 
  | "Minimal Tees" 
  | "Essentials";

export type Collection = 
  | "The Horizon Collection" 
  | "Oversized Classics" 
  | "Graphic Series" 
  | "Minimal Series" 
  | "Textured Drops";

export interface ProductVariant {
  id: string;
  colorName: string;
  colorHex: string;
  size: SizeOption;
  sku: string;
  price: number;
  stock: number;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: Category;
  collection: Collection;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  badges?: string[];
  colors: ColorOption[];
  sizes: SizeOption[];
  images: string[];
  fabric: string;
  gsm: number;
  fit: string;
  modelInfo: string;
  careInstructions: string[];
  specifications: Record<string, string>;
  isNew?: boolean;
  isBestseller?: boolean;
  isSale?: boolean;
  featured?: boolean;
}

export interface ProductFilterParams {
  category?: Category | "all";
  collection?: Collection | "all";
  minGsm?: number;
  maxGsm?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: "featured" | "newest" | "price-asc" | "price-desc";
  searchQuery?: string;
}
