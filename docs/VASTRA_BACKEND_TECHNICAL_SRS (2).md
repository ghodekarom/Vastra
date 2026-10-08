# VASTRA — BACKEND TECHNICAL SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

**Document:** Backend Technical SRS  
**Project:** VASTRA — Premium Oversized T-Shirt E-Commerce Platform  
**Version:** 1.0  
**Status:** Implementation Baseline  
**Primary Backend:** Java + Spring Boot + PostgreSQL + REST API  
**Frontend:** Existing VASTRA Next.js prototype / production frontend  
**Architecture:** Modular monolith with provider adapters  
**Initial Runtime:** Local / demo, production-ready code structure  
**Implementation Target:** Google Antigravity / backend engineering agent

---

# 0. PURPOSE OF THIS DOCUMENT

This SRS is the authoritative backend implementation specification for VASTRA.

It is derived from:

1. The existing VASTRA frontend prototype.
2. The VASTRA frontend PRD supplied with the prototype.
3. The backend SRS structure and engineering rules used for the reference e-commerce project.

The objective is to replace the prototype's client-side/mock commerce state with a real backend while preserving the existing VASTRA frontend experience.

The backend must become the source of truth for:

- products
- product variants
- SKUs
- prices
- discounts
- inventory
- carts
- wishlists
- customer accounts
- addresses
- checkout
- shipping
- payments
- orders
- order tracking
- cancellations
- returns
- exchanges
- refunds
- reviews
- coupons
- CMS content
- notifications
- admin operations
- analytics
- audit logs
- AI retail intelligence

The backend must not redesign the frontend.

---

# 1. CRITICAL IMPLEMENTATION RULES

## 1.1 Repository-first implementation

Before writing backend code:

1. Inspect the complete repository.
2. Inspect the existing frontend API assumptions.
3. Inspect product, cart, order, admin and API TypeScript types.
4. Inspect current routes and frontend state.
5. Identify whether any backend already exists.
6. Produce a short implementation plan.
7. Implement feature-by-feature.
8. Compile/test after every major phase.

Do not blindly generate hundreds of files.

## 1.2 Architecture

Use a **modular monolith**.

Do not create microservices for V1.

Recommended flow:

```text
VASTRA Next.js Frontend
          |
          v
      REST API
          |
          v
 Application / Service Layer
          |
     +----+----+
     |         |
     v         v
 Domain     Provider Ports
 Rules      / Adapters
     |         |
     v         v
Repositories  Demo/Manual Providers
     |
     v
 PostgreSQL
```

## 1.3 Backend authority

Never trust the browser for:

- price
- sale price
- discount
- coupon validity
- inventory
- shipping fee
- shipping method
- tax
- order total
- payment status
- order status
- return eligibility
- refund amount
- admin authorization

The frontend may display calculated values, but the backend recalculates and validates them.

## 1.4 No unnecessary infrastructure

V1 must not require:

- microservices
- Kafka
- Kubernetes
- Elasticsearch
- Redis unless a demonstrated requirement exists
- paid external APIs
- production payment gateway
- production shipping gateway
- complex event-driven infrastructure

Use simple Spring scheduling only where a scheduled cleanup is required.

---

# 2. PRODUCT SCOPE

VASTRA is a B2C fashion e-commerce platform focused on premium men's oversized T-shirts.

The existing frontend establishes:

- premium/editorial storefront
- product catalog
- collections
- product detail pages
- search
- cart
- wishlist
- checkout
- order confirmation
- order tracking
- customer account
- returns/exchange flow
- shipping information
- FAQ
- contact/support
- admin dashboard
- admin products
- admin orders
- admin inventory
- AI retail intelligence
- AI editorial copy generation

The backend must support these experiences without requiring a visual redesign.

---

# 3. VASTRA-SPECIFIC PRODUCT MODEL

Unlike a generic marketplace, VASTRA products are apparel-first.

Product data must support:

- name
- slug
- subtitle
- description
- category
- collection
- selling price
- original price
- discount
- rating
- review count
- badges
- colors
- sizes
- images
- fabric
- GSM
- fit
- model information
- care instructions
- specifications
- new flag
- bestseller flag
- sale flag
- featured flag

The frontend's current TypeScript model explicitly represents generic product variants using:

```text
color
size
SKU
price
stock
image
```

and product-level fashion attributes including fabric, GSM, fit, model information, care instructions and specifications.

The backend must preserve this contract conceptually while making database state authoritative.

---

# 4. FIXED V1 BUSINESS RULES

| Area | V1 Requirement |
|---|---|
| Business model | B2C |
| Product type | Premium oversized T-shirts |
| Currency | INR |
| Catalog | Apparel catalog with product variants |
| Variant dimensions | Color + Size in current prototype |
| Sizes | S, M, L, XL, XXL |
| SKU | Required for every sellable variant |
| Fabric/GSM | Product-level metadata |
| Categories | Oversized T-Shirts, Graphic Tees, Minimal Tees, Essentials |
| Collections | Horizon, Classics, Graphic, Minimal and future drops |
| Search | Keyword search |
| Filters | Category, collection, price, GSM, availability, attributes, rating |
| Wishlist | Guest + authenticated |
| Cart | Guest + authenticated |
| Guest merge | Yes |
| Coupon | One coupon per order |
| Prototype coupon | VASTRA10 = 10% |
| Prototype coupon | FRESH20 = 20% |
| Free shipping threshold | ₹1,999 |
| Standard shipping below threshold | ₹99 |
| Express shipping | Supported as configurable checkout method |
| Standard delivery | 3–5 business days for major metros; 5–7 days for non-metro locations |
| Return window | 7 days from delivery |
| Return condition | Unworn, unwashed, unaltered, original tags/polybag |
| Exchange | Supported |
| Payment V1 | Demo online + COD |
| Future payment | Razorpay-compatible |
| Shipping V1 | Manual/provider abstraction |
| Future shipping | Shiprocket-compatible |
| Notifications V1 | Email abstraction / development provider |
| Reviews | Product reviews with moderation |
| CMS | Homepage/content/FAQ/SEO/navigation/campaign/editorial |
| Admin | Products, orders, inventory, customers, coupons, content, analytics |
| AI | Retail intelligence + editorial copy; provider isolated |
| Warehouse | Single logical warehouse in V1 |
| Inventory | On-hand, reserved, available |
| Reservation | During checkout/payment-sensitive order creation |
| Cancellation | Before shipment |
| Refund | Manual V1 |
| Analytics | Commerce and product interaction events |
| Audit | Admin/business mutations |

**Important:** Shipping charges, delivery ranges, coupons and other business values must be configurable in the backend even when the initial values are seeded to the prototype values.

---

# 5. CURRENT FRONTEND CONTRACT TO PRESERVE

The supplied frontend currently contains API-ready types for:

```text
ApiResponse<T>
PaginatedResponse<T>
ApiError

Product
ProductVariant
ProductFilterParams

CartItem
CartDiscount
CartSummary

OrderStatus
ShippingAddress
PaymentMethodType
OrderItem
CreateOrderPayload

AdminKPIs
InventoryAlert
DropConcept
```

The backend DTOs should map cleanly to these concepts.

Do not expose JPA entities directly.

Use:

```text
Request DTO
    ↓
Controller
    ↓
Application Service
    ↓
Domain / Entity
    ↓
Repository
    ↓
Response DTO
```

---

# 6. TECHNOLOGY STACK

Required:

- Java LTS compatible with selected Spring Boot version
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate/JPA
- PostgreSQL
- Spring Security
- Bean Validation
- Flyway
- JWT or secure server-side session strategy appropriate for the frontend
- BCrypt/Argon2-compatible password hashing
- JUnit 5
- Mockito where useful
- Testcontainers for PostgreSQL integration tests where practical
- OpenAPI/Swagger where compatible

Do not add dependencies without a concrete requirement.

---

# 7. PACKAGE STRUCTURE

Recommended:

```text
src/main/java/<base-package>/

common/
  exception/
  response/
  validation/
  security/
  audit/
  idempotency/
  util/
  pagination/

auth/
customer/
address/
catalog/
category/
collection/
inventory/
wishlist/
cart/
checkout/
coupon/
order/
payment/
shipping/
returnorder/
refund/
review/
cms/
blog/
notification/
analytics/
admin/
ai/
```

Use package-by-feature.

Do not create a giant generic:

```text
service/
repository/
controller/
```

package containing every feature.

---

# 8. DATABASE REQUIREMENTS

## 8.1 General rules

- PostgreSQL is authoritative.
- Use UUIDs for externally exposed identifiers where practical.
- Use timezone-aware timestamps.
- Store monetary values using `BigDecimal`.
- Store currency explicitly.
- Add created/updated timestamps to major entities.
- Use optimistic locking where concurrent updates can occur.
- Use foreign keys.
- Add appropriate indexes.
- Use database constraints in addition to Java validation.
- Never depend only on frontend validation.

## 8.2 Core entities

Minimum domain model:

```text
User
Role
UserRole
CustomerProfile
Address
AuthIdentity
OtpChallenge
EmailVerificationToken
PasswordResetToken

Category
Collection
Product
ProductVariant
ProductAttribute
ProductVariantAttribute
ProductMedia
ProductStatusHistory

Inventory
InventoryMovement
InventoryReservation

Wishlist
WishlistItem

Cart
CartItem
CartMergeLog

Coupon
CouponProduct
CouponCategory
CouponUsage

CheckoutSession

Order
OrderItem
OrderAddressSnapshot
OrderStatusHistory

Payment
PaymentAttempt
PaymentStatusHistory

Shipment
ShipmentEvent

ReturnRequest
ReturnItem
ExchangeRequest
ExchangeItem
Refund

Review
ReviewMedia
ReviewModeration

CmsPage
CmsSection
Banner
Campaign
Faq
SeoMetadata
NavigationItem
BlogPost

Notification
NotificationTemplate
NotificationLog

AnalyticsEvent
AuditLog

SystemSetting
IdempotencyRecord

AiInsight
AiGenerationRequest
AiGenerationResult
```

Only implement entities that are required by an actual feature.

---

# 9. CATALOG MODULE

## 9.1 Category

Support hierarchical categories.

Current prototype categories include:

```text
Oversized T-Shirts
Graphic Tees
Minimal Tees
Essentials
```

Future categories must not require schema redesign.

Fields:

```text
id
name
slug
description
parentId
image
displayOrder
active
seoMetadata
createdAt
updatedAt
```

## 9.2 Collection

Collections are merchandising groups independent of category.

Support:

- name
- slug
- description
- tagline
- cover image
- display order
- active status
- start/end dates if needed
- SEO metadata

Examples from the frontend:

```text
The Horizon Collection
Oversized Classics
Graphic Art Series / Graphic Series
Minimal Blanks / Minimal Series
```

Names should be managed through CMS/catalog data rather than hardcoded backend enums.

## 9.3 Product

Fields:

```text
id
slug
name
subtitle
description
shortDescription
categoryId
basePrice
originalPrice
fabric
gsm
fit
modelInfo
careInstructions
featured
isNew
isBestseller
isSale
status
publishedAt
archivedAt
createdAt
updatedAt
version
```

## 9.4 Product status

Use:

```text
DRAFT
SCHEDULED
ACTIVE
OUT_OF_STOCK
ARCHIVED
```

Rules:

- DRAFT is not publicly visible.
- SCHEDULED becomes visible only at publish time.
- ACTIVE is publicly sellable if stock exists.
- OUT_OF_STOCK is visible but not purchasable unless admin configuration says otherwise.
- ARCHIVED is not publicly discoverable.

## 9.5 Product variant

Current frontend expects:

```text
variantId
colorName
colorHex
size
sku
price
stock
image
```

Backend representation:

```text
ProductVariant
  ├── color
  ├── size
  ├── SKU
  ├── selling price
  ├── compare/original price if needed
  ├── inventory reference
  ├── image/media
  └── active
```

Do not hardcode the database to only two variant attributes even though V1 primarily uses color and size.

## 9.6 Size

Initial allowed sizes:

```text
S
M
L
XL
XXL
```

Size should be represented as catalog data or a controlled value so future size systems can be introduced cleanly.

## 9.7 Apparel attributes

Support product and variant metadata such as:

```text
fabric
gsm
fit
modelHeight
modelSize
careInstructions
construction
materialComposition
color
size
```

Do not put every fashion attribute into a dedicated database column if the attribute is clearly extensible; use a structured attribute model where appropriate.

---

# 10. PRODUCT MEDIA

Product media supports:

- primary image
- gallery images
- variant image
- editorial image
- video URL/reference if later enabled
- alt text
- display order

Backend stores media metadata and URLs/references.

The backend must not assume that local `/public/images/...` paths are permanent production storage.

Recommended abstraction:

```text
MediaReference
  provider
  key
  url
  altText
  type
  sortOrder
```

V1 may use local/static URLs.

Future object storage can be added without changing product business logic.

---

# 11. SEARCH AND FILTERING

## 11.1 V1 search

Basic keyword search must support:

- product name
- subtitle
- description
- SKU
- category
- collection
- searchable attributes

## 11.2 Filters

Support:

```text
category
collection
minPrice
maxPrice
minGsm
maxGsm
availability
color
size
rating
featured/new/bestseller/sale
```

## 11.3 Sorting

Support at minimum:

```text
featured
newest
price-asc
price-desc
rating
```

## 11.4 Pagination

Every public collection endpoint must support:

```text
page
size
sort
```

Enforce a safe maximum page size.

Never return the entire catalog by default.

---

