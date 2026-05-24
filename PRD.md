# Wix Stores Re-Commerce
### Buy Backs and Second-Hand Marketplace
Product requirements 


**Status:** Draft  |  **Owner:** AdamWalker-112358  |  **Last updated:** 2026-05-24

---

## 1. Project Details

### Document History

| Version | Date | Description |
|---------|------|-------------|
| 0.1 | 2026-05-23 | Initial prototype PRD — dashboard shell, Buy Backs module, detail views |
| 0.2 | 2026-05-24 | Rewrite incorporating re-commerce business context and full PRD structure |

### Stakeholders

[ASSUMPTION: Cross-functional stakeholders have not yet been named. The following roles should be assigned before this PRD is reviewed for production investment.]

| Role | Name |
|------|------|
| Product | Adam Walker |
| Engineering | TBD |
| Design | TBD |
| QA | TBD |
| Payments / Platform | TBD |
| Sales / Customer Success | TBD |

### Timeline

Two parallel workstreams:

**Prototype (current round):** Static HTML demo covering the full Buy Backs module and dashboard depth improvements. [ASSUMPTION: 3–4 weeks from kick-off.]

**Production (following prototype validation and discovery):** Phased delivery — see Phases and Release Details in §2.

| Milestone | Scope | Target |
|-----------|-------|--------|
| M1 — Detail views | Order, Product, Contact detail pages | TBD |
| M2 — Placeholder fill | 5 placeholder pages with mocked content | TBD |
| M3 — Interactivity | Setup checklist, Inbox, search/filter, notifications | TBD |
| M4 — Polish | Mobile responsiveness, a11y, empty states | TBD |

### Resources

[ASSUMPTION: No Figma files, Linear tickets, or external links have been created for this initiative. The following should be added as they become available.]

- Figma designs: TBD
- Linear project: TBD
- Carrier API options: TBD
- Market sizing analysis: TBD

---

## 2. Business Requirements

### Business Context and Motivation

The global second-hand and re-commerce market is growing rapidly across verticals — electronics, fashion, sporting goods, and home goods — driven by consumer price sensitivity, sustainability awareness, and the mainstreaming of pre-owned goods. Platforms like Back Market, Swappa, and ThredUp have demonstrated significant demand for vertically-focused recommerce, while horizontal marketplaces (eBay, Facebook Marketplace) serve the long tail.

Wix Stores currently has no native capability for recommerce. Merchants who want to operate a buy-back or trade-in program must manage intake manually — email, spreadsheets, custom forms — and use entirely separate tools for logistics, credit issuance, and pre-owned inventory listing. This creates a structural acquisition gap: recommerce-focused businesses are not natural Wix users today because Wix does not solve their core operational problem.

A native buy-back capability closes this gap and creates three compounding advantages for Wix:

1. It opens a new merchant acquisition channel in a growing market segment.
2. Every credit redemption is a purchase processed through Wix Payments, increasing payment processing volume without new merchant acquisition cost.
3. The recommerce cycle — intake, fulfillment, relisting, sale — deepens merchant engagement with Wix Stores far beyond a typical transactional relationship.

### Existing State

Wix Stores today supports product catalog management, order management, fulfillment, customer contact records, store credit and coupon issuance, and payment processing.

[ASSUMPTION: No native buy-back, trade-in, or recommerce workflow exists in the current product. Merchants attempting a buy-back program today do so manually: communicating via email, issuing store credit through the existing manual coupon tool with no link to the originating request, arranging shipping independently, and listing accepted items as standard new products with no pre-owned designation.]

There is no "Sell to us" customer-facing form natively. There is no intake workflow, condition-review process, or pre-owned inventory label in the current product.

### Problems We Are Solving

1. **Merchants have no structured way to purchase items back from customers.** A merchant who wants to operate a buy-back program manages intake manually with no visibility into request status, proposed prices, or fulfillment state across multiple requests.

