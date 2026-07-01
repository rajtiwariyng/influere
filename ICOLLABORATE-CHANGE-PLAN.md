# iCollaborate — Change Implementation Plan & Handoff

> **Purpose:** Resume document for the iCollaborate (formerly "Influere") change request batch.
> A client gave a Google Sheet of changes. This file captures the full scope, the phased plan,
> decisions made, and current progress so any session can pick up from here.
>
> **Last updated:** 2026-06-27 (session start of implementation)

---

## 1. Project at a glance

- **Stack:** React 19 + Vite SPA. React Router v7, Bootstrap 5 + Bootstrap Icons, Chart.js (`react-chartjs-2`), TanStack React Table.
- **No backend.** All data is static mock data in `src/admin/data/*.js`. No API, no auth, no localStorage persistence. It is a UI prototype.
- **Dev:** `npm run dev` (Vite). `npm run lint` (eslint). `npm run build`.
- ⚠️ `node_modules` was NOT installed at session start. Run `npm install` before dev/build/lint.

### Routing
- `src/routes/AppRoutes.jsx` — public routes: `/` (Home), `/register` (Registration), `/dashboard/*` → admin.
- `src/AdminRoutes.jsx` → `src/admin/AdminApp.jsx` — **all admin routes + the sidebar nav config** (`defaultNavigationItems`). This is the most important file for navigation/menu changes.

### Two areas
1. **Public site** — `src/pages/Home.jsx`, `src/pages/Registration.jsx`, `src/components/` (Navbar, Footer, LoginModal, `registration/` step components), layouts in `src/layouts/`.
2. **Admin/Dashboard** — `src/admin/` (the bulk of the work):
   - `pages/` — Dashboard, ProfileFake, ProfileSell, ProfileBuy, DiscountOffers, ConsultancyCategoryPage, ConsultancyProfessionalPage, ConsultancyCategoryShortlisted, CollaborationPage, CollaborationSetup, CollaborationShortlisted, Wallet, WithdrawConfirm, TransactionHistory, SettingsPage, WelcomeScreen, ProfileServices, Insurance. Each page has a paired `.css`.
   - `components/` — Sidebar, Header, modals (Auction*, Consultancy*, ProfileSell, FakeProfileReport, Premium), dropdowns (Select/Slider/RangeSlider), DateRangeFilter, ScrollToHash.
   - `data/` — mock data: collaborationProfilesData, consultancyData, discountOffersData, notificationsData, profileBuyData, profileFakeData, profilePlatforms, transactionHistoryData, workOrderData.
   - `design-system/` — `variables.css` (theme tokens), `base.css`, `components.css`.
   - `layouts/AdminLayout.jsx`, `styles/pages.css`.

### Styling conventions
- Bootstrap 5 utilities + per-component CSS files. Theme tokens in `src/admin/design-system/variables.css`.
- Icons: Bootstrap Icons.

---

## 2. Source of the change list

- **Google Sheet** (client): `https://docs.google.com/spreadsheets/d/18N4VeKxm-dx3cPfXeVWoMNleFvqt2KbG/edit`
  - Readable via public CSV/XLSX export: `https://docs.google.com/spreadsheets/d/18N4VeKxm-dx3cPfXeVWoMNleFvqt2KbG/export?format=xlsx`
  - **Sheet 1** = previous batch (Sr 1–21), almost all **Done** (matches existing commits). One trailing un-numbered bug remains (see Phase 7).
  - **Sheet 2** = THE NEW WORK — 19 items, all **Pending**. This plan implements Sheet 2.
- ⚠️ **No Google Sheets write access in this environment.** No Google MCP connector is connected (only Asana, Atlassian, Box, Canva, Figma, HubSpot, Intercom, Linear, Notion, monday). Cannot push status back to the Google Sheet programmatically.

### Tracker (local mirror — single source of truth for status)
- File: `iCollaborate-Change-Tracker.xlsx` (project root). Columns: Sr No | Phase | Module | Description | Status | Remark.
- Update helper: `<scratchpad>/update_tracker.py` — usage:
  `python3 update_tracker.py "<SrNo>" "<Status>" "<Remark>"` where Status ∈ {Pending, In Progress, Done, Blocked}.
  (Scratchpad path varies per session; recreate the helper if missing — it just loads the xlsx, finds the row by Sr No, sets Status+Remark with color fill, saves.)
- User syncs this into the Google Sheet manually via **File → Import → Replace** when desired.

---

## 3. Decisions & defaults (confirmed with user)