# 12. WISHLIST

Support guest and authenticated wishlist.

Guest wishlist:

```text
secure guest identifier
client cache
server-compatible representation
```

Authenticated wishlist:

```text
customer
product/variant
createdAt
```

Duplicate entries are prohibited.

When guest logs in:

```text
Guest Wishlist
      +
Customer Wishlist
      ↓
validate active products
      ↓
deduplicate
      ↓
persist
```

---

# 13. CART

## 13.1 Cart item identity

The prototype treats:

```text
product + color + size
```

as a cart line identity.

Backend must use the sellable **variant/SKU** as the authoritative line identity.

Thus:

```text
same SKU → increment quantity
different SKU → separate cart line
```

## 13.2 Guest cart

Guest cart must use a secure cart token or equivalent identifier.

Do not use predictable customer IDs.

## 13.3 Authenticated cart

Customer cart persists in PostgreSQL.

## 13.4 Guest cart merge

On authentication:

```text
Guest Cart
    +
Customer Cart
    ↓
Validate variants
Validate active status
Validate current prices
Validate stock
    ↓
Merge matching SKUs
    ↓
Cap quantities to available stock
    ↓
Persist customer cart
```

If stock is insufficient, return a machine-readable conflict.

## 13.5 Cart totals

Backend calculates:

```text
subtotal
discount
shipping
tax if configured
grandTotal
```

Never trust frontend totals.

---

# 14. COUPONS

## 14.1 Initial demo coupons

Seed:

```text
VASTRA10
10% discount

FRESH20
20% discount
```

These are prototype/demo rules and must be stored as backend coupon records.

## 14.2 Coupon types

Support:

```text
PERCENTAGE
FIXED_AMOUNT
```

Eligibility rules:

```text
minimumOrderValue
productIds
categoryIds
startAt
endAt
usageLimit
perCustomerLimit
enabled
maximumDiscount
```

## 14.3 Coupon rule

Only one coupon may be applied to an order.

Backend validates:

- existence
- enabled state
- dates
- minimum order
- product eligibility
- category eligibility
- usage limits
- customer usage
- maximum discount
- duplicate application

---

# 15. SHIPPING

## 15.1 V1 shipping rule

Initial configured values:

```text
freeShippingThreshold = ₹1,999
standardShippingFee = ₹99
```

Rule:

```text
if eligibleSubtotal >= freeShippingThreshold:
    shipping = 0
else:
    shipping = standardShippingFee
```

## 15.2 Shipping methods

Support:

```text
STANDARD
EXPRESS
```

Express pricing and delivery estimate must be configurable.

The frontend currently demonstrates an Express option; backend must return the authoritative quote rather than trusting the browser's calculated ₹99 value.

## 15.3 Standard delivery estimate

Initial policy:

```text
Major metros:
3–5 business days

Non-metro:
5–7 business days
```

The exact estimate should be returned by the shipping service and snapshotted onto the order/shipment.

## 15.4 Provider abstraction

```java
interface ShippingProvider {
    ShippingQuote quote(ShippingQuoteRequest request);
    Shipment createShipment(ShipmentRequest request);
    TrackingInfo getTracking(String trackingNumber);
    void cancelShipment(String shipmentId);
}
```

V1:

```text
ManualShippingProvider
```

Future:

```text
ShiprocketShippingProvider
```

Do not hardcode courier API logic inside order services.

---

# 16. CHECKOUT

Checkout flow:

```text
Cart
 ↓
Validate cart
 ↓
Validate customer/address
 ↓
Calculate shipping quote
 ↓
Validate coupon
 ↓
Calculate authoritative totals
 ↓
Select payment
 ↓
Create checkout/order transaction
 ↓
Reserve inventory
 ↓
Payment processing
 ↓
Confirm order
 ↓
Send notification
```

Checkout must be idempotent.

The backend must prevent:

- duplicate orders
- stale prices
- overselling
- invalid coupon application
- unauthorized address access
- duplicate payment attempts

---

# 17. CUSTOMER ACCOUNTS

## 17.1 Authentication

V1 should support a production-ready abstraction for:

```text
Email + Password
Phone OTP
Google
```

If external OTP/Google providers are not enabled in V1, use provider interfaces and local/demo implementations.

## 17.2 Registration

Customer fields:

```text
name
email
phone
password
```

Email verification is required if email/password authentication is enabled.

Never store plaintext passwords.

## 17.3 Password reset

Flow:

```text
request
 ↓
short-lived token
 ↓
email
 ↓
validate
 ↓
new password
 ↓
invalidate token
```

## 17.4 OTP

Requirements:

- short expiration
- single use
- rate limit
- attempt limit
- no plaintext persistence
- invalidation after success

Development implementation may expose/log OTP only in explicitly non-production mode.

---

# 18. CUSTOMER PROFILE

Support:

```text
name
email
phone
profile metadata
createdAt
updatedAt
```

Customer may update their own profile.

Admin may view/manage customer data according to authorization rules.

---

# 19. ADDRESSES

Support multiple saved addresses.

Fields:

```text
id
customerId
fullName
phone
street
addressLine2
city
state
pincode
country
label
isDefault
createdAt
updatedAt
```

Rules:

- Customer can only access their own addresses.
- One default address per customer.
- Checkout must snapshot the selected address into the order.

---

# 20. ORDERS

## 20.1 Order lifecycle

Primary:

```text
PLACED
  ↓
CONFIRMED
  ↓
PROCESSING
  ↓
SHIPPED
  ↓
OUT_FOR_DELIVERY
  ↓
DELIVERED
```

Exception/terminal states:

```text
CANCELLED
RETURN_REQUESTED
RETURNED
REFUNDED
```

Do not allow arbitrary status changes.

## 20.2 Order snapshot

Order must preserve:

```text
product name
SKU
variant
color
size
unit price
original price
quantity
discount
shipping
tax
final price
shipping address
billing address
coupon
payment method
```

Historical orders must not change because product/catalog data changes later.

## 20.3 Order number

Use an internal UUID plus a human-readable order number.

Example:

```text
VST-2026-000001
```

The exact sequence format is configurable.

---

# 21. ORDER CANCELLATION

Customer cancellation is allowed before shipment.

```text
PLACED → CANCELLED
CONFIRMED → CANCELLED
PROCESSING → CANCELLED
```

Once:

```text
SHIPPED
```

normal customer cancellation is rejected.

Cancellation must:

- update order state
- release/restock inventory correctly
- initiate refund process for prepaid orders
- preserve status history
- create audit record

---

# 22. PAYMENTS

## 22.1 Payment methods

Frontend contract currently includes:

```text
UPI
CARD
NETBANKING
COD
```

For V1, online payment can operate through a demo provider while preserving the same state machine.

## 22.2 Provider architecture

