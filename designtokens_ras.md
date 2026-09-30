# VASTRA — Design Tokens & UI System
## Agent Specification for Antigravity

**Document type:** Design system / implementation contract  
**Product:** Vastra — Men’s Oversized T-Shirt E-Commerce Platform  
**Primary use:** Prototype first, production implementation later  
**Design inspiration:** Referenced Dribbble apparel-store concept  
**Master functional reference:** `Production_Ready_Ecommerce_Application_2026.md`

---

# 1. Purpose

This document is the **single source of truth for Vastra's visual language and UI behavior**.

Antigravity must use these tokens and rules when generating or modifying:

- Website pages
- Mobile responsive layouts
- Components
- Product cards
- Product detail pages
- Navigation
- Search
- Filters
- Cart
- Checkout
- Account
- Order tracking
- Reviews
- Admin UI
- Forms
- Modals
- Notifications
- Empty/error/loading states
- Animations and micro-interactions

## Priority order

When requirements conflict, follow this order:

1. Explicit user requirement
2. Product/functional requirements in the master PRD
3. This design-token specification
4. Existing Vastra component/design-system conventions
5. Antigravity implementation judgment

**Do not invent a new visual style when a token or rule already exists.**

---

# 2. Brand Direction

## Brand

**Name:** VASTRA

**Category:** Men’s fashion / oversized T-shirts

**Brand character:**

- Modern
- Minimal
- Editorial
- Confident
- Masculine without being aggressive
- Premium but approachable
- Youthful
- Urban
- Fashion-forward
- Clean
- Product-focused

## Core visual idea

> **Bigger Fits. Bolder Moves.**

Vastra should feel like a modern fashion editorial translated into an e-commerce interface.

The interface must prioritize:

- Strong product photography
- Typography
- Whitespace
- Clear hierarchy
- Large visual moments
- Simple navigation
- Fast product discovery
- Confident CTAs
- Subtle motion

## Do not use

Unless explicitly requested:

- Neon-heavy UI
- Excessive gradients
- Glassmorphism as the primary visual language
- Excessive shadows
- Excessive rounded cards
- Cartoon UI
- Generic SaaS dashboard aesthetics for storefront pages
- Excessive decorative icons
- Random colors
- Random typography
- Dense information blocks
- Excessive animations
- AI-generated visual clutter

---

# 3. Design Principle

Vastra follows:

**Editorial + Minimal + Commerce-first**

The UI should look premium while remaining highly usable.

The design must never sacrifice:

- Product discoverability
- Price visibility
- Variant selection
- Size selection
- Add-to-cart clarity
- Checkout usability
- Accessibility
- Responsive behavior

---

# 4. Color System

## 4.1 Core Palette

Use CSS variables.

```css
:root {
  --color-black: #111111;
  --color-charcoal: #1A1A1A;
  --color-dark: #252525;

  --color-white: #FFFFFF;
  --color-cream: #F7F4EE;
  --color-off-white: #F1EEE7;
  --color-sand: #E7E0D4;
  --color-beige: #D8CDBD;

  --color-stone: #B8B0A4;
  --color-gray: #77736D;
  --color-light-gray: #D9D6D0;

  --color-olive: #626854;
  --color-brown: #6A5848;

  --color-success: #3F6B4B;
  --color-warning: #A16B25;
  --color-error: #A63D35;
  --color-info: #3D6078;
}
```

## 4.2 Semantic Tokens

Do not directly use raw colors inside components when a semantic token exists.

```css
:root {
  --bg-page: var(--color-cream);
  --bg-surface: var(--color-white);
  --bg-muted: var(--color-off-white);
  --bg-subtle: var(--color-sand);
  --bg-dark: var(--color-black);

  --text-primary: var(--color-black);
  --text-secondary: #4F4B45;
  --text-muted: var(--color-gray);
  --text-inverse: var(--color-white);

  --border-default: #D8D3CA;
  --border-subtle: #E7E3DC;
  --border-strong: #B9B2A8;

  --action-primary: var(--color-black);
  --action-primary-hover: #2A2A2A;
  --action-secondary: var(--color-white);
  --action-secondary-hover: var(--color-off-white);

  --focus-ring: #111111;

  --status-success: var(--color-success);
  --status-warning: var(--color-warning);
  --status-error: var(--color-error);
  --status-info: var(--color-info);
}
```

