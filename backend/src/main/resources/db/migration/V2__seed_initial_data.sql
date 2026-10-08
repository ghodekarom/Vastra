-- VASTRA Streetwear Seed Data V2
-- Catalog Categories, Collections, 8 Oversized Products, Coupons, and Demo Accounts

-- 1. Default Users
-- Passwords: Admin123! ($2a$10$iGgQe1sO7rYkZ.D5b9LRe.yC0Hh3eZqL2P0zP/jFm5D1M4H5E9KqS), Password123! ($2a$10$4B9a8H9K8J6h.5G2v1C2Q.3F4D5E6F7G8H9I0J1K2L3M4N5O6P7Q)
INSERT INTO users (id, email, password_hash, full_name, phone, role, is_active)
VALUES 
('usr-admin-01', 'admin@vastra.in', '$2a$10$7.dOuskwnt3VpRNTriM2QuZUPvF0vYPKgabvSqZXREwdDifE3B5d.', 'VASTRA Master Admin', '+91 98765 00000', 'ROLE_ADMIN', TRUE),
('usr-cust-01', 'customer@vastra.in', '$2a$10$VXqblZEwjTIAKYI5aXsoxeVzEBgSrttJlDdAvO7ig8GlDbkr1Kdya', 'Aarav Sharma', '+91 98765 43210', 'ROLE_CUSTOMER', TRUE)
ON CONFLICT (email) DO NOTHING;

-- 2. Categories
INSERT INTO categories (id, name, slug, description, display_order)
VALUES
('cat-01', 'Oversized T-Shirts', 'oversized-t-shirts', 'Heavyweight boxy drop shoulder silhouettes engineered from 240-320 GSM combed cotton.', 1),
('cat-02', 'Graphic Tees', 'graphic-tees', 'High-density screen and puff print artwork on premium streetwear blanks.', 2),
('cat-03', 'Minimal Tees', 'minimal-tees', 'Understated luxury blanks with architectural seams and discrete brand stamping.', 3),
('cat-04', 'Essentials', 'essentials', 'Foundational heavyweight apparel built for daily high-rotation wear.', 4)
ON CONFLICT (id) DO NOTHING;

-- 3. Collections
INSERT INTO collections (id, name, slug, description, gsm_range, image, display_order)
VALUES
('col-01', 'The Horizon Collection', 'horizon', 'Architectural cuts meets earth-toned luxury. 280–320 GSM combed French Terry.', '280–320 GSM', '/images/editorial/horizon-green.jpg', 1),
('col-02', 'Oversized Classics', 'classics', 'Timeless drop-shoulder silhouettes designed for relaxed daily luxury.', '240–260 GSM', '/images/hero/hero-cinematic.jpg', 2),
('col-03', 'Graphic Syndicate', 'graphic-series', 'High-density puff and screen prints on dense single jersey cotton.', '260 GSM', '/images/products/vortex-print.jpg', 3),
('col-04', 'Textured Heavyweight', 'textured-drops', 'Dense waffle and looped Terry fabrics offering maximum drape and structure.', '300–320 GSM', '/images/editorial/brand-mountains.jpg', 4)
ON CONFLICT (id) DO NOTHING;

-- 4. Products (The 8 Authoritative Catalog Items)