```java
interface PaymentProvider {
    PaymentInitiationResult initiate(PaymentRequest request);
    PaymentVerificationResult verify(PaymentVerificationRequest request);
    RefundResult refund(RefundRequest request);
}
```

V1:

```text
DemoPaymentProvider
CodPaymentProvider
```

Future:

```text
RazorpayPaymentProvider
```

## 22.3 Payment states

```text
INITIATED
PENDING
SUCCESSFUL
FAILED
CANCELLED
REFUNDED
PARTIALLY_REFUNDED
```

## 22.4 Demo online payment

Development/demo flow may expose:

```text
Demo Success
Demo Failure
```

It must still execute the real backend payment state machine.

## 22.5 COD

COD is not paid at order placement.

Lifecycle:

```text
Order created
Payment = PENDING
      ↓
Delivered
      ↓
Admin confirms collection
      ↓
Payment = SUCCESSFUL
```

---

# 23. INVENTORY

## 23.1 Inventory model

V1 uses one logical warehouse.

Track:

```text
onHand
reserved
available
```

Invariant:

```text
available = onHand - reserved
```

Available stock must never be negative.

## 23.2 Inventory reservation

Reservation must be atomic.

Recommended flow:

```text
Validate stock
 ↓
Create payment attempt
 ↓
Reserve stock
 ↓
Complete/confirm payment
 ↓
Confirm order
```

On payment failure/cancellation/expiration:

```text
Release reservation
```

## 23.3 Inventory movements

Record:

```text
RESTOCK
RESERVATION
RESERVATION_RELEASE
SALE
CANCELLATION
RETURN
EXCHANGE
MANUAL_ADJUSTMENT
DAMAGED
```

Each movement stores:

```text
SKU
quantity
movementType
reference
reason
actor
timestamp
```

## 23.4 Low stock

Admin-configurable threshold.

Example:

```text
low-stock-threshold = 10
```

This is a configuration value, not a hardcoded UI rule.

---

# 24. RETURNS

## 24.1 Return window

Initial rule:

```text
7 days from delivery
```

## 24.2 Condition

Frontend policy requires returned garments to be:

- unworn
- unwashed
- unaltered
- original VASTRA tags attached
- original packaging/polybag intact

Backend should store the selected reason and customer confirmation/notes.

## 24.3 Return lifecycle

```text
REQUESTED
 ↓
APPROVED / REJECTED
 ↓
PICKUP_SCHEDULED
 ↓
RECEIVED
 ↓
INSPECTED
 ↓
REFUND_PENDING
 ↓
REFUND_INITIATED
 ↓
REFUND_COMPLETED
```

## 24.4 Return reasons

Initial values may include:

```text
SIZE_TOO_LARGE
SIZE_TOO_SMALL
COLOR_DIFFERENCE
CHANGED_MIND
DAMAGED
WRONG_ITEM
OTHER
```

Do not make the reason list impossible to extend.

---

# 25. EXCHANGE / SIZE REPLACEMENT

VASTRA is apparel-focused, so size exchange is a first-class backend operation.

Flow:

```text
Delivered order
 ↓
Customer requests exchange
 ↓
Validate 7-day window
 ↓
Validate item condition/eligibility
 ↓
Select replacement variant
 ↓
Check replacement inventory
 ↓
Admin approval
 ↓
Return original item
 ↓
Receive/inspect
 ↓
Create replacement transaction
```

Do not silently mutate the original order.

Create a traceable exchange/replacement record.

---

# 26. REFUNDS

V1 refunds may be manually recorded by Admin.

Refund fields:

```text
id
orderId
returnRequestId
amount
currency
method
reference
status
notes
processedBy
processedAt
```

Lifecycle:

```text
REFUND_PENDING
 ↓
REFUND_INITIATED
 ↓
REFUND_COMPLETED
```

Never allow:

```text
totalRefunded > refundableAmount
```

Future Razorpay refunds must fit the payment provider abstraction.

---

# 27. REVIEWS

## 27.1 Review fields

Support:

```text
customer
product
rating
title
body
media
status
moderatedBy
moderatedAt
createdAt
```

## 27.2 Moderation

Lifecycle:

```text
PENDING
 ↓
APPROVED → PUBLISHED

PENDING
 ↓
REJECTED
```

Only approved reviews are publicly returned.

Rating aggregation uses published reviews only.

## 27.3 Review media

Support:

- images
- videos

Media must be validated for type, size and safe storage.

---

# 28. CMS

Backend CMS supports:

```text
Homepage
Banners
Collections
Product editorial content
FAQs
SEO metadata
Navigation
Footer
Campaigns
Editorial content
```

CMS controls content.

It does not become a full visual page builder unless explicitly added later.

---

# 29. BLOG / EDITORIAL

Support:

```text
DRAFT
SCHEDULED
PUBLISHED
ARCHIVED
```

Fields:

```text
title
slug
content
coverMedia
author
publishAt
seoMetadata
status
```

---

# 30. CONTACT / SUPPORT INQUIRIES

The current frontend contains a contact form.

Production backend should support:

```text
SupportInquiry
```

Fields:

```text
id
name
email
phone optional
subject optional
message
customerId optional
status
createdAt
updatedAt
```

Statuses:

```text
OPEN
IN_PROGRESS
RESOLVED
CLOSED
```

Admin can manage inquiries.

Do not silently discard submitted contact messages.

---

# 31. NOTIFICATIONS

V1 channel:

```text
EMAIL
```

Provider:

```java
interface EmailProvider {
    void send(EmailMessage message);
}
```

V1:

```text
DevelopmentEmailProvider
```

Future:

```text
RealEmailProvider
```

Events:

```text
EMAIL_VERIFICATION
PASSWORD_RESET
ORDER_PLACED
ORDER_CONFIRMED
PAYMENT_SUCCESS
PAYMENT_FAILED
SHIPMENT_CREATED
ORDER_SHIPPED
OUT_FOR_DELIVERY
ORDER_DELIVERED
ORDER_CANCELLED
RETURN_REQUESTED
RETURN_APPROVED
RETURN_REJECTED
REFUND_INITIATED
REFUND_COMPLETED
EXCHANGE_APPROVED
```

Do not couple domain services directly to an email vendor.

---

# 32. ADMIN ROLES

Minimum roles:

```text
CUSTOMER
ADMIN
SUPER_ADMIN
```

## CUSTOMER

Can:

- manage own profile
- manage addresses
- browse products
- search/filter
- manage wishlist
- manage cart
- checkout
- view own orders
- cancel eligible orders
- request return
- request exchange
- view refunds
- submit reviews
- submit support inquiries

## ADMIN

Can:

- manage products
- categories
- collections
- inventory
- orders
- payments
- shipments
- returns
- exchanges
- refunds
- customers
- reviews
- coupons
- CMS
- campaigns
- support inquiries
- analytics
- notifications
- audit logs

## SUPER_ADMIN

Additionally:

- manage admin users
- manage roles
- security settings
- system configuration
- admin 2FA

---

# 33. ADMIN DASHBOARD

The current frontend dashboard exposes:

```text
Monthly Gross Revenue
Total Orders Fulfilled
Average Order Value
Store Conversion Rate
Recent Orders
Inventory Alerts
AI Retail Intelligence Digest
```

The backend must provide real values.

Never seed fake revenue/order history solely to make the dashboard look populated.

## Analytics metrics

At minimum:

```text
gross revenue
net revenue where applicable
orders
AOV
customers
active products
low stock count
returns
refunds
conversion rate where event data supports it
top products
top collections
category performance
```

---

# 34. ADMIN PRODUCT MANAGEMENT

Admin product APIs must support:

- create product
- update product
- publish
- schedule
- archive
- restore
- manage categories
- manage collections
- manage variants
- manage SKU
- manage prices
- manage media
- manage apparel attributes
- manage badges
- manage inventory linkage

The current admin UI searches by garment/SKU and filters by category.

Backend must support these queries.

---

# 35. ADMIN INVENTORY

Admin inventory page requires:

```text
SKU
Garment
Color
Size
Available units
Reserved units
Status
Restock action
```

Backend inventory API must support:

```text
inventory list
SKU search
product filter
size filter
color filter
low-stock filter
critical-stock filter
manual adjustment
restock
movement history
```

The prototype currently demonstrates restocking; production must create a real inventory movement rather than simply modifying client state.

---

# 36. ADMIN ORDER MANAGEMENT

Admin must be able to:

- list orders
- search by order number
- filter status
- filter payment status
- inspect customer
- inspect line items
- update fulfillment state
- create shipment
- add tracking number
- add courier
- update shipment events
- approve returns
- approve exchanges
- process manual refunds
- confirm COD collection

Every operational mutation must be audited.

---

# 37. SHIPPING AND TRACKING ADMIN

Manual V1 shipment fields:

```text
carrier
trackingNumber
shipmentDate
estimatedDelivery
trackingUrl
events
```

Customer tracking should return:

```text
status
carrier
trackingNumber
estimatedDelivery
timeline/events
```

Do not fabricate carrier events.

---

# 38. ANALYTICS EVENTS

Track at minimum:

```text
PRODUCT_VIEW
SEARCH
COLLECTION_VIEW
CATEGORY_VIEW
WISHLIST_ADD
WISHLIST_REMOVE
CART_ADD
CART_REMOVE
CART_UPDATE
CHECKOUT_START
CHECKOUT_COMPLETE
PURCHASE
ORDER_CANCELLED
RETURN_REQUESTED
EXCHANGE_REQUESTED
REVIEW_SUBMITTED
COUPON_APPLIED
```

Event payload may contain:

```text
anonymousId
customerId
sessionId
eventType
productId
variantId
collectionId
metadata
timestamp
```

Do not store unnecessary personal data.

---

# 39. AI RETAIL INTELLIGENCE

The existing admin frontend contains an AI retail intelligence screen.

It should support backend-driven insight categories including:

```text
inventory forecast
review sentiment
style/color velocity
editorial copy generation
```

## 39.1 AI architecture

```text
ai/
  assistant/
  recommendation/
  retail/
  editorial/
  context/
  provider/
```

## 39.2 AI provider abstraction

```java
interface AIProvider {
    AIResult generate(AIRequest request);
}
```

Development:

```text
MockAIProvider
```

Future:

```text
RealAIProvider
```

## 39.3 AI truth rules

AI must never invent authoritative:

- inventory
- product price
- order status
- payment status
- shipment status
- refund status
- product specification
- return policy

AI should obtain these values from backend services.

## 39.4 Editorial copy generator

The current admin UI expects:

```text
input
generation state
generated copy
copy-to-clipboard
```

Backend generation result should support:

```text
tagline
productDescription
instagramCaption
```

and optionally:

```text
mockupPrompt
mockupUrl
```

AI output is untrusted content and must be safely rendered by the frontend.

---

# 40. AI RETAIL INSIGHTS

Possible backend insight records:

```text
InventoryForecastInsight
ReviewSentimentInsight
StyleVelocityInsight
ColorVelocityInsight
EditorialInsight
```

Each should retain:

```text
generatedAt
sourceDataWindow
confidence/quality metadata where available
summary
structuredRecommendations
```

The backend must distinguish:

```text
observed metric
calculated metric
AI-generated interpretation
```

Do not present AI interpretation as raw fact.

---

# 41. API DESIGN

Base path:

```text
/api/v1
```