## 4.3 Color Usage Rules

### Primary

Black/charcoal:

- Primary buttons
- Main text
- Navigation
- Important UI controls
- Active states

### Neutral

Cream/off-white:

- Main page backgrounds
- Sections
- Editorial surfaces

White:

- Cards
- Product surfaces
- Inputs
- Checkout surfaces

### Accent

Olive and brown are **supporting brand accents**, not dominant UI colors.

Use them for:

- Product storytelling
- Collection accents
- Small badges
- Editorial highlights
- Decorative elements

Do not use accent colors for every CTA.

### Status colors

Use status colors only for actual states.

Example:

- Green = success/delivered
- Amber = warning/pending
- Red = error/cancelled
- Blue = informational

Never use status colors as decorative colors.

---

# 5. Typography

## 5.1 Typography Direction

Typography should be:

- Modern
- Clean
- Editorial
- Highly readable
- Strong in large headings
- Restrained in body copy

## 5.2 Font Stack

Preferred primary font:

```css
font-family:
  "Inter",
  "Helvetica Neue",
  Helvetica,
  Arial,
  sans-serif;
```

If a licensed/custom brand font is introduced later, it must replace the primary font globally through tokens rather than being manually applied to components.

## 5.3 Type Scale

```css
:root {
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-md: 1rem;         /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 2rem;        /* 32px */
  --text-4xl: 2.75rem;     /* 44px */
  --text-5xl: 3.5rem;      /* 56px */
  --text-6xl: 4.5rem;      /* 72px */
}
```

## 5.4 Usage

| Token | Usage |
|---|---|
| `text-xs` | metadata, labels, helper text |
| `text-sm` | secondary navigation, product metadata |
| `text-md` | body text, controls |
| `text-lg` | emphasized body, product price |
| `text-xl` | product/card titles |
| `text-2xl` | section headings |
| `text-3xl` | page headings |
| `text-4xl` | major section headings |
| `text-5xl` | hero headings |
| `text-6xl` | large editorial hero typography |

## 5.5 Typography Rules

- Use sentence case by default.
- Do not use all caps for large blocks of text.
- Small labels may use uppercase with letter spacing.
- Hero headings may be 2–3 lines.
- Avoid excessively wide paragraphs.
- Body line-height should remain comfortable.
- Product prices must be visually prominent.
- Discounted/original price hierarchy must be obvious.

Recommended line heights:

```css
--leading-tight: 1.05;
--leading-snug: 1.2;
--leading-normal: 1.5;
--leading-relaxed: 1.7;
```

Recommended weights:

```css
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
```

Avoid 800/900 unless explicitly required by a future brand typography decision.

---

# 6. Spacing System

Use a consistent 4px base system.

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4 */
  --space-2: 0.5rem;    /* 8 */
  --space-3: 0.75rem;   /* 12 */
  --space-4: 1rem;      /* 16 */
  --space-5: 1.25rem;   /* 20 */
  --space-6: 1.5rem;    /* 24 */
  --space-8: 2rem;      /* 32 */
  --space-10: 2.5rem;   /* 40 */
  --space-12: 3rem;      /* 48 */
  --space-16: 4rem;      /* 64 */
  --space-20: 5rem;      /* 80 */
  --space-24: 6rem;      /* 96 */
  --space-32: 8rem;      /* 128 */
}
```

## Spacing principles

Use:

- Small spacing inside controls
- Medium spacing between related elements
- Large spacing between sections
- Very large spacing for editorial hero areas

Do not introduce arbitrary values such as:

`13px`, `17px`, `27px`, `43px`

unless a real design constraint requires them.

---

# 7. Layout

## Container

```css
--container-max: 1440px;
--container-padding-desktop: 32px;
--container-padding-tablet: 24px;
--container-padding-mobile: 16px;
```

Primary container:

```css
.container {
  width: min(100% - 32px, 1440px);
  margin-inline: auto;
}
```

Use responsive padding rather than hard-coded widths.

## Grid

Desktop product grid:

- 4 columns preferred
- 3 columns acceptable when content requires
- 2 columns tablet
- 2 columns mobile for product cards unless readability requires 1

Typical gap:

```css
--grid-gap-sm: 12px;
--grid-gap-md: 20px;
--grid-gap-lg: 24px;
--grid-gap-xl: 32px;
```

---

# 8. Responsive Breakpoints

Use:

```css
--bp-mobile: 0;
--bp-sm: 640px;
--bp-md: 768px;
--bp-lg: 1024px;
--bp-xl: 1280px;
--bp-2xl: 1536px;
```

## Mobile

< 768px

- Mobile navigation
- Bottom navigation where appropriate
- 2-column product grid
- Sticky Add to Cart where appropriate
- Collapsible filters
- Stacked checkout
- Touch-friendly controls
- Reduced hero typography
- Horizontal product carousels where useful

## Tablet

768–1023px

- Adaptive navigation
- 2–3 column grids
- Larger spacing than mobile
- Side-by-side content where practical

## Desktop

1024px+

- Full navigation
- Editorial layouts
- 4-column product grid where appropriate
- Persistent filter sidebar where appropriate
- Multi-column product details
- Large hero compositions

## Large desktop

1280px+

Use additional whitespace and larger imagery rather than simply stretching content.

---

# 9. Border Radius

Vastra should be **mostly sharp-to-soft**, not heavily rounded.

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-pill: 999px;
}
```

