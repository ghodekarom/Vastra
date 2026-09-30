export const siteConfig = {
  name: "VASTRA",
  legalName: "VASTRA Streetwear Pvt. Ltd.",
  tagline: "Bigger Fits. Bolder Moves.",
  description: "High-End Streetwear & Heavyweight Oversized T-Shirts engineered in India with 240–320 GSM combed cotton.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vastra.in",
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
  },
  commerce: {
    freeShippingThreshold: 2500,
    standardShippingFee: 150,
    expressShippingFee: 250,
    returnWindowDays: 7,
  },
  links: {
    instagram: "https://instagram.com/vastrastreetwear",
    twitter: "https://twitter.com/vastrain",
    whatsapp: "https://wa.me/919876543210",
  },
  contact: {
    email: "support@vastra.in",
    phone: "+91 98765 43210",
    address: "Studio VASTRA, Indiranagar, Bengaluru, KA 560038",
  },
  // API mode switch: can be toggled to 'remote' when backend services are ready
  api: {
    useRemoteApi: process.env.NEXT_PUBLIC_USE_REMOTE_API === "true",
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  },
};
