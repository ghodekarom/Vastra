export interface AdminKPIs {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  activeProducts: number;
  lowStockCount: number;
  returnRate: number;
}

export interface InventoryAlert {
  productId: string;
  productName: string;
  sku: string;
  size: string;
  color: string;
  currentStock: number;
  threshold: number;
}

export interface DropConcept {
  id: string;
  name: string;
  theme: string;
  season: string;
  gsm: number;
  colorPalette: { name: string; hex: string }[];
  targetAudience: string;
  suggestedPrice: number;
  generatedCopy: {
    tagline: string;
    productDescription: string;
    instagramCaption: string;
  };
  mockupPrompt?: string;
  mockupUrl?: string;
}
