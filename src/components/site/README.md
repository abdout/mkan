# Site Components

This directory contains components for the homepage/site section following the project architecture standards.

## Architecture

Follows the composition hierarchy:
1. **UI**: shadcn/ui primitives (Button, etc.)
2. **Atoms**: Basic components (HeroSection, PropertyFilter)
3. **Templates**: Layout compositions (property, search templates)
4. **Blocks**: Templates + client logic (content.tsx + hooks)
5. **Micro**: Backend integration (actions.ts)
6. **Apps**: Full feature composition (page.tsx)

## Mirror Pattern

- Route: `src/app/(site)/page.tsx`
- Feature code: `src/components/site/`
- Page imports `SiteContent` from `@/components/site/content`

## File Structure

### Core Files
- `type.ts` - TypeScript interfaces and types
- `content.tsx` - Main site content component
- `use-site.ts` - Custom React hooks for site functionality
- `actions.ts` - Server actions for data fetching
- `validation.ts` - Zod schemas for validation
- `constant.ts` - Static data and configurations
- `util.ts` - Utility functions

### Components
- `HeroSection.tsx` - Hero section component
- `property-filter.tsx` - Category filter component
- `property/` - Property-related components
- `airbnb-*.tsx` - Additional page sections

## Features

- **Search & Filtering**: Location, guest count, and category filtering
- **Sticky Filter Behavior**: Smart sticky positioning based on scroll
- **URL State Management**: Search parameters preserved in URL
- **Responsive Design**: Mobile and desktop optimized
- **Performance**: Debounced search, memoized values

## Usage

```tsx
import { SiteContent } from "@/components/site/content";

export default function HomePage() {
  return <SiteContent />;
}
```

## State Management

The `use-site.ts` hook manages:
- Listings data and loading states
- Search filters and URL synchronization  
- UI state (sticky filter, selected category)
- Scroll behavior and refs
- Error handling