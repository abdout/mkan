# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mkan is a rental marketplace application connecting tenants with property managers, built with an Airbnb-inspired design. It's a full-stack Next.js 15 application using TypeScript, Prisma ORM with PostgreSQL, and NextAuth for authentication.

## Essential Commands

### Development
```bash
pnpm dev                # Start development server with Turbopack
pnpm build             # Build for production (runs prisma generate first)
pnpm start             # Start production server
pnpm lint              # Run ESLint
```

### Database & Seeding
```bash
pnpm prisma generate       # Generate Prisma client
pnpm prisma migrate dev    # Run database migrations
pnpm prisma studio         # Open Prisma Studio GUI
pnpm  seed              # Seed database (tsx seed.ts)
pnpm seed:listings     # Seed listings data (tsx scripts/seed-listings.ts)
```

## Architecture & Project Structure

### Core Technologies
- **Framework**: Next.js 15 with App Router and React 19
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5 (beta) with Prisma adapter
- **Styling**: Tailwind CSS v4 with Radix UI components
- **State Management**: Redux Toolkit, Zustand, and React Context
- **Form Handling**: React Hook Form with Zod validation

### Directory Structure
```
src/
├── app/                  # Next.js App Router pages
│   ├── (auth)/          # Authentication pages (login, register, etc.)
│   ├── (dashboard)/     # Dashboard pages for managers/tenants
│   ├── (site)/          # Public site pages
│   ├── host/            # Host-specific pages
│   ├── hosting/         # Hosting management pages
│   └── api/             # API routes
├── components/          # React components
│   ├── ui/              # Shadcn UI components
│   ├── auth/            # Authentication components
│   ├── forms/           # Form components
│   └── hosting/         # Hosting-related components
├── lib/                 # Utility functions and configurations
│   ├── actions/         # Server actions
│   ├── constants/       # App constants
│   └── db.ts           # Database client
├── hooks/              # Custom React hooks
├── server/             # Backend server code (separate package)
└── types/              # TypeScript type definitions
```

### Key Architectural Patterns

1. **Route Groups**: Uses Next.js route groups `(auth)`, `(dashboard)`, `(site)` for layout organization without affecting URL structure

2. **Authentication Flow**: 
   - Configured in `auth.ts` and `auth.config.ts`
   - Supports OAuth and credential-based authentication
   - Two-factor authentication support
   - Role-based access (ADMIN, USER, MANAGER, TENANT)

3. **Database Schema**:
   - Uses Prisma with PostgreSQL
   - Schema defined in `prisma/schema.prisma`
   - Enums for UserRole, Highlight, and Amenity
   - Relationships between Users, Listings, Applications, etc.

4. **Server Actions**: Located in `src/lib/actions/` for database operations

5. **Component Organization**:
   - Shadcn UI components in `src/components/ui/`
   - Feature-specific components grouped by domain
   - Shared components at root of components directory

### Path Aliases
- `@/*` → `./src/*`
- `@/auth` → `./auth`

## Important Configuration Notes

### Build Configuration
- **ESLint errors are ignored during builds** (`ignoreDuringBuilds: true`)
- **TypeScript errors are ignored during builds** (`ignoreBuildErrors: true`)
- These settings allow builds to complete with errors - use with caution

### Image Domains
Configured to allow images from:
- images.unsplash.com
- unsplash.com
- via.placeholder.com
- picsum.photos
- *.amazonaws.com

### Environment Variables
Required environment variables (see `.env` and `.env.local`):
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - NextAuth secret
- `NEXTAUTH_URL` - Application URL
- OAuth provider credentials (if using OAuth)

## Development Workflow

1. **Before making changes**: Understand existing patterns by examining similar components/features
2. **Follow conventions**: Match existing code style, imports, and patterns
3. **Database changes**: Use Prisma migrations (`npx prisma migrate dev`)
4. **Type safety**: Project uses strict TypeScript - ensure proper typing
5. **Authentication**: Use the auth utilities in `src/components/auth/` and server-side auth checks
6. **Forms**: Use React Hook Form with Zod schemas (see `src/lib/schemas.ts`)

## Testing
Currently no test framework is configured. Consider adding tests before major changes.

## Deployment Notes
- Production builds require all Prisma migrations to be applied
- Environment variables must be properly configured
- Uses Turbopack in development for faster builds