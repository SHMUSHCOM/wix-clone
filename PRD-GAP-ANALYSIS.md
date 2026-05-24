# PRD Gap Analysis

### Wix Stores Re-Commerce — Buy Backs and Second-Hand Marketplace

Reviewed against: Qodo PRD methodology (discovery questions, three-section template, operating principles, style guide).

---

## Discovery Gaps

Several foundational questions are unanswered. Consider running a discovery interview before revising ("interview me about this PRD").

| Question | Status | Notes |
|----------|--------|-------|
| Root problem | Weak | The context names the market opportunity and a solution, but not the specific workflow failure a Wix merchant experiences when trying to run a buy-back program today. Describe the exact moment it breaks — what the merchant is doing, what they cannot do, and what it costs them. |
| Customer value | Weak | "Generate revenue from second-hand items" is directional but not specific. Add a concrete before/after: e.g., "A merchant currently managing buy-backs in a spreadsheet spends 4+ hours per week on intake and credit tracking; a native workflow eliminates the manual overhead entirely." |
| Business value | Good | The user-supplied context names four clear business value drivers: new merchant acquisition, payment processing volume, store engagement depth, and customer LTV via credit retention. Incorporated in the rewrite. |
| Personas | Weak | The original PRD lists three generic store personas (Maya, Daniel, Riya). None are recommerce merchants. The primary acquisition target — a dedicated recommerce or trade-in operator — is not named or described anywhere. |
| Existing Wix coverage | Missing | No audit of current Wix Stores capabilities for anything buy-back-adjacent (manual orders, coupon tools, custom forms, Wix shipping). Before proposing a new module, the PRD should state what exists today and why it is insufficient. |
| Evidence and pattern | Missing | No customer signals of any kind — no forum requests, sales inquiries, support tickets, or merchant quotes. The initiative is entirely hypothesis-driven. This is the highest-priority gap before any production investment is justified. |

---

## PRD Section Review

### Project Details

| Sub-section | Status | Notes |
|-------------|--------|-------|
| Document History | Weak | One version logged with a date but no description of what changed. The rewrite adds a description per version. |
| Stakeholders | Missing | Only the PRD owner is listed. For a feature of this scope, Product, Engineering, Design, QA, Payments, and Sales/CS should be named before this moves to production review. |
| Timeline | Weak | Four prototype milestones defined but no dates or estimated durations. Add at least rough date ranges per milestone. Production phase timelines are absent entirely. |
| Resources | Missing | No Figma files, Linear tickets, carrier API research, or market sizing links. Add a TBD placeholder per resource type so it is clear what needs to be populated. |

### Business Requirements

| Sub-section | Status | Notes |
|-------------|--------|-------|
| Business Context and Motivation | Weak | The user-supplied context is strong but was not in the PRD itself. Incorporated in the rewrite. Needs market sizing data and a specific Wix strategic rationale to be production-ready. |
| Existing State | Missing | The PRD describes what to build but not the current state of the product or the merchant's manual workaround. Add a concrete description of what a merchant does today when they attempt a buy-back program. |
| Problems We Are Solving | Missing | Not a dedicated section in the original. Four problems incorporated in the rewrite as assumptions; the author should validate these against actual merchant feedback before treating them as requirements. |
| Customer Asks | Missing | No signals cited. Highest-priority gap. See Recommended Activities. |
| Use Cases | Good | Five use cases with trigger/action/outcome structure, edge cases, and state transitions. Well-developed for a prototype PRD. |
| Personas | Weak | Three generic store archetypes present; the recommerce merchant (the primary acquisition target for this feature) is absent. Incorporated as an assumed persona in the rewrite. |
| High-Level Solution | Good | The four-sub-section structure with state machines and field-level detail is estimable by a senior engineer. |
| Strategy Around the Solution | Missing | Business context identifies value but does not connect to Wix's stated product strategy or platform differentiators. Incorporated as assumption in the rewrite. Needs to be validated against actual Wix strategic priorities. |
| Competitive Analysis | Missing | No competitor coverage at all. Shopify's recommerce app ecosystem, Back Market, and Trove/re.do are the relevant competitors to examine. See Recommended Activities. |
| Phases and Release Details | Weak | Four prototype milestones defined but no production phases. Phase 2 (MVP), Phase 3 (customer-facing form + catalog integration), and Phase 4 (intelligence layer) are assumptions in the rewrite. Author should validate and date these. |
| MVP Definition | Weak | The original PRD has "in scope / out of scope for this round" per feature but no single statement of the one outcome the MVP must produce, no minimum capability list, and no explicit deferred list with reasons. Incorporated in the rewrite. |