Recommended:

- Product cards: `radius-md` or `radius-lg`
- Buttons: `radius-sm` / `radius-md`
- Inputs: `radius-sm`
- Chips: `radius-pill`
- Modal: `radius-lg`
- Large image surfaces: `radius-md`

Avoid excessive `radius-xl` usage.

---

# 10. Shadows

Vastra uses subtle shadows.

```css
:root {
  --shadow-none: none;

  --shadow-sm:
    0 1px 3px rgba(17, 17, 17, 0.06);

  --shadow-md:
    0 6px 20px rgba(17, 17, 17, 0.08);

  --shadow-lg:
    0 16px 40px rgba(17, 17, 17, 0.12);
}
```

Rules:

- Product cards should normally have no shadow.
- Hover/floating states may use `shadow-sm` or `shadow-md`.
- Modals/drawers may use `shadow-lg`.
- Never use heavy shadows as decoration.

---

# 11. Buttons

## Primary

```text
Background: black
Text: white
Border: none
Radius: 4–8px
```

Primary CTA examples:

- Add to Cart
- Buy Now
- Proceed to Checkout
- Continue to Payment
- Shop Collection

## Secondary

```text
Background: transparent/white
Text: black
Border: 1px solid default border
```

## Ghost

Use for:

- Filters
- Utility actions
- Secondary navigation

## Button heights

```css
--button-sm: 36px;
--button-md: 44px;
--button-lg: 52px;
```

Minimum touch target:

**44 × 44px**

On mobile, prefer 48px for primary actions.

## Button rules

- One visually dominant primary CTA per major section.
- Do not place multiple competing black buttons beside each other.
- Loading state must preserve button dimensions.
- Disabled state must be visually distinct.
- Buttons must have visible keyboard focus.

---

# 12. Inputs

```css
--input-height-sm: 36px;
--input-height-md: 44px;
--input-height-lg: 52px;
```

Input style:

- White/off-white background
- 1px border
- Minimal radius
- Clear label
- Visible focus state
- Clear error state

Never rely only on placeholder text as the label.

---

# 13. Navigation

## Desktop Header

Recommended structure:

```text
VASTRA

Home
Shop
Collections
About

Search
Account
Wishlist
Cart
```

The exact navigation can evolve, but the visual hierarchy must remain simple.

## Header behavior

- Sticky on scroll when appropriate.
- Background should remain readable over content.
- Avoid overly tall navigation.
- Icons must have accessible labels.
- Cart must show item count when non-zero.

## Mobile

Use:

- Compact top header
- Logo
- Search
- Cart
- Optional menu
- Bottom navigation for core destinations when appropriate

Suggested bottom navigation:

```text
Home | Shop | Wishlist | Account
```

---

# 14. Icon System

Use a single consistent icon library.

Preferred style:

**Thin/medium outline icons**

Use icons for:

- Search
- Account
- Wishlist
- Cart
- Menu
- Arrow
- Filter
- Sort
- Close
- Chevron
- Star
- Truck
- Return
- Secure payment
- Edit
- Delete
- Plus/minus