-- Product 1: Shadow Print Oversized Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-001', 'shadow-print-oversized-tee', 'Shadow Print Oversized Tee', 'A modern take on the classic oversized silhouette with subtle chest branding.', 
'A modern take on the classic oversized tee. Featuring a subtle shadow graphic, premium combed cotton fabric and a relaxed fit for all-day comfort. Engineered with dropped shoulders and a structured collar that never loses shape.',
'cat-01', 'col-01', 1799.00, 2499.00, 28, 4.8, 124, '100% Premium Cotton', 240, 'Relaxed Fit / Dropped shoulders / Longer length', 'Height: 6''1" | Wearing: L', TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Product 2: Essential Blank Oversized Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-002', 'essential-blank-oversized-tee', 'Essential Blank Oversized Tee', 'Clean & versatile daily luxury heavyweight blank.',
'The quintessential foundational garment. Zero chest graphics, pristine structural drape, and ultra-soft touch. Cut with generous room across chest and sleeves.',
'cat-04', 'col-02', 1499.00, 1999.00, 25, 4.9, 88, '100% Bio-Washed Cotton', 240, 'Boxy Oversized Fit / Deep Armholes', 'Height: 6''0" | Wearing: M', FALSE, TRUE, FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Product 3: Terrain Graphic Oversized Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-003', 'terrain-graphic-oversized-tee', 'Terrain Graphic Oversized Tee', 'Abstract topographical map silkscreen print on deep earth tones.',
'Inspired by brutalist landscapes and topographical maps. High-density water-based ink that ages beautifully and softens with each wash without cracking.',
'cat-02', 'col-03', 1899.00, 2599.00, 27, 4.7, 56, '100% Combed Cotton Single Jersey', 260, 'Oversized Street Silhouette', 'Height: 6''2" | Wearing: XL', TRUE, FALSE, TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Product 4: Minimalist Boxy Sand Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-004', 'minimalist-boxy-sand-tee', 'Minimalist Boxy Sand Tee', 'Ultra-clean warm neutral tone with subtle embroidered seam branding.',
'Understated luxury at its finest. Cut from dense 280 GSM cotton with an architectural boxy drape that hangs effortlessly off the shoulders.',
'cat-03', 'col-01', 1699.00, 2299.00, 26, 4.9, 94, '100% Ring-Spun Compact Cotton', 280, 'Architectural Boxy Cut', 'Height: 5''11" | Wearing: M', FALSE, TRUE, FALSE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Product 5: Better Days Ahead Wave Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-005', 'better-days-ahead-wave-tee', 'Better Days Ahead Wave Tee', 'Archival typography with cinematic Japanese wave back-graphic.',
'Our most celebrated graphic release. High-density typographic chest insignia with a sweeping full-back screenprint designed by Tokyo studio syndicate.',
'cat-02', 'col-03', 1999.00, 2799.00, 29, 4.9, 142, '100% Heavyweight Cotton Jersey', 260, 'Extended Drop-Shoulder Oversize', 'Height: 6''1" | Wearing: L', TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Product 6: Heavyweight Archival Forest Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-006', 'heavyweight-archival-forest-tee', 'Heavyweight Archival Forest Tee', 'Substantial 300 GSM French Terry construction in deep moss pine.',
'For those who demand true weight. At 300 GSM, this garment sits between a t-shirt and lightweight sweatshirt, offering indestructible form and winter-ready drape.',
'cat-01', 'col-04', 2199.00, 2999.00, 27, 4.8, 67, '100% French Terry Cotton', 300, 'Heavy Structured Boxy Drape', 'Height: 6''0" | Wearing: L', FALSE, FALSE, FALSE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Product 7: Monochrome Signature Studio Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-007', 'monochrome-signature-studio-tee', 'Monochrome Signature Studio Tee', 'The studio uniform tee with micro typographic coordinates.',
'Featuring geographical coordinates of Studio VASTRA Bengaluru stamped across the hem. Enzyme washed with silicone bath for an unreal butter-smooth hand-feel.',
'cat-03', 'col-02', 1599.00, 2199.00, 27, 4.6, 43, '100% Bio-Washed Combed Cotton', 240, 'Classic Relaxed Oversize', 'Height: 5''10" | Wearing: S', FALSE, FALSE, FALSE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Product 8: Cinematic Washed Charcoal Tee
INSERT INTO products (id, slug, name, subtitle, description, category_id, collection_id, price, original_price, discount_percentage, rating, review_count, fabric, gsm, fit, model_info, is_new, is_bestseller, is_sale, featured)
VALUES ('vst-008', 'cinematic-washed-charcoal-tee', 'Cinematic Washed Charcoal Tee', 'Acid-mineral stone wash for authentic vintage archive aesthetic.',
'Each tee undergoes an intensive 4-hour pumice stone wash cycle making every piece uniquely distress-textured. Finished with raw double-stitched reinforcements.',
'cat-01', 'col-01', 2299.00, 3199.00, 28, 5.0, 38, '100% Vintage Washed Compact Cotton', 280, 'Generous Drop-Shoulder Street Fit', 'Height: 6''2" | Wearing: XL', TRUE, TRUE, TRUE, TRUE)
ON CONFLICT (id) DO NOTHING;

-- 5. Product Images
INSERT INTO product_images (id, product_id, image_url, display_order)
VALUES
('img-01-1', 'vst-001', '/images/products/pdp-shadow-front.jpg', 1),
('img-01-2', 'vst-001', '/images/products/shadow-print.jpg', 2),
('img-01-3', 'vst-001', '/images/products/wave-back-graphic.jpg', 3),
('img-02-1', 'vst-002', '/images/products/classic-cream.jpg', 1),
('img-02-2', 'vst-002', '/images/products/essential-blank.jpg', 2),
('img-03-1', 'vst-003', '/images/products/terrain-graphic.jpg', 1),
('img-03-2', 'vst-003', '/images/products/vortex-print.jpg', 2),
('img-04-1', 'vst-004', '/images/products/boxy-sand.jpg', 1),
('img-05-1', 'vst-005', '/images/products/wave-back-graphic.jpg', 1),
('img-05-2', 'vst-005', '/images/products/graphic-black.jpg', 2),
('img-06-1', 'vst-006', '/images/editorial/horizon-green.jpg', 1),
('img-07-1', 'vst-007', '/images/products/graphic-black.jpg', 1),
('img-08-1', 'vst-008', '/images/hero/hero-cinematic.jpg', 1)
ON CONFLICT (id) DO NOTHING;