### Functional Requirements

| Check | Status | Notes |
|-------|--------|-------|
| Section present | Good | Full section with per-feature sub-sections and acceptance criteria. |
| Breakdown consistency | Good | Organized by feature area throughout. Consistent. |
| Sub-sections cover concrete detail | Good | State machines, stats bars, column definitions, and action rules are described at behavior level — not just capability names. |
| Edge cases and dependencies | Weak | Some edge cases called out (category not accepted, incomplete photos) but condition-mismatch handling, guest vs. logged-in submissions, and duplicate submission detection are not fully addressed. |
| UX — wireframe or prototype | Good | The prototype HTML file serves as the lo-fi wireframe for Phase 1. Acceptable for the current scope. Phase 2 production work requires Figma designs before engineering. |
| UX — entities and relationships | Missing | Relationships between BuyBackRequest, BuyBackReceivable, BuyBackCoupon, and PreOwnedListing are not described or diagrammed. Incorporated as an entity map in the rewrite. |
| UX — navigation placement | Good | Top-level sidebar pillar with NEW badge, between Sales and Catalog, with Requests as default — described explicitly. |
| UX — component reuse | Good | Existing component vocabulary explicitly identified. No net-new components proposed. |
| Analytics — internal | Missing | No instrumentation plan. Key events (request submitted, proposal sent, coupon issued, coupon redeemed) need to be defined before production build. Incorporated as assumptions in the rewrite. |
| Analytics — customer-facing | Good | Dedicated Analytics sub-section with specific KPI cards and charts. |
| Permissions | Missing | No permissions model. Who can process requests, who can configure categories, what plan tier is required — all absent. Incorporated as assumptions in the rewrite. Requires confirmation with the Wix platform team. |
| Billing | Missing | No billing model stated. Is Buy Backs included in existing plans, an add-on, or a new tier gate? Incorporated as assumption in the rewrite. |
| Onboarding | Missing | No onboarding consideration. How do merchants discover Buy Backs? What is the empty state? Incorporated as assumption in the rewrite. |
| Mobile / Wix Owner app | Missing | No mention of whether Buy Backs has a companion experience in the Wix Owner mobile app. For merchant-facing operations (reviewing incoming items, approving receivables), mobile access may matter. |

### Operational Requirements

| Sub-section | Status | Notes |
|-------------|--------|-------|
| Migration — data | Good | New capability, no migration needed. |
| Migration — users | Good | No user action required at launch. Confirmed in context. |
| Migration — sunsetting | Good | Not applicable. |
| Migration — pre-collection | Good | Not applicable. |
| Deployment parity | N/A | Wix is SaaS-only. Multi-region data residency for coupon/payment records should be reviewed with the infrastructure team before production design. |
| LLM agnosticism | N/A | MVP has no LLM dependency. Flag for Phase 4 pricing engine review. |
| Git parity | N/A | Not a git-integrated feature. |
| Enterprise scale | Missing | No consideration of high-volume buy-back merchants or operational scale bounds. The MVP should define a supported volume ceiling (e.g., 500 active requests per merchant per month) and confirm with engineering. |

### Soft Expectations

