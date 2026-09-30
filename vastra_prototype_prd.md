# VASTRA — PROTOTYPE PRD
## Premium Men's Oversized T-Shirt E-Commerce Experience
### Next.js Prototype | GSAP | ScrollTrigger | Lenis | Premium Micro-Interactions

**Document Type:** Prototype Product Requirements Document  
**Project:** Vastra  
**Prototype Scope:** Frontend-only, interactive, high-fidelity prototype  
**Primary Framework:** Next.js  
**Rendering Architecture:** Next.js App Router  
**Language:** TypeScript  
**Styling:** Tailwind CSS + custom CSS where required  
**Animation Engine:** GSAP  
**Scroll Animation:** GSAP ScrollTrigger  
**Smooth Scrolling:** Lenis  
**Design Direction:** Supplied Dribbble reference — `Apparel Online Store` by Desire Creative Agency  
**Product Focus:** Men's fashion, initially oversized T-shirts  
**Prototype Data:** Mock/local data only  
**Backend:** Not required for this prototype  
**Database:** Not required for this prototype  
**Payment Gateway:** Simulated  
**Authentication:** Simulated prototype flow  
**AI:** Simulated UI/interaction layer only unless explicitly connected later

---

# 1. DOCUMENT PURPOSE

This PRD is the **single source of truth for building the Vastra prototype**.

The prototype must be implemented as a premium, highly interactive **Next.js web experience** for a men's clothing brand focused initially on oversized T-shirts.

The prototype is not the production e-commerce application. It is the **visual, interaction, information-architecture, and customer/admin experience foundation** that will later be connected to production APIs, authentication, PostgreSQL, payments, inventory, CMS, AI services, analytics, notifications, and other backend systems.

The prototype must therefore:

1. Be built strictly with Next.js.
2. Look and feel like a premium fashion-commerce product.
3. Follow the supplied Dribbble reference as the primary visual inspiration.
4. Preserve the reference's visual language, composition quality, spacing discipline, typography treatment, product presentation, editorial feeling, and interaction quality while using original Vastra branding/content/assets.
5. Use GSAP as the primary animation engine.
6. Use GSAP ScrollTrigger for scroll-based animation.
7. Use Lenis for smooth scrolling.
8. Include premium micro-interactions.
9. Include polished mouse-hover behavior.
10. Include tasteful 3D/floating visual objects where appropriate.
11. Be fully responsive.
12. Include realistic shopping flows from discovery through order confirmation.
13. Include customer account and post-purchase prototype flows.
14. Include the planned admin experience at prototype level.
15. Include loading, empty, error, unavailable, success, and transition states.
16. Use realistic mock data instead of meaningless placeholder blocks.
17. Avoid generic SaaS/e-commerce templates.
18. Avoid excessive animation that damages usability.
19. Be structured so production APIs can replace mock data later without redesigning the frontend.

---

# 2. SOURCE OF TRUTH HIERARCHY

Antigravity must follow this hierarchy when making implementation decisions.

### Priority 1 — This PRD
This document defines the prototype's:

- scope
- routes
- screens
- interactions
- UX
- visual behavior
- responsive requirements
- animation requirements
- prototype data requirements
- acceptance criteria

### Priority 2 — Vastra Design Tokens
The previously established Vastra design-token direction defines:

- colors
- typography
- spacing
- grids
- radii
- shadows
- buttons
- inputs
- cards
- product presentation
- responsive behavior
- motion principles
- accessibility
- design consistency

### Priority 3 — Production E-Commerce Functional Guide
`Production_Ready_Ecommerce_Application_2026.md` is the functional and production-oriented reference for the business capabilities that this prototype should represent.

The prototype should preserve the concepts from that guide, including:

- catalog
- products
- variants
- SKUs
- search
- wishlist
- cart
- checkout
- payment
- orders
- tracking
- cancellation
- returns
- refunds
- reviews
- customer account
- admin
- CMS
- SEO
- notifications
- analytics
- AI concepts

### Priority 4 — Supplied Dribbble Reference
The supplied Dribbble shot is the primary **visual inspiration**.

It must strongly influence:

- overall visual character
- page composition
- typography scale
- whitespace
- product imagery
- editorial treatment
- section rhythm
- navigation presentation
- product-card treatment
- visual hierarchy
- interaction feel
- premium aesthetic

Do not replace the reference-inspired direction with a generic Next.js commerce template.

---

# 3. REFERENCE DESIGN RULE

## 3.1 Reference

The user supplied:

**Dribbble — Apparel Online Store**  
Designed by Desire Creative Agency.

The prototype must be developed by studying and following the supplied reference directly.

## 3.2 Fidelity Requirement

Visual fidelity to the supplied reference is a **hard requirement**.

The implementation should reproduce the reference's design language as closely as practical while keeping:

- Vastra branding
- Vastra typography decisions
- original product names
- original product imagery
- original copy
- original icons/assets where available

Do not simply create a normal clothing store and add a few animations.

The result should immediately feel like the same class of premium editorial fashion experience.

## 3.3 Do Not

Do not:

- use a generic Shopify-style template
- use a generic Tailwind dashboard template
- use default browser styling
- use arbitrary gradients everywhere
- use excessive rounded cards if the reference does not use them
- use random glassmorphism
- use excessive shadows
- use random neon colors
- use stock SaaS UI patterns
- add animations without a visual purpose
- change the design direction because implementation is easier

---

# 4. PRODUCT VISION

Vastra is a modern men's fashion e-commerce experience centered initially around **oversized T-shirts**.

The prototype should communicate:

- confidence
- premium streetwear
- modern masculinity
- editorial fashion
- clean product presentation
- quality
- simplicity
- visual storytelling
- effortless shopping

The customer should feel that Vastra is a **fashion brand first** and an e-commerce website second.

Commerce functionality must therefore be integrated into the brand experience rather than dominating it.

---

# 5. PROTOTYPE GOAL

The prototype must demonstrate the complete frontend experience from:

```text
Landing
   ↓
Discovery
   ↓
Category
   ↓
Search
   ↓
Product Listing
   ↓
Product Details
   ↓
Variant Selection
   ↓
Wishlist
   ↓
Cart
   ↓
Checkout
   ↓
Payment
   ↓
Order Confirmation
   ↓
Account
   ↓
Order Tracking
   ↓
Review
   ↓
Return / Refund
```

It must also demonstrate:

```text
Admin Login
   ↓
Admin Dashboard
   ↓
Products
   ↓
Product Editor
   ↓
Variants / SKUs
   ↓
Inventory
   ↓
Orders
   ↓
Customers
   ↓
Marketing
   ↓
Reviews
   ↓
CMS
   ↓
Analytics
   ↓
AI Insights
```

All prototype behavior may be simulated locally.

---

# 6. PROTOTYPE SCOPE

## 6.1 Included

### Customer Experience

- Homepage
- Navigation
- Mega/menu navigation
- Shop
- Collections
- Product listing
- Search
- Search suggestions
- Filters
- Sorting
- Product detail
- Product gallery
- Variant selection
- Size guide
- Wishlist
- Cart
- Cart drawer
- Checkout
- Address selection
- Shipping selection
- Coupon
- Payment method
- Order review
- Order confirmation
- Account
- Profile
- Addresses
- Orders
- Order detail
- Tracking
- Cancellation
- Return request
- Refund status
- Reviews
- Notifications
- FAQ
- About
- Shipping policy
- Returns policy
- Contact
- Newsletter