Rules:

- Do not mix icon styles.
- Do not use emoji as UI icons.
- Do not manually draw SVG icons unless required.
- Icons should normally be 18–24px.
- Interactive icon targets must be at least 44×44px.

---

# 15. Imagery

Photography is a major part of Vastra's visual identity.

## Product photography

Preferred:

- Editorial
- Lifestyle
- Clean studio
- Natural daylight
- High-quality model photography
- Front/back/detail views

## Product image requirements

Each product may contain:

1. Front
2. Back
3. Side/detail
4. Fabric/detail
5. Lifestyle
6. Model fit
7. Color-specific image

## Image treatment

- Avoid excessive filters.
- Maintain realistic garment colors.
- Keep backgrounds visually consistent within a product set.
- Use high-resolution source images.
- Use responsive image optimization.
- Preserve aspect ratio.

Recommended product image ratio:

**4:5**

Hero/editorial image ratios can vary based on composition.

---

# 16. Product Cards

Product cards are core components.

Required structure:

```text
Image
Wishlist
Badge (optional)

Product Name
Price
Original Price (optional)
Discount (optional)
Color Swatches
```

Optional:

- Rating
- Review count
- Quick add
- Available sizes
- New badge
- Bestseller badge

## Card behavior

Desktop:

- Image hover transition
- Optional second product image
- Wishlist appears clearly
- Quick add may appear

Mobile:

- No hover-dependent functionality
- Wishlist always accessible
- Product information always visible

Never hide critical information behind hover.

---

# 17. Product Detail Page

Recommended structure:

```text
Breadcrumb

Image Gallery | Product Information

Product Name
Rating
Price
Discount
Color
Color Swatches
Size
Size Guide
Fit Information
Add to Cart
Wishlist

Shipping
Returns
Secure Payment

Product Details
Fit & Size
Fabric & GSM
Care Instructions

Reviews
Related Products
Recently Viewed
```

## Product information hierarchy

1. Product name
2. Price
3. Rating/reviews
4. Color
5. Size
6. Size guide
7. Add to Cart
8. Delivery/returns
9. Product details

## Size selection

Use clear size buttons:

```text
S  M  L  XL  XXL
```

Unavailable size:

- Disabled
- Clearly visually unavailable
- Never silently removed if the product supports that size

## Size guide

Include:

- Size
- Chest
- Length
- Shoulder
- Sleeve when applicable

Use actual product measurements from backend data.

Never invent measurements in production.

---

# 18. Fashion-Specific UI

Vastra should support:

### Fit

Examples:

- Oversized
- Relaxed
- Boxy
- Drop shoulder

### Fabric

Examples:

- Cotton
- Cotton blend
- Premium cotton

### GSM

Display when available.

### Care

Examples:

- Machine wash cold
- Do not bleach
- Tumble dry low
- Iron low heat

### Model information

Example structure:

```text
Model height: 6'1"
Wearing: L
Fit: Oversized
```

Only display factual product/model data supplied by the backend/CMS.

---

# 19. Filters

Product listing filters may include:

- Category
- Collection
- Size
- Color
- Price
- Fit
- Fabric
- Pattern
- Availability
- Rating

Sort options:

- Featured
- Newest
- Price: Low to High
- Price: High to Low
- Rating
- Best Selling

Filters must be usable on:

- Desktop
- Tablet
- Mobile

Mobile filters should open in a bottom sheet/drawer.

---

# 20. Search

Search UI should support the master PRD's search requirements.

Potential states:

```text
Search input
Recent searches
Popular searches
Product suggestions
Category suggestions
No results
Search results
```

Future AI search can sit behind the same interface.

AI must never invent:

- Products
- Prices
- Inventory
- Discounts
- Policies

Actual catalog/business data remains authoritative.

---

# 21. Cart

Cart must visually show:

```text
Product
Variant
Color
Size
Quantity
Unit Price
Discount
Subtotal
Shipping
Total
```

Controls:

- Quantity +/-
- Remove
- Move to Wishlist
- Coupon
- Checkout

The frontend must not be treated as the authority for:

- Price
- Discount
- Tax
- Inventory
- Coupon eligibility
- Final total

The backend must recalculate these values.

---

# 22. Checkout

Checkout should follow:

```text
Cart
↓
Address
↓
Shipping
↓
Coupon
↓
Tax
↓
Payment
↓
Order Confirmation
```

Use a clear progress indicator on desktop/mobile when appropriate.

Checkout must be:

- Minimal
- Trustworthy
- Distraction-free
- Easy to scan
- Mobile friendly

Do not introduce unnecessary animations during payment.

---

# 23. Order States

UI should support the master PRD's order lifecycle:

```text
PLACED
CONFIRMED
PROCESSING
SHIPPED
OUT_FOR_DELIVERY
DELIVERED
```

Additional states may include:

```text
CANCELLED
RETURN_REQUESTED
RETURNED
REFUNDED
PAYMENT_FAILED
```

Use consistent status badges.

---

# 24. Wishlist

Wishlist item:

```text
Image
Product Name
Color
Size
Price
Availability
Move to Cart
Remove
```

Empty state should be editorial but concise.

Example concept:

> Nothing saved yet. Find a fit worth keeping.

---

# 25. Reviews

Review UI should support:

- Star rating
- Written review
- Images
- Verified purchase
- Date
- Helpful feedback
- Moderation status where applicable

Display:

```text
Rating summary
Rating distribution
Customer reviews
Photos
Verified purchase indicator
```

---

# 26. Notifications / Toasts

Use minimal notifications.

Examples:

```text
Added to cart
Removed from wishlist
Coupon applied
Address saved
Order placed
Payment successful
Something went wrong
```

Rules:

- Do not block the user unnecessarily.
- Keep messages short.
- Provide action when useful.
- Use semantic status colors.
- Support screen readers.

---

# 27. Modal / Drawer

Use drawers for:

- Filters
- Cart preview
- Mobile navigation

Use modals for:

- Confirmation
- Size guide
- Delete confirmation
- Important contextual information

Avoid modal stacking.

---

# 28. Loading States

Use skeleton loaders instead of generic spinners for content-heavy areas.

Required skeletons:

- Product cards
- Product detail
- Search results
- Orders
- Account sections

Skeletons should match the final content geometry.

---

# 29. Empty States

Every data-driven area must have an intentional empty state.

Examples:

- Empty cart
- Empty wishlist
- No orders
- No search results
- No reviews
- No notifications

Empty states should contain:

1. Simple visual
2. Short message
3. Clear next action

---

# 30. Error States

Error UI must be understandable.

Use:

```text
What happened
Why it may have happened
What the user can do
Retry
```

Never expose:

- Stack traces
- Database errors
- Internal service names
- Secrets
- Raw API errors

---

# 31. Accessibility

Minimum requirements:

- WCAG-oriented contrast
- Keyboard navigation
- Visible focus states
- Semantic HTML
- Accessible labels
- Form error association
- Alt text for meaningful images
- Decorative images marked appropriately
- Minimum touch target of 44×44px
- Do not rely on color alone
- Respect reduced-motion preferences

Focus token:

```css
--focus-width: 2px;
--focus-offset: 2px;
--focus-color: #111111;
```

---

# 32. Motion & Micro-interactions

Motion should feel premium and restrained.

## Duration

```css
--duration-fast: 120ms;
--duration-normal: 200ms;
--duration-slow: 320ms;
--duration-slower: 500ms;
```

## Easing

```css
--ease-standard: cubic-bezier(0.2, 0, 0, 1);
--ease-emphasized: cubic-bezier(0.2, 0.8, 0.2, 1);
```

## Appropriate animations

- Product image transitions
- Wishlist heart feedback
- Add-to-cart feedback
- Drawer opening
- Modal opening
- Page transitions
- Filter transitions
- Button hover
- Image hover
- Skeleton loading

Avoid:

- Constant floating animations
- Excessive parallax
- Large bouncing elements
- Animation on every component
- Motion that delays core shopping actions

Respect:

```css
@media (prefers-reduced-motion: reduce) {
  /* minimize non-essential motion */
}
```

---

# 33. Hover States

Desktop only where applicable.

Examples:

Product card:

```text
Default → subtle image transition → optional second image
```

Button:

```text
Black → slightly lighter black
```

Links:

```text
Subtle underline or opacity transition
```

Do not make hover the only way to discover functionality.

---

# 34. Z-Index System

