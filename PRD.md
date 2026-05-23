# Wix Clone — Product Requirements

**Status:** Draft  •  **Owner:** AdamWalker-112358  •  **Last updated:** 2026-05-23

## 1. Overview

A static, single-file HTML prototype of a Wix-style business dashboard for small business owners. The prototype today (`index.html`, ~660 lines, vanilla JS + inline CSS) demonstrates the dashboard shell and a handful of mocked pages. This PRD scopes the next round of work: **adding new sections and depth to existing pages, while keeping the prototype static**.

Out of scope here: turning this into a real application with a backend, build system, or framework. See §8 Non-goals.

## 2. Goals

- Make the prototype feel like a believable Wix admin experience to a viewer clicking around for 2–3 minutes.
- **Introduce a re-commerce / buy-back capability** so merchants can purchase used goods back from customers in exchange for store credit (§5.1).
- Increase the share of clickable sidebar entries that lead to a real page (not the "Coming Soon" placeholder) from **11 of ~40** today to **at least 25 of ~40**.
- Add depth to the existing flagship pages (Orders, Products, Contacts) so each has a credible detail view.
- Keep the project a single, easily-shareable static file with no build step.

## 3. Personas

### P1 — Maya, the new shop owner *(primary)*
Recently signed up to sell handmade ceramics. Mid-30s, non-technical. Cares about: getting paid, fulfilling orders, looking professional. Visits the dashboard daily on desktop, occasionally on mobile.

### P2 — Daniel, the side-hustle blogger
Runs a small blog with a few merch products. Tech-comfortable but time-poor. Cares about: writing posts, basic analytics, low-friction marketing.

### P3 — Riya, the established small retailer
6+ months running her business through the platform. Has 20+ products and ~50 orders/month. Cares about: inventory, returns, repeat customers, abandoned carts.

## 4. Current state

**Implemented pages** (11): Home, Setup, AI Agents, Orders, Products, Contacts, Analytics, Inventory, Inbox, Marketing, Blog.

**Placeholder ("Coming Soon") pages** driven by sidebar: Subscriptions, Gift Card Sales, Payments & Finances, Abandoned Carts, Categories, Back-in-Stock Requests, Option & Modifier Filters, Find Products to Sell, Promo Cards, Gift Cards, Discounts, Sales Channels, Blog Categories/Tags, App Market, Installed Apps, Pages & Menu, Open Editor, Branded App, Social Posts, Google Ads, SEO Tools, Forms & Submissions, Meetings, Loyalty Program, Real-time / Traffic / Behavior analytics, Getting Paid (all sub-items).

**Architecture:** a `NAV` array drives the sidebar; a single `ST` state object holds `page`, `activeNav`, `openMenus`, `orderTab`, `promoBannerVisible`; `renderApp()` re-renders the full app on every state change; per-page render functions (`pgOrders`, `pgProducts`, …) return HTML strings. No detail views, no modals, no persistence.

**Known limitations to address:** no detail view from list pages, search and filter inputs are `readonly`, setup checklist is non-interactive, only one `@media` rule for responsiveness, no keyboard navigation.

## 5. Feature scope (prioritized)

Each feature lists user stories and acceptance criteria. Priorities: **P0** must-have for this round, **P1** should-have, **P2** nice-to-have.

### 5.1 P0 — Re-commerce: Buy Backs

Lets customers sell used goods back to the merchant. Approved items are paid out in store credit and relisted as **pre-owned inventory** alongside new products, sold at a discount.

Buy Backs is its own **top-level sidebar pillar** (marked `NEW`), with three sub-pages reflecting the three operational stages: **Requests**, **Receivables**, **Relisting**.

```
Buy Backs (NEW)
├── Requests       – intake + proposal + customer approval
├── Receivables    – carrier tracking + receipt + condition review + coupon issuance
└── Relisting      – pre-owned catalog, priced and published into the store
```

**End-to-end workflow:**

1. *Customer* submits a buy-back request with product details, category, age, condition, pickup location, and photos (UC-1).  → Requests
2. *Merchant* sends a proposed price, offered as **store credit** (UC-2).  → Requests
3. *Customer* approves the proposal and prints a carrier label carrying buy-back metadata for easy intake (UC-2).  → Requests
4. Carrier picks up and ships the item.  → Receivables (in transit)
5. *Merchant* receives and reviews the item.  → Receivables (under review)
6. If condition matches the submission, item is approved; a store-credit coupon is issued to the customer.  → Receivables (approved)
7. Approved item is staged for relisting: categorize, set pre-owned price, attach item-specific photos, publish.  → Relisting