2. **Accepted buy-back items cannot be distinguished from new inventory.** There is no native concept of "pre-owned" in the product catalog. Merchants cannot label, price, or present used items distinctly from new ones within the same store.

3. **Credits issued for buy-backs are disconnected from the buy-back workflow.** Issuing store credit today requires manual coupon creation with no link to the originating buy-back, making reconciliation impossible at scale and creating no feedback loop on credit redemption.

4. **The recommerce cycle is fragmented across tools.** Intake, logistics, condition review, credit issuance, and relisting each require a separate tool or manual step. There is no single workflow that takes a buy-back request from customer submission through to a relisted pre-owned product.

### Customer Asks

[ASSUMPTION: No specific customer signals — Linear IDs, merchant quotes, or support patterns — have been cited in the source material. The following represent the expected evidence pattern. Actual data must be collected before this moves past prototyping. This is the highest-priority gap in this PRD.]

Expected signal types to gather:
- Merchant requests for trade-in or buy-back functionality in the Wix community forum and support channels
- Inbound sales inquiries from recommerce-focused businesses evaluating Wix as a platform
- Support tickets from merchants attempting manual workarounds for buy-back programs
- Win/loss data on deals where recommerce capability was cited as a differentiator

### Use Cases

**UC-1 — Merchant receives and processes a buy-back request**

Trigger: A customer submits a buy-back request (via storefront form or any channel).
Action: Merchant opens the Requests page, reviews the submission (product details, stated condition, photos), enters a proposed price denominated in store credit, and sends the proposal to the customer.
Outcome: Customer approves or declines. On approval, a carrier pickup is scheduled and the request moves to Receivables as In Transit.

**UC-2 — Merchant reviews a received item and issues credit**

Trigger: A buy-back shipment arrives at the merchant's location.
Action: Merchant opens Receivables, compares the physical item's condition against the customer's submission. If it matches, approves the item and issues a store-credit coupon equal to the proposed price.
Outcome: Customer receives a coupon redeemable in the merchant's store. Merchant has a verified item ready to relist.

**UC-3 — Merchant relists an approved item as pre-owned inventory**

Trigger: An approved buy-back item is staged for resale.
Action: Merchant sets a pre-owned price (typically below the new equivalent), attaches item-specific photos, and publishes the listing to the store with a "Pre-owned" designation.
Outcome: The item appears in the merchant's storefront alongside new inventory, priced and labeled for the second-hand market.

**UC-4 — Price-sensitive customer purchases a pre-owned item**

Trigger: A customer browsing the store encounters a pre-owned item listed at a discount.
Action: Customer purchases through the standard checkout flow.
Outcome: Merchant earns margin on the pre-owned item. Customer accesses a product at a lower price point, potentially converting a customer who would not have purchased at full price.

**UC-5 — Customer redeems store credit earned through a buy-back**

Trigger: A customer with an unused buy-back coupon returns to the store.
Action: Customer applies the coupon at checkout, reducing the total of a subsequent purchase.
Outcome: Merchant retains the customer for a repeat transaction. Credit may fund a cart larger than its face value, increasing revenue per returning customer.

### Personas

**Primary — The Recommerce Merchant (acquisition target)**

[ASSUMPTION: A merchant operating a dedicated buy-back or second-hand program. Examples: a specialty electronics reseller, a fashion consignment store, a sporting goods merchant with a trade-in program. Has existing buy-back operations they want to centralize. Not currently a Wix user because Wix lacks the workflow tooling they need. High-value acquisition target for this feature.]

**Secondary — The Established Wix Retailer**

An existing Wix merchant with a physical product store who wants to expand into recommerce as an additional revenue stream. Represents a significant existing user base. Riya (introduced in §4 of the original prototype PRD — 20+ products, ~50 orders/month) is the archetype here.

**Secondary — The New Shop Owner**

