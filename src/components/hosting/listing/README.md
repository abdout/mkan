# Hosting Listing Components

## Overview
This directory contains components for managing and displaying host listings, including smart navigation and progress tracking for the listing creation process.

## Components

### ListingCard
**File**: `listing-card.tsx`

A comprehensive card component that displays listing information with smart navigation and progress tracking.

#### Features
- **Smart Navigation**: Automatically determines the next step in the listing creation process
- **Progress Tracking**: Shows completion percentage and next step for in-progress listings
- **Status Indicators**: Visual badges showing listing status (Published, Action required, In progress)
- **Responsive Design**: Adapts to grid and list view modes
- **Image Handling**: Fallback images and error handling for listing photos

#### Props
```typescript
interface ListingCardProps {
  listing: Listing;
  viewType: 'grid' | 'list';
}
```

#### Status Logic
- **Published**: Navigate to photo tour editor (`/hosting/listings/editor/[id]/details/photo-tour`)
- **Action Required**: Navigate to photo tour editor for required actions
- **In Progress**: Navigate to the next incomplete step in the creation process

#### Progress Indicator
For in-progress listings, displays:
- Progress percentage (0-100%)
- Visual progress bar
- Next step description

### ListingSidebar
**File**: `listing-sidebar.tsx`

A sidebar component for the listing editor that provides navigation to different sections of the listing.

#### Features
- **Tab Navigation**: Switch between details and travel sections
- **Quick Links**: Direct access to all listing detail pages
- **Contextual Information**: Shows current values for each section

## Utilities

### Listing Progress Utility
**File**: `src/lib/utils/listing-progress.ts`

A comprehensive utility for tracking and managing listing creation progress.

#### Functions

##### `getNextStep(listing: Listing): string`
Determines the next step in the listing creation process based on current data.

**Logic Flow**:
1. If published → return 'photo-tour'
2. Check each step in order for completion
3. Return first incomplete step
4. If all complete → return 'legal'

**Step Validation**:
- `about-place`: Always accessible
- `structure`: Requires propertyType
- `privacy-type`: Requires propertyType  
- `location`: Requires propertyType
- `floor-plan`: Requires location
- `stand-out`: Requires guestCount
- `amenities`: Requires guestCount
- `photos`: Always accessible
- `title`: Requires 5+ photos
- `description`: Requires description
- `finish-setup`: Requires description
- `instant-book`: Requires description
- `visibility`: Requires description
- `price`: Requires pricePerNight
- `discount`: Requires pricePerNight
- `legal`: Requires pricePerNight

##### `getProgressPercentage(listing: Listing): number`
Calculates the completion percentage (0-100%) of the listing creation process.

##### `getCurrentStep(listing: Listing): string`
Finds the current step the user should be on based on completed data.

##### `getStepTitle(step: string): string`
Returns human-readable titles for each step.

## Hosting Flow Steps

### Phase 1: Tell us about your place (Steps 1-6)
1. **about-place** - Introduction and overview
2. **structure** - Property type selection
3. **privacy-type** - Privacy level selection
4. **location** - Address and location details
5. **floor-plan** - Room counts and guest capacity
6. **stand-out** - Special features selection

### Phase 2: Make it stand out (Steps 7-11)
7. **amenities** - Amenity selection
8. **photos** - Photo upload (minimum 5)
9. **title** - Listing title creation
10. **description** - Description and highlights
11. **finish-setup** - Setup completion

### Phase 3: Finish up and publish (Steps 12-16)
12. **instant-book** - Instant booking settings
13. **visibility** - Listing visibility settings
14. **price** - Pricing setup
15. **discount** - Discount options
16. **legal** - Legal agreements and publishing

## Navigation Patterns

### Published Listings
- Navigate to: `/hosting/listings/editor/[id]/details/photo-tour`
- Purpose: Edit and manage published listings

### Action Required Listings
- Navigate to: `/hosting/listings/editor/[id]/details/photo-tour`
- Purpose: Address required actions or missing information

### In Progress Listings
- Navigate to: `/host/[id]/[next-step]` or `/hosting/listings/editor/[id]/details/photo-tour`
- Purpose: Resume creation from where left off

## Usage Examples

### Basic Listing Card
```tsx
import ListingCard from '@/components/hosting/listing/listing-card';

<ListingCard 
  listing={listingData} 
  viewType="grid" 
/>
```

### Progress Tracking
```tsx
import { getNextStep, getProgressPercentage } from '@/lib/utils/listing-progress';

const nextStep = getNextStep(listing);
const progress = getProgressPercentage(listing);
```

## Styling

### Status Colors
- **Published**: Green (`bg-green-500`)
- **Action Required**: Red (`bg-red-500`)
- **In Progress**: Orange (`bg-orange-500`)

### Progress Bar
- Background: Gray (`bg-gray-200`)
- Progress: Blue (`bg-blue-600`)
- Height: 1.5 (`h-1.5`)
- Rounded corners (`rounded-full`)

## Dependencies
- `@/types/listing` - Listing type definitions
- `@/components/ui/badge` - Badge component for status
- `next/image` - Image optimization
- `next/navigation` - Router navigation

## Related Files
- `src/app/hosting/listings/page.tsx` - Main listings page
- `src/app/host/[id]/` - Host onboarding flow
- `src/app/hosting/listings/editor/[id]/details/` - Listing editor
- `src/types/listing.ts` - Listing type definitions