-- 6. Product Variants (Color + Size + SKU + Stock)
INSERT INTO product_variants (id, product_id, sku, color_name, color_hex, size, price, stock, image)
VALUES
-- Product 1 Variants
('var-01-s', 'vst-001', 'VST-SHD-CH-S', 'Charcoal', '#1F1F1F', 'S', 1799.00, 18, '/images/products/shadow-print.jpg'),
('var-01-m', 'vst-001', 'VST-SHD-CH-M', 'Charcoal', '#1F1F1F', 'M', 1799.00, 9, '/images/products/shadow-print.jpg'),
('var-01-l', 'vst-001', 'VST-SHD-CH-L', 'Charcoal', '#1F1F1F', 'L', 1799.00, 4, '/images/products/shadow-print.jpg'),
('var-01-xl', 'vst-001', 'VST-SHD-CH-XL', 'Charcoal', '#1F1F1F', 'XL', 1799.00, 12, '/images/products/shadow-print.jpg'),
('var-01-xxl', 'vst-001', 'VST-SHD-CH-XXL', 'Charcoal', '#1F1F1F', 'XXL', 1799.00, 7, '/images/products/shadow-print.jpg'),

-- Product 2 Variants
('var-02-s', 'vst-002', 'VST-ESS-CR-S', 'Cream', '#F4EFE6', 'S', 1499.00, 7, '/images/products/classic-cream.jpg'),
('var-02-m', 'vst-002', 'VST-ESS-CR-M', 'Cream', '#F4EFE6', 'M', 1499.00, 24, '/images/products/classic-cream.jpg'),
('var-02-l', 'vst-002', 'VST-ESS-CR-L', 'Cream', '#F4EFE6', 'L', 1499.00, 42, '/images/products/classic-cream.jpg'),
('var-02-xl', 'vst-002', 'VST-ESS-CR-XL', 'Cream', '#F4EFE6', 'XL', 1499.00, 15, '/images/products/classic-cream.jpg'),

-- Product 3 Variants
('var-03-m', 'vst-003', 'VST-TER-OL-M', 'Olive', '#555A46', 'M', 1899.00, 25, '/images/products/terrain-graphic.jpg'),
('var-03-l', 'vst-003', 'VST-TER-OL-L', 'Olive', '#555A46', 'L', 1899.00, 19, '/images/products/terrain-graphic.jpg'),
('var-03-xl', 'vst-003', 'VST-TER-OL-XL', 'Olive', '#555A46', 'XL', 1899.00, 11, '/images/products/terrain-graphic.jpg'),

-- Product 5 Variants (Critical low stock)
('var-05-l', 'vst-005', 'VST-WAV-CH-L', 'Charcoal', '#1F1F1F', 'L', 1999.00, 6, '/images/products/wave-back-graphic.jpg'),
('var-05-xl', 'vst-005', 'VST-WAV-CH-XL', 'Charcoal', '#1F1F1F', 'XL', 1999.00, 3, '/images/products/wave-back-graphic.jpg'),

-- Product 8 Variants
('var-08-m', 'vst-008', 'VST-CIN-CH-M', 'Washed Charcoal', '#282828', 'M', 2299.00, 14, '/images/hero/hero-cinematic.jpg'),
('var-08-l', 'vst-008', 'VST-CIN-CH-L', 'Washed Charcoal', '#282828', 'L', 2299.00, 8, '/images/hero/hero-cinematic.jpg'),
('var-08-xl', 'vst-008', 'VST-CIN-CH-XL', 'Washed Charcoal', '#282828', 'XL', 2299.00, 5, '/images/hero/hero-cinematic.jpg')
ON CONFLICT (id) DO NOTHING;

-- 7. Coupons
INSERT INTO coupons (id, code, description, discount_type, discount_value, min_order_value, max_discount_amount, is_active)
VALUES
('cpn-01', 'VASTRA10', '10% off on all streetwear orders', 'PERCENTAGE', 10.00, 999.00, 500.00, TRUE),
('cpn-02', 'FRESH20', '20% off for first drop exclusive access', 'PERCENTAGE', 20.00, 1999.00, 1000.00, TRUE)
ON CONFLICT (code) DO NOTHING;