#### 5.1.a Use cases

**UC-1 — Storefront buy-back request submission**

- *Actor:* Customer (logged-in or guest), on the shop's storefront.
- *Trigger:* Customer clicks the "Sell to us" / "Buy Back" CTA from the storefront.
- *Eligibility:* Any item that falls within the shop's accepted product categories. **The item does not need to have been purchased from this shop.** Example: a shop that sells Apple products will accept a customer's iPhone purchased elsewhere. This is a deliberate positioning choice — it broadens the supply pool and turns the shop into a category-level re-commerce hub, not just a returns desk.
- *Form fields (Buy Back Request form):*
  - Product **category** (constrained to the shop's accepted-category list)
  - Product **details** (brand, model, identifiers / SKU if known)
  - **Age** of the item (e.g. years since manufacture or purchase)
  - **Condition** (Excellent / Good / Fair / Poor) with brief descriptors per level
  - **Pickup location** (address used later for carrier scheduling)
  - **Photo uploads** (multiple, item-specific)
- *Outcome:* A new row appears in the merchant's Requests page with status `Submitted` and all submitted fields attached.
- *Edge cases to flag:* category not on the accepted list (block submission with explanation); incomplete photos (warn but allow); duplicate submission detection out of scope this round.
- *Implementation note:* Customer-facing form is **out of scope for this round** — the merchant-side intake page assumes requests have already been captured by some means (see §5.1 Out of scope).

**UC-2 — Quote, approval, carrier pickup with printed label**

- *Actors:* Merchant → Customer → Carrier.
- *Flow:*
  1. Merchant opens a `Submitted` request, reviews the photos and stated condition, enters a **proposed price**, and sends. Status → `Proposed`.
  2. Customer is notified (channel TBD — email/in-app, decision deferred) and reviews the proposal in their account.
  3. Customer **approves** or **declines** the proposal. On decline, status → `Declined` (terminal).
  4. On approval: status → `Approved`. The system schedules a carrier pickup at the pickup location captured in UC-1.
  5. Customer prints a **carrier label** that bundles both the standard shipping info *and* buy-back metadata — request ID, customer, product, stated condition, and proposed price — so the merchant's intake team can process the package quickly and unambiguously when it arrives.
- *Pricing detail:* The proposed price is denominated and paid out as **store credit / coupon**, redeemable against any product in the shop. Not cash. This funds the program from inventory rather than cash flow and biases customers toward repeat purchases.
- *Outcome:* On carrier pickup the request transitions out of Requests and appears in Receivables as `In Transit`.
- *Implementation note:* "Print Label" is a button on `Approved` rows in the Requests page (currently labelled "Print Receipt" — wording to align in a follow-up). The label rendering itself (a printable HTML view with merchant + customer + metadata) is **out of scope for this round**.

#### 5.1.b Requests (`pgBBRequests`)

Intake side of the funnel — pre-shipment.

- **States:** Submitted → Proposed → Approved → (Declined branches off Proposed).
- **Stats bar:** Total Requests, Awaiting Proposal, Proposed (awaiting customer), Approved (awaiting shipment).
- **Tabs:** All / Submitted / Proposed / Approved / Declined.
- **Columns:** Request ID, Date, Customer, Product, Category, Condition, Proposed Price, Status, action.
- **Action varies by status:** "Send Proposal" (Submitted), "Awaiting customer" (Proposed), "Print Receipt" (Approved), none (Declined).

#### 5.1.c Receivables (`pgBBReceivables`)

Fulfillment side — from carrier handover through condition review and coupon issuance.

- **States:** In Transit → Received → (Approved | Rejected).
- **Stats bar:** In Transit, Received (awaiting review), Approved this month, Coupons Issued (₪).
- **Tabs:** All / In Transit / Received / Approved / Rejected.
- **Columns:** Request ID, Customer, Product, Stated Condition, Carrier Status, Days in Transit, Review Outcome, Coupon Issued, Status, action.
- **Behaviour:** if reviewed condition matches the submitted condition, the item is **Approved** and a coupon equal to the proposed price is issued; otherwise **Rejected** (out of scope: customer rejection-reason flow).

#### 5.1.d Relisting (`pgBBRelisting`)

Inventory side — approved items become pre-owned listings, priced below new equivalents, sold in the same store.

- **Status:** Draft → Live → Sold.
- **Stats bar:** Total Pre-owned Listed, Live, Sold, Pre-owned Revenue (₪).
- **Tabs:** All / Draft / Live / Sold.
- **Columns:** Thumbnail, Item Name, Category, Condition, Original Price, Listed Price, Discount %, Photos count, Status, action ("Edit" — opens fictitious editor).
- **Editor (forward-looking, not in this round):** set category, set pre-owned price, attach item-specific photos, publish to store.

#### 5.1.e Analytics (`pgBBAnalytics`)

Visibility into the health of the re-commerce program — how much store credit is leaving the till, how much is coming back through redemption, and what the program contributes in net profit.

- **KPI cards:** Credits Issued (₪), Credits Redeemed (₪ + redemption rate %), Buy Backs Completed (count), Profit on Buy Backs (Pre-owned Revenue − Credits Issued, ₪), Avg. Credit per Buy Back (₪), Pre-owned Revenue (₪).
- **Charts:**
  - *Credits Issued by Month* — 6-month bar chart, same style as the site Analytics page.
  - *Buy Backs by Condition* — bar breakdown across Excellent / Good / Fair / Poor, colour-coded by condition badge palette.
  - *Top Categories* — list of buy-back categories ranked by volume with horizontal progress bars showing share.

**Out of scope for this round:**
- Funnel chart (Submitted → Proposed → Approved → Received → Relisted → Sold).
- Cohort / repeat-customer / lifetime-value analysis.
- CSV / PDF export.
- Date-range picker (current view is "Last 30 days" implicitly).

**In scope for this round (merchant-facing):**

- Top-level "Buy Backs" entry with `NEW` badge, between Sales and Catalog, expanded by default; default landing page on first load is **Requests**.
- Four sub-pages (Requests, Receivables, Relisting, Analytics), each with mocked data covering all states.
- Visually consistent with Orders / Analytics (same toolbar, badges, table conventions, chart components).

**Out of scope for this round:**

- Customer-facing submission form, customer login/portal.
- Detail view for an individual buy-back / receivable / relisted item (covered later under the generalized detail-view work in §5.2).
- Automatic pricing engine; proposed prices are merchant-entered.
- Real store-credit integration with Payments & Finances; coupon issuance is mocked.
- Carrier integrations (label generation, real tracking webhooks).
- Photo upload UI for relisting.

**Acceptance criteria for this round:**
- Buy Backs is a top-level sidebar pillar with `NEW` badge and four sub-items: Requests, Receivables, Relisting, Analytics.
- Refreshing the page lands the user on **Requests** (Buy Backs menu expanded, Requests row active).
- Each sub-page renders mocked data, has working status tabs (where applicable), and computes its stats from data (not hard-coded).
- The old single-page `pgBuyBacks` is removed; old Sales > Buy Backs sub-entry is removed.

### 5.2 P0 — Detail views for flagship list pages
The prototype currently dead-ends on "View" / "Edit" buttons. Each list needs a credible detail view.

- **Order detail** (`pgOrderDetail`): customer info, line items with thumbnails, payment & fulfillment status, timeline of events, action buttons (Refund, Mark Fulfilled, Print Invoice — all non-functional but visually complete).
  - *Story:* As Maya, when I click an order, I see everything I'd need to fulfill or refund it.
  - *Accept:* Clicking `#1001` from Orders navigates to a detail view; back button returns to the list with the same tab active.

- **Product detail / edit** (`pgProductDetail`): image gallery placeholder, name, description, pricing, inventory, variants list, SEO section. Inputs are styled and editable in-page (state held in `ST.draftProduct`, no persistence).
  - *Story:* As Riya, when I click "Edit" on a product, I can see and tweak all its attributes on one page.
  - *Accept:* Edits to the in-memory draft persist across page re-renders within the session.

- **Contact detail** (`pgContactDetail`): profile card, activity timeline (orders placed, forms submitted, emails opened — mocked), notes section, tags.
  - *Story:* As Daniel, when I click a contact, I see their full history with my business at a glance.

### 5.3 P0 — Flesh out 5+ placeholder pages
Pick the highest-impact placeholders and replace the "Coming Soon" stub with a real mocked page using existing reusable components (`cards-row`, `tbl-container`, `widget`, etc.).

Target pages (in order):
1. **Abandoned Carts** — table of carts with customer, items, last activity, recovery email status.
2. **Discounts** — list of active/scheduled/expired discount codes with usage counts.
3. **Pages & Menu** — tree/list of site pages, home page marker, "Add Page" button.
4. **Forms & Submissions** — list of forms with submission counts, click to see submissions table.
5. **SEO Tools** — checklist-style page (meta titles set, sitemap submitted, etc.) with progress.

*Accept:* Each of the 5 pages has unique mocked data, uses the existing component vocabulary, and feels at parity with the existing Products/Contacts pages.

### P1 — Interactive Setup checklist
Today the Setup page shows 8 tasks at 0% with no interactivity.

- *Story:* As Maya, when I complete a setup task, I see my progress bar move.
- *Accept:* Clicking a task toggles it complete; sidebar progress card and Setup page progress bar both update in real time; state held in `ST.setupCompleted`.

### P1 — Inbox conversation view
Inbox today lists messages but clicking them does nothing.

- *Story:* As Daniel, when I click a message, I see the full thread and can compose a reply.
- *Accept:* Clicking a message opens a 2-pane view (list left, conversation right). Reply box is editable; "Send" appends a message to the in-memory thread.

### P1 — Working table search & filter
Search inputs are `readonly` everywhere today.

- *Story:* As Riya, when I type in the product search box, the list filters as I type.
- *Accept:* Search filters by name/SKU on Products and by customer/order ID on Orders. Filter button opens a popover with at least one working filter (e.g. payment status on Orders).

### P1 — Notifications drawer
The bell icon does nothing today.

- *Story:* As Maya, when I click the bell, I see a panel of recent notifications.
- *Accept:* Click toggles a right-side drawer with a list of mocked notifications, an unread count, and a "Mark all read" action.

### P2 — Mobile responsiveness pass
One `@media` rule today; the layout breaks below 900px.

- *Accept:* Sidebar collapses to a hamburger on screens < 768px; tables become horizontally scrollable; top nav search hides below 640px.

### P2 — Keyboard navigation & a11y baseline
- *Accept:* Sidebar items are reachable by Tab, expandable by Enter/Space; focus outlines are visible; `aria-current` set on active nav item; modals/drawers trap focus.

### P2 — Empty-state pass
Only Blog has a designed empty state. Bring the rest in line.

- *Accept:* Every list page has a designed empty state shown via a `?empty=1` URL hash (no data layer required).

## 6. Non-goals

- No backend, database, or persistence beyond the in-memory `ST` object.
- No build pipeline, bundler, framework, or TypeScript — stays a single static HTML file.
- No real authentication, payments, or third-party integrations.
- No multi-tenant or "real Wix" feature parity — this is a prototype, not a clone we ship.
- No automated tests in this round.

## 7. Success metrics

Since this is a prototype with no telemetry, metrics are qualitative checkpoints:

- **Coverage:** ≥ 25 of ~40 sidebar entries land on a non-placeholder page (up from 11).
- **Click depth:** From any list page, a viewer can reach a detail view in one click (up from zero today).
- **Demo runway:** A 3-minute click-through tour can stay on real content without ever hitting "Coming Soon."
- **File size:** Single `index.html` stays under ~3000 lines / ~150 KB (currently ~660 lines / ~64 KB) to keep it easy to read and share.
- **Self-review:** A reader unfamiliar with Wix recognizes the dashboard as "an e-commerce admin" within 10 seconds of opening the file in a browser.

## 8. Open questions

- Should detail-view navigation be URL-hash routed (`#/orders/1001`) so links are shareable, or stay in-memory only? (Hash routing is cheap and worth doing if we want refresh-survival; flagging for decision.)
- Is the ₪ currency intentional, or should the prototype localize to `$` for a broader audience?
- Do we want a dark-mode variant, or stick with the light theme to match Wix's actual product?
- At what line count does the single-file approach stop being a feature and start being a liability? (Soft cap proposed at §7.)

## 9. Milestones (suggested)

1. **M1 — Detail views** (P0, ~1 week): Order, Product, Contact detail pages.
2. **M2 — Placeholder fill** (P0, ~1 week): 5 placeholder pages.
3. **M3 — Interactivity** (P1, ~1 week): Setup checklist, Inbox view, table search/filter, notifications drawer.
4. **M4 — Polish** (P2, ad hoc): Mobile responsiveness, keyboard a11y, empty states.
