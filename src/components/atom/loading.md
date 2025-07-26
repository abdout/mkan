# Loading Component Usage Guide

The `Loading` component is a reusable loading spinner that can be used throughout the application. It supports multiple variants and sizes for different use cases.

## Props

- `variant`: "fullscreen" | "inline" | "overlay" (default: "fullscreen")
- `size`: "sm" | "md" | "lg" (default: "md")
- `text`: Optional loading text to display
- `className`: Additional CSS classes

## Usage Examples

### 1. Fullscreen Loading (Default)
Used for page-level loading states, authentication checks, and major data fetching.

```tsx
import Loading from "@/components/atom/loading";

// Basic usage
<Loading />

// With custom text
<Loading text="Loading your dashboard..." />

// With custom size
<Loading size="lg" text="Processing..." />
```

### 2. Inline Loading
Used within components, buttons, or small areas.

```tsx
// Small inline loading
<Loading variant="inline" size="sm" />

// With text
<Loading variant="inline" text="Saving..." />
```

### 3. Overlay Loading
Used over specific content areas while keeping the page structure.

```tsx
<div className="relative">
  <div className="content">
    {/* Your content here */}
  </div>
  <Loading variant="overlay" text="Updating..." />
</div>
```

## Implementation in Routes

### Next.js Loading Boundaries
Create `loading.tsx` files in route directories for automatic loading states:

```tsx
// src/app/(auth)/loading.tsx
import Loading from "@/components/atom/loading";

export default function AuthLoading() {
  return <Loading variant="fullscreen" text="Loading..." />;
}
```

### Authentication Loading
For pages that check authentication status:

```tsx
const { session, status } = useAuthRedirect();

if (status === 'loading') {
  return <Loading variant="fullscreen" text="Loading..." />;
}
```

### Form Submission Loading
For forms and actions:

```tsx
const [isPending, startTransition] = useTransition();

// In your JSX
<Button disabled={isPending}>
  {isPending ? (
    <Loading variant="inline" size="sm" />
  ) : (
    "Submit"
  )}
</Button>
```

### Data Fetching Loading
For async data operations:

```tsx
const [isLoading, setIsLoading] = useState(false);

const fetchData = async () => {
  setIsLoading(true);
  try {
    // Fetch data
  } finally {
    setIsLoading(false);
  }
};

// In your JSX
{isLoading && <Loading variant="overlay" text="Loading data..." />}
```

## Best Practices

1. **Use appropriate variants**: Fullscreen for page loads, inline for small areas, overlay for content-specific loading
2. **Provide meaningful text**: Help users understand what's happening
3. **Consistent sizing**: Use "sm" for buttons/forms, "md" for general use, "lg" for prominent loading states
4. **Accessibility**: The component includes proper ARIA attributes and keyboard navigation support
5. **Performance**: Use loading states sparingly and only when necessary

## Common Use Cases

- **Page transitions**: Next.js loading boundaries
- **Authentication**: Session checking and redirects
- **Form submissions**: Button loading states
- **Data fetching**: API calls and database operations
- **File uploads**: Progress indicators
- **Search operations**: Query processing
- **Navigation**: Route changes and redirects 