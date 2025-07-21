# Host Onboarding – Logic Implementation Plan

> **Goal:** Extend the new Airbnb-style _Become-a-Host_ UI (`/src/app/host/**`) with full backend logic while staying in-sync with the original project’s architecture and coding patterns.

---

## Phase 0 – Baseline Analysis
1. **Current State**
   * UI wizard pages exist under `/src/app/host/…`, but nothing is persisted.
   * The original codebase uses a `Property` Prisma model and supporting server actions (`createProperty`, etc.).
2. **Upcoming Changes**
   * We will **rename the existing `Property` Prisma model to `Listing`** so the data layer speaks Airbnb’s language out-of-the-box.
   * Column names will also be updated where necessary (e.g. `pricePerNight`, `guestCount`, etc.).
   * After the rename, all references in code will be migrated; no duplicate model will be kept.

---

## Phase 1 – Data Layer
| Task | Details |
| ---- | ------- |
| 1. Prisma Schema | • **Rename** `Property` → `Listing` in `schema.prisma`.  
• Update field names to align with the new onboarding UI (e.g. `pricePerNight`, `guestCount`, `bathroomCount`, etc.).  
• Add `draft: Boolean @default(true)` and `isPublished: Boolean @default(false)` flags.  
• Update any other related enum or relation names if required. |
| 2. Relations | Keep `location`, `manager`, `applications`, `leases` identical so downstream queries need minimal change. |
| 3. Migration | Run `prisma migrate dev` – Prisma will handle the rename with a migration. |
| 4. Generate Client | `pnpm prisma generate` |

---

## Phase 2 – Server Actions
**`src/components/host/action.ts`** (co-located with the host feature)  
* Copy structure of `property-actions.ts`.  
* Export **server actions**: `createListing`, `updateListing`, `getListings`, `getListing`, `deleteListing`, `getHostListings`.  
* Maintain the same error logging / `revalidatePath` style.  
* No external API route – pages and hooks will call these server actions directly.

---

## Phase 3 – Host Onboarding State Machine
1. **Context Provider** – `HostListingContext` under `/src/components/host` (or `/src/host`).
2. **Form Technology** – Each wizard step is an **independent form powered by [React-Hook-Form](https://react-hook-form.com/) + [Zod](https://github.com/colinhacks/zod)** (using the RHF Zod resolver).  
   * This keeps validation colocated with each step.  
   * RHF provides built-in `formState` to surface errors, dirty state, etc.
3. **Draft Record** – First step (`about-place`) calls `createListing` with `{ draft: true }`, retrieves the `id`, and routes to `/host/[id]/next-step`.
4. **Incremental Updates** – Each wizard page posts its slice via `updateListing(id, partial)` right after `handleSubmit` succeeds.
5. **Publish Step** – Final page validates completeness server-side and flips `draft→false`, `isPublished→true`, `postedDate=now()`.

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
- [x] Prisma model rename & migration
- [x] `src/components/host/action.ts` (server actions)
- [x] Context provider + hooks (`use-listing.tsx`)
- [x] Step component structure (about-place, floor-plan examples)
- [x] React Hook Form + Zod integration
- [x] Wizard pages wired to server actions
- [x] **NEW: Amenities step implementation**
- [x] **NEW: Price step with validation**
- [x] **NEW: Finish-setup step with publish logic**
- [x] Publish validation logic
- [ ] Dashboard integration (update to use Listing model)
- [ ] Additional step implementations (photos, title, description, location, etc.)
- [ ] End-to-end smoke tests

---

## File/Naming Convention for `@/host`
The **root** of the host feature maintains shared utilities, _plus_ **each wizard step gets its own sub-directory** containing the same canonical file set (you may omit files you don’t need).

Example for the **Amenities** step:

```
src/components/host/amenities/
├── constants.ts          # Step-specific constants & configurations
├── types.ts              # TypeScript types for this step
├── validation.ts         # Zod schema for amenities selection
├── actions.ts            # Server calls that patch the listing (calls updateListing)
├── use-amenities.tsx     # Custom hook wrapping RHF useForm + context helpers
├── form.tsx              # Step form fields (checkbox grid, etc.)
├── card.tsx              # Summary card shown on overview
└── (others as needed, e.g. table.tsx, content.tsx)
```

Repeat the same structure for **about-place**, **photos**, **price**, **location**, etc.  The page file under `/src/app/host/[id]/amenities/page.tsx` will simply import and render `<AmenitiesForm />` from this subfolder.

> This keeps UI, validation, and mutations neatly co-located.

---

**Next step:** implement Phase 1 (Prisma model & migration). 