A newer Wix merchant using buy-backs primarily as a customer retention and differentiation mechanism. Maya (sells handmade ceramics, non-technical) is the archetype. Less likely to run a high-volume buy-back program; more interested in the credit retention mechanic.

**Excluded — Digital product merchants.** Digital products have no physical condition, cannot be meaningfully bought back, and would create abuse vectors. Buy-back eligibility is explicitly limited to physical products.

### High-Level Solution

A native buy-back / recommerce module within Wix Stores, added as a top-level sidebar pillar with four sub-sections:

1. **Requests** — intake and pricing workflow, from customer submission through merchant proposal and customer approval
2. **Receivables** — fulfillment workflow, from carrier transit through condition review and store-credit coupon issuance
3. **Relisting** — pre-owned inventory management: staging, pricing, and publishing approved items alongside new inventory
4. **Analytics** — program health visibility: credits issued vs. redeemed, buy-back volume, pre-owned revenue, net profit

**Key design decisions baked into the solution:**

- Buy-back requests are scoped to the merchant's accepted product categories but are not restricted to items originally purchased from that merchant. A merchant selling Apple products accepts any iPhone regardless of purchase origin. This broadens supply and positions the merchant as a category-level recommerce hub rather than a returns desk.
- All payouts are denominated in store credit (coupons), not cash. This funds the program from inventory and biases customers toward repeat purchases rather than cash extraction.
- Digital products are excluded from buy-back eligibility by design. The risk of abuse (submitting the same digital purchase repeatedly) outweighs any benefit.

### Strategy Around the Solution

[ASSUMPTION: This initiative aligns with a Wix platform strategy of becoming the end-to-end commerce operating system for small and mid-sized businesses. Four strategic levers:

1. **New merchant acquisition:** Recommerce-focused businesses are currently not Wix users because Wix lacks intake and workflow tooling. A native module creates a credible reason to switch.
2. **Payment processing volume:** Every buy-back credit redemption is a purchase processed through Wix Payments. Recommerce drives repeat transactions at no incremental acquisition cost.
3. **Platform stickiness:** Merchants running active buy-back programs engage with Wix more frequently (daily intake, condition review, relisting) than merchants who only manage outbound orders.
4. **Customer lifetime value extension:** Store credit creates a pull mechanic that returns customers to the store for a subsequent purchase. A typical buy-back credit holder is likely to spend beyond the credit face value, increasing average order value on the redemption transaction.]

### Competitive Analysis

[ASSUMPTION: No formal competitive analysis has been performed for this initiative. The following represents the landscape to examine before committing to the production architecture.]

**Shopify** is the most relevant platform competitor. Shopify has no native buy-back capability. Merchants on Shopify who want recommerce must use third-party apps (Trove/re.do, Recurate, Retriev). These apps add complexity, require separate subscriptions, and do not integrate natively into Shopify's inventory or payment systems. This is the gap Wix can close with a native module.

**Back Market, Swappa, Decluttr** are dedicated recommerce platforms. They are not general-purpose e-commerce tools. A merchant using these platforms cannot run a new-goods storefront in the same interface — the recommerce program and the primary store are always separate. Wix's differentiator is a single merchant-branded storefront serving both new and pre-owned goods.

**Facebook Marketplace and eBay** are horizontal second-hand marketplaces. They provide no merchant-branded experience, no workflow tooling, and no credit issuance. They attract bargain hunters, not brand-loyal customers.

**What not to copy:** marketplace dynamics (public buyer/seller ratings, platform fees per transaction, seller reputation scores). Wix's recommerce module serves the merchant's branded store. Introducing marketplace dynamics would conflict with the merchant-brand relationship Wix is built on.

Wix's specific differentiator: a merchant-branded, fully integrated recommerce program that lives alongside the primary store, with credit issuance that creates a retention loop third-party apps and marketplaces cannot replicate.

### Phases and Release Details

**Phase 1 — Prototype**

A static single-file HTML demo covering the full Buy Backs module (Requests, Receivables, Relisting, Analytics) and depth improvements to existing pages. No backend. No build step. Constraint: single `index.html`, under ~3,000 lines / ~150 KB.

Goal: a 3-minute click-through tour that never hits a "Coming Soon" placeholder. ≥ 25 of ~40 sidebar entries land on a non-placeholder page (up from 11 today).

**Phase 2 — Production MVP**

Merchant-facing Buy Backs module in production Wix Stores. Scope: Requests, Receivables, and coupon issuance. Pre-condition: prototype validated, customer research completed, Wix Payments coupon mechanics confirmed with the Payments team.

**Phase 3 — Customer-Facing Intake and Catalog Integration**

Customer-facing "Sell to us" submission form on the storefront. Pre-owned product designation in the catalog. Carrier integration for label generation and real-time tracking.

**Phase 4 — Intelligence Layer**

Automatic pricing suggestions based on condition and category. Funnel analytics and cohort analysis. Buy-back program configuration templates for common merchant types.

### MVP Definition

The MVP must produce one outcome for the merchant: **process a buy-back request — from customer submission to store-credit coupon issued — entirely within the Wix dashboard, without needing a spreadsheet, external email, or manual coupon creation.**

Minimum capabilities:

1. A Requests page where buy-back submissions can be entered and managed, with proposal and approval flow.
2. A Receivables page where received items are condition-reviewed and credit issued on approval.
3. A coupon generated and linked to the originating buy-back request, redeemable storewide.

Explicitly deferred from MVP:

- Customer-facing submission form — customers submit via email or external form initially; the merchant enters the request manually. Reason: customer-facing form requires storefront integration work outside the scope of the dashboard module.
- Carrier integration — label generation and real-time tracking require third-party carrier API work. Manual tracking entry suffices for MVP. Reason: not needed for the core workflow outcome.
- Relisting workflow — merchants can manually create pre-owned listings using the existing catalog tools. A dedicated relisting sub-section is Phase 3. Reason: the core value (credit issued, customer retained) does not require native relisting tooling.
- Analytics dashboard — operational before reporting. Reason: a merchant can run the program without the Analytics sub-section; reporting is a post-MVP enhancement.
- Automatic pricing engine — all proposed prices are merchant-entered in MVP. Reason: pricing judgment varies significantly by category and merchant; automation requires sufficient data to be useful.

The MVP test: can a merchant receive a buy-back request, enter it in Wix, propose a price, have the customer approve, receive the item, review it, and issue a coupon — entirely within Wix? Yes.

---

## 3. Functional Requirements

### Buy Backs Module

The Buy Backs module is a top-level sidebar pillar in Wix Stores, with a `NEW` badge, positioned between Sales and Catalog. It is expanded by default on first load. The default landing page is Requests.

The module has four sub-sections: Requests, Receivables, Relisting, and Analytics.

---

#### Requests

Intake and pricing workflow. Pre-shipment.

**States:** Submitted → Proposed → Approved → (Declined branches from Proposed)

**Stats bar:** Total Requests / Awaiting Proposal / Proposed — awaiting customer / Approved — awaiting shipment

**Tabs:** All / Submitted / Proposed / Approved / Declined

**Table columns:** Request ID, Date, Customer, Product, Category, Condition, Proposed Price, Status, Action

**Action by status:**

| Status | Action |
|--------|--------|
| Submitted | "Send Proposal" — opens price-entry form |
| Proposed | "Awaiting Customer" — read-only |
| Approved | "Print Receipt" — generates printable label with buy-back metadata |
| Declined | None |

**Business rules:**

- Buy-back requests are scoped to the merchant's accepted product categories. The item does not need to have been purchased from this merchant. A merchant whose accepted categories include Apple products will accept any iPhone.
- Digital product categories are excluded from the category picker. Submissions for digital products are not accepted.
- Proposed price is denominated in store credit, not cash.