Standard success:

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "timestamp": "2026-10-02T12:00:00Z"
}
```

Standard error:

```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_OUT_OF_STOCK",
    "message": "The selected variant is currently unavailable.",
    "details": {}
  },
  "timestamp": "2026-10-02T12:00:00Z",
  "traceId": "..."
}
```

Do not expose stack traces.

---

# 42. API MODULES

Minimum public groups:

```text
/api/v1/auth/*
/api/v1/customers/*
/api/v1/addresses/*
/api/v1/categories/*
/api/v1/collections/*
/api/v1/products/*
/api/v1/search/*
/api/v1/wishlist/*
/api/v1/cart/*
/api/v1/checkout/*
/api/v1/coupons/*
/api/v1/orders/*
/api/v1/payments/*
/api/v1/shipments/*
/api/v1/returns/*
/api/v1/exchanges/*
/api/v1/refunds/*
/api/v1/reviews/*
/api/v1/support/*
/api/v1/cms/*
/api/v1/blog/*
/api/v1/notifications/*
/api/v1/analytics/*
/api/v1/ai/*
/api/v1/admin/*
```

Admin APIs must be protected and explicitly separated.

---

# 43. CORE API CONTRACTS

## Authentication

```text
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
POST /auth/verify-email
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/request-otp
POST /auth/verify-otp
POST /auth/google
```

## Customer

```text
GET  /customers/me
PUT  /customers/me
GET  /customers/me/addresses
POST /customers/me/addresses
PUT  /customers/me/addresses/{id}
DELETE /customers/me/addresses/{id}
```

## Catalog

```text
GET /products
GET /products/{slug}
GET /products/{id}/variants
GET /categories
GET /categories/{slug}
GET /collections
GET /collections/{slug}
GET /search
```

## Wishlist

```text
GET /wishlist
POST /wishlist/items
DELETE /wishlist/items/{variantId}
POST /wishlist/merge
```

## Cart

```text
GET /cart
POST /cart/items
PATCH /cart/items/{id}
DELETE /cart/items/{id}
POST /cart/merge
POST /cart/coupon
DELETE /cart/coupon
```

## Checkout

```text
POST /checkout/validate
POST /checkout/quote
POST /checkout/order
```

## Payments

```text
POST /payments/initiate
POST /payments/{id}/demo-result
GET  /payments/{id}
```

Future:

```text
POST /payments/webhook/razorpay
```

Do not implement Razorpay webhook in V1 unless explicitly enabled.

## Orders

```text
GET  /orders
GET  /orders/{id}
POST /orders/{id}/cancel
POST /orders/{id}/return
POST /orders/{id}/exchange
```

## Reviews

```text
GET  /products/{productId}/reviews
POST /products/{productId}/reviews
```

## Support

```text
POST /support/inquiries
GET  /support/inquiries/{id}
```

Customer must only access their own inquiry.

## AI

```text
POST /ai/editorial/generate
GET  /ai/insights
POST /ai/retail/forecast
POST /ai/retail/sentiment
```

Exact AI endpoints may be refined after core commerce is stable.

## Admin

```text
GET/POST/PATCH /admin/products
GET/POST/PATCH /admin/categories
GET/POST/PATCH /admin/collections
GET/PATCH       /admin/inventory
GET/PATCH       /admin/orders
GET/PATCH       /admin/payments
GET/PATCH       /admin/shipments
GET/PATCH       /admin/returns
GET/PATCH       /admin/exchanges
GET/PATCH       /admin/refunds
GET/PATCH       /admin/reviews
GET/POST/PATCH  /admin/coupons
GET/POST/PATCH  /admin/cms
GET/POST/PATCH  /admin/blog
GET/PATCH       /admin/customers
GET              /admin/analytics
GET              /admin/audit-logs
GET/POST/PATCH   /admin/users
GET/PATCH        /admin/settings
GET              /admin/ai/*
```

---

# 44. ERROR CODES

Stable machine-readable codes:

```text
AUTH_INVALID_CREDENTIALS
AUTH_EMAIL_NOT_VERIFIED
AUTH_OTP_EXPIRED
AUTH_OTP_INVALID
AUTH_TOKEN_EXPIRED

CUSTOMER_NOT_FOUND
ADDRESS_NOT_FOUND
ADDRESS_NOT_OWNED

PRODUCT_NOT_FOUND
PRODUCT_NOT_ACTIVE
PRODUCT_OUT_OF_STOCK
VARIANT_NOT_FOUND
SKU_NOT_FOUND

CART_NOT_FOUND
CART_ITEM_NOT_FOUND
CART_STOCK_CHANGED
CART_PRICE_CHANGED

COUPON_INVALID
COUPON_EXPIRED
COUPON_NOT_ELIGIBLE
COUPON_ALREADY_APPLIED
COUPON_USAGE_LIMIT_REACHED

CHECKOUT_INVALID
SHIPPING_UNAVAILABLE
SHIPPING_METHOD_INVALID

PAYMENT_FAILED
PAYMENT_PENDING
PAYMENT_ALREADY_PROCESSED
PAYMENT_INVALID_STATE

ORDER_NOT_FOUND
ORDER_CANNOT_CANCEL
ORDER_ALREADY_CANCELLED
ORDER_INVALID_STATE

RETURN_NOT_ELIGIBLE
RETURN_WINDOW_EXPIRED
RETURN_ALREADY_REQUESTED
RETURN_ITEM_INVALID

EXCHANGE_NOT_ELIGIBLE
EXCHANGE_OUT_OF_STOCK

REFUND_AMOUNT_EXCEEDED
REFUND_INVALID_STATE

REVIEW_NOT_FOUND
REVIEW_NOT_MODERATED

SUPPORT_INQUIRY_NOT_FOUND

FORBIDDEN
RESOURCE_NOT_FOUND
VALIDATION_ERROR
CONFLICT
RATE_LIMITED
INTERNAL_ERROR
```

---

# 45. IDEMPOTENCY

Mandatory for:

- order creation
- payment initiation
- payment result processing
- future payment webhooks
- refund creation
- exchange creation where financial/inventory mutation occurs
- inventory-sensitive mutations

Use an idempotency key.

Repeated requests with the same valid key must not create duplicate transactions.

---

# 46. CONCURRENCY

Critical race conditions:

```text
two customers buying the last SKU
simultaneous checkout
guest cart merge
duplicate payment result
duplicate webhook
duplicate refund
duplicate order submission
simultaneous exchange requests
```

Use:

- transactions
- row locking where necessary
- optimistic locking
- unique database constraints
- idempotency

Inventory reservation must be atomic.

---

# 47. SECURITY

Mandatory:

- secure authentication
- password hashing
- authorization
- ownership checks
- validation
- rate limiting for authentication-sensitive APIs
- explicit CORS
- CSRF strategy appropriate to auth architecture
- secure headers
- no secrets in source control
- no secrets in frontend
- safe error responses
- protection against IDOR
- SQL injection protection through parameterized ORM/repository operations
- secure media validation
- audit logging for sensitive admin actions

Customers can access only their own:

```text
profile
addresses
cart
wishlist
orders
returns
exchanges
refund information
support inquiries
```

Admin authorization must be server-side.

---

# 48. ADMIN 2FA

Admin accounts should support TOTP-based MFA.

Requirements:

- secure secret storage
- recovery mechanism
- verification on admin authentication
- audit of security changes

Do not store plaintext MFA secrets.

If TOTP is not implemented in the first development slice, keep the security architecture ready for it and explicitly track it as a required hardening item.

---

# 49. AUDIT LOGGING

Audit:

- product price changes
- product status changes
- inventory adjustments
- order status changes
- shipment changes
- refund changes
- return approvals/rejections
- exchange approvals/rejections
- coupon changes
- admin user changes
- permission changes
- security changes
- CMS changes

Audit fields:

```text
actorId
action
entityType
entityId
beforeValue
afterValue
timestamp
requestId
safeRequestMetadata
```

Never log:

- passwords
- OTPs
- payment credentials
- secrets
- access tokens
- private keys

---

# 50. CONFIGURATION

Business settings must not be hardcoded in controllers/services.

Initial settings:

```text
shipping.free-threshold = 1999
shipping.standard-fee = 99
shipping.express-fee = configurable
shipping.metro-min-days = 3
shipping.metro-max-days = 5
shipping.nonmetro-min-days = 5
shipping.nonmetro-max-days = 7
inventory.low-stock-threshold = configurable
inventory.reservation-timeout = configurable
returns.window-days = 7
```

Use:

- environment variables for secrets
- application configuration for infrastructure
- database-backed settings for admin-configurable business rules

---

# 51. DATABASE MIGRATIONS

Use Flyway.

Rules:

- every schema change gets a migration
- never edit an already-applied migration
- migrations are sequential and descriptive
- seed data is deterministic
- development credentials are not production credentials

Example:

```text
V1__initial_schema.sql
V2__seed_roles.sql
V3__catalog.sql
V4__inventory.sql
V5__cart_wishlist.sql
V6__orders_payments.sql
...
```

---

# 52. SEED DATA

Development/demo environment should seed:

```text
roles
admin
super admin
customer
categories
collections
approved VASTRA products
product variants
SKUs
inventory
coupons
shipping settings
FAQs
basic CMS content
```

The production catalog should use the final approved VASTRA catalog rather than temporary demo-only records.

Do not create fake revenue/order history solely to populate the dashboard.

---

# 53. FRONTEND INTEGRATION RULES

The current frontend uses client-side React context as a prototype state layer.

Production architecture:

```text
Next.js UI
   ↓
Typed API client
   ↓
VASTRA Spring Boot REST API
   ↓
Application services
   ↓
PostgreSQL
```

The frontend should remain visually unchanged when mock data is replaced.

Backend DTOs must be:

- stable
- predictable
- typed
- frontend-friendly
- independent of JPA entities

---

# 54. CART FRONTEND MIGRATION

Prototype actions include:

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

Production mapping:

```text
addToCart       → POST /cart/items
removeFromCart  → DELETE /cart/items/{id}
updateQuantity  → PATCH /cart/items/{id}
applyCoupon     → POST /cart/coupon
removeCoupon    → DELETE /cart/coupon
createOrder     → POST /checkout/order
```

UI state may remain client-side for interaction, but backend is authoritative.

---

# 55. API PAGINATION

Recommended response:

```json
{
  "items": [],
  "total": 100,
  "page": 0,
  "pageSize": 20,
  "totalPages": 5,
  "hasMore": true
}
```

Never permit unlimited public queries.

---

# 56. API VERSIONING

Base:

```text
/api/v1
```

Do not break frontend contracts without explicit migration.

Breaking changes require:

- versioning
- migration
- compatibility period where appropriate

---

# 57. OBSERVABILITY

V1:

- structured logs
- request ID / trace ID
- meaningful error logging
- health endpoint
- no sensitive logging

Do not add a complex observability stack unless required.

---

# 58. API DOCUMENTATION

Use OpenAPI/Swagger.

Document:

- authentication
- authorization
- DTOs
- validation
- pagination
- errors
- state transitions
- admin/customer permissions
- idempotency
- important business rules

Documentation must reflect implemented behavior.

---

# 59. TESTING STRATEGY

## 59.1 Unit tests

Test:

- product visibility
- variant selection
- price calculation
- coupon calculation
- shipping calculation
- cart merge
- inventory availability
- inventory reservation
- order state transitions
- payment state transitions
- cancellation
- return eligibility
- exchange eligibility
- refund limits
- authorization
- product scheduling

## 59.2 Integration tests

At minimum:

```text
registration
login
catalog
product detail
search
wishlist
guest cart
authenticated cart
cart merge
coupon
checkout quote
order creation
inventory reservation
demo payment success
demo payment failure
COD
order cancellation
manual shipment
tracking
return
exchange
refund
review moderation
admin authorization
support inquiry
```

Use PostgreSQL-compatible integration testing where practical.

---

# 60. CRITICAL BUSINESS TEST CASES

## 60.1 Shipping

```text
subtotal = ₹2,000
free threshold = ₹1,999

Expected:
shipping = ₹0
```

```text
subtotal = ₹1,800
free threshold = ₹1,999

Expected:
shipping = ₹99
```

## 60.2 Cart merge

```text
Guest:
SKU-A = 2

Customer:
SKU-A = 1

Stock:
5

Expected:
SKU-A = 3
```

If:

```text
Guest = 4
Customer = 3
Stock = 5
```

Expected:

```text
final quantity <= 5
no overselling
clear conflict/adjustment response
```

## 60.3 Inventory

```text
onHand = 10
reserved = 2
available = 8
```

Reserve 3:

```text
reserved = 5
available = 5
```

Release 3:

```text
reserved = 2
available = 8
```

## 60.4 COD

```text
Order created
Payment = PENDING
Delivery completed
Admin confirms collection
Payment = SUCCESSFUL
```

## 60.5 Cancellation

Before shipment:

```text
Allowed
```

After shipment:

```text
Rejected
```

## 60.6 Return

Delivered within 7 days:

```text
Eligible
```

Delivered after 7 days:

```text
Not eligible
```

## 60.7 Exchange

Requested replacement SKU unavailable:

```text
Reject exchange / require alternative variant
```

## 60.8 Coupon

Two coupons:

```text
Rejected
```

## 60.9 Review

Submitted:

```text
PENDING
```

Admin approves:

```text
PUBLISHED
```

---

# 61. IMPLEMENTATION PHASES

## Phase 0 — Repository audit

Deliver:

- repository assessment
- frontend API contract inventory
- current mock-state inventory
- backend status
- package plan
- database plan
- configuration plan

No major implementation before this audit.

## Phase 1 — Backend foundation

Implement:

- Spring Boot
- PostgreSQL
- Flyway
- package structure
- configuration
- health endpoint
- global errors
- validation
- API response format
- OpenAPI

## Phase 2 — Authentication + RBAC

Implement:

- registration
- login
- logout
- refresh/session
- email verification
- password reset
- OTP abstraction
- Google abstraction
- customer roles
- admin authorization
- admin 2FA foundation

## Phase 3 — Catalog

Implement:

- categories
- collections
- products
- variants
- sizes
- colors
- SKUs
- apparel attributes
- media
- product status
- scheduling
- public catalog APIs
- admin catalog APIs

## Phase 4 — Inventory

Implement:

- on-hand
- reserved
- available
- movements
- reservations
- release
- restock
- low-stock
- admin inventory

## Phase 5 — Wishlist + Cart

Implement:

- guest wishlist
- customer wishlist
- guest cart
- customer cart
- merge
- quantity rules
- SKU identity
- stock validation
- authoritative totals

## Phase 6 — Search + Coupons

Implement:

- keyword search
- filters
- sorting
- pagination
- coupons
- eligibility
- discount calculation

## Phase 7 — Checkout + Shipping

Implement:

- address validation
- shipping quote
- standard shipping
- express shipping abstraction
- delivery estimate
- checkout validation
- checkout session

## Phase 8 — Payments + Orders

Implement:

- payment abstraction
- demo online
- COD
- payment states
- order creation
- order state machine
- cancellation
- idempotency

## Phase 9 — Shipment + Tracking

Implement:

- manual shipment
- tracking number
- courier
- tracking events
- customer tracking
- shipping abstraction

## Phase 10 — Returns + Exchanges + Refunds

Implement:

- 7-day eligibility
- return request
- admin approval
- pickup state
- inspection
- exchange
- replacement SKU
- manual refund

## Phase 11 — Reviews + CMS + Editorial

Implement:

- reviews
- moderation
- review media
- CMS
- banners
- collections content
- FAQs
- SEO
- navigation/footer
- blog/editorial

## Phase 12 — Support + Notifications

Implement:

- support inquiries
- email abstraction
- development email provider
- order emails
- shipping emails
- return/refund emails

## Phase 13 — Analytics + Audit + Admin Dashboard

Implement:

- analytics events
- dashboard KPIs
- top products
- collection/category metrics
- inventory alerts
- audit logs

## Phase 14 — AI Retail Intelligence

Only after core commerce is stable.

Implement:

- inventory forecast insight
- review sentiment
- style/color velocity
- editorial copy generation
- AI provider abstraction
- controlled service access

## Phase 15 — Hardening

Run:

- unit tests
- integration tests
- concurrency tests
- security review
- idempotency tests
- migration verification
- API contract review
- frontend integration tests
- performance checks

## Phase 16 — Future provider readiness

Validate that:

```text
DemoPaymentProvider
      ↓
RazorpayPaymentProvider
```

and:

```text
ManualShippingProvider
      ↓
ShiprocketShippingProvider
```

can replace V1 providers without rewriting checkout/order business logic.

---

# 62. DEFINITION OF DONE

A backend module is complete only when:

- code compiles
- migration works
- endpoint works
- validation exists
- authorization exists
- business rules are server-side
- errors are handled
- critical tests exist
- no placeholder TODO is counted as implementation
- API documentation is updated
- frontend contract is clear
- logs are meaningful
- sensitive data is protected
- concurrency behavior is considered
- idempotency is implemented where required

---

# 63. GLOBAL DO-NOT-DO LIST

The implementation agent MUST NOT:

- create microservices
- redesign the VASTRA frontend
- change frontend routes unnecessarily
- trust frontend prices
- trust frontend stock
- trust frontend payment status
- trust frontend order status
- expose JPA entities
- store plaintext passwords
- store plaintext OTPs
- expose secrets
- allow negative inventory
- allow overselling
- create duplicate financial transactions
- allow multiple coupons
- mark COD as paid before collection confirmation
- allow normal cancellation after shipment
- allow returns after 7 days
- publish unmoderated reviews
- fabricate tracking events
- fabricate analytics
- create fake revenue merely for dashboard appearance
- make paid external integrations mandatory in V1
- implement Razorpay before the provider seam is stable
- implement Shiprocket before the provider seam is stable
- implement complex AI before core commerce is stable
- introduce unnecessary Redis/Kafka/Elasticsearch/Kubernetes
- scatter business rules across controllers
- put business calculations in the frontend
- create arbitrary business rules not defined by this SRS
- break the frontend API contract without versioning

---

# 64. PROVIDER REPLACEMENT CONTRACTS

## Payment

```text
PaymentProvider
    |
    +-- DemoPaymentProvider [V1]
    +-- CodPaymentProvider [V1]
    +-- RazorpayPaymentProvider [Future]
```

## Shipping

```text
ShippingProvider
    |
    +-- ManualShippingProvider [V1]
    +-- ShiprocketShippingProvider [Future]
```

## Email

```text
EmailProvider
    |
    +-- DevelopmentEmailProvider [V1]
    +-- RealEmailProvider [Future]
```

## AI

```text
AIProvider
    |
    +-- MockAIProvider [development]
    +-- RealAIProvider [future]
```

Customer-facing business services must depend on interfaces, not concrete providers.

---

# 65. LOCAL / COLLEGE-PROJECT DEPLOYMENT CONSTRAINT

The codebase must be production-quality in architecture without requiring production infrastructure.

V1 must run with:

```text
Java
Spring Boot
PostgreSQL
```

Optional:

```text
Docker Compose
```

Do not require:

```text
Kubernetes
Kafka
Redis
Elasticsearch
Cloud queues
Paid monitoring
Paid APIs
Paid payment gateway
Paid shipping gateway
```

---

# 66. FRONTEND-BACKEND CONTRACT PRINCIPLES

The existing VASTRA prototype is a frontend source of truth for:

- route structure
- visual hierarchy
- interaction
- client-side state shape
- product display
- cart display
- checkout display
- order display
- admin display

The backend is the source of truth for:

- actual data
- prices
- discounts
- inventory
- customer identity
- authorization
- checkout
- payments
- orders
- returns
- exchanges
- refunds
- shipping
- analytics
- admin operations

Therefore:

```text
Prototype UI
     ↓
Typed API client
     ↓
VASTRA Backend
     ↓
PostgreSQL
```

---

# 67. FINAL IMPLEMENTATION PRIORITY

Use this priority:

```text
Correctness
    >
Security
    >
Inventory / financial data integrity
    >
Business rules
    >
API stability
    >
Frontend compatibility
    >
Testability
    >
Performance
    >
Convenience
```

Do not optimize prematurely.

Do not add architecture merely because it sounds production-grade.

---

# 68. FINAL AGENT INSTRUCTION

Build VASTRA as a clean, testable, modular Spring Boot monolith backed by PostgreSQL.

The backend must integrate with the existing Next.js VASTRA frontend without changing the approved visual experience.

The implementation must preserve:

- VASTRA product structure
- oversized apparel variants
- size/color/SKU relationships
- 240 GSM/fabric/fit metadata
- collections
- product discovery
- wishlist
- cart
- checkout
- shipping
- payment
- order tracking
- returns
- size exchange
- refunds
- reviews
- support
- CMS
- admin
- inventory
- analytics
- AI retail intelligence

The final architecture must be simple enough to run locally while keeping clean provider seams for:

```text
Razorpay
Shiprocket
Real email
Real AI
Object storage
```

The target is not a fake prototype backend.

The target is a **real VASTRA commerce backend that can replace the prototype's mock/client state and serve the existing frontend reliably.**

---

# 69. SOURCE-OF-TRUTH NOTES

The VASTRA frontend PRD states that the existing prototype is the visual and interaction source of truth and requires API abstraction so mock data can be replaced without changing the UI.

The frontend also defines the production principle:

```text
Server/API = source of truth
Client state = UI/cache/optimistic interaction layer
```

The backend implementation must therefore own all business-critical calculations and persistence.

The reference backend SRS establishes the modular-monolith, provider-adapter, PostgreSQL, REST, security, idempotency, inventory reservation and testing patterns used as the engineering baseline for this VASTRA SRS.

---

# 70. END STATE

When this SRS is fully implemented:

```text
                    VASTRA
                       |
        +--------------+--------------+
        |                             |
        v                             v
   Next.js Storefront             Admin Portal
        |                             |
        +--------------+--------------+
                       |
                  REST /api/v1
                       |
                       v
              Spring Boot Monolith
                       |
        +--------------+--------------+
        |              |              |
        v              v              v
     Catalog        Commerce       Operations
        |              |              |
        v              v              v
    Products       Cart/Order      Admin/CMS
    Variants       Payment         Inventory
    Collections    Shipping        Analytics
                   Returns         AI
        |
        v
    PostgreSQL
```

The backend is complete only when the existing VASTRA frontend can replace its prototype/mock state with these APIs while retaining the same user-facing product experience.