Use predictable layers.

```css
:root {
  --z-base: 0;
  --z-content: 1;
  --z-sticky: 20;
  --z-header: 30;
  --z-dropdown: 40;
  --z-drawer: 50;
  --z-modal: 60;
  --z-toast: 70;
  --z-tooltip: 80;
}
```

Never use random values such as:

```text
z-index: 9999
z-index: 99999
```

unless a documented exception exists.

---

# 35. Product Badges

Allowed examples:

- NEW
- BESTSELLER
- LIMITED
- SALE
- LOW STOCK

Rules:

- Use sparingly.
- Do not put multiple badges on every card.
- Badges must represent actual backend/CMS data.
- Avoid invented scarcity.

---

# 36. Pricing

Use clear hierarchy.

Example:

```text
₹1,799
₹2,499
28% OFF
```

Rules:

- Current price = strongest
- Original price = muted/struck
- Discount = secondary emphasis
- Never calculate/display financial values solely from frontend state

Currency should use Indian Rupees for the initial India-focused implementation unless the business requirements later introduce multi-currency.

---

# 37. Design Tokens for Product States

```css
:root {
  --product-available: var(--color-black);
  --product-low-stock: var(--color-warning);
  --product-out-of-stock: var(--color-gray);
  --product-sale: var(--color-error);
  --product-new: var(--color-olive);
}
```

---

# 38. Admin Design Direction

The admin interface is part of the production system but should not visually copy the customer storefront.

Admin priorities:

- Dense information where useful
- Clear tables
- Filters
- Search
- Status indicators
- Forms
- Dashboards
- Charts
- Inventory visibility
- Order management

Admin can use:

- White surfaces
- Light gray borders
- Black primary actions
- Semantic status colors
- Compact spacing

Avoid turning the admin into a visually decorative fashion page.

---

# 39. CMS Rules

CMS should control:

- Hero content
- Banners
- Promotional content
- Collections
- Editorial sections
- Product merchandising
- SEO content
- Static pages

CMS must **not** arbitrarily redefine:

- Typography system
- Core spacing
- Component structure
- Responsive behavior
- Accessibility rules
- Global design tokens

The master PRD explicitly separates CMS content from frontend presentation/layout behavior.

---

# 40. Design System Component Naming

Use reusable components.

Suggested structure:

```text
components/
  ui/
    Button
    Input
    Select
    Checkbox
    Radio
    Badge
    IconButton
    Modal
    Drawer
    Tabs
    Toast
    Skeleton

  navigation/
    Header
    MobileNav
    Breadcrumb
    Footer

  product/
    ProductCard
    ProductGrid
    ProductGallery
    ProductPrice
    ColorSwatches
    SizeSelector
    SizeGuide
    FitGuide
    ProductInfo
    ProductReviews
    RelatedProducts

  shopping/
    CartItem
    CartSummary
    WishlistItem
    CouponInput
    CheckoutStepper
    AddressCard
    PaymentMethod

  order/
    OrderCard
    OrderStatus
    OrderTimeline
    ReturnCard
```

Use PascalCase for component names.

---

# 41. Component Rules

Every reusable component should:

1. Have a single clear responsibility.
2. Use tokens instead of hard-coded design values.
3. Support responsive behavior.
4. Support loading/disabled/error states where relevant.
5. Have accessible labels.
6. Avoid duplicated styles.
7. Avoid page-specific styling inside shared components.
8. Accept data through props/configuration.
9. Avoid business logic that belongs to backend/services.
10. Be reusable across customer pages.

---

# 42. Frontend Architecture Rule

The frontend is responsible for:

- Presentation
- Interaction
- Client-side state
- Form UX
- Validation feedback
- API consumption
- Loading/error states
- Responsive behavior

The backend remains authoritative for:

- Price
- Discount
- Tax
- Coupon eligibility
- Inventory
- Permissions
- Order state
- Payment state
- Business rules

This follows the master PRD principle:

> Never trust the frontend for business-critical values.

---

# 43. Design Tokens Must Be Implemented Centrally

Do not scatter values across files.

Bad:

```css
padding: 23px;
color: #1f1f1f;
border-radius: 13px;
```

Good:

```css
padding: var(--space-6);
color: var(--text-primary);
border-radius: var(--radius-md);
```

