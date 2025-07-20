# Host Onboarding – Logic Implementation Plan

> **Goal:** Extend the new Airbnb-style _Become-a-Host_ UI (`/src/app/host/**`) with full backend logic while staying in-sync with the original project’s architecture and coding patterns.

---

## Phase 0 – Baseline Analysis
1. **Current State**
   * UI wizard pages exist under `/src/app/host/…`, but nothing is persisted.
   * The original codebase uses a `Property` Prisma model and supporting server actions (`createProperty`, etc.).
2. **Upcoming Changes**
   * We will introduce a **new Prisma model named `Listing`** that reflects the Airbnb terminology and the new UI field names.
   * Gradual migration: existing `Property` logic stays functional until the dashboard/search is switched over.

---

## Phase 1 – Data Layer
| Task | Details |
| ---- | ------- |
| 1. Prisma Schema | • Duplicate `Property` model → `Listing` (singular).  
• Rename/adjust columns to match UI (e.g. `pricePerNight`, `guestCount`, `bathroomCount`, etc.).  
• Add `draft: Boolean @default(true)` and `isPublished: Boolean @default(false)` flags. |
| 2. Relations | Keep `location`, `manager`, `applications`, `leases` identical so downstream queries need minimal change. |
| 3. Migration | Run `prisma migrate dev` to generate SQL.  
(Optional) copy existing Property rows into Listing. |
| 4. Generate Client | `pnpm prisma generate` |

---

## Phase 2 – Server Actions / API
1. **`src/lib/actions/listing-actions.ts`**  
   * Copy structure of `property-actions.ts`.  
   * Functions: `createListing`, `updateListing`, `getListings`, `getListing`, `deleteListing`, `getHostListings`.  
   * Follow the same error logging / `revalidatePath` style.
2. **API Route (optional)**  
   `/src/app/api/listings/route.ts` → thin wrapper around server actions.

---

## Phase 3 – Host Onboarding State Machine
1. **Context Provider** – `HostListingContext` under `/src/components/host` (or `/src/host`).
2. **Draft Record** – First step (`about-place`) calls `createListing` with `{ draft: true }`, retrieves the `id`, and routes to `/host/[id]/next-step`.
3. **Incremental Updates** – Each wizard page posts its slice via `updateListing(id, partial)`.
4. **Publish Step** – Final page validates completeness and flips `draft→false`, `isPublished→true`, `postedDate=now()`.

---

## Phase 4 – Dashboard & Search Migration
1. Replace old Property queries with Listing equivalents (`getHostListings`, `getListings`).
2. Filter out `draft` listings for public search.

---

## Phase 5 – Clean-Up
1. Project-wide refactor `property` → `listing` (imports, variable names).  
2. Remove `Property` model after verification.

---

## Deliverables Checklist
- [ ] Prisma model & migration
- [ ] `listing-actions.ts`
- [ ] Context provider + hooks
- [ ] Wizard pages wired to server actions
- [ ] Publish validation logic
- [ ] Dashboard integration
- [ ] End-to-end smoke tests (Cypress/Playwright)

---

## File/Naming Convention for `@/host`

```
@/host
├── constants.ts          # Wizard-specific constants & configurations
├── types.ts              # Shared TypeScript types/interfaces
├── validation.ts         # Zod/Yup schemas for each step
├── actions.ts            # Server actions & thin API wrappers
├── use-gallery.tsx       # Custom hooks (state machine, data fetching, mutations)
├── form.tsx              # Reusable form components (Input, Select, etc.)
├── card.tsx              # Listing card (summary)
├── table.tsx             # Listings table for dashboard
├── content.tsx           # Static marketing/content components
├── featured.tsx          # Highlighted listings component
├── all.tsx               # "Show all listings" component
└── detail.tsx            # Listing detail page/component
```

> All new logic files (actions, hooks, context) should live alongside this structure to keep the host feature self-contained.

---

**Next step:** implement Phase 1 (Prisma model & migration). 