1. **Favicon:** Generate from the transparent logo PNG (the "C" mark). User did not supply a mark-only file.
2. **Service-type lists** for Accounting/Tax/Multimedia/Insurance: **per-category, category-appropriate types** (NOT the legal list copy-pasted everywhere — the sheet repeats the legal list for all, which is a copy/paste slip). Legal uses the new list from item #5.
3. **"Work Order" wording removal (#1):** Do NOT do a blanket find/replace. ~216 occurrences are mostly CSS class names (`work-order-*`) and JS identifiers (`workOrder*`) = code, safe to leave. Only **user-facing display text** should change, and that text lives in the consultancy & collaboration pages — handle it **within Phases 2 & 4** as those pages are rewritten (#4 removes the work-order form entirely). Do not break identifiers.
4. **Tracking:** local xlsx mirror (above), because no Google write access.

### Logo assets (provided by user)
Folder: `/Users/deepakgodhar/Projects/Personal/icollaborate/icollaboartelogoopenfiles/`
- `icollaborate logo png.png` — **1080×1080, RGBA, transparent bg** ✅ USE THIS for navbar/header/footer.
- `i collaborate.ai logo (new) updated (1 june 2026) 5.jpg` — 8333×8333 CMYK print master (not for web).
- `.ai` / `.pdf` — vector source (archival).
- Logo design: a gradient "C" ring (teal→blue→purple→magenta) wrapping the wordmark **iCollaborate.ai**.

---

## 4. Phased plan (Sheet 2 items)

### Phase 1 — Global rebrand + foundational styling  ⬅ IN PROGRESS
**Items #1, #12.**

**1a. Logo swap (#1):**
- Copy `icollaborate logo png.png` → `src/assets/icollaborate-logo.png`.
- Repoint all 6 imports from `assets/logo.svg` to the new PNG:
  - `src/admin/AdminApp.jsx:24`
  - `src/admin/components/Sidebar.jsx:4`
  - `src/admin/layouts/AdminLayout.jsx:6`
  - `src/components/Footer.jsx:1`
  - `src/components/Navbar.jsx:2`
  - `src/layouts/RegistrationLayout.jsx:2`
- ⚠️ New logo is **square**; old was likely horizontal. Check navbar/header CSS height/aspect and adjust so it doesn't blow out layout. Review visually.

**1b. Favicon (#1):**
- Generate from PNG (trim transparent margins → pad square → resize): write `public/favicon.ico` (16/32/48/64), `public/icollaborate-icon.png` (512), `public/apple-touch-icon.png` (180).
- Update `index.html`: replace `<link rel="icon" ... href="/vite.svg" />` with the new icon links, and change `<title>Vite + React</title>` → `iCollaborate` (or per-page via usePageTitle).
- Old `public/vite.svg` can be removed after.

**1c. Brand rename Influere → iCollaborate (#1):** known touchpoints (from grep):
- `companyName = "INFLUERE"` → `"iCollaborate"` in: `src/admin/AdminApp.jsx:378`, `src/admin/components/Sidebar.jsx:12`, `src/admin/layouts/AdminLayout.jsx:11`.
- `alt="Influere"` → `alt="iCollaborate"` in `src/components/Navbar.jsx:12`, `src/components/Footer.jsx:16`.
- `src/components/Footer.jsx:49` email `info@influere.net` → `info@icollaborate.ai` (confirm address with client).
- `src/components/Footer.jsx:55` `© 2025 Influere` → `© 2026 iCollaborate`.
- `src/hooks/usePageTitle.js:5` base `"Influere"` → `"iCollaborate"`.
- `src/components/registration/RegistrationComplete.jsx:15` `Welcome to INFLUERE!` → `Welcome to iCollaborate!`.
- `src/pages/Home.jsx:163` `INFLUERE Linktree` → `iCollaborate Linktree`; `:166` `from INFLUERE` → `from iCollaborate`.
- `src/pages/Home.jsx:266` "Influere is a latin verb that means 'to flow in'…" — **DEFER to Phase 6** (content replacement, item #2). Do NOT just swap the word (would make the sentence false).
- `package.json:2` `"name": "influere"` → `"icollaborate"` (optional).
- `src/styles/README.md` — internal doc, low priority (skip or light touch).

**1d. Admin label styling (#12):**
- Form/filter/table **labels: 12px → 15px**, **font-weight 600 → 500**, consistent across the admin dashboard.
- Use a **darker shade of grey** for form/filter/table boxes so each box differentiates.
- Likely centralize in `src/admin/design-system/variables.css` + `components.css`; check per-page CSS overrides. Grep for `font-size: 12px` / `font-weight: 600` in `src/admin`.

### Phase 2 — Professional Consultancy overhaul (largest cluster)
**Items #4, #5, #6, #7, #8, #9, #10, #11, #19.**
- **#4 (Legal):** remove the work-order form; add new descriptive copy UNDER the Legal headline (appropriate smaller font since it's long):
  > "Choose an associated legal consultant from our company to help you with all your legal needs. Directly share your case details with them for a fee and make the payment via our system only. By communicating through iCollaborate, you are guaranteed quality and reliable service for the lowest price."
- **#5/#8/#9/#10/#11 — Filters for Legal/Accounting/Tax/Multimedia/Insurance** (pages: `ConsultancyCategoryPage.jsx`, driven by `category` route param + `consultancyData.js`):
  - Remove **Availability** dropdown.
  - **Type of Service** (per-category — see Decision #2). Legal list (from #5/#6): Received a legal notice, send a legal notice, contractual, representation in court, hourly consultation, others. Other categories keep their own appropriate types.
  - **Rate** = dual-bar (two-handle) range slider, **$10 → $100K**.
  - **Distance** = City / Provincial / National / International.
  - **Experience** = dual-bar range slider, **0 → 50 years**.
  - (Dual-range component exists: `src/admin/components/RangeSliderDropdown.jsx` — reuse/extend.)
- **#6 — Professional detail page** (`ConsultancyProfessionalPage.jsx`, route `professional-consultancy/:categoryId/:professionalId`):
  - Replace the URL-as-title with the CA description:
    > "Qualified Chartered Accountant with expertise in accounting, taxation, auditing, financial reporting, and compliance. Experienced in providing strategic financial guidance, regulatory compliance, and business advisory services."
  - Remove the "Tax Filing & Support" box.
  - Rebuild "Book an Appointment" form → fields: **Description | Attachments | Schedule a voice/video call (mark optional)**.
  - Add a **support icon on the same line as the name**; clicking opens a popup to contact the support team about this professional. Form: **Name, Email, Message**.
- **#7 — Left menu:** replace **"Shortlisted" → "Inbox"** with **Incoming/Outgoing** tabs for Legal/Tax/Accounting/Multimedia/Insurance. Edit `defaultNavigationItems` in `AdminApp.jsx` (labels + ids) and the shortlisted page (`ConsultancyCategoryShortlisted.jsx`) heading/behavior. (Note: there is a known dropdown-click bug in the consultancy submenus per Sheet 1 #9 — watch for it.)
- **#19 — Consultancy Inbox (incoming)** (`ConsultancyCategoryShortlisted.jsx`, `?tab=incoming`):
  - Replace the blue tags with **service examples** (e.g. "legal drafting of contracts", "audit").
  - Add **Avg Response Time: 24 Hours**.
  - Add **Hourly rate: $500 / hour**.
  - Apply across all professional services.

### Phase 3 — Profile Services
**Items #13, #14, #15, #15b.**
- **#13 (`ProfileFake.jsx` / `profileFakeData.js`):** "Advance - 100 per month" → "Advance - 10 per month".
- **#14 (`ProfileSell.jsx`, buy-sell):**
  - 3-dot menu: add **"Verify Profile"** → opens popup like edit-profile with an extra **"Verification Code"** field; button labelled **"Verify"** (see `ProfileSellModal.jsx`).
  - Replace **Date → Profile Name**; remove **Email**; replace **Amount → Asking Price**.
- **#15 (ProfileSell "Pending" tab):**
  - Same field swaps (name/profile, remove email, asking price).
  - Introduce **Incoming Offer**; 3-dot options **Accept / Decline / Counter Offer** — each opens a **confirmation box**; Counter Offer has an **amount input**.
  - Rename tab **"Pending" → "Incoming Offer"**.
- **#15b (`ProfileBuy.jsx`, buy-profile):**
  - "Revenue range" → **"Asking Price range"** with a **dual-bar (two-handle) slider**.
  - Replace profile description with the CA description (same as #6).
  - Remove **CA, Location, Experience**.
  - Add **Asking Price** next to the profile name.
  - "Buy Profile" → popup with **Buy** / **Make Offer** (Make Offer has an amount input box).

### Phase 4 — Collaboration lists (all platforms)
**Item #18** (`CollaborationPage.jsx` + `collaborationProfilesData.js`; routes for facebook/twitter/youtube/linkedIn/tiktok/instagram lists).
- Remove "Post: 1k-10k | Repost… | Retweet…" → instead show **number of posts, followers, following** (depending on platform).
- Remove **CA, Experience**.
- **Location → Country name**.
- Replace description with platform-relevant copy.
- Introduce **Activity** = analytics of the avg of the last 10 posts: **likes, views, comments, reposts**.
- Show **Asking Rate** (platform-dependent).
- Apply to **all** social platforms; content relevant per platform.
- (This is also where remaining user-facing "Work Order" wording on collaboration pages gets removed — see Decision #3.)

### Phase 5 — Dashboard redesign
**Items #16, #17** (`Dashboard.jsx`).
- **#16:** "Sonam Kumari" → **John Doe**; "sonam@gmail.com" → **johndoe@gmail.com**; "sonam_kumari" → **john_doe**; remove social media links; **move profile box to the LEFT**.
- **#17:** below profile box:
  - Social-media cards each showing **"john_doe"** (use only this name).
  - **Two separate statistics graphs:** (1) revenue generated vs paid out, (2) followers from each social platform.
  - A **notifications box** for incoming/outgoing **collaboration** offers (styled like merchant-offers reference but from other collaborators).
  - A **Recent Activity** box: everything in past 24h / 1 week / 1 month / 1 year / 5 years / 10 years, with filters for **time, amount, date**.
- Screenshots referenced (inaccessible): build from text, review visually.

### Phase 6 — Home page + site-wide animations
**Items #2, #3** (`src/pages/Home.jsx`, public pages).
- **#2 — Home:**
  - Hexagon honeycomb: **8 hexagons surrounding a central one** (beehive, parallel lines), centre hex bold/tightly packed; surrounding hexagons **flip into rectangular boxes on scroll**.
  - Replace intro content with (and add heading **"What is iCollaborate.ai"**):
    > "iCollaborate.ai uses advanced AI to analyze audience demographics, engagement quality, and content style, automatically pairing influencers with compatible peers for high-impact collaborations. Beyond matchmaking, this one-stop-shop approach functions as a comprehensive, centralized ecosystem for the professional influencer, streamlining the entire partnership lifecycle from AI-driven discovery and automated outreach to legal contracting, content approvals, and secure, instant payments. The platform integrates directly with e-commerce systems, provides a single dashboard to track ROI through analytics and manage all professional requirements, including content creation tools and campaign reporting, eliminating the need for fragmented, manual workflows."
  - This is also where the deferred "Influere is a latin verb…" paragraph (Home.jsx:266) gets replaced.
- **#3 — All public pages:** add onload / on-scroll transitions & animations.

### Phase 7 — Verification
- Fix/confirm **Sheet 1 leftover bug:** "collaboration/setup — tabs not switching when social media changed." (Latest commit `354340f` touched setup tab dynamic values; verify it actually switches now.) Page: `CollaborationSetup.jsx`.
- `npm install` → `npm run lint` → `npm run build`.
- `npm run dev` and walk through every changed screen.
- Update tracker statuses to Done with remarks.

---

## 5. Suggested order
Phase 1 → 2 → 3 → 4 → 5 → 6 → 7. Foundational rebrand/styling first, biggest functional cluster (consultancy) next, polish (home/animations) last.

---

## 6. CURRENT PROGRESS (update this section as you go)

- [x] Read & parsed both sheets; confirmed Sheet 2 is the active batch.
- [x] Mapped project structure.
- [x] Confirmed logo assets; transparent PNG is usable.
- [x] Created local tracker `iCollaborate-Change-Tracker.xlsx` + `update_tracker.py` helper.
- [x] Created TaskCreate tasks #1–#7 (one per phase). Task #1 = in_progress.
- [x] **Phase 1 — DONE (2026-06-27).**
  - 1a Logo: `src/assets/icollaborate-logo.png` created; all 6 imports repointed; footer logo sized (56px) to avoid blow-out (navbar 3rem / sidebar 2.5rem contain are fine for square logo).
  - 1b Favicon: `public/favicon.ico` (16/32/48/64), `public/icollaborate-icon.png` (512), `public/apple-touch-icon.png` (180) generated from trimmed+padded PNG; `index.html` icon links + `<title>iCollaborate` updated. (Old `public/vite.svg` left in place — harmless.)
  - 1c Rename: companyName×3, alt×2, footer email→info@icollaborate.ai, ©2026, usePageTitle base, RegistrationComplete, Home linktree×2, package.json name. (Home.jsx:266 "latin verb" still deferred to Phase 6 #2.)
  - 1d Labels (#12): `.form-label`, `.admin-form-label`, `.consultancy-filter-label` → 15px/500; darkened `.consultancy-filters` bg (#E6EBF3) + `.consultancy-select` border for box differentiation.
  - Build passes (`npm run build`). Tracker: #1 In Progress (work-order wording pending P2/P4), #12 Done.
- [x] **Phase 2 — DONE (2026-06-27).** Items #4,#5,#6,#7,#8,#9,#10,#11,#19.
  - `consultancyData.js` restructured: per-category `description` + `serviceTypes` + shared `distanceOptions` (City/Provincial/National/International); removed messy filters arrays.
  - `ConsultancyCategoryPage.jsx`: removed work-order form; added category description; filters now Type of Service (SelectDropdown), Rate (RangeSliderDropdown $10–$100K), Distance (SelectDropdown), Experience (RangeSliderDropdown 0–50yrs); Availability removed; `DEFAULT_CATEGORY` defined; AI-badge work-order wording removed.
  - `ConsultancyProfessionalPage.jsx`: summary→CA description constant; removed service-card boxes; single "Book an Appointment" button; support headset icon by name → new `SupportContactModal` (Name/Email/Message).
  - `ConsultancyBookingModal.jsx`: rebuilt form → Description | Attachments | Schedule voice/video call (optional, with conditional datetime).
  - `ConsultancyCategoryShortlisted.jsx`: heading/title → Inbox; incoming blue tags → service-example tags; added Avg Response Time 24h + Hourly rate $500/hr; user-facing "Work Order" wording removed (→ "Request").
  - `AdminApp.jsx`: nav "Shortlisted"→"Inbox" ×5; unique per-category ids (fixes duplicate-id dropdown bug).
  - New CSS: `.consultancy-category-description`, `.consultancy-support-icon`, `.consultancy-inbox-meta*`. Build passes.
- [x] **Phase 3 — DONE (2026-06-27).** Items #13,#14,#15,#15b.
  - #13 `ProfileFake.jsx`: 100→10 per month.
  - #14/#15 `ProfileSell.jsx`: added `profileName` to rows; cols Date→Profile Name, removed email, Amount→Asking Price; "Pending" tab→"Incoming Offer"; incoming-offer 3-dot = Accept/Decline/Counter (→ new `OfferActionModal`, Counter has amount input); normal 3-dot adds "Verify Profile" (→ `ProfileSellModal` verify mode w/ Verification Code field + "Verify" button). `ProfileSellModal` now takes `mode` prop (sell/edit/verify).
  - #15b `ProfileBuy.jsx`: Revenue Range→Asking Price Range dual-bar (`RangeSliderDropdown`); card summary→CA description; removed CA/Location/Experience tags; Asking Price next to name; Buy Profile→new `BuyProfileModal` (Buy / Make Offer w/ amount).
  - New components: `OfferActionModal.jsx`, `BuyProfileModal.jsx`. Build passes.
- [x] **Phase 4 — DONE (2026-06-27).** Item #18 (+ closes #1).
  - `collaborationProfilesData.js` restructured: added country, followers/following/posts, activity {likes,views,comments,reposts}, askingRate; legacy askingRates/summary kept so Shortlisted pages still render. Profile ids renamed profile-1..10 (workOrderData refs by index — safe).
  - `CollaborationPage.jsx`: platform derived from URL; `PLATFORM_CONFIG` per platform (labels Tweets/Videos/Subscribers, repostLabel Retweets/Shares, rateUnit, description). Card: country + platform-labelled posts/followers/following; removed CA/Experience; Location→Country; platform description; Activity analytics block; platform-dependent Asking Rate. Work-order wording → Campaign/brief.
  - `CollaborationShortlisted.jsx`: user-facing "Work Order" → "Campaign". New CSS `.collaboration-activity*`.
  - #1 now fully Done (rebrand + all user-facing work-order wording removed; code identifiers intact).
- [x] **Phase 5 — DONE (2026-06-27).** Items #16,#17 (`Dashboard.jsx` + `Dashboard.css`).
  - #16: John Doe / johndoe@gmail.com / john_doe; removed social-media-links block from profile card; profile box → LEFT via `flex-row-reverse` (col-md-5 `pe-0`).
  - #17: social-media cards row (each shows john_doe); two Bar charts (Revenue vs Paid Out, Followers by Platform) with `statChartOptions`; Collaboration Offers panel (incoming/outgoing badges, amount, time); Recent Activity panel with timeframe filter (24h/1w/1m/1y/5y/10y, cumulative) + sort select.
  - Removed unused pinterestIcon import. New CSS `.dashboard-social-card*`, `.dashboard-stat-card`, `.dashboard-panel`, `.collab-notification*`, `.recent-activity*`. Build passes.
- [x] **Phase 6 — DONE (2026-06-27).** #2 hexagon now rebuilt too.
  - Honeycomb: new `.honeycomb` markup in `Home.jsx` (data-driven `hexCols` + `renderHex`) replacing the old absolute-positioned `.hex` grid. Tight flat-top beehive: 3-3-3 columns, 8 service hexes around a bold central hexagon. Surrounding hexes are flip-cards (front=hexagon, back=rectangle) that expand to a grid + `rotateY(180)` on scroll-into-view (reuses `useScrollReveal` is-visible; honeycomb opacity forced visible so the beehive shows at rest). Center is HTML now (fixes "INFLUERE" baked into `hexagon-center.svg` → "iCollaborate.ai / Provides"). CSS in `index.css` under "Honeycomb beehive". 8-hex cap dropped 3 services (Action against Fake/Duplicate, Avail Discounts, iCollaborate Linktree) — swappable. Removed unused icon imports (hexagonCenter, Icon5/6/11).
- [~] (superseded) **Phase 6 — #3 DONE, #2 PARTIAL (2026-06-27).**
  - #3 DONE: `useScrollReveal` hook (IntersectionObserver) + `[data-animate]`/`.is-visible` CSS in `index.css` (prefers-reduced-motion fallback). Applied to Home (hero onload + why-join/professional/about on-scroll) and Registration content (per-step via deps).
  - #2 DONE-part: About-Us section → heading "What is iCollaborate.ai" + new iCollaborate.ai copy; latin-verb paragraph removed.
  - #2 PENDING (visual review): hexagon honeycomb redesign to exactly 8-around-1 beehive + flip-to-rectangle on scroll. The section (`index.css` `.hexagon-section .hex:nth-child(n)`) is hand-tuned absolute positioning (11 hexes, individual hover-flip); a flip-all-on-scroll would overlap without a grid redesign. Deferred to a visual session. NOT applied (would break layout blind).
- [x] **Phase 7 — verification (2026-06-27).**
  - `npm run build` passes after every phase (194 modules, no errors).
  - `npm run lint`: 47 problems / 44 errors — all pre-existing (baseline was 48/45); my new files lint clean; net improved by 1 (removed an unused import).
  - Sheet-1 leftover bug (collaboration/setup tabs not switching): VERIFIED FIXED by code review — `setActivePlatform` → `useEffect([activePlatform])` rebuilds per-platform settings (facebook 300-700, twitter 400-800, instagram 100-500, youtube 310-710, tiktok 500-900, linkedIn→default). Sliders/amounts update on tab change.
  - ⚠️ Browser walkthrough NOT performed (no browser in this session). Recommend a visual `npm run dev` pass, especially: new square logo sizing in navbar/sidebar/footer; consultancy filters & professional page; ProfileSell/Buy modals; Dashboard #17 layout; Home scroll animations.

### STATUS SUMMARY (2026-06-27)
All tracker items **Done** except **#2 (In Progress)** — its content/heading/animation parts are done; only the hexagon honeycomb geometry redesign (8-around-1 beehive + flip-on-scroll) remains, deferred for a visual session (see Phase 6 note). New components added: `SupportContactModal`, `OfferActionModal`, `BuyProfileModal`; new hook `useScrollReveal`.

### Open questions to confirm with client (non-blocking; defaults chosen)
- Footer email address for `info@icollaborate.ai` (assumed).
- Confirm per-category service types (Decision #2) vs literal legal list everywhere.
- Several `prnt.sc` screenshots are inaccessible — dashboard layout (#17), hexagon flip (#2), notifications box style. Built from text; review visually.

---

## 7. How to resume (next session checklist)
1. Read this file fully.
2. `cd` to project root; run `npm install` if `node_modules` missing.
3. Open `iCollaborate-Change-Tracker.xlsx` to see live status.
4. Check git status / `git log` for any partial work since this doc was written.
5. Continue from the first unchecked item in §6, following §4 detail.
6. After each item: update the tracker (Status + Remark) and the §6 checklist.
7. Do NOT blanket-replace "Work Order" (Decision #3). Do NOT rename code identifiers for the rebrand.