### Admin Experience

- Admin login
- Dashboard
- Products
- Product editor
- Categories
- Variants
- SKU editor
- Inventory
- Orders
- Order detail
- Customers
- Coupons
- Campaigns
- Reviews
- CMS
- SEO
- Media
- Notifications
- Analytics
- AI insights
- Users
- Roles and permissions
- Audit log
- Settings

### AI Prototype Experience

- AI search
- AI shopping assistant
- Recommendation UI
- AI admin insights
- AI review-analysis UI
- AI content-generation UI

AI responses may be mocked.

---

# 7. EXPLICITLY OUT OF PROTOTYPE SCOPE

The prototype must NOT attempt to build production backend infrastructure.

Do not implement:

- PostgreSQL
- real payment processing
- real Razorpay/Stripe transactions
- real inventory persistence
- real shipping-provider integration
- real email provider
- real SMS provider
- real WhatsApp provider
- real object storage
- real vector database
- production AI model integration
- production authentication service
- production RBAC enforcement
- production analytics pipeline
- production CI/CD
- production monitoring infrastructure

These are future production concerns.

The prototype must, however, represent their **frontend experience**.

---

# 8. MANDATORY TECHNOLOGY STACK

## 8.1 Core

- Next.js
- TypeScript
- React
- App Router

## 8.2 Styling

- Tailwind CSS
- CSS variables/design tokens
- Custom CSS where necessary

## 8.3 Animation

**GSAP is mandatory.**

Use:

- GSAP
- ScrollTrigger

GSAP must control major motion systems.

## 8.4 Smooth Scrolling

**Lenis is mandatory.**

Lenis should provide the smooth scrolling experience.

GSAP ScrollTrigger must be correctly synchronized with Lenis.

## 8.5 Icons

Use a consistent icon system such as Lucide React where an icon is needed.

Do not use random icon libraries throughout the application.

## 8.6 State

Use lightweight client state appropriate for the prototype.

The architecture must make it possible to replace local state/mock services with real APIs later.

## 8.7 Do Not Add Unnecessary Frameworks

Do not introduce:

- Framer Motion
- a second animation engine
- multiple UI component libraries
- heavy 3D engines unnecessarily
- generic template systems

GSAP is the animation system.

---

# 9. NEXT.JS ARCHITECTURE

Use the Next.js App Router.

Suggested structure:

```text
app/
├── layout.tsx
├── page.tsx
├── loading.tsx
├── not-found.tsx
├── globals.css
│
├── shop/
│   └── page.tsx
│
├── collections/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx
│
├── search/
│   └── page.tsx
│
├── product/
│   └── [slug]/
│       └── page.tsx
│
├── wishlist/
│   └── page.tsx
│
├── cart/
│   └── page.tsx
│
├── checkout/
│   └── page.tsx
│
├── order/
│   └── [orderId]/
│       ├── confirmation/
│       │   └── page.tsx
│       └── page.tsx
│
├── account/
│   ├── page.tsx
│   ├── profile/
│   ├── addresses/
│   ├── orders/
│   ├── wishlist/
│   ├── notifications/
│   └── reviews/
│
├── login/
│   └── page.tsx
│
├── register/
│   └── page.tsx
│
├── about/
│   └── page.tsx
│
├── faq/
│   └── page.tsx
│
├── shipping/
│   └── page.tsx
│
├── returns/
│   └── page.tsx
│
├── contact/
│   └── page.tsx
│
└── admin/
    ├── login/
    ├── page.tsx
    ├── products/
    ├── categories/
    ├── inventory/
    ├── orders/
    ├── customers/
    ├── coupons/
    ├── campaigns/
    ├── reviews/
    ├── cms/
    ├── seo/
    ├── media/
    ├── notifications/
    ├── analytics/
    ├── ai/
    ├── users/
    ├── roles/
    ├── audit/
    └── settings/
```

---

# 10. COMPONENT ARCHITECTURE

Create reusable components rather than duplicating page markup.

Suggested:

```text
components/
├── layout/
│   ├── Header
│   ├── MobileHeader
│   ├── Footer
│   ├── AnnouncementBar
│   ├── Navigation
│   ├── MobileMenu
│   └── PageTransition
│
├── hero/
│   ├── Hero
│   ├── HeroMedia
│   ├── HeroCopy
│   └── HeroFloatingObject
│
├── product/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductGallery
│   ├── ProductInfo
│   ├── ProductPrice
│   ├── VariantSelector
│   ├── SizeSelector
│   ├── ColorSelector
│   ├── SizeGuide
│   ├── ProductDetails
│   ├── ProductReviews
│   ├── RelatedProducts
│   └── RecentlyViewed
│
├── shopping/
│   ├── WishlistButton
│   ├── CartDrawer
│   ├── CartItem
│   ├── CartSummary
│   ├── CouponInput
│   ├── CheckoutStepper
│   ├── AddressForm
│   ├── ShippingOptions
│   ├── PaymentOptions
│   └── OrderSummary
│
├── search/
│   ├── SearchOverlay
│   ├── SearchInput
│   ├── SearchSuggestions
│   ├── SearchResults
│   └── RecentSearches
│
├── account/
│   ├── AccountSidebar
│   ├── OrderCard
│   ├── OrderTimeline
│   ├── AddressCard
│   └── NotificationItem
│
├── content/
│   ├── EditorialSection
│   ├── CollectionBanner
│   ├── Newsletter
│   ├── FAQ
│   └── RichText
│
├── ui/
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── Checkbox
│   ├── Modal
│   ├── Drawer
│   ├── Toast
│   ├── Tabs
│   ├── Badge
│   ├── Skeleton
│   ├── EmptyState
│   └── ErrorState
│
├── animation/
│   ├── Reveal
│   ├── MagneticButton
│   ├── FloatingObject
│   ├── ParallaxMedia
│   ├── CursorFollower
│   └── TextReveal
│
└── admin/
    ├── AdminShell
    ├── AdminSidebar
    ├── MetricCard
    ├── DataTable
    ├── ProductEditor
    ├── VariantEditor
    ├── InventoryTable
    ├── OrderTable
    ├── CustomerTable
    ├── AnalyticsCard
    └── AIInsightCard
```

---

# 11. GLOBAL VISUAL DIRECTION

Vastra must feel like a premium fashion brand.

The visual system should prioritize:

- large editorial typography
- strong imagery
- controlled whitespace
- intentional asymmetry where appropriate
- refined grid composition
- clean navigation
- sophisticated contrast
- premium product photography
- subtle borders
- restrained shadows
- smooth transitions
- sophisticated motion
- strong visual hierarchy

The interface should not feel like:

- an admin template
- a marketplace
- a generic Shopify clone
- a SaaS dashboard
- a bootstrap website

---

# 12. BRANDING

Brand name:

# VASTRA

Brand presentation should be:

- confident
- minimal
- fashion-forward
- premium
- masculine without being aggressive
- editorial
- modern

Logo:

- text-based Vastra wordmark is acceptable for prototype
- create a refined wordmark treatment
- avoid overly complex logo graphics

Use original Vastra branding even when following the reference's visual direction.

---

# 13. DESIGN SYSTEM

The prototype must use centralized design tokens.

Do not hardcode random values across components.

Use CSS variables for:

```text
--color-background
--color-surface
--color-foreground
--color-muted
--color-border
--color-accent
--color-success
--color-warning
--color-error

--font-display
--font-body
--font-mono

--space-1
--space-2
--space-3
...
--space-12

--radius-sm
--radius-md
--radius-lg
--radius-xl

--shadow-sm
--shadow-md
--shadow-lg

--container-max
```

Exact values must follow the established Vastra design-token file.

If a value is not defined, choose a value consistent with the reference rather than introducing a random design style.

---

# 14. TYPOGRAPHY

Typography is a major part of the premium experience.

Use:

- a refined display font for major editorial headlines
- a highly readable sans-serif for body/UI
- controlled letter spacing
- strong type hierarchy

Typography should create fashion-editorial character.

Hero headlines may be large and expressive.

Do not use oversized text merely for decoration.

Typography must remain readable on mobile.

---

# 15. RESPONSIVE REQUIREMENTS

The prototype must work at:

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

## Mobile

- mobile navigation
- touch-friendly controls
- stacked product details
- responsive product gallery
- horizontally scrollable collections where appropriate
- optimized product cards
- bottom sheets/drawers where appropriate
- simplified filters
- accessible checkout
- no horizontal overflow

## Tablet

- adaptive grid
- responsive navigation
- optimized whitespace
- appropriate image ratios

## Desktop

- editorial layout
- larger product grids
- hover interactions
- full navigation
- richer animation
- floating visual objects
- side-by-side PDP layouts

Never simply scale desktop down to mobile.

---

# 16. SMOOTH SCROLLING

Lenis is mandatory.

Implement:

```text
Lenis
   ↓
requestAnimationFrame
   ↓
GSAP
   ↓
ScrollTrigger
```

Requirements:

- smooth scrolling
- ScrollTrigger synchronization
- no scroll jitter
- no double-scroll behavior
- no broken anchor navigation
- correct cleanup
- respect reduced-motion preference

Smooth scrolling must enhance the experience rather than make the page feel slow.

---

# 17. GSAP ANIMATION SYSTEM

GSAP is the primary animation engine.

Use GSAP for:

- page entrance
- hero reveal
- text reveal
- image reveal
- staggered product cards
- navigation transitions
- modal/drawer transitions
- cart drawer
- search overlay
- product image transitions
- hover interactions where appropriate
- magnetic buttons
- floating objects
- parallax
- ScrollTrigger sections
- route transition effects
- confirmation animation

Avoid animation on every element.

---

# 18. SCROLLTRIGGER

ScrollTrigger should be used for major storytelling sections.

Examples:

### Hero

- text enters progressively
- image moves subtly
- floating elements move at different speeds

### Editorial sections

- image reveal
- text reveal
- horizontal movement where appropriate
- subtle parallax

### Product grids

- cards reveal in staggered groups
- hover remains responsive after reveal

### Category sections

- image scale/position transitions
- typography reveal

Animation must remain performant.

---

# 19. 3D / FLOATING OBJECTS

Use GSAP to create subtle 3D-feeling visual objects.

Possible objects:

- floating product cutouts
- abstract shapes
- oversized typography fragments
- fashion-related geometric objects
- floating tags
- product accessories

Implementation may use:

```css
perspective
transform-style: preserve-3d
translate3d
rotateX
rotateY
rotateZ
```

and GSAP timelines.

Do not add 3D elements merely because they are technically possible.

They must support the visual composition.

---

# 20. MICRO-INTERACTION REQUIREMENTS

The prototype must feel alive.

Required interactions include:

### Buttons

- hover movement
- subtle scale
- text movement
- arrow/icon movement
- active state
- press state

### Product cards

- image transition
- alternate image on hover where available
- product metadata movement
- wishlist icon response
- subtle image zoom

### Navigation

- active underline or visual indicator
- menu reveal
- submenu transitions
- cursor response

### Wishlist

- icon animation
- confirmation feedback

### Cart

- add-to-cart confirmation
- cart count update
- cart drawer animation

### Search

- search overlay transition
- suggestion appearance
- query feedback

### Forms

- focus transitions
- validation feedback
- success states

### Checkout

- step transitions
- selected payment state
- confirmation animation

---

# 21. MOUSE INTERACTIONS

Desktop experience should include refined mouse interactions.

Possible interactions:

- custom cursor follower
- cursor enlargement over interactive elements
- magnetic CTA
- image cursor preview
- subtle product-card tilt
- hover media reveal

Rules:

- never block clicking
- never reduce readability
- never make the interface feel like a game
- disable or simplify on touch devices
- respect reduced motion

---

# 22. PAGE TRANSITIONS

Navigation should feel intentional.

Use GSAP for:

```text
Current Page
     ↓
transition out
     ↓
route change
     ↓
new page reveal
```

Do not create long transitions that delay navigation.

Target transition duration:

```text
~400ms–900ms
```

depending on context.

---

# 23. GLOBAL HEADER

Desktop header should include:

- Vastra wordmark
- primary navigation
- Shop
- Collections
- New Arrivals
- Essentials
- Search
- Account
- Wishlist
- Cart

The exact arrangement should follow the visual rhythm of the supplied reference.

Header behavior:

- transparent/overlay when appropriate
- transitions into a compact state on scroll where visually appropriate
- subtle background transition
- smooth mobile transformation

---

# 24. MOBILE NAVIGATION

Mobile header:

- Vastra logo
- menu button
- search
- cart

Mobile menu:

- full-screen or large drawer
- animated reveal
- category navigation
- collections
- account
- wishlist
- support

Use GSAP.

---

# 25. HOMEPAGE

Route:

```text
/
```

## Required Sections

### 25.1 Hero

Hero must be the strongest visual section.

Include:

- fashion imagery
- editorial headline
- short brand message
- CTA
- secondary CTA where appropriate
- subtle floating visual element
- animated entrance
- scroll cue

### 25.2 Featured Products

Show selected oversized T-shirts.

Each product:

- image
- name
- price
- original price if applicable
- badge
- wishlist
- hover behavior

### 25.3 Categories

Example:

- Oversized T-Shirts
- Graphic Tees
- Minimal Tees
- Essentials

### 25.4 New Arrivals

Editorial product presentation.

### 25.5 Best Sellers

Show high-interest products.

### 25.6 Editorial Brand Section

Large image + storytelling copy.

### 25.7 Recommendation Section

Mock personalized section:

> Picked for your style

### 25.8 Reviews

Selected customer reviews.

### 25.9 Newsletter

Premium email signup.

### 25.10 Footer

Include:

- shop
- collections
- support
- policies
- account
- social
- newsletter
- copyright

---

# 26. SHOP / PRODUCT LISTING

Routes:

```text
/shop
/shop/oversized-t-shirts
/shop/graphic-tees
/shop/minimal-tees
/shop/essentials
```

Required:

- category title
- description
- product count
- filters
- sort
- search
- product grid
- pagination/load-more prototype behavior

Product card:

```text
Image
Badge
Wishlist
Product Name
Color
Price
Original Price
Discount
```

Hover:

- image swap
- image zoom
- quick-add where appropriate
- metadata transition

---

# 27. FILTERS

Filters:

- category
- price
- size
- color
- fit
- availability
- collection

Desktop:

- sidebar or reference-inspired filter structure

Mobile:

- filter drawer/sheet

Filter interactions must be animated.

---

# 28. SEARCH

Routes:

```text
/search
/search?q=oversized
```

Search should include:

- input
- recent searches
- suggested searches
- popular searches
- matching products
- categories
- empty state
- no-results state
- loading state

Example:

```text
oversized black t-shirt
```

should produce matching mock products.

---

# 29. AI SEARCH PROTOTYPE

Include a premium AI search experience.

Example:

> "Show me oversized black tees under ₹2000 with minimal graphics."

The prototype can convert this into mock filters:

```text
Category: Oversized T-Shirts
Color: Black
Price: < ₹2000
Style: Minimal
```

The prototype must visually communicate the production concept:

```text
User query
   ↓
AI interpretation
   ↓
Catalog search
   ↓
Results
```

Do not fabricate impossible product information.

---

# 30. PRODUCT DETAIL PAGE

Route:

```text
/product/[slug]
```

This is one of the most important screens.

Required:

- product gallery
- main image
- thumbnails
- product name
- price
- discount
- availability
- color
- size
- size guide
- quantity
- add to cart
- buy now
- wishlist
- product description
- highlights
- specifications
- shipping information
- return information
- reviews
- related products
- recently viewed
- recommendation section

---

# 31. PRODUCT GALLERY

Desktop:

- large primary image
- supporting images
- hover/interaction
- thumbnail navigation

Mobile:

- swipe gallery
- image counter
- smooth transitions

Animation:

- image fade/scale
- thumbnail active transition

---

# 32. PRODUCT VARIANTS

Prototype hierarchy:

```text
Product
   ↓
Variant
   ↓
Color
   ↓
Size
   ↓
SKU
```

Example:

```text
Vastra Heavy Oversized Tee

Black
XS / S / M / L / XL

White
XS / S / M / L / XL

Olive
XS / S / M / L / XL
```

The selected variant must update:

- image
- price if applicable
- availability
- SKU display where shown

---

# 33. SIZE GUIDE

Size guide modal/drawer.

Include:

- XS
- S
- M
- L
- XL
- measurements
- fit description
- model sizing note

Animation must use GSAP.

---

# 34. WISHLIST

Route:

```text
/wishlist
```

Functions:

- add
- remove
- view
- move to cart
- empty state

Wishlist interactions must have feedback.

Example empty state:

> Your saved pieces will appear here.

---

# 35. CART

Route:

```text
/cart
```

Also provide:

```text
Cart Drawer
```

Cart includes:

- product
- variant
- size
- quantity
- unit price
- discount
- subtotal
- shipping
- total

Prototype calculations should be deterministic.

Frontend should visually communicate that production pricing would be authoritative on the backend.

---

# 36. CART DRAWER

Add-to-cart should open or update a cart drawer.

Animation:

```text
Product
   ↓
Add
   ↓
Button feedback
   ↓
Cart count animation
   ↓
Cart drawer reveal
```

Cart drawer must support:

- quantity
- remove
- subtotal
- checkout CTA
- continue shopping

---

# 37. CHECKOUT

Route:

```text
/checkout
```

Prototype flow:

```text
Address
   ↓
Shipping
   ↓
Coupon
   ↓
Payment
   ↓
Review
   ↓
Confirmation
```

The prototype may implement this as one page with step state or a visually unified checkout experience.

---

# 38. ADDRESS

Include:

- name
- phone
- address line
- city
- state
- postal code
- country

Support:

- saved address
- add address
- edit
- select

Validation must be visible.

---

# 39. SHIPPING

Prototype options:

```text
Standard Delivery
Free
3–5 business days

Express Delivery
₹99
1–2 business days
```

Selection must update order summary.

---

# 40. COUPON

Prototype coupons:

```text
VASTRA10
NEWUSER
FRESH20
```

Include:

- input
- apply
- success
- invalid
- remove

The frontend should simulate backend validation.

---

# 41. PAYMENT

Payment methods may include:

- UPI
- Card
- Net Banking
- Wallet
- Cash on Delivery

This is a simulation only.

Do not collect real payment credentials.

For card UI, use safe mock fields or masked sample placeholders and clearly keep the interaction non-production.

---

# 42. ORDER REVIEW

Show:

- items
- variants
- address
- shipping
- discount
- tax placeholder if represented
- final total
- payment method
- terms acceptance
- place order

Use a clear primary CTA.

---

# 43. ORDER CONFIRMATION

Route:

```text
/order/[orderId]/confirmation
```

Show:

- success state
- order number
- order summary
- delivery estimate
- address
- payment status
- continue shopping
- view order

Use a premium GSAP confirmation animation.

---

# 44. ACCOUNT

Route:

```text
/account
```

Include:

- overview
- profile
- addresses
- orders
- wishlist
- notifications
- reviews
- support

---

# 45. AUTHENTICATION

Routes:

```text
/login
/register
```

Prototype behavior:

- login
- register
- logout
- forgot password UI
- simulated authentication state

No production auth is required.

Forms must have:

- validation
- loading state
- error state
- success state

---

# 46. ORDERS

Route:

```text
/account/orders
```

Order cards:

- order number
- date
- product
- amount
- status
- view details

---

# 47. ORDER DETAILS / TRACKING

Route:

```text
/order/[orderId]
```

Timeline:

```text
Order Placed
     ↓
Confirmed
     ↓
Processing
     ↓
Shipped
     ↓
Out for Delivery
     ↓
Delivered
```

Use GSAP for milestone reveal.

---

# 48. CANCELLATION

Provide a prototype cancellation interaction.

Show:

- cancellation eligibility
- cancellation reason
- confirmation
- success state

Do not allow arbitrary cancellation for every simulated status.

---

# 49. RETURNS

Provide:

```text
Return Request
```

Include:

- product
- reason
- optional comment
- submit
- confirmation

States:

```text
REQUESTED
APPROVED
REJECTED
PICKUP
RECEIVED
```

---

# 50. REFUNDS

Show:

```text
Refund Initiated
Refund Processing
Refund Completed
```

Display:

- amount
- payment method
- date
- status

---

# 51. REVIEWS

Review UI:

- star rating
- text
- optional image
- verified purchase indicator
- date
- helpful interaction

Prototype review form must include validation.

---

# 52. NOTIFICATIONS

Include notification center.

Examples:

- order confirmed
- order shipped
- delivery update
- refund update
- promotion
- new collection

---

# 53. CONTENT PAGES

Create:

```text
/about
/faq
/shipping
/returns
/contact
```

These pages should remain within the same Vastra design system.

---

# 54. COLLECTIONS

Route:

```text
/collections
/collections/[slug]
```

Collections may include:

- Essentials
- Street
- Minimal
- Graphic
- New Season

Collection pages should use editorial layouts rather than simple grids only.

---

# 55. RECOMMENDATIONS

Prototype recommendation sections:

```text
You May Also Like
Picked For You
Complete The Look
Recently Viewed
Trending Now
```

Recommendation data is mocked.

---

# 56. ADMIN PROTOTYPE

The admin prototype is included to validate the complete platform experience.

It should use the same Vastra visual language but may use a more information-dense layout.

Do not use a generic dashboard template.

---

# 57. ADMIN LOGIN

Route:

```text
/admin/login
```

Prototype only.

Include:

- email
- password
- login
- error
- loading

---

# 58. ADMIN DASHBOARD

Route:

```text
/admin
```

Metrics:

- revenue
- orders
- customers
- conversion
- AOV
- top products
- low stock
- refunds
- cart abandonment

Include:

- sales chart
- top products
- inventory alerts
- recent orders
- recent customer activity
- AI insights

---

# 59. ADMIN PRODUCTS

Route:

```text
/admin/products
```

Features:

- product table
- search
- filter
- status
- category
- price
- inventory
- actions

---

# 60. PRODUCT EDITOR

Route:

```text
/admin/products/[id]
```

Include:

- product name
- slug
- description
- images
- category
- collection
- pricing
- variants
- SEO
- publish state

---

# 61. VARIANT / SKU EDITOR

Include:

- color
- size
- SKU
- price
- stock
- status
- image association

Represent:

```text
Product
   ↓
Variant
   ↓
SKU
   ↓
Inventory
```

---

# 62. INVENTORY

Route:

```text
/admin/inventory
```

Show:

- SKU
- product
- variant
- available
- reserved
- sold
- low-stock status

---

# 63. ADMIN ORDERS

Route:

```text
/admin/orders
```

Show:

- order ID
- customer
- amount
- payment
- order status
- shipping status
- date

Order detail should visually show the order lifecycle.

---

# 64. CUSTOMERS

Route:

```text
/admin/customers
```

Show:

- customer
- email
- orders
- spend
- status
- recent activity

---

# 65. COUPONS AND CAMPAIGNS

Routes:

```text
/admin/coupons
/admin/campaigns
```

Prototype CRUD-like interfaces:

- list
- create
- edit
- status
- dates
- usage limits

---

# 66. REVIEWS MODERATION

Route:

```text
/admin/reviews
```

Show:

- rating
- review
- product
- customer
- verified purchase
- status

Actions:

- approve
- reject
- flag

---

# 67. CMS

Route:

```text
/admin/cms
```

Content:

- homepage sections
- banners
- hero content
- promotions
- FAQ
- static pages

CMS should manage content, not the core presentation system.

---

# 68. SEO

Route:

```text
/admin/seo
```

Show:

- page
- SEO title
- description
- slug
- canonical
- indexing state

---

# 69. MEDIA

Route:

```text
/admin/media
```

Show:

- product images
- banners
- editorial images
- upload UI
- search/filter

Prototype upload can be simulated.

---

# 70. NOTIFICATIONS ADMIN

Route:

```text
/admin/notifications
```

Show:

- event
- channel
- status
- template
- recent sends

---

# 71. ANALYTICS

Route:

```text
/admin/analytics
```

Show:

- sales
- orders
- conversion
- AOV
- product performance
- customer activity
- returns
- refunds
- cart abandonment

Charts may use mock data.

---

# 72. AI ADMIN INSIGHTS

Route:

```text
/admin/ai
```

Prototype cards:

- products needing restock review
- sales trends
- review sentiment
- product performance
- customer behavior insights

The UI must label AI output as decision support.

---

# 73. AI PRODUCT CONTENT

Inside product editor:

```text
Generate Description
Generate Highlights
Generate SEO Title
Generate SEO Description
```

Prototype flow:

```text
Product data
   ↓
Generate
   ↓
AI draft
   ↓
Review
   ↓
Approve
```

---

# 74. USERS / ROLES / PERMISSIONS

Routes:

```text
/admin/users
/admin/roles
```

Represent:

```text
ADMIN
MANAGER
PRODUCT_MANAGER
ORDER_MANAGER
```

Prototype only.

---

# 75. AUDIT LOG

Route:

```text
/admin/audit
```

Example entries:

```text
Product updated
Price changed
Inventory adjusted
Order status changed
Review approved
Admin role updated
```

---

# 76. SETTINGS

Route:

```text
/admin/settings
```

Sections:

- store settings
- branding
- notifications
- checkout
- shipping
- payment display
- account
- security display

Prototype only.

---

# 77. MOCK DATA ARCHITECTURE

Keep all prototype data centralized.

Suggested:

```text
data/
├── products.ts
├── categories.ts
├── collections.ts
├── users.ts
├── orders.ts
├── reviews.ts
├── coupons.ts
├── notifications.ts
├── analytics.ts
└── admin.ts
```

Do not hardcode product objects separately inside multiple pages.

---

# 78. PRODUCT DATA MODEL

Each mock product should resemble:

```ts
{
  id,
  slug,
  name,
  description,
  category,
  collection,
  images,
  price,
  compareAtPrice,
  discount,
  rating,
  reviewCount,
  colors,
  sizes,
  variants,
  badges,
  stock,
  sku,
  material,
  fit,
  specifications
}
```

Each variant should contain:

```ts
{
  id,
  color,
  size,
  sku,
  price,
  stock,
  image
}
```

---

# 79. REQUIRED PRODUCT CATALOG

Create enough realistic mock products to make the prototype feel like a real store.

Minimum:

- 12–20 products
- multiple colors
- multiple sizes
- multiple collections
- sale products
- new products
- best sellers
- low-stock examples
- out-of-stock examples

Avoid generic names such as:

```text
Product 1
Product 2
Test Shirt
Demo Product
```

Use premium fashion-style product names.

---

# 80. PRODUCT IMAGERY

Product imagery is critical.

Use:

- high-quality apparel images
- consistent framing
- consistent lighting
- fashion-editorial imagery
- product cutouts where appropriate
- lifestyle imagery for editorial sections

Do not use low-quality random stock imagery.

If images must be generated, they should follow the established Vastra visual direction and be consistent across the catalog.

---

# 81. IMAGE BEHAVIOR

Use:

- Next.js Image
- responsive sizes
- lazy loading where appropriate
- priority for above-the-fold hero imagery
- aspect-ratio containers
- graceful fallback

Do not distort products.

---

# 82. LOADING STATES

Required:

- homepage loading
- product grid skeleton
- product detail loading
- search loading
- cart loading
- checkout loading
- admin table loading

Skeletons must follow the actual component geometry.

---

# 83. EMPTY STATES

Required:

### Empty Cart

> Your cart is waiting for something good.

### Empty Wishlist

> Save pieces you want to come back to.

### Empty Search

> No pieces matched your search.

### No Orders

> Your orders will appear here.

### No Notifications

> You're all caught up.

Empty states must feel designed, not like error messages.

---

# 84. ERROR STATES

Include:

- product unavailable
- network simulation failure
- search failure
- invalid coupon
- checkout validation error
- payment failure
- login failure
- admin unauthorized UI

Errors should be recoverable where possible.

---

# 85. OUT-OF-STOCK STATE

Product cards and PDP must visually communicate:

```text
OUT OF STOCK
```

Do not allow add-to-cart for unavailable variants.

Possible CTA:

> Notify Me

Prototype notification action may simply show confirmation.

---

# 86. ACCESSIBILITY

The prototype must include:

- semantic HTML
- keyboard navigation
- visible focus
- accessible labels
- adequate contrast
- alt text
- logical tab order
- button semantics
- form labels
- modal focus handling
- ESC close behavior
- reduced-motion support

---

# 87. REDUCED MOTION

Respect:

```text
prefers-reduced-motion
```

When enabled:

- disable large parallax
- disable cursor effects
- reduce transitions
- simplify floating objects
- remove unnecessary motion

Core functionality must remain unchanged.

---

# 88. PERFORMANCE

The premium experience must not become a performance-heavy experience.

Requirements:

- optimize images
- lazy-load below-fold media
- minimize unnecessary client components
- avoid excessive DOM animation
- use GSAP selectively
- clean up GSAP contexts
- avoid layout thrashing
- avoid huge JavaScript bundles
- use server components where appropriate
- use client components only for interactive features

---

# 89. CLIENT / SERVER COMPONENT RULE

Use Server Components by default.

Use Client Components only where required for:

- interaction
- state
- GSAP
- Lenis
- browser APIs
- forms
- drawers
- modals
- cart
- wishlist
- filters
- search interaction

Do not make the entire application a single client component.

---

# 90. ANIMATION IMPLEMENTATION RULES

Every animation must have:

- purpose
- duration
- easing
- trigger
- responsive behavior
- reduced-motion behavior

Preferred principles:

```text
Fast UI interaction
↓
Medium content transition
↓
Slower editorial storytelling
```

Avoid:

- infinite unnecessary animations
- excessive bouncing
- aggressive scaling
- distracting rotation
- animation on every scroll pixel

---

# 91. PREMIUM INTERACTION DETAILS

The prototype should include subtle details such as:

- image clipping reveals
- text line reveals
- magnetic CTA
- cursor-following image preview
- button arrow movement
- product image hover
- cart count transition
- wishlist pulse
- smooth modal opening
- filter drawer slide
- sticky PDP information
- scroll-progress indicators
- subtle parallax
- section reveal
- animated underline
- image mask transition

Use restraint.

---

# 92. ROUTE MAP

## Customer

```text
/
 /shop
 /shop/oversized-t-shirts
 /shop/graphic-tees
 /shop/minimal-tees
 /shop/essentials
 /collections
 /collections/[slug]
 /search
 /product/[slug]
 /wishlist
 /cart
 /checkout
 /order/[orderId]/confirmation
 /order/[orderId]
 /account
 /account/profile
 /account/addresses
 /account/orders
 /account/wishlist
 /account/notifications
 /account/reviews
 /login
 /register
 /about
 /faq
 /shipping
 /returns
 /contact
```

## Admin

```text
/admin/login
/admin
/admin/products
/admin/products/[id]
/admin/categories
/admin/inventory
/admin/orders
/admin/orders/[id]
/admin/customers
/admin/coupons
/admin/campaigns
/admin/reviews
/admin/cms
/admin/seo
/admin/media
/admin/notifications
/admin/analytics
/admin/ai
/admin/users
/admin/roles
/admin/audit
/admin/settings
```

---

# 93. CUSTOMER JOURNEY

The main happy path must work from beginning to end:

```text
Homepage
 ↓
Shop
 ↓
Product Listing
 ↓
Product Details
 ↓
Select Color
 ↓
Select Size
 ↓
Add to Cart
 ↓
Cart Drawer
 ↓
Cart
 ↓
Checkout
 ↓
Address
 ↓
Shipping
 ↓
Coupon
 ↓
Payment
 ↓
Review
 ↓
Place Order
 ↓
Confirmation
 ↓
Order Details
 ↓
Tracking
```

---

# 94. SECONDARY CUSTOMER JOURNEYS

## Wishlist

```text
Shop
 ↓
Wishlist
 ↓
Product
 ↓
Add to Cart
```

## Search

```text
Search
 ↓
Query
 ↓
Suggestions
 ↓
Results
 ↓
Product
```

## Return

```text
Account
 ↓
Orders
 ↓
Order Detail
 ↓
Return
 ↓
Reason
 ↓
Submit
 ↓
Return Status
```

## Review

```text
Order
 ↓
Delivered Product
 ↓
Write Review
 ↓
Rating
 ↓
Text
 ↓
Submit
```

---

# 95. ADMIN JOURNEY

```text
Admin Login
 ↓
Dashboard
 ↓
Products
 ↓
Product
 ↓
Edit
 ↓
Variant
 ↓
SKU
 ↓
Inventory
```

Additional:

```text
Orders
 ↓
Order Detail
 ↓
Status
```

and:

```text
Reviews
 ↓
Moderation
 ↓
Approve
```

and:

```text
Analytics
 ↓
AI Insights
```

---

# 96. STATE MATRIX

Every major screen should consider:

| Screen | Loading | Empty | Error | Success | Disabled |
|---|---|---|---|---|---|
| Home | Yes | N/A | Yes | Yes | N/A |
| Shop | Yes | Yes | Yes | Yes | Yes |
| Search | Yes | Yes | Yes | Yes | Yes |
| PDP | Yes | Yes | Yes | Yes | Yes |
| Wishlist | Yes | Yes | Yes | Yes | Yes |
| Cart | Yes | Yes | Yes | Yes | Yes |
| Checkout | Yes | N/A | Yes | Yes | Yes |
| Orders | Yes | Yes | Yes | Yes | N/A |
| Reviews | Yes | Yes | Yes | Yes | Yes |
| Admin Tables | Yes | Yes | Yes | Yes | Yes |

---

# 97. PROTOTYPE PHASES

## Phase 1 — Visual Foundation

Build first:

- global tokens
- typography
- header
- footer
- buttons
- product card
- image system
- GSAP foundation
- Lenis
- responsive system

## Phase 2 — Homepage

Build:

- hero
- featured products
- categories
- editorial
- new arrivals
- reviews
- newsletter
- footer

## Phase 3 — Shopping

Build:

- shop
- filters
- search
- product detail
- variants
- size guide
- wishlist
- cart

## Phase 4 — Checkout

Build:

- address
- shipping
- coupon
- payment
- review
- confirmation

## Phase 5 — Account

Build:

- login
- register
- account
- orders
- tracking
- cancellation
- returns
- refunds
- reviews

## Phase 6 — Content

Build:

- collections
- about
- FAQ
- shipping
- returns
- contact

## Phase 7 — Admin

Build:

- admin login
- dashboard
- products
- inventory
- orders
- customers
- marketing
- reviews
- CMS
- analytics
- AI
- users
- settings

## Phase 8 — Polish

Perform:

- visual fidelity pass
- animation pass
- responsive pass
- accessibility pass
- interaction pass
- loading/error/empty state pass
- performance pass

---

# 98. PROTOTYPE INTERACTION PRINCIPLE

The prototype must be genuinely interactive.

It must not be a collection of static screenshots.

Examples:

- navigation works
- search works
- filters work
- sorting works
- product cards open PDP
- wishlist changes
- cart changes
- quantities change
- checkout progresses
- coupon responds
- payment method changes
- order gets generated
- account updates
- tracking changes
- return request changes state
- review submission works
- admin navigation works
- dashboard filters can respond
- AI mock interactions produce visible output

---

# 99. DATA FLOW

Use mock services to imitate future APIs.

Suggested:

```text
lib/
├── mock-api/
│   ├── products.ts
│   ├── cart.ts
│   ├── wishlist.ts
│   ├── checkout.ts
│   ├── orders.ts
│   └── admin.ts
```

The UI should consume functions/services rather than directly manipulating raw data everywhere.

This makes future API integration easier.

---

# 100. PRODUCTION MIGRATION FRIENDLINESS

Although this is a prototype, avoid architecture that makes production migration difficult.

Do:

```text
UI
 ↓
Frontend Service
 ↓
Mock Data
```

Later:

```text
UI
 ↓
Frontend Service
 ↓
Real API
 ↓
Backend
```

Do not couple every component directly to mock arrays.

---

# 101. SEO-READY STRUCTURE

Even though this is a prototype, implement Next.js metadata where appropriate.

Include:

- title
- description
- product metadata
- canonical structure where applicable
- semantic headings

Use clean slugs.

---

# 102. SEO-FRIENDLY ROUTES

Use:

```text
/product/vastra-heavyweight-oversized-tee
```

not:

```text
/product?id=123
```

where route design permits.

---

# 103. DESIGN CONSISTENCY RULE

A component must look consistent wherever reused.

For example:

`ProductCard` must not have five unrelated versions.

Create controlled variants:

```text
ProductCard
ProductCardCompact
ProductCardEditorial
```

only when genuinely required.

---

# 104. ADMIN DESIGN RULE

Admin may be more functional than storefront, but it must still look like Vastra.

Do not paste a generic admin template.

Use:

- Vastra typography
- Vastra spacing
- Vastra color system
- restrained borders
- refined tables
- premium empty states
- polished interactions

---

# 105. MOBILE ADMIN

Admin must be usable on smaller screens.

For dense tables:

- responsive cards
- horizontal scrolling where appropriate
- stacked details
- drawers
- responsive filters

Do not create unreadable desktop tables on mobile.

---

# 106. SECURITY REPRESENTATION

Because this is a prototype:

Do not claim that mock authentication or mock checkout is production secure.

Clearly separate:

```text
Prototype simulation
```

from:

```text
Production security
```

The UI should nevertheless model production concepts such as:

- authentication
- authorization
- validation
- payment states
- order states
- backend authority

---

# 107. FRONTEND AUTHORITY RULE

The prototype should visually preserve the production principle:

> The frontend is not the source of truth.

Therefore:

- prices should come from centralized mock product data
- discounts should be calculated centrally
- cart totals should be calculated centrally
- coupon rules should be centralized
- stock should be centralized
- order status should be controlled by mock service logic

This makes the prototype behavior closer to production architecture.

---

# 108. FAILURE SIMULATION

Add a simple development/demo mechanism to simulate:

- product unavailable
- coupon invalid
- payment failed
- network error
- empty results
- out-of-stock

This is useful for validating UI states.

---

# 109. DESIGN QUALITY BAR

Before considering a screen complete, verify:

### Visual

- Does it feel premium?
- Does it match the reference direction?
- Is whitespace intentional?
- Is typography refined?
- Are images high quality?
- Are alignments consistent?

### Interaction

- Does every CTA provide feedback?
- Are hover states polished?
- Are transitions smooth?
- Is motion purposeful?

### Responsive

- Does it work at 320px?
- Does it work at 390px?
- Does it work at 768px?
- Does it work at 1440px?

### Accessibility

- Can it be keyboard operated?
- Are labels present?
- Is focus visible?
- Is reduced motion respected?

---

# 110. ANIMATION QUALITY GATE

Animation is considered complete only when:

- Lenis is smooth
- ScrollTrigger is synchronized
- no visible jitter exists
- no animation causes horizontal overflow
- no layout shift is caused unnecessarily
- mobile motion is controlled
- reduced motion works
- route transitions do not trap navigation
- hover interactions do not break touch behavior
- GSAP contexts are cleaned up correctly

---

# 111. IMAGE QUALITY GATE

Do not accept:

- inconsistent image dimensions
- low-resolution product imagery
- distorted clothing
- unrelated model styling
- inconsistent backgrounds without design purpose
- obvious placeholder stock images

The catalog should look like one coherent fashion campaign.

---

# 112. NO PLACEHOLDER UI RULE

Do not leave:

```text
Lorem ipsum
Product 1
Image placeholder
Test text
Button
Card
```

in the final prototype.

All visible content should look intentional.

---

# 113. NO GENERIC TEMPLATE RULE

If a component generated by a UI library conflicts with the Vastra visual direction:

**customize or replace it.**

The goal is not:

> "A functional Next.js store."

The goal is:

> "A premium Vastra fashion experience implemented in Next.js."

---

# 114. FINAL PROTOTYPE SCREEN INVENTORY

## P0 — Critical

```text
Homepage
Shop
Product Listing
Search
Product Detail
Size Guide
Wishlist
Cart
Checkout
Order Confirmation
Login
Register
Account
Orders
Order Details
Tracking
```

## P1 — Important

```text
Collections
About
FAQ
Shipping
Returns
Contact
Review Flow
Return Request
Refund Status
Notifications
Mobile Navigation
Search Empty
Search Error
Cart Empty
Wishlist Empty
Out of Stock
```

## P2 — Admin

```text
Admin Login
Admin Dashboard
Products
Product Editor
Categories
Variants
SKU Editor
Inventory
Orders
Order Details
Customers
Coupons
Campaigns
Reviews
CMS
SEO
Media
Notifications
Analytics
AI Insights
Users
Roles
Audit
Settings
```

---

# 115. ACCEPTANCE CRITERIA

The prototype is accepted only when all of the following are true.

## Technology

- [ ] Next.js is used as the primary framework.
- [ ] TypeScript is used.
- [ ] App Router is used.
- [ ] GSAP is integrated.
- [ ] ScrollTrigger is integrated.
- [ ] Lenis is integrated.
- [ ] No competing animation framework is required.

## Visual

- [ ] Dribbble reference direction is clearly reflected.
- [ ] Vastra branding is applied.
- [ ] Product imagery is coherent.
- [ ] Typography is premium.
- [ ] Spacing is intentional.
- [ ] The result does not look like a generic e-commerce template.

## Animation

- [ ] Hero animations work.
- [ ] ScrollTrigger sections work.
- [ ] Product hover interactions work.
- [ ] Cart interactions are animated.
- [ ] Wishlist interaction is animated.
- [ ] Search transition works.
- [ ] Modal/drawer transitions work.
- [ ] Checkout transitions work.
- [ ] Order confirmation has polished motion.
- [ ] Reduced-motion mode works.

## Shopping

- [ ] Products can be browsed.
- [ ] Search works.
- [ ] Filters work.
- [ ] Product detail works.
- [ ] Variants work.
- [ ] Size guide works.
- [ ] Wishlist works.
- [ ] Cart works.
- [ ] Checkout works.
- [ ] Coupon works.
- [ ] Payment selection works.
- [ ] Order confirmation works.
- [ ] Order tracking works.

## Account

- [ ] Login works as a simulation.
- [ ] Register works as a simulation.
- [ ] Profile works.
- [ ] Addresses work.
- [ ] Orders work.
- [ ] Reviews work.
- [ ] Notifications work.

## Post-Purchase

- [ ] Cancellation state works.
- [ ] Return request works.
- [ ] Refund status works.
- [ ] Review submission works.

## Admin

- [ ] Admin login works as a simulation.
- [ ] Dashboard works.
- [ ] Products work.
- [ ] Product editor works.
- [ ] Variants/SKUs work.
- [ ] Inventory works.
- [ ] Orders work.
- [ ] Customers work.
- [ ] Marketing works.
- [ ] Reviews work.
- [ ] CMS works.
- [ ] Analytics works.
- [ ] AI insight UI works.
- [ ] Users/roles work.
- [ ] Audit log works.
- [ ] Settings work.

## Responsive

- [ ] 320px works.
- [ ] 375px works.
- [ ] 390px works.
- [ ] 430px works.
- [ ] 768px works.
- [ ] 1024px works.
- [ ] 1280px works.
- [ ] 1440px works.
- [ ] No unintended horizontal scrolling exists.

## States

- [ ] Loading states exist.
- [ ] Empty states exist.
- [ ] Error states exist.
- [ ] Success states exist.
- [ ] Disabled states exist.
- [ ] Out-of-stock state exists.

---

# 116. ANTIGRAVITY IMPLEMENTATION RULES

Antigravity must follow these rules while building the prototype.

### Rule 1

**Do not simplify the scope without explicit approval.**

### Rule 2

**Do not replace Next.js.**

### Rule 3

**Do not replace GSAP with Framer Motion or another animation framework.**

### Rule 4

**Do not replace Lenis with another smooth-scroll library.**

### Rule 5

**Do not turn the prototype into a generic Tailwind storefront.**

### Rule 6

**Do not remove responsive requirements.**

### Rule 7

**Do not remove admin screens merely because the prototype is frontend-only.**

### Rule 8

**Do not use random placeholder content in the final prototype.**

### Rule 9

**Do not use excessive animation merely to demonstrate GSAP.**

### Rule 10

**Do not make every component a Client Component.**

### Rule 11

**Do not hardcode duplicated product data into individual screens.**

### Rule 12

**Do not silently change route naming.**

### Rule 13

**Do not introduce unrelated visual styles.**

### Rule 14

**Do not treat the Dribbble reference as optional inspiration.**

The reference is a major visual constraint for this prototype.

### Rule 15

When a visual decision is unclear:

1. inspect the supplied reference
2. inspect Vastra design tokens
3. follow this PRD
4. preserve the premium fashion direction
5. avoid generic e-commerce conventions

---

# 117. IMPLEMENTATION ORDER

Antigravity should build in this order:

```text
1. Project initialization
2. Design tokens
3. Typography
4. Global CSS
5. Lenis
6. GSAP infrastructure
7. Header
8. Footer
9. Buttons / Inputs / UI primitives
10. Product Card
11. Homepage
12. Shop
13. Search
14. Product Detail
15. Wishlist
16. Cart
17. Checkout
18. Confirmation
19. Auth
20. Account
21. Orders / Tracking
22. Returns / Refunds / Reviews
23. Content pages
24. Admin shell
25. Admin dashboard
26. Admin catalog
27. Admin inventory
28. Admin orders
29. Admin customers
30. Admin marketing
31. Admin reviews
32. Admin CMS
33. Admin analytics
34. Admin AI
35. Admin users / roles
36. Admin settings
37. Responsive pass
38. Animation pass
39. Accessibility pass
40. Performance pass
41. Final visual-fidelity pass
```

---

# 118. FINAL VISUAL-FIDELITY PASS

Before declaring completion, compare the implemented prototype against the supplied Dribbble reference.

Review:

- composition
- spacing
- typography
- image treatment
- navigation
- hierarchy
- product presentation
- section rhythm
- visual density
- hover behavior
- transitions
- overall premium feel

If the result looks like a generic e-commerce website, the implementation is **not complete**.

---

# 119. FINAL USER EXPERIENCE STANDARD

The final prototype should feel:

```text
Premium
Editorial
Fashion-first
Modern
Smooth
Interactive
Confident
Responsive
Polished
Intentional
```

It should not feel:

```text
Generic
Template-based
Over-animated
Cluttered
Cheap
Unfinished
Static
Dashboard-like
```

---

# 120. FINAL DEFINITION OF DONE

The Vastra prototype is complete when a user can open the Next.js application and experience a coherent premium fashion-commerce journey:

```text
LANDING
  ↓
DISCOVER
  ↓
BROWSE
  ↓
SEARCH
  ↓
VIEW PRODUCT
  ↓
SELECT VARIANT
  ↓
WISHLIST / CART
  ↓
CHECKOUT
  ↓
PAYMENT SIMULATION
  ↓
ORDER CONFIRMATION
  ↓
TRACK ORDER
  ↓
REVIEW / RETURN
```

while also being able to explore:

```text
ADMIN
  ↓
DASHBOARD
  ↓
CATALOG
  ↓
INVENTORY
  ↓
ORDERS
  ↓
CUSTOMERS
  ↓
MARKETING
  ↓
REVIEWS
  ↓
CMS
  ↓
ANALYTICS
  ↓
AI INSIGHTS
  ↓
USERS / ROLES
```

The complete experience must be:

- Next.js-first
- GSAP-powered
- ScrollTrigger-powered
- Lenis-powered
- responsive
- accessible
- interactive
- visually premium
- reference-driven
- production-migration-friendly
- internally consistent

---

# 121. SOURCE REFERENCES

The functional scope of this prototype is derived from:

**Production_Ready_Ecommerce_Application_2026.md**

Important source areas represented in this PRD include:

- customer experience
- catalog
- products and variants
- search
- wishlist
- cart
- checkout
- payments
- orders
- inventory
- customers
- reviews
- coupons
- marketing
- CMS
- SEO
- notifications
- administration
- analytics
- authentication/security concepts
- AI search
- AI recommendations
- AI content
- AI review analysis
- AI admin insights
- AI support
- frontend architecture
- responsive design
- API-oriented frontend boundaries
- testing/failure-state concepts
- end-to-end customer and admin flows

The supplied Dribbble reference remains the primary visual inspiration for the prototype.

---

# 122. MASTER INSTRUCTION TO ANTIGRAVITY

> Build Vastra as a premium men's fashion e-commerce prototype using **Next.js + TypeScript**.
>
> Use the supplied **Dribbble Apparel Online Store reference** as the primary visual direction. Do not replace its premium editorial character with a generic e-commerce template.
>
> Use **GSAP as the mandatory animation engine**, **GSAP ScrollTrigger for scroll-driven animation**, and **Lenis for smooth scrolling**.
>
> Implement polished micro-interactions, hover states, magnetic interactions, product image transitions, subtle 3D/floating objects, editorial scroll animations, refined page transitions, and premium feedback states.
>
> Build the complete interactive prototype from homepage through product discovery, search, PDP, variants, wishlist, cart, checkout, payment simulation, order confirmation, account, tracking, returns, refunds, reviews, and notifications.
>
> Also build the planned admin prototype including dashboard, products, variants/SKUs, inventory, orders, customers, marketing, reviews, CMS, SEO, media, notifications, analytics, AI insights, users, roles, audit, and settings.
>
> Use centralized mock data and service abstractions so the frontend can later connect to real APIs without redesigning the UI.
>
> Do not skip loading, empty, error, disabled, success, or out-of-stock states.
>
> Do not use production backend infrastructure in this prototype.
>
> Do not use real payment credentials or real transactions.
>
> Do not add unnecessary animation frameworks.
>
> Do not use Framer Motion as a replacement for GSAP.
>
> Do not remove the reference-driven visual direction.
>
> Do not make the result look like a generic Tailwind/Next.js commerce template.
>
> Build mobile, tablet, laptop, and desktop experiences intentionally.
>
> Respect reduced motion and accessibility.
>
> After implementation, perform a complete visual-fidelity, responsive, animation, accessibility, and performance pass.
>
> **The final result must feel like a premium fashion brand experience, not a demo dashboard or generic online store.**

---

## END OF VASTRA PROTOTYPE PRD