If Tailwind is used, map these values into the Tailwind theme rather than bypassing the token system.

---

# 44. Tailwind Mapping Guidance

If Tailwind CSS is used, create semantic mappings for:

```text
colors
spacing
fontSize
fontWeight
lineHeight
borderRadius
boxShadow
screens
transitionDuration
zIndex
```

Components should prefer semantic classes such as:

```text
bg-page
bg-surface
text-primary
text-secondary
border-default
```

rather than repeatedly defining raw hex values.

---

# 45. Page-Level Design Rules

## Homepage

Priority:

1. Brand identity
2. Hero
3. Featured collection
4. New arrivals
5. Best sellers
6. Editorial content
7. Recommendations
8. Reviews/social proof
9. Footer

The homepage should not become a dashboard.

## Listing

Priority:

1. Page title
2. Filters
3. Sort
4. Product grid
5. Pagination/infinite scroll
6. Supporting content where appropriate

## Product

Priority:

1. Product imagery
2. Product information
3. Variant selection
4. Add to Cart
5. Fit/size
6. Details
7. Shipping/returns
8. Reviews
9. Related products

## Cart

Priority:

1. Products
2. Quantity
3. Pricing
4. Coupon
5. Shipping
6. Total
7. Checkout CTA

## Checkout

Priority:

1. Address
2. Shipping
3. Payment
4. Review
5. Confirmation

---

# 46. Responsive Product Grid

Recommended:

```text
Desktop XL: 4 columns
Desktop:    4 columns
Tablet:     2–3 columns
Mobile:     2 columns
```

Product card images should maintain consistent aspect ratio within a grid.

Do not allow unpredictable image heights.

---

# 47. Mobile-First Rules

Every component must be evaluated at:

```text
320px
375px
390px
430px
768px
1024px
1280px
1440px+
```

Minimum supported layout width:

**320px**

Do not allow:

- Horizontal overflow
- Text clipping
- Broken grids
- Unusable buttons
- Tiny controls
- Hover-only functionality

---

# 48. Prototype Fidelity Rules

The prototype should demonstrate:

- Visual hierarchy
- Realistic product content
- Realistic navigation
- Responsive behavior
- Product discovery
- Variant selection
- Cart behavior
- Checkout behavior
- Account behavior

Prototype data can be mock data, but its structure should reflect the eventual production domain model.

Example:

```text
Product
 └── Variant
      ├── Color
      ├── Size
      ├── SKU
      ├── Price
      ├── Inventory
      └── Images
```

---

# 49. Prototype vs Production

## Prototype may use

- Mock products
- Mock users
- Mock inventory
- Mock orders
- Static recommendation data
- Placeholder payment flow

## Production must use

- Backend APIs
- Database
- Authentication
- Real inventory
- Real payment provider
- Real order lifecycle
- Server-side pricing validation
- Real notifications
- Audit logging
- Security controls

Never mistake prototype behavior for final business logic.

---

# 50. Reference Design Rule

The Dribbble reference is a **visual inspiration/reference**, not a specification.

Use it to understand:

- Editorial composition
- Fashion presentation
- Visual hierarchy
- Product photography
- Whitespace
- Navigation feel
- General interaction patterns

Do NOT reproduce:

- Exact layouts
- Exact copy
- Exact assets
- Exact branding
- Exact typography
- Exact proprietary illustrations
- Exact UI components
- Exact visual identity

Vastra must have its own brand identity.

---

# 51. Anti-Drift Rules for Antigravity

When generating UI, Antigravity MUST NOT:

- Change the primary color system without instruction.
- Introduce random accent colors.
- Change fonts page-by-page.
- Create unrelated card styles.
- Use different border radii for similar components.
- Use different button styles for the same action.
- Add gradients without design approval.
- Add glassmorphism without design approval.
- Add excessive shadows.
- Add excessive rounded containers.
- Change spacing arbitrarily.
- Use emoji as interface icons.
- Create desktop-only interactions.
- Hide essential functionality behind hover.
- Make every section look like a separate design system.
- Copy another fashion brand's UI.
- Invent product facts.
- Invent prices.
- Invent inventory.
- Invent shipping/return policies.
- Invent measurements.
- Invent customer reviews as real data.

---

# 52. Content Rules

For prototype content:

Use realistic but clearly fictional Vastra product data.

Suggested product naming style:

```text
Shadow Print Oversized Tee
Essential Blank Oversized Tee
Terrain Graphic Oversized Tee
Vortex Print Oversized Tee
Minimal Logo Oversized Tee
Retro Wave Oversized Tee
```

Do not use:

- Existing brand names
- Copied product descriptions
- Copyrighted campaign copy
- Fake customer claims presented as verified facts

---

# 53. Image Generation Rules

When generating prototype/product imagery:

Preferred:

- Male models
- Adult models
- Oversized silhouettes
- Contemporary streetwear
- Editorial fashion photography
- Neutral urban environments
- Studio photography
- Natural daylight
- Realistic fabric texture
- Consistent model styling

Keep product identity consistent across:

- Front image
- Back image
- Detail image
- Lifestyle image
- Color variants

The same product must visually remain the same product.

---

# 54. Accessibility Tokens

```css
:root {
  --min-touch-target: 44px;
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
}
```

All interactive components must have:

- Focus
- Hover where relevant
- Active
- Disabled where relevant
- Loading where relevant
- Error where relevant

---

# 55. Quality Gate

Before considering a screen complete, verify:

### Visual

- [ ] Uses Vastra palette
- [ ] Uses typography tokens
- [ ] Uses spacing tokens
- [ ] Uses radius tokens
- [ ] Uses shadow tokens
- [ ] Consistent icon style
- [ ] Consistent product imagery

### UX

- [ ] Primary CTA is obvious
- [ ] Navigation is understandable
- [ ] Product information hierarchy is clear
- [ ] User can complete the intended task
- [ ] Empty/loading/error states exist where required

### Responsive

- [ ] 320px
- [ ] 375px
- [ ] 390px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1440px+

### Accessibility

- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Accessible labels
- [ ] Contrast
- [ ] Touch targets
- [ ] Reduced motion

### Engineering

- [ ] No unnecessary hard-coded visual values
- [ ] Shared components reused
- [ ] Tokens centralized
- [ ] No duplicated component styles
- [ ] No business-critical logic in UI
- [ ] No secrets in frontend
- [ ] No invented backend data

---

# 56. Final Agent Instruction

**Treat this document as a design-system contract.**

When implementing Vastra:

1. Read this file before creating UI.
2. Reuse existing tokens/components before creating new ones.
3. If a required value is missing, choose the closest existing token.
4. Do not create arbitrary design values.
5. Maintain visual consistency across every page.
6. Preserve responsive behavior.
7. Preserve accessibility.
8. Keep customer storefront and admin UI visually appropriate to their different purposes.
9. Use the Dribbble reference only as visual inspiration.
10. Use the master production-ready e-commerce PRD for functional/business scope.
11. Do not reduce the production scope merely because the prototype is being built first.
12. Do not implement production business rules inside mock UI.
13. Ask for clarification only when a decision materially changes the product or violates an existing token/rule.
14. When a new design decision is approved, update this token system instead of creating a one-off exception.

---

# 57. Source-of-Truth Relationship

Vastra uses three distinct sources:

```text
Production_Ready_Ecommerce_Application_2026.md
                ↓
      Functional / Architecture
             Scope
                ↓
       VASTRA Design Tokens
                ↓
      Visual / UX System
                ↓
       Prototype / Frontend
```

The Dribbble reference sits beside this system as:

```text
Dribbble Reference
        ↓
Visual Inspiration
        ↓
Vastra Design Direction
```

It does **not** override the production PRD or this design-token contract.

---

# 58. Current Vastra Design Baseline

Until explicitly changed, use:

```text
Brand:              VASTRA
Audience:           Men
Primary product:    Oversized T-shirts
Visual style:       Editorial Minimal
Primary palette:    Black + Cream + Warm Neutrals
Accent palette:     Olive + Brown
Typography:         Inter / modern sans-serif
Base spacing:       4px
Primary radius:     4–12px
Primary CTA:        Black
Product ratio:      4:5
Desktop grid:       4 columns
Mobile grid:        2 columns
Icon style:         Outline
Motion:             Subtle
Image style:        Editorial / Lifestyle / Studio
Design priority:    Product-first
```

**This baseline remains active until the Vastra design direction is intentionally changed.**
