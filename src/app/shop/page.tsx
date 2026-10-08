"use client";

import React, { useState, useMemo } from "react";
import { Filter, X, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";

export default function ShopPage() {
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(PRODUCTS);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2999);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  React.useEffect(() => {
    import("@/config/site").then(({ siteConfig }) => {
      if (siteConfig.api.useRemoteApi) {
        import("@/lib/api/products").then(({ fetchProducts }) => {
          fetchProducts().then((res) => {
            if (res && res.length > 0) setCatalogProducts(res);
          }).catch((err) => console.warn("Remote catalog sync:", err));
        });
      }
    });
  }, []);

  const categories = [
    "Oversized T-Shirts",
    "Graphic Tees",
    "Minimal Tees",
    "Essentials",
  ];

  const colors = [
    { name: "Charcoal", hex: "#1F1F1F" },
    { name: "Cream", hex: "#F3EEE7" },
    { name: "Olive", hex: "#555A46" },
    { name: "Taupe", hex: "#6E5E4E" },
    { name: "Sand", hex: "#D6CBB9" },
  ];

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleCategoryToggle = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleColorToggle = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName)
        ? prev.filter((c) => c !== colorName)
        : [...prev, colorName]
    );
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setMaxPrice(2999);
    setSortBy("featured");
  };

  const filteredProducts = useMemo(() => {
    return catalogProducts.filter((product) => {
      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      ) {
        return false;
      }
      // Color filter
      if (
        selectedColors.length > 0 &&
        !product.colors.some((c) => selectedColors.includes(c.name))
      ) {
        return false;
      }
      // Size filter
      if (
        selectedSizes.length > 0 &&
        !selectedSizes.some((s) => product.sizes.includes(s as any))
      ) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured
    });
  }, [catalogProducts, selectedCategories, selectedColors, selectedSizes, maxPrice, sortBy]);

  const activeFilterCount =
    selectedCategories.length +
    selectedColors.length +
    selectedSizes.length +
    (maxPrice < 2999 ? 1 : 0);

  return (
    <div className="bg-[#F7F4EE] min-h-screen py-8 sm:py-12">
      <div className="container-vastra">
        {/* Top Header Row matching rasika.png Listing quadrant */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#D8D3CA] gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#111111] font-display">
              Oversized T-Shirts
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#77736D]">
              Relaxed fits. Premium fabrics. Made for everyday. ({filteredProducts.length} pieces)
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 rounded border border-[#D8D3CA] bg-white px-4 py-2 text-xs font-semibold text-[#111111]"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#77736D] hidden sm:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded border border-[#D8D3CA] bg-white px-3 py-2 text-xs font-medium text-[#111111] focus:outline-none focus:border-black"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (Matching rasika.png) */}
          <aside className="hidden lg:block lg:col-span-3 pr-6 divide-y divide-[#D8D3CA] space-y-6">
            {/* Header & Clear */}
            <div className="flex items-center justify-between pb-4">
              <span className="text-sm font-bold text-[#111111] uppercase tracking-wider">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-[#A63D35] hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="pt-6">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">
                Category
              </h3>
              <div className="space-y-2 text-xs">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="rounded border-[#D8D3CA] text-black focus:ring-black h-3.5 w-3.5"
                    />
                    <span className="text-[#4F4B45] hover:text-black">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="pt-6">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">
                Color
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleColorToggle(c.name)}
                    title={c.name}
                    className={`h-6 w-6 rounded-full border transition-all ${
                      selectedColors.includes(c.name)
                        ? "scale-110 border-black ring-2 ring-black/40"
                        : "border-black/20 hover:scale-105"
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-6">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">
                Size
              </h3>
              <div className="flex gap-1.5 flex-wrap">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSizeToggle(s)}
                    className={`h-8 w-8 rounded text-xs font-semibold border transition-all ${
                      selectedSizes.includes(s)
                        ? "bg-black text-white border-black"
                        : "bg-white text-[#111111] border-[#D8D3CA] hover:border-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="pt-6">
              <div className="flex justify-between items-center text-xs mb-2">
                <h3 className="font-bold text-[#111111] uppercase tracking-wider">
                  Price
                </h3>
                <span className="text-[#4F4B45] font-semibold">
                  Up to ₹{maxPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="999"
                max="2999"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#77736D] mt-1">
                <span>₹999</span>
                <span>₹2,999</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area (Matching rasika.png 4-column layout) */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center rounded-xl bg-white border border-[#D8D3CA] p-8">
                <p className="text-base font-semibold text-[#111111]">
                  No products match your selected filters
                </p>
                <p className="mt-1 text-xs text-[#77736D]">
                  Try resetting your price, color, or category choices.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="mt-6 rounded bg-black px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#252525]"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#F7F4EE] p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#D8D3CA]">
                <h3 className="text-base font-bold text-[#111111]">Filters</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Filter Options */}
              <div className="py-6 space-y-6 overflow-y-auto max-h-[70vh]">
                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                    Category
                  </h4>
                  <div className="space-y-2 text-xs">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="rounded text-black"
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                    Color
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleColorToggle(c.name)}
                        className={`h-7 w-7 rounded-full border ${
                          selectedColors.includes(c.name)
                            ? "ring-2 ring-black"
                            : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
                    Size
                  </h4>
                  <div className="flex gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleSizeToggle(s)}
                        className={`h-8 w-8 rounded text-xs font-semibold border ${
                          selectedSizes.includes(s)
                            ? "bg-black text-white"
                            : "bg-white text-black"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D8D3CA] flex gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="flex-1 rounded border border-[#D8D3CA] py-2.5 text-xs font-semibold text-black"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 rounded bg-black py-2.5 text-xs font-semibold text-white"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