**Edge cases:**

- Category not on the accepted list: block submission with an explanation of eligible categories.
- Incomplete photo uploads: warn the customer but allow submission.
- Guest vs. logged-in customer flow: [ASSUMPTION: guest submissions are supported; the customer provides an email address for proposal notification. This requires confirmation with the platform team.]
- Duplicate submissions from the same customer for the same item: out of scope for MVP.

---

#### Receivables

Fulfillment and condition review. Post-shipment.

**States:** In Transit → Received → (Approved | Rejected)

**Stats bar:** In Transit / Received — awaiting review / Approved this month / Coupons Issued (currency value)

**Tabs:** All / In Transit / Received / Approved / Rejected

**Table columns:** Request ID, Customer, Product, Stated Condition, Carrier Status, Days in Transit, Review Outcome, Coupon Issued, Status, Action

**Condition review rule:** If the reviewed physical condition matches the stated condition from the original submission, the item is Approved and a coupon equal to the proposed price is generated and issued to the customer. If the condition is lower than stated, the item is Rejected.

**Coupon issuance:** On approval, a store-credit coupon is generated and linked to the originating request ID. The coupon is redeemable storewide, not restricted to the product category of the buy-back.

**Edge cases:**

- Item arrives damaged beyond any usable condition: merchant records a rejection reason internally. Customer-facing rejection-reason communication is out of scope for MVP.
- Revised lower offer on rejection: [ASSUMPTION: out of scope for MVP; binary approve/reject only. A negotiation flow is a Phase 3 consideration.]

---

#### Relisting

Pre-owned inventory management. Post-approval.

**States:** Draft → Live → Sold

**Stats bar:** Total Pre-owned Listed / Live / Sold / Pre-owned Revenue (currency)

**Tabs:** All / Draft / Live / Sold

**Table columns:** Thumbnail, Item Name, Category, Condition, Original Price, Listed Price, Discount %, Photos, Status, Action ("Edit")

**Pricing rule:** Pre-owned price is set by the merchant. No automatic pricing in Phase 2. [ASSUMPTION: A suggested pricing range based on condition and category history is a Phase 4 enhancement.]

**Catalog integration:** Approved and relisted items appear in the merchant's product catalog with a "Pre-owned" label alongside new inventory. [ASSUMPTION: This requires a new product-type designation in the Wix catalog data model. Confirmation with the Catalog team is required before production design begins.]

---

#### Analytics

Program health visibility for the merchant.

**KPI cards:**

- Credits Issued (total currency value)
- Credits Redeemed (currency value + redemption rate %)
- Buy Backs Completed (count)
- Profit on Buy Backs (Pre-owned Revenue minus Credits Issued)
- Avg. Credit per Buy Back
- Pre-owned Revenue

**Charts:**

1. Credits Issued by Month — 6-month bar chart
2. Buy Backs by Condition — bar breakdown across Excellent / Good / Fair / Poor
3. Top Categories — ranked list with horizontal progress bars showing volume share

**Out of scope for Phase 2:** funnel chart (Submitted → Sold), cohort analysis, CSV/PDF export, date-range picker.

---

### Detail Views

#### Order Detail

Triggered by clicking any order row. Displays: customer info, line items with thumbnails, payment status, fulfillment status, event timeline, action buttons (Refund, Mark Fulfilled, Print Invoice).

Back navigation returns to the Orders list with the same tab active.

#### Product Detail

Triggered by clicking "Edit" on a product. Displays: image gallery placeholder, name, description, pricing, inventory, variants list, SEO section. In-page edits are held in session state (`ST.draftProduct`). No persistence in the prototype.

#### Contact Detail

Triggered by clicking a contact row. Displays: profile card, activity timeline (orders placed, forms submitted, emails opened — mocked in prototype), notes section, tags.

---

### Placeholder Pages (Phase 1 Prototype)

Five placeholder pages replaced with mocked content, using the existing component vocabulary (`cards-row`, `tbl-container`, `widget`):

1. **Abandoned Carts** — table with customer, cart items, last activity timestamp, recovery email status
2. **Discounts** — list of active / scheduled / expired discount codes with usage counts
3. **Pages and Menu** — tree of site pages with home page marker and "Add Page" button
4. **Forms and Submissions** — form list with submission counts; click to see a submissions table
5. **SEO Tools** — checklist page with meta title, sitemap, and indexing status progress indicators

---

### UX

**Navigation:** Buy Backs is a top-level sidebar entry with a `NEW` badge, between Sales and Catalog, expanded by default. Default landing page on first load is Requests.

**Component reuse:** Buy Backs pages reuse the existing component vocabulary — `cards-row`, `tbl-container`, `widget`, badge, tab-bar — consistent with the Orders and Analytics pages. No net-new components are introduced.

**Entity relationships:**

- A `BuyBackRequest` has one Customer, one ProductCategory, one Condition, one ProposedPrice, and one Status.
- A `BuyBackReceivable` is a 1:1 extension of an Approved `BuyBackRequest`.
- A `BuyBackCoupon` is linked 1:1 to an Approved `BuyBackReceivable`.
- A `PreOwnedListing` is a 1:1 extension of an Approved `BuyBackReceivable` and becomes a Product in the catalog on publish.

**Wireframe:** The Phase 1 prototype HTML file serves as the lo-fi wireframe for this phase. Production Phase 2 requires Figma designs before engineering begins.

---

### Analytics (Instrumentation)

**Internal:** [ASSUMPTION: For the production build, engineering will instrument the following events: `buyback.request.submitted`, `buyback.proposal.sent`, `buyback.customer.approved`, `buyback.customer.declined`, `buyback.item.received`, `buyback.item.approved`, `buyback.item.rejected`, `buyback.coupon.issued`, `buyback.coupon.redeemed`, `buyback.listing.published`. These events feed the Analytics sub-section and product health monitoring dashboards.]

**Customer-facing:** The Analytics sub-section is the customer-facing analytics surface for the buy-back program. No additional external reporting beyond the described KPI cards and charts is planned for Phase 2.

---

### Permissions

[ASSUMPTION: The following permissions model is proposed and requires confirmation with the Wix platform team.]

| Action | Who can perform |
|--------|----------------|
| Access Buy Backs module | Store owners, Admins, Staff (read + process) |
| Configure accepted buy-back categories | Store owners, Admins only |
| Send a proposal | Store owners, Admins, Staff |
| Issue a coupon | Store owners, Admins, Staff |
| Publish a pre-owned listing | Store owners, Admins only |
| View Buy Backs Analytics | Store owners, Admins |

**Plan tier:** [ASSUMPTION: Buy Backs is available on Wix Business and Business Elite plans. Not available on Free, Core, or Light plans.]

**Feature flag:** [ASSUMPTION: The Buy Backs module ships behind a feature flag, enabled by default for eligible plan tiers after the production launch date.]

---

### Billing

[ASSUMPTION: The Buy Backs module is included in existing Business and Business Elite plans at no additional cost at launch. Coupon issuance flows through the existing Wix Payments coupon infrastructure with no new billing line items. A potential upsell — higher-volume buy-back processing or an advanced analytics add-on — is a Phase 4 consideration. No usage-based billing impact at MVP.]

---

### Onboarding

[ASSUMPTION: Buy Backs is surfaced in the Wix Stores setup checklist for merchants with physical product categories. On first visit to the Requests page, a contextual tooltip explains the three-step workflow (Requests → Receivables → Relisting). An empty-state view with a "How buy-backs work" walkthrough card is shown when no requests exist. Existing merchants who qualify are notified via an in-product banner at launch.]

---

## 4. Operational Requirements

[ASSUMPTION: Operational requirements below are assumptions for the production build. They do not apply to the current prototype phase, which has no backend.]

### Migration

**Data migration:** Not applicable. Buy Backs is a new capability with no existing data to transform or backfill.

**User migration:** Existing merchants do not need to take any action. The Buy Backs module is enabled automatically for eligible plan tiers. No reconfiguration of existing settings is required.

**Sunsetting:** No existing behavior is being replaced. No deprecation period required.

**Pre-collection:** Not applicable. Buy-back data is generated by merchant actions from day one of the feature launch.

### Deployment Parity

[ASSUMPTION: Wix is a SaaS platform with no on-premise deployment model. Multi-region data residency considerations may apply to coupon and payment data stored as part of the buy-back record; this should be reviewed with the Wix infrastructure team before production design is finalized. No deployment parity gaps are expected.]

### LLM Agnosticism

The MVP Buy Backs module has no LLM or AI dependency. Not applicable for Phase 2.

A Phase 4 automatic pricing suggestion feature may introduce an LLM dependency. LLM agnosticism review should be conducted at that point, not now.

### Enterprise Scale

[ASSUMPTION: The primary customer for Buy Backs is SMB merchants. The MVP data model and workflow should support up to ~500 active buy-back requests per merchant per month without architectural changes. High-volume recommerce operators (thousands of requests per day) are a Phase 4 concern. Performance bounds should be confirmed with engineering before Phase 2 launch.]

---

## 5. Open Questions

1. **Customer notification channel.** How are customers notified of the merchant's buy-back proposal? Email, Wix inbox, SMS, or in-app notification? This affects the approval flow UX and the carrier pickup scheduling step. Owner: Product + Platform.

2. **Carrier integration scope.** Which carrier API(s) should Phase 3 integrate with for label generation? Is this an extension of Wix Shipping or a net-new direct integration? Owner: Platform / Shipping team.

3. **Accepted category configuration.** How does a merchant define their accepted buy-back categories? Derived from their existing product catalog categories, or a separate configuration step? Owner: Product.

4. **Rejection with revised offer.** When a received item is Rejected (condition lower than stated), can the merchant make a revised lower offer rather than a binary reject? This would reduce abandonment but adds flow complexity. Owner: Product (Phase 3 decision).

5. **Currency.** The prototype uses ₪ (NIS). Should it localize to $ for a broader audience? In production, the analytics currency should default to the merchant's configured store currency. Owner: Product.

6. **Hash routing.** Should buy-back detail views be URL-hash routed (`#/buybacks/requests/1001`) so links survive a page refresh? Low-cost improvement worth deciding before M1 development. Owner: Engineering.

7. **Guest submissions.** Are buy-back requests from non-logged-in customers supported? If so, what is the identity and notification model? Owner: Product + Platform.

---

## Appendix: Prototype Scope Summary

This section captures the prototype-specific constraints and coverage targets. It does not apply to the production build.

**Architecture:** Single static HTML file. Vanilla JS + inline CSS. State object `ST` drives all rendering via `renderApp()`. No backend, no persistence, no build step.

**Coverage target:** ≥ 25 of ~40 sidebar entries land on a real page (up from 11 today).

**File size target:** Under ~3,000 lines / ~150 KB.

**Acceptance criteria — Buy Backs prototype:**

- Buy Backs is a top-level sidebar pillar with `NEW` badge and four sub-items: Requests, Receivables, Relisting, Analytics.
- Refreshing the page lands on Requests with the Buy Backs menu expanded and Requests active.
- Each sub-page renders mocked data, has working status tabs, and computes stats from data rather than hard-coded values.
- The old single-page `pgBuyBacks` is removed. The old Sales > Buy Backs sub-entry is removed.

**Non-goals (prototype):** No backend, database, or persistence beyond `ST`. No build pipeline, bundler, framework, or TypeScript. No real authentication, payments, or third-party integrations. No automated tests.