| Item | Status | Notes |
|------|--------|-------|
| Success metrics | Missing | No leading or lagging indicators. Suggested leading: % of eligible merchants who create at least one buy-back request within 30 days of module availability. Suggested lagging: buy-back requests processed per active merchant per month; coupon redemption rate. |
| Out of scope | Good | Each feature section has a clear "out of scope for this round" list. |
| Alternatives considered | Missing | No alternatives discussed. Was a third-party app integration considered instead of a native module? A simpler "pre-owned order type" designation rather than a full new module? These should be named and briefly dismissed. |
| Risks and mitigations | Missing | Several material risks are not surfaced: merchant abuse (accepting items in claimed "Excellent" condition and issuing high credit before discovering the actual condition), customer abuse (same item submitted multiple times to multiple merchants), credit issuance without confirmed item receipt, and carrier logistics complexity for Phase 3. |

---

## Recommended Activities

1. **User Research: validate the buy-back merchant workflow with 5–8 recommerce operators.**
   Why: all four "problems we are solving" are assumptions. The solutions are directionally reasonable but may not match the actual bottlenecks in a real buy-back operation.
   How: 30-minute interviews with merchants who currently run manual buy-back or trade-in programs — target electronics resellers, fashion consignment stores, sporting goods merchants with trade-in programs. Ask what tools they use today, where the process breaks down, and what they would pay for a native platform solution. Two weeks of interviews should produce directional confidence. Recruit via Wix community forums and outreach to existing Wix merchants in relevant categories.

2. **Competitor Evaluation: map the Shopify recommerce app ecosystem before committing to the module architecture.**
   Why: if high-quality recommerce apps already exist on Shopify (Trove/re.do, Recurate, Retriev), the design question shifts from "should we build this" to "how do we build something better than what Shopify merchants already have." Understanding their intake flows, condition review processes, and credit mechanics will sharpen the Wix differentiator claim.
   How: evaluate the top three recommerce apps in the Shopify App Store. Document their intake flows, condition review UX, and coupon/credit mechanics. Identify what they do well, where they fall short, and where a native Wix integration produces outcomes no app can match. Three to five days of desktop research.

3. **Data Analysis: estimate the addressable merchant population on Wix in recommerce-relevant categories.**
   Why: the initiative is currently driven by market hypothesis. Before committing to production engineering, establish whether enough Wix merchants operate in categories with meaningful recommerce demand (electronics, fashion, sporting goods, home goods, tools) to justify the module build.
   How: pull from Wix business data the count of active Wix Stores merchants by product category. Identify overlap with categories that have established recommerce markets. Estimate adoption rate based on analogous feature launches. One-week analysis with the Wix data team.

4. **Stakeholder Conversation: align with the Wix Payments team on buy-back coupon issuance mechanics.**
   Why: the PRD assumes a coupon linked to the originating buy-back request ID is issued on approval, redeemable storewide. The actual coupon mechanics in Wix Payments may not support request-linked coupons, may impose expiry requirements, or may require a new coupon type in the data model.
   How: one-hour working session with the Wix Payments product team. Confirm whether buy-back credits can be tied to a request ID, whether they expire, whether they can be restricted by category, and what the issuance API looks like. This must happen before Phase 2 production design begins.

5. **Stakeholder Conversation: confirm pre-owned product designation feasibility with the Wix Catalog team.**
   Why: the Relisting sub-section depends on a "Pre-owned" product label appearing in the catalog and storefront alongside new products. This likely requires a new product-type designation in the Wix catalog data model.
   How: one-hour working session with the Wix Catalog product team. Confirm whether a pre-owned product type can be added, how it appears in the storefront, and whether it requires a separate catalog view or integrates into the existing product grid.

---

## Style Check

1. Three spelling errors in the original: "Genreate" (§ Customer Objectives), "neccessarily" (§ Assumptions), "sensitivty" (§ Customer Objectives). Corrected in the rewrite.
2. Priority labels used as header suffixes with em-dashes ("### 5.1 P0 — Re-commerce: Buy Backs"). Em-dashes combining title and sub-info on a single header line violate the style guide. Split into separate header levels in the rewrite.
3. No emojis present in the original. No violations.
4. Concise label rule: the original uses "Rule 1", "Step 2" style labels in some in-document references. No violations in the PRD itself.
