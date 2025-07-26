# Databayt Architecture Overview

## Introduction

Our architecture is engineered from the ground up for reusability, modularity, and a world-class developer experience. It's not just a system for building applications; it's a framework for composing "atomic" automation components into a powerful, collaborative, and AI-augmented ecosystem. We prioritize a scalable, feature-based structure to ensure that every contribution adds lasting, discoverable value to the entire codebase.

## Core Architectural Principles

Our design decisions are guided by a few key principles:

### Component-Driven Modularity
Inspired by the philosophy of shadcn/ui, we provide a codebase of reusable, customizable components at their most minimal, essential state. Every piece of functionality is an "atomic" building block designed for composition.

### Superior Developer Experience
We believe that an intuitive and predictable structure is key to productivity. Our architecture is designed to be easily understood, navigated, and extended.

### Feature-Based & Composable
The system is built as a collection of features, enabling a micro-services and micro-frontends approach. Independent components and services can be developed, deployed, and composed to build complex applications.

### Serverless-First
We leverage a serverless paradigm to eliminate infrastructure management, enable automatic scaling, and optimize operational costs. Our system scales seamlessly from a single user to enterprise-level demand.

### Type-Safety by Default
We enforce strict type safety across the entire stack, from the database to the frontend. This minimizes runtime errors and enhances code reliability.

### AI-Augmented Workflow
Artificial intelligence is woven into the fabric of our architecture. From AI-assisted coding to intelligent automation agents, we use AI to accelerate the development lifecycle.

## The Composition Hierarchy: From Atoms to Apps

Our methodology is based on a clear and scalable composition hierarchy. We don't just provide code; we provide the building blocks for value creation.

### Atoms
The foundation is built using core shadcn/ui components and other primitives. These are the most basic, indivisible UI elements.

### Templates
We shape Atoms into Templates—reusable layouts and component compositions that solve common UI patterns (e.g., a standard page layout, a data table structure).

### Building Blocks
A Building Block combines Templates with client-side logic (hooks.ts, validation.ts) to create interactive, feature-rich user experiences.

### Microservices
A Microservice is the combination of Building Blocks with backend logic (actions.ts). It's a fully encapsulated feature, complete with its UI, data models, and API, that can operate independently.

### Full Apps
Finally, we craft Full Apps by composing various Microservices, creating a cohesive, enterprise-grade solution.

This layered approach, influenced by component management platforms like Bit, ensures that every part of the system is reusable and contributes to a greater whole.

## Project Structure: A Feature-Based, Mirror-Pattern Approach

Our project structure follows a predictable, mirror-pattern architecture that enhances code discoverability and creates an intuitive mental model for developers.

### Philosophy: URL-to-Directory Mapping
Every URL route has a corresponding, mirrored directory structure for its component logic. If you can see a URL, you know exactly where to find its code.

**Example:**
- URL: `/appointment` mirrors to:
  - `app/appointment/` (Next.js App Router files)
  - `components/appointment/` (All related component logic)

### Directory Structure

```
project-root/
├── app/                     # Next.js App Router (Routing & Layouts)
│   ├── appointment/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── loading.tsx
│   └── dashboard/
│       ├── page.tsx
│       └── settings/
│           └── page.tsx
│
├── components/              # Component Logic (Mirrors `app` structure)
│   ├── appointment/
│   │   ├── actions.ts       # Server actions & API calls
│   │   ├── constants.ts     # Arrays, enums, static data
│   │   ├── validation.ts    # Zod schemas & validation logic
│   │   ├── types.ts         # TypeScript interfaces & types
│   │   ├── form.tsx         # Form components
│   │   ├── cards.tsx        # Card components
│   │   ├── content.tsx      # UI content components
│   │   └── hooks.ts         # Custom React hooks
│   └── dashboard/
│       ├── actions.ts
│       ├── constants.ts
│       └── settings/
│           ├── form.tsx
│           └── validation.ts
│
├── lib/                     # Shared utilities & functions
├── types/                   # Global TypeScript definitions
└── public/                  # Static assets
```

## Standardized File Patterns

To ensure consistency, each feature directory follows standardized naming conventions. A CLI tool helps scaffold these files automatically, enforcing the pattern across the codebase.

| File            | Purpose                                             | Example Content                                 |
|-----------------|-----------------------------------------------------|-------------------------------------------------|
| `actions.ts`    | Server actions, API calls, data mutations           | `createAppointment()`, `updateStatus()`         |
| `constants.ts`  | Static data, enums, configuration                   | Status arrays, default values                   |
| `validation.ts` | Zod schemas for form and API validation             | Input schemas, error messages                   |
| `types.ts`      | TypeScript interfaces and type definitions          | Component props, data models                    |
| `form.tsx`      | Form components using React Hook Form               | Input fields, submission logic, state           |
| `cards.tsx`     | Card-based UI components                            | Data display cards, interactive elements        |
| `content.tsx`   | General UI content and layout components            | Headers, descriptions, sections                 |
| `hooks.ts`      | Custom React hooks for state and effects            | `useAppointmentState()`, `useStatusQuery()`     |
| `use-x.ts`      | Custom hook, where `x` is a relevant hook name      | `useAppointment.ts`, `useStatus.ts`             |
| `featured.tsx`  | Feature-specific component for selected/all content  | Featured items, hero sections                   |
| `utils.ts`      | Utility/helper functions for the feature            | Data formatting, calculations                   |
| `README.md`     | Feature-level documentation                         | Usage, architecture, examples                   |
| `ISSUE.md`      | Feature-level issue template or tracking             | Known issues, todos, bug reports                |

We leverage TypeScript Generics extensively within these files, especially in `types.ts` and `hooks.ts`, to create highly reusable and flexible logic that can be adapted to various data structures without sacrificing type safety.

## Component Layer Definitions

### UI Layer (`src/components/ui/`)
- **Purpose**: Base design system components from shadcn/ui
- **Usage**: Installed via `npx shadcn-ui@latest add [component]`
- **Examples**: Button, Input, Card, Dialog, Sheet
- **Styling**: Fully styled with Tailwind CSS variants

### Atoms Layer (`src/components/atoms/`)
- **Purpose**: Small, reusable components following shadcn patterns
- **Usage**: Custom atomic components built on top of UI layer
- **Examples**: Logo, Badge, Avatar, Spinner, Status indicators
- **Styling**: Consistent with shadcn/ui styling patterns

### Templates Layer (`src/components/templates/`)
- **Purpose**: Layout and structural components following shadcn patterns
- **Usage**: Page layouts, navigation, common page sections
- **Examples**: Header, Footer, Sidebar, Navigation, Page wrappers
- **Styling**: Structural styling with flexible content areas

### Feature Layer (`src/components/[feature]/`)
- **Purpose**: Feature-specific business logic components
- **Usage**: Components that implement specific business features
- **Examples**: Gallery components, Dashboard widgets, User management
- **Styling**: Feature-specific styling while maintaining design consistency

## System Layers & Data Flow

This structured, component-based approach integrates seamlessly with our technical system layers.

### Presentation Layer (Next.js/React)
Renders the components defined in `form.tsx`, `cards.tsx`, and `content.tsx`.

### Application & API Layer (Vercel)
Executes the logic from `actions.ts`, validates data with schemas from `validation.ts`, and handles authentication with Auth.js.

### Data & Persistence Layer (PlanetScale/Prisma)
Interacts with the database based on the schemas and types defined in `types.ts`.

### AI & Automation Core (Python/Rust/LangGraph)
The complex automation agents are often invoked from within `actions.ts`, acting as the most powerful type of "microservice."

### Development & Integration Layer
Our CLI, Cursor editor, and Claude assistant all understand this structure, making development a fluid, AI-augmented experience we call Vibe Coding.

## A Typical Interaction

1. A user interacts with a component from `form.tsx` on the Next.js frontend, triggering a Server Action from `actions.ts`.
2. The request payload is validated by a Zod schema from `validation.ts`.
3. The serverless function uses the type-safe Prisma client to query PlanetScale, using interfaces from `types.ts`.
4. For complex tasks, the action invokes a LangGraph agent.
5. The result is streamed back and managed by a hook from `hooks.ts`, efficiently updating the UI.

## Best Practices

### Component Organization
- **Single Responsibility**: Each component should have one clear purpose
- **Consistent Naming**: Follow established naming patterns across features
- **Type Safety**: Use TypeScript for all components and utilities
- **Export Patterns**: Use named exports for components, default for pages

### File Structure
- **Predictable Paths**: URL structure directly maps to directory structure
- **Feature Isolation**: Keep feature logic contained within feature directories
- **Shared Resources**: Place truly shared code in `lib/` and `components/atoms|templates/`
- **Documentation**: Include README.md files for complex features

### Development Workflow
- **Route First**: Create route structure in `src/app/` first
- **Components Second**: Build corresponding components in `src/components/`
- **Types & Validation**: Define types and validation schemas early
- **Actions Last**: Implement server actions and API integrations

## Micro-Frontend Considerations

### Feature Independence
- Each feature directory can be developed independently
- Minimal cross-feature dependencies
- Standardized interfaces between features
- Shared design system ensures consistency

### Reusability
- Components built with reusability in mind
- Clear separation of concerns
- Consistent API patterns across features
- Documentation for component usage

### Scalability
- New features follow established patterns
- Clear onboarding path for contributors
- Standardized development workflow
- Automated tooling support

## Contributing Guidelines

When adding a new feature:

1. Create route structure in `src/app/[feature]/`
2. Create component directory in `src/components/[feature]/`
3. Follow file conventions using standard file names
4. Add TypeScript types for all data structures
5. Implement validation schemas for forms and APIs
6. Write custom hooks for state management
7. Build UI components following design system patterns
8. Add documentation explaining feature usage

This structure ensures our codebase remains organized, scalable, and contributor-friendly while supporting our mission of building reusable automation components for business applications. 