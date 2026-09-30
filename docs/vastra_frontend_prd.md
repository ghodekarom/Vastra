# VASTRA — FRONTEND PRD
## Production Frontend Implementation Based on the Existing Prototype

**Document Type:** Frontend Product Requirements Document
**Project:** Vastra
**Implementation Target:** Production-oriented frontend
**Framework:** Next.js only
**Baseline:** Existing Vastra prototype code supplied with this document
**Primary Instruction:** Rebuild the frontend to match the existing prototype's visual design, layout, interactions, responsive behavior, content structure, and animation language as closely as technically possible. Do not redesign the experience.

---

# 1. PURPOSE

This PRD defines the complete frontend implementation of **Vastra**, a premium men's oversized T-shirt e-commerce experience.

The existing Vastra prototype is the **visual and interaction source of truth** for this implementation. The goal is not to create a new design inspired by the prototype. The goal is to turn the existing prototype into a clean, scalable, production-oriented Next.js frontend while preserving the prototype's user experience.

The frontend must retain:

- the same visual identity
- the same page hierarchy
- the same layout language
- the same product-card behavior
- the same header/footer behavior
- the same cart drawer behavior
- the same search modal behavior
- the same wishlist interactions
- the same checkout flow
- the same order/tracking flow
- the same admin visual language
- the same premium editorial fashion aesthetic
- the same GSAP/ScrollTrigger/Lenis motion direction
- the same 3D/mouse-interaction direction
- the same responsive intent
- the same color system and typography

Any improvement required for production must improve engineering quality without changing the visible experience unless explicitly requested.

---

# 2. SOURCE OF TRUTH HIERARCHY

Use this priority order:

1. **Existing Vastra prototype code** — highest authority for actual implemented UI/UX and behavior.
2. **Existing Vastra design-token specification** — authority for design-system values and reusable visual rules.
3. **Existing Vastra prototype PRD** — authority for prototype intent and interaction requirements.
4. **Production e-commerce functional requirements** — authority for future API/data integration requirements.
5. Dribbble/reference inspiration — visual reference only, never a reason to redesign Vastra.

If the prototype code and a generic design recommendation conflict, preserve the prototype.

---

# 3. NON-NEGOTIABLE IMPLEMENTATION RULES

## 3.1 Next.js only

The frontend must remain a **Next.js application**.

Required baseline:

- Next.js App Router
- TypeScript
- React
- Server Components by default
- Client Components only where interactivity requires them
- Next Image
- Next Link
- Next Font
- route-based layouts where useful

Do not migrate to another framework.

Do not replace Next.js with Vite, CRA, Angular, Vue, Nuxt, or another frontend framework.

## 3.2 Preserve prototype design

Do not introduce a new design system, theme, component style, spacing language, card style, navigation style, or page composition.

The prototype is already approved as the frontend visual baseline.

## 3.3 Preserve premium feel

The finished frontend must feel:

- premium
- editorial
- minimal
- fashion-focused
- spacious
- tactile
- modern
- confident
- responsive

Avoid generic SaaS styling, generic Bootstrap-like layouts, excessive rounded cards, excessive gradients, or template-like UI.

## 3.4 No unnecessary animation framework

Use the existing animation stack:

- GSAP
- GSAP ScrollTrigger
- Lenis
- CSS transitions where appropriate

Do not add Framer Motion unless explicitly approved later.

## 3.5 No visual drift

Do not change:

- colors
- typography hierarchy
- component proportions
- button style
- product card composition
- header proportions
- drawer behavior
- page density
- spacing rhythm
- image treatment
- interaction style

without an explicit requirement.

---

# 4. EXISTING PROTOTYPE TECHNOLOGY BASELINE

The supplied prototype currently uses:

```text
Next.js 16.3.7
React 19.2.8
TypeScript 5
Tailwind CSS 4
GSAP 3.15
Lenis 1.3
Lucide React
ESLint 9
```

The production frontend should preserve this stack unless a version upgrade is explicitly required for compatibility/security.

Current prototype package dependencies include:

- `next`
- `react`
- `react-dom`
- `gsap`
- `lenis`
- `lucide-react`
- `tailwindcss`
- `@tailwindcss/postcss`

---

# 5. FRONTEND ARCHITECTURE

Recommended structure:

```text
src/
├── app/
│   ├── (storefront)/
│   ├── admin/
│   ├── api/                  # only if Next.js frontend endpoints are required
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── product/
│   ├── shopping/
│   ├── checkout/
│   ├── order/
│   ├── search/
│   ├── account/
│   ├── admin/
│   ├── ui/
│   └── providers/
│
├── context/
├── hooks/
├── lib/
│   ├── api/
│   ├── utils/
│   └── constants/
│
├── data/                     # temporary mock/fallback data only
├── types/
└── config/
```

The exact existing component structure may be refactored for maintainability, but the resulting UI must remain equivalent.

---

# 6. GLOBAL APPLICATION SHELL

The root application must provide:

1. Global metadata.
2. Global fonts.
3. Global CSS/design tokens.
4. Store/application state provider.
5. Lenis smooth-scroll provider.
6. Global header.
7. Main content area.
8. Global footer.
9. Cart drawer.
10. Search modal.
11. Toast/notification system.

The current prototype already establishes this global composition and it must be retained.

---

# 7. BRAND IDENTITY

Brand:

**VASTRA**

Positioning:

Premium men's oversized T-shirt / modern streetwear label.

Brand expression:

> Bigger Fits. Bolder Moves.

Visual personality:

- architectural
- editorial
- premium
- understated
- masculine
- contemporary
- warm-neutral
- streetwear-informed

---

# 8. COLOR SYSTEM

The existing prototype defines the following core palette.

## Core colors

| Token | Value |
|---|---|
| Black | `#111111` |
| Charcoal | `#1A1A1A` |
| Dark | `#252525` |
| White | `#FFFFFF` |
| Cream | `#F7F4EE` |
| Off White | `#F1EEE7` |
| Sand | `#E7E0D4` |
| Beige | `#D8CDBD` |
| Stone | `#B8B0A4` |
| Gray | `#77736D` |
| Light Gray | `#D9D6D0` |
| Olive | `#626854` |
| Brown | `#6A5848` |
| Success | `#3F6B4B` |
| Warning | `#A16B25` |
| Error | `#A63D35` |
| Info | `#3D6078` |

## Semantic usage

```text
Page background      #F7F4EE
Surface              #FFFFFF
Muted background     #F1EEE7
Subtle background    #E7E0D4
Dark background      #111111
Primary text         #111111
Secondary text       #4F4B45
Muted text           #77736D
Borders              #D8D3CA / #E7E3DC
Primary action       #111111
Olive accent         #626854
Brown accent         #6A5848
```

Implement these centrally using CSS variables/design tokens.

Do not scatter arbitrary replacement colors throughout the application.

---

# 9. TYPOGRAPHY

The prototype uses:

- **Inter** — primary UI/body font
- **Syne** — display/brand/headline font
- **Cormorant Garamond** — editorial serif accent where used

Required font roles:

```text
Body/UI       Inter
Display       Syne
Editorial     Cormorant Garamond
```

Typography must preserve the prototype hierarchy:

- large editorial hero headlines
- compact uppercase metadata
- clean product names
- restrained supporting copy
- strong price hierarchy
- small uppercase labels for fashion/product metadata

Do not substitute generic fonts unless the required font cannot be loaded.

---

# 10. LAYOUT SYSTEM

Base maximum content width:

```text
1440px
```

Use a consistent centered Vastra container.

The prototype favors:

- generous horizontal whitespace
- large visual blocks
- asymmetric editorial compositions
- wide hero imagery
- compact product information
- clean section spacing
- restrained borders

Avoid dense dashboard-like spacing on storefront pages.

---

# 11. RESPONSIVE REQUIREMENTS

The frontend must work correctly at:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px+

## Mobile

- mobile navigation drawer
- stacked content
- touch-friendly controls
- no hover dependency
- responsive image crops
- horizontally scrollable controls where appropriate
- full-width CTA buttons where appropriate
- drawer/modal must fit within viewport

## Tablet

- transitional grid behavior
- appropriate spacing reduction
- preserve editorial hierarchy

## Desktop

- multi-column product grids
- full navigation
- hover interactions
- search trigger
- 3D hero interactions
- editorial split sections

---

# 12. GLOBAL HEADER

The existing prototype header must be preserved.

Desktop navigation:

- Home
- Shop
- Collections
- About

Header actions:

- Search
- Account
- Wishlist
- Shopping Bag

Behavior:

- fixed header
- transparent/minimal initial state as implemented
- changes appearance after scrolling
- cream background
- backdrop blur on scrolled state
- subtle border
- active route indicator
- cart/wishlist count badges

Mobile:

- hamburger
- logo
- search action where appropriate
- side drawer
- backdrop
- close button
- same navigation destinations

Do not redesign the header.

---

# 13. GLOBAL FOOTER

Preserve the prototype footer structure and editorial appearance.

Footer should provide the same categories of information already present in the prototype, including:

- brand identity
- navigation
- customer support links
- policy/content links
- contact information where applicable
- copyright

Footer must be responsive and visually consistent with the warm-neutral Vastra system.

---

# 14. GLOBAL SEARCH

The existing search modal must remain a global interaction.

Requirements:

- opened from header
- opened from mobile search action
- overlay/backdrop
- search input
- product discovery
- keyboard-friendly interaction
- close action
- escape-key support
- relevant results
- empty state
- no-results state
- navigation to product detail

Search should be implemented behind an abstraction so the current mock product search can later be replaced by backend/API search without redesigning the UI.

---

# 15. CART DRAWER

The prototype includes a right-side cart drawer.

Required behavior:

- fixed right-side drawer
- backdrop
- close button
- cart item list
- item image
- product name
- selected color
- selected size
- quantity stepper
- remove item
- subtotal
- discount
- shipping
- final total
- coupon input
- applied coupon state
- free-shipping progress
- checkout CTA
- empty cart state

The drawer must animate into view and preserve the prototype's transition behavior.

---

# 16. TOAST / FEEDBACK SYSTEM

Global toast feedback is required for actions such as:

- added to cart
- removed from cart
- wishlist added
- wishlist removed
- coupon applied
- coupon removed
- invalid coupon
- other meaningful interactive confirmations

Toasts must be subtle and premium rather than intrusive.

---

# 17. STOREFRONT ROUTES

The existing prototype contains these storefront routes.

| Route | Purpose |
|---|---|
| `/` | Homepage |
| `/shop` | Product listing |
| `/collections` | Collections |
| `/product/[slug]` | Product detail |
| `/wishlist` | Wishlist |
| `/cart` | Cart page |
| `/checkout` | Checkout |
| `/account` | Account |
| `/order/[orderId]` | Order tracking/detail |
| `/order/[orderId]/confirmation` | Order confirmation |
| `/about` | Brand story |
| `/contact` | Contact |
| `/faq` | FAQ |
| `/shipping` | Shipping information |
| `/returns` | Returns information |

These routes form the current implemented frontend baseline.

Do not add unimplemented storefront routes merely because they appear in an older planning document.

---

# 18. HOMEPAGE

The homepage is the primary visual reference for the entire Vastra frontend.

## Required visual sections

Preserve the prototype's sections and ordering, including its:

- editorial hero
- featured products
- collection/category sections
- new-arrival/editorial content
- brand storytelling
- recommendation/product sections
- review/social-proof content where implemented
- footer

## Hero

The hero is the most important interaction surface.

Required characteristics:

- oversized editorial headline
- fashion model imagery
- warm architectural environment
- large visual composition
- premium typography
- CTA
- supporting microcopy
- pagination/secondary controls where present
- 3D depth
- mouse interaction
- subtle floating elements

## Hero 3D behavior

Preserve the existing implementation direction:

- perspective container
- mouse-position tracking
- model/image tilt
- floating tag/object
- floating preview card
- counter-tilt relationships
- depth using `translateZ`
- smooth transition back to neutral on mouse leave

Do not replace this with a generic CSS hover.

---

# 19. GSAP / SCROLLTRIGGER REQUIREMENTS

GSAP remains the primary animation engine.

## Homepage

Preserve:

- hero entrance animation
- section reveal animations
- product-grid reveal animations
- ScrollTrigger-driven entrance behavior

## General animation rules

Animations must be:

- smooth
- purposeful
- premium
- short enough to feel responsive
- subtle enough not to distract from shopping

Use GSAP for coordinated sequences and ScrollTrigger for scroll-linked reveals.

Use CSS transitions for simple hover/color/opacity changes.

Avoid animating every element.

---

# 20. LENIS SMOOTH SCROLL

Lenis is required for the storefront experience.

The prototype currently synchronizes Lenis with GSAP ScrollTrigger.

Preserve this architecture:

```text
Lenis scroll
      ↓
ScrollTrigger.update()
      ↓
GSAP ticker
```

Current prototype direction includes:

- vertical smooth scrolling
- smooth wheel behavior
- tuned wheel multiplier
- touch multiplier
- reduced-motion bypass
- cleanup on unmount

The production implementation must preserve the same perceived scroll feel.

---

# 21. 3D / MOUSE INTERACTION SYSTEM

The prototype establishes a spatial/3D interaction language.

Required use cases:

- hero model tilt
- floating hero objects
- depth layers
- floating preview card
- counter-tilt relationships
- mouse-follow movement
- hover lift
- depth-based visual hierarchy

CSS capabilities used by the prototype include:

```css
perspective
transform-style: preserve-3d
translateZ
rotateX
rotateY
translate3d
```

Use these carefully. The 3D effect should remain premium and controlled.

On touch devices, remove or simplify mouse-dependent interactions.

---

# 22. MICRO-INTERACTIONS

Required micro-interactions include:

### Buttons

- hover background change
- subtle arrow movement
- active press feedback
- controlled scale where already present

### Product cards

- image swap on hover when secondary image exists
- image scale
- quick-add reveal
- wishlist interaction
- badge/shimmer treatment
- color-swatch selection

### Navigation

- active underline
- opacity/color transition
- logo interaction
- mobile drawer entrance/exit

### Wishlist

- icon state change
- badge update
- toast feedback

### Cart

- drawer slide-in
- quantity transition
- progress bar update
- button feedback

### Search

- modal entrance
- focus state
- result transition

Do not create distracting animation loops across the entire UI.

---

# 23. PRODUCT CARD

Product cards are a core reusable component.

Required content:

- product image
- badges
- wishlist button
- product name
- subtitle
- current price
- original price where applicable
- color swatches
- quick add behavior

Existing prototype behavior:

- hover switches to secondary image where available
- image gently scales
- wishlist button lifts/scales on interaction
- quick-add overlay appears on desktop hover
- color swatches change selected color state
- shimmer effect is available on cards

The product-card API must remain data-driven.

---

# 24. PRODUCT DATA MODEL

The existing prototype Product model includes:

```text
id
slug
name
subtitle
description
category
collection
price
originalPrice
discountPercentage
rating
reviewCount
badges
colors
sizes
images
fabric
gsm
fit
modelInfo
careInstructions
specifications
isNew
isBestseller
isSale
featured
```

The production frontend should preserve this domain model or map backend DTOs into an equivalent frontend view model.

Frontend components must not depend directly on raw backend response shapes.

---

# 25. PRODUCT LISTING — `/shop`

Required behavior:

- product grid
- product count
- category/filter controls
- sorting
- mobile filter drawer
- responsive layout
- product cards
- empty state
- filter state
- sorting state

The existing prototype uses product data and client-side filtering/sorting.

Production architecture should move filtering/sorting to API query parameters when backend search/catalog APIs become available, while preserving the exact UI.

Suggested frontend query contract:

```text
/shop?category=
/shop?collection=
/shop?color=
/shop?size=
/shop?minPrice=
/shop?maxPrice=
/shop?sort=
/search?q=
```

Do not change the visible filter experience merely because the data source changes.

---

# 26. COLLECTIONS — `/collections`

The collections page should preserve the prototype's large editorial collection cards.

Collections currently represented include:

- The Horizon Collection
- Oversized Classics
- Graphic Series
- Minimal Series
- Textured Drops

Required interaction:

- image hover zoom
- title/description hierarchy
- arrow movement
- navigation to appropriate product listing/filter

---

# 27. PRODUCT DETAIL — `/product/[slug]`

The PDP is a critical production screen.

Required sections:

- product gallery
- product name
- subtitle
- rating/reviews
- current price
- original price
- discount
- color selection
- size selection
- size guide
- quantity
- add-to-cart CTA
- wishlist CTA
- fabric information
- GSM information
- fit information
- model information
- care instructions
- technical specifications
- related/recommended products

The visual hierarchy must remain consistent with the prototype.

---

# 28. PRODUCT GALLERY

Use the existing product image-array model.

Support:

- main image
- thumbnails
- image switching
- responsive image layout
- appropriate object-fit behavior
- smooth transitions

Images must use `next/image` where possible.

---

# 29. WISHLIST — `/wishlist`

Required:

- saved products
- product image
- name
- price
- color information where relevant
- remove action
- add-to-cart action
- product navigation
- empty wishlist state

Wishlist state should remain globally available to header/product cards/PDP/wishlist page.

Production persistence can later be API-backed without changing the UI.

---

# 30. CART PAGE — `/cart`

The full cart page must expose the same information as the drawer with more room for:

- product summary
- quantity controls
- remove action
- pricing
- discount
- shipping
- final total
- coupon
- checkout CTA
- reassurance/shipping information

Support empty-cart state.

---

# 31. CHECKOUT — `/checkout`

The current prototype checkout should remain a frontend checkout experience.

Required steps/sections:

1. Cart/order summary
2. Customer/address information
3. Shipping option
4. Payment method
5. Order review
6. Order placement

Current prototype payment options/UI must be preserved.

The production frontend must later connect these controls to real backend checkout/payment APIs without redesigning the page.

---

# 32. CHECKOUT VALIDATION

Frontend validation must include:

- required fields
- valid email where applicable
- valid phone format
- valid pincode
- address completeness
- payment method selection
- terms/confirmation where applicable

Validation must be accessible and visually consistent with the design system.

Do not rely only on frontend validation for security.

---

# 33. ORDER CREATION

The prototype currently creates an order locally through the store context.

Production frontend behavior should become:

```text
Checkout form
    ↓
Frontend validation
    ↓
API request
    ↓
Payment/order response
    ↓
Order state
    ↓
Confirmation route
```

The UI should not change when replacing local order creation with API calls.

---

# 34. ORDER CONFIRMATION

Route:

`/order/[orderId]/confirmation`

Required:

- success state
- order identifier
- order summary
- payment information
- shipping summary
- delivery expectation
- tracking/navigation CTA
- continue shopping CTA

Preserve the prototype's animated success presentation.

---

# 35. ORDER DETAILS / TRACKING

Route:

`/order/[orderId]`

Required:

- order identifier
- order status
- product items
- shipping address
- payment information
- total
- tracking number
- estimated delivery
- timeline/status progression
- cancellation/return actions where applicable in the existing flow

The production version should obtain this data from an order API.

---

# 36. ACCOUNT — `/account`

The current account experience should preserve its simple premium dashboard style.

Functional areas represented by the prototype include:

- profile/customer information
- orders
- address
- notifications
- logout/action area

Do not turn the account page into a generic dashboard.

---

# 37. CONTENT PAGES

Implement and preserve:

### About

Brand story and editorial imagery.

### Contact

Contact details and contact form.

### FAQ

Expandable FAQ content.

### Shipping

Shipping policy and delivery information.

### Returns

Return policy and refund information.

These pages must share the same typography, spacing, header, footer, and editorial layout language.

---

# 38. ADMIN FRONTEND

The prototype includes a functional admin UI.

Routes currently implemented:

```text
/admin
/admin/products
/admin/orders
/admin/inventory
/admin/ai
```

The admin frontend must remain visually consistent with the existing prototype while being structured for future production APIs.

---

# 39. ADMIN LAYOUT

The admin application should have a distinct but related operational layout.

It should provide:

- admin navigation
- dashboard content area
- responsive navigation behavior
- page title
- operational tables/cards
- status badges
- actions
- filters/search where present

Do not redesign the admin interface into a different visual system.

---

# 40. ADMIN DASHBOARD — `/admin`

Preserve the prototype's dashboard composition.

The dashboard may include:

- sales/order summary
- product information
- inventory signals
- operational cards
- recent activity
- quick actions

All data must eventually be API-driven.

---

# 41. ADMIN PRODUCTS — `/admin/products`

Required UI patterns from prototype:

- product list/table
- product image
- product name
- product status
- pricing
- search
- filter
- edit action
- view action
- delete action
- create/add product action

Production implementation should use API-driven pagination/filtering.

---

# 42. ADMIN ORDERS — `/admin/orders`

Required:

- order list
- search
- filtering
- status
- customer/order summary
- shipping state
- view action
- operational actions

Preserve current table density and status styling.

---

# 43. ADMIN INVENTORY — `/admin/inventory`

Required:

- SKU
- product
- color
- size
- stock
- reserved quantity
- status
- restock action

Inventory statuses use the existing semantic color system.

---

# 44. ADMIN AI — `/admin/ai`

The prototype contains an AI retail/brand intelligence screen.

Preserve its visual concepts:

- inventory forecast insight
- review sentiment insight
- style/color velocity insight
- AI editorial copy generator
- input
- generation state
- generated copy
- copy-to-clipboard interaction

In production, the UI should call AI/backend services rather than use hardcoded generation logic.

The frontend must treat AI output as untrusted content and render it safely.

---

# 45. APPLICATION STATE

The prototype currently uses a React context store.

Core state includes:

```text
cart
wishlist
cart drawer state
search modal state
active coupon
coupon discount
orders
toast message
```

Core actions include:

```text
openCart
closeCart
openSearch
closeSearch
addToCart
removeFromCart
updateQuantity
clearCart
toggleWishlist
isInWishlist
applyCoupon
removeCoupon
createOrder
showToast
```

For production, this may be split into domain-specific stores/hooks if needed, but the behavior and public component contracts should remain stable.

---

# 46. STATE PERSISTENCE

Prototype state is local/client-side.

Production frontend should support:

- authenticated user state
- server-backed cart
- server-backed wishlist
- server-backed orders
- persistent checkout state where appropriate

Recommended approach:

```text
Server/API = source of truth
Client state = UI/cache/optimistic interaction layer
```

Do not allow stale client state to override authoritative backend state.

---

# 47. API INTEGRATION ARCHITECTURE

The frontend must be API-ready.

Create a dedicated API layer rather than calling `fetch()` randomly throughout components.

Example:

```text
src/lib/api/
├── client.ts
├── products.ts
├── categories.ts
├── search.ts
├── cart.ts
├── wishlist.ts
├── checkout.ts
├── orders.ts
├── account.ts
└── admin.ts
```

Components should consume typed frontend services/hooks rather than raw HTTP implementation details.

---

# 48. ENVIRONMENT CONFIGURATION

Use environment variables for backend configuration.

Example:

```env
NEXT_PUBLIC_API_BASE_URL=
```

Do not hardcode production API URLs in components.

Environment values should support:

- local development
- staging
- production

Only variables that must be browser-visible should use `NEXT_PUBLIC_`.

Secrets must never be exposed through `NEXT_PUBLIC_` variables.

---

# 49. API ERROR HANDLING

The frontend must provide consistent states for:

- network failure
- 401/unauthenticated
- 403/forbidden
- 404/not found
- 409/conflict
- 422/validation
- 429/rate limit
- 500/server error
- timeout

Each user-facing failure should map to an appropriate UI state without exposing raw server errors.

---

# 50. LOADING STATES

Preserve the premium visual language for loading states.

Use:

- skeletons
- subtle placeholders
- button loading indicators
- drawer loading states
- page loading states where necessary

Avoid excessive spinners.

Loading states must not cause layout jumps.

---

# 51. EMPTY STATES

Required examples:

- empty cart
- empty wishlist
- no search results
- no products
- no orders
- no notifications where applicable
- empty admin data states

Empty states should provide a useful next action where appropriate.

---

# 52. ERROR STATES

Required examples:

- failed product load
- failed search
- failed checkout
- failed order creation
- failed admin request
- invalid route/product

Use the same typography and visual language as the rest of Vastra.

---

# 53. ACCESSIBILITY

The production frontend must preserve the visual design while meeting practical accessibility requirements.

Required:

- semantic HTML
- keyboard navigation
- visible focus state
- accessible labels
- button semantics
- form labels
- alt text
- sufficient contrast
- dialog semantics
- escape-to-close for modal/drawer where appropriate
- focus management for modal/drawer
- reduced-motion support

Minimum interactive target:

`44px`

where practical.

---

# 54. REDUCED MOTION

The existing prototype checks:

```text
prefers-reduced-motion: reduce
```

Production implementation must preserve this behavior.

When reduced motion is enabled:

- disable/simplify Lenis
- reduce GSAP entrance effects
- remove mouse-dependent movement where appropriate
- preserve functionality
- avoid disorienting motion

---

# 55. IMAGE SYSTEM

The prototype references 19 image paths:

```text
/images/editorial/brand-mountains.jpg
/images/editorial/horizon-green.jpg
/images/hero/hero-cinematic.jpg
/images/hero/hero-model-brown.jpg
/images/hero/wave-back.jpg
/images/products/boxy-sand.jpg
/images/products/classic-cream.jpg
/images/products/essential-blank.jpg
/images/products/fit-sketch.png
/images/products/graphic-black.jpg
/images/products/minimal-black.jpg
/images/products/minimal-olive.jpg
/images/products/olive-graphic.jpg
/images/products/pdp-shadow-front.jpg
/images/products/shadow-print.jpg
/images/products/terrain-graphic.jpg
/images/products/terrarium-charcoal.jpg
/images/products/vortex-print.jpg
/images/products/wave-back-graphic.jpg
```

### Important asset note

These image references exist in the prototype code, but the supplied ZIP does not contain a `public/images/` directory containing these assets.

Therefore:

1. Do not replace them with arbitrary stock imagery.
2. Preserve the exact path contract.
3. Use the original prototype assets if available separately.
4. If an original asset is unavailable, use an approved Vastra-generated replacement that matches the prototype composition and visual language.
5. Keep all asset paths centralized where practical.

The three currently approved/generated Vastra visual assets may be used as interim assets, but the final production frontend should use the exact approved prototype imagery where available.

---

# 56. IMAGE PERFORMANCE

Use `next/image` for application images wherever possible.

Requirements:

- responsive sizes
- appropriate quality settings
- lazy loading for below-fold imagery
- priority loading for hero/LCP image
- correct aspect ratios
- no layout shift
- optimized modern formats where supported

Do not sacrifice the premium visual quality through excessive compression.

---

# 57. COMPONENT ARCHITECTURE

Core reusable components should include equivalents of the existing prototype:

```text
Header
Footer
ProductCard
CartDrawer
SearchModal
Toast
SmoothScrollProvider
```

Additional production components may include:

```text
Button
Input
Select
Modal
Drawer
Badge
Price
Rating
ProductGallery
ProductInfo
SizeSelector
ColorSelector
QuantitySelector
FilterPanel
SortControl
Pagination
StatusBadge
FormField
Skeleton
EmptyState
ErrorState
```

Reusable components must be data-driven and not duplicated across pages.

---

# 58. SERVER VS CLIENT COMPONENT RULES

Use Server Components by default.

Use Client Components for:

- cart state
- wishlist state
- search modal
- interactive filters
- quantity controls
- checkout forms
- product selection
- GSAP interactions
- mouse interactions
- admin interactive controls
- toast state
- Lenis provider

Do not mark the entire application `use client` unnecessarily.

---

# 59. SEO / METADATA

Each public page must provide meaningful metadata.

Product pages should dynamically generate:

- title
- description
- canonical URL
- Open Graph metadata
- product imagery

Category/collection pages should also have descriptive metadata.

The visual UI must remain unchanged by SEO implementation.

---

# 60. PERFORMANCE REQUIREMENTS

Production frontend must target:

- fast initial render
- optimized LCP
- minimal layout shift
- controlled JavaScript execution
- optimized images
- code splitting through Next.js
- lazy loading for non-critical content
- limited client-side state
- efficient animation loops

GSAP/Lenis must not create unnecessary main-thread work.

Mouse tracking must be optimized using animation frames or equivalent techniques rather than causing excessive React re-renders.

---

# 61. ANIMATION PERFORMANCE

Do not continuously update React state for high-frequency mouse movement if direct transforms or refs can be used.

Preferred pattern:

```text
Pointer movement
      ↓
requestAnimationFrame / GSAP
      ↓
transform
```

Avoid:

```text
Pointer movement
      ↓
setState every event
      ↓
full component rerender
```

The final experience must remain smooth on capable desktop devices.

---

# 62. SECURITY FRONTEND RULES

Never trust frontend validation as a security mechanism.

Never expose:

- database credentials
- secret API keys
- payment secrets
- admin secrets
- private signing keys

Never put sensitive values in `NEXT_PUBLIC_*` variables.

Admin authorization must be enforced by the backend even if the frontend hides admin routes.

---

# 63. AUTHENTICATION READINESS

The current prototype is primarily a frontend experience.

The production frontend should be designed so authentication can later be connected without changing the UI.

Support architecture for:

- login
- registration
- logout
- session state
- authenticated account
- protected checkout/order/account actions
- admin authentication

Do not fake authorization as a security boundary.

---

# 64. DATA LAYER MIGRATION

Prototype:

```text
React context + local product/order data
```

Production:

```text
Next.js frontend
      ↓
Typed API client
      ↓
Backend APIs
      ↓
Database/services
```

The migration must be incremental.

Do not rewrite the visual components when replacing mock data with API data.

---

# 65. ROUTE BEHAVIOR CONTRACT

Every route must:

- render correctly on direct navigation
- support browser back/forward
- preserve expected state
- have loading behavior
- have error behavior
- have responsive behavior
- use accessible navigation
- preserve the prototype visual hierarchy

Dynamic routes must correctly handle invalid IDs/slugs.

---

# 66. URL / QUERY STATE

Where applicable, filter/search/sort state should be representable in the URL.

This enables:

- refresh persistence
- shareable URLs
- browser navigation
- SEO-friendly catalog navigation

The visible UI should continue to behave like the prototype.

---

# 67. FORM ARCHITECTURE

Forms must have:

- controlled or well-structured state
- validation
- accessible labels
- error messages
- loading state
- success state
- disabled submission state
- server-error handling

Form styling must use the Vastra design tokens.

---

# 68. ADMIN DATA TABLES

Admin tables must support, where present in the prototype:

- search
- filtering
- status display
- row actions
- responsive behavior
- empty state
- loading state
- error state

On smaller screens, use responsive table treatment rather than allowing the entire application to overflow horizontally without control.

---

# 69. PRODUCT / FASHION CONTENT RULES

Product information should consistently expose fashion-specific attributes where available:

- fit
- fabric
- GSM
- model height
- model size
- care
- construction/specifications
- color
- size

The product experience must feel like a premium apparel store, not a generic electronics/product marketplace.

---

# 70. PRICING DISPLAY

Use Indian Rupee formatting:

```text
₹1,799
```

Where discounted:

```text
₹1,799   ₹2,499
```

Use the existing discount/badge hierarchy.

Do not introduce inconsistent currency formatting.

---

# 71. CART BUSINESS RULES FROM PROTOTYPE

Preserve the prototype behavior unless backend business rules later override it:

- free shipping threshold: ₹1,999
- shipping below threshold: ₹99
- coupon `VASTRA10`: 10% discount
- coupon `FRESH20`: 20% discount
- quantity cannot be less than 1
- matching product/color/size increments quantity instead of creating a duplicate cart line

These are prototype business rules and should be moved to backend-authoritative rules in production.

---

# 72. DEFAULT DEMO STATE

The prototype currently demonstrates populated states, including:

- sample cart items
- sample wishlist items
- sample order
- sample coupon

For development/demo environments, maintain equivalent seeded demo state if useful.

Production users must not receive another customer's demo state.

---

# 73. EXACT-FIDELITY REQUIREMENT

The implementation is considered successful only when a reviewer can place the prototype and production frontend side by side and identify the same product experience.

Match:

- section order
- spacing
- typography scale
- colors
- image ratios
- card sizes
- CTA sizes
- borders
- shadows
- header height
- navigation spacing
- drawer width
- modal treatment
- mobile behavior
- hover behavior
- animation timing/feel
- 3D interaction direction

Do not optimize the design into a different aesthetic.

---

# 74. VISUAL REGRESSION REQUIREMENT

Before considering each route complete:

1. Run the prototype.
2. Run the new frontend.
3. Compare desktop.
4. Compare tablet.
5. Compare mobile.
6. Compare initial state.
7. Compare hover state.
8. Compare drawer/modal state.
9. Compare loading state.
10. Compare empty state.
11. Compare error state.
12. Compare interactive transitions.

Any unexplained visual difference should be treated as a defect.

---

# 75. TESTING REQUIREMENTS

At minimum verify:

## Functional

- navigation
- search open/close
- product navigation
- wishlist add/remove
- cart add/remove
- quantity changes
- coupon apply/remove
- checkout flow
- order creation
- confirmation navigation
- order details
- admin navigation
- AI copy interaction

## Responsive

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px

## Accessibility

- keyboard navigation
- focus visibility
- dialog closing
- form labels
- button labels
- reduced motion

## Performance

- no unnecessary rerenders
- no animation jank
- no image layout shift
- no console errors
- no broken routes

---

# 76. IMPLEMENTATION PHASES

## Phase 1 — Foundation

- initialize/verify Next.js project
- TypeScript
- Tailwind
- global CSS tokens
- fonts
- metadata
- root layout
- providers
- API abstraction

## Phase 2 — Global shell

- Header
- mobile navigation
- Footer
- Search Modal
- Cart Drawer
- Toast
- Lenis

## Phase 3 — Core catalog

- product model
- ProductCard
- homepage
- shop
- collections
- product detail
- wishlist

## Phase 4 — Commerce flow

- cart page
- checkout
- validation
- order creation abstraction
- confirmation
- order detail/tracking

## Phase 5 — Content/account

- account
- about
- contact
- FAQ
- shipping
- returns

## Phase 6 — Admin

- admin layout
- dashboard
- products
- orders
- inventory
- AI insights

## Phase 7 — Motion fidelity

- GSAP
- ScrollTrigger
- Lenis synchronization
- hero 3D
- mouse interactions
- micro-interactions
- transitions

## Phase 8 — Production integration

- API client
- authentication
- catalog APIs
- cart APIs
- wishlist APIs
- checkout/payment integration
- order APIs
- admin APIs

## Phase 9 — QA

- responsive testing
- accessibility
- visual comparison
- performance
- error states
- production build

---

# 77. ANTIGRAVITY IMPLEMENTATION INSTRUCTION

Antigravity must treat the supplied Vastra prototype code as the **reference implementation**.

### Required process

1. Inspect the complete existing prototype before changing architecture.
2. Preserve existing routes.
3. Preserve existing visual hierarchy.
4. Preserve existing components where they are reusable.
5. Preserve the existing color system.
6. Preserve typography.
7. Preserve product-card behavior.
8. Preserve cart/search overlays.
9. Preserve GSAP/ScrollTrigger behavior.
10. Preserve Lenis integration.
11. Preserve hero 3D/mouse interactions.
12. Preserve responsive behavior.
13. Replace mock data with typed API abstractions incrementally.
14. Do not introduce visual redesign while doing API integration.
15. Do not add unnecessary libraries.
16. Do not use Framer Motion.
17. Do not replace Next.js.
18. Do not create generic placeholder UI where the prototype already defines the design.
19. Do not replace approved imagery with unrelated stock imagery.
20. Run the full build and lint checks before completion.

---

# 78. ANTIGRAVITY DO-NOT-DO LIST

Do not:

- migrate away from Next.js
- redesign the homepage
- redesign the header
- redesign product cards
- redesign checkout
- replace the color palette
- replace the typography
- add random gradients
- add excessive glassmorphism
- use generic dashboard templates
- add Framer Motion
- remove GSAP
- remove Lenis
- remove ScrollTrigger
- remove 3D interactions
- flatten the hero into a static banner
- remove hover interactions
- remove mobile navigation
- hardcode API URLs
- expose secrets
- trust frontend authorization
- scatter API calls throughout UI components
- create duplicated product-card implementations
- use arbitrary placeholder images in final UI
- create routes that conflict with the existing route structure

---

# 79. DEFINITION OF DONE

The frontend is complete when:

### Architecture

- Next.js App Router is used.
- TypeScript is used throughout.
- Components are reusable.
- API integration is abstracted.
- Environment configuration is correct.

### Visual

- Prototype and frontend match closely.
- Design tokens are centralized.
- Typography is correct.
- Images use correct aspect ratios.
- Product cards match.
- Header/footer match.
- Cart/search overlays match.

### Motion

- GSAP works.
- ScrollTrigger works.
- Lenis works.
- Hero 3D interaction works.
- Mouse interaction works on desktop.
- Reduced motion is supported.

### Commerce

- Product browsing works.
- Product details work.
- Wishlist works.
- Cart works.
- Coupon interaction works.
- Checkout works.
- Order creation abstraction works.
- Confirmation works.
- Order tracking works.

### Admin

- Admin dashboard works.
- Product admin works.
- Orders work.
- Inventory works.
- AI page works.

### Quality

- No broken routes.
- No TypeScript errors.
- No ESLint errors that block the project.
- No browser console errors.
- No major layout shifts.
- Responsive behavior works across target breakpoints.
- Keyboard navigation works.
- Production build succeeds.

---

# 80. FINAL PRODUCT PRINCIPLE

**Vastra is not a redesign project. It is a production frontend implementation of an already-established prototype.**

The prototype defines what Vastra should look and feel like.

The production frontend defines how that experience is engineered reliably.

Therefore:

```text
EXISTING PROTOTYPE
        ↓
VISUAL + UX SOURCE OF TRUTH
        ↓
NEXT.JS PRODUCTION FRONTEND
        ↓
TYPED API INTEGRATION
        ↓
PRODUCTION E-COMMERCE EXPERIENCE
```

The final result must retain the same premium Vastra identity while gaining production-grade architecture, maintainability, performance, accessibility, API readiness, and scalability.

---

# 81. FINAL MASTER INSTRUCTION FOR ANTIGRAVITY

> Build the Vastra frontend in Next.js only, using the supplied existing Vastra prototype code as the primary visual and interaction source of truth. Reproduce the prototype from start to finish rather than redesigning it. Preserve its routes, layout, typography, color system, product-card behavior, cart drawer, search modal, wishlist interactions, checkout experience, order screens, admin screens, responsive behavior, GSAP animations, ScrollTrigger effects, Lenis smooth scrolling, 3D hero depth, mouse interactions, hover states, micro-interactions, and premium editorial fashion aesthetic. Refactor the implementation where necessary for production quality, but never change the user-facing design without explicit approval. Introduce a clean typed API layer so mock data can be replaced by backend APIs without changing the UI. Keep secrets out of the browser, use Next.js server/client boundaries correctly, optimize images with Next Image, support accessibility and reduced motion, and validate the final implementation against the original prototype at desktop, tablet, and mobile sizes. The goal is visual and behavioral parity with the existing prototype plus production-grade frontend engineering.

---

**END OF VASTRA FRONTEND PRD**
