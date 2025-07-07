// Alternative: Single array approach
export const ALL_NAVIGATION_ITEMS = [
  { type: "display", href: "/host", label: "Become a host" },
  { type: "display", href: "/create-experience", label: "Create your experience" },
  { type: "display", href: "/help", label: "Help" },
  { type: "display", label: "EUR €" },
  { type: "display", label: "English" },
  { type: "display", href: "/login", label: "Login" },
  { type: "display", href: "/join", label: "Join" },
];

// Current approach: Separate arrays
export const NAVIGATION_LINKS = [
  { href: "/host", label: "Become a host" },
  { href: "/create-experience", label: "Create your experience" },
  { href: "/help", label: "Help" },
];

export const DISPLAY_ITEMS = [
  { label: "EUR €" },
  { label: "English" },
];

export const AUTH_LINKS = [
  { href: "/login", label: "Sign in" },
  { href: "/register", label: "Sign up" },
];
