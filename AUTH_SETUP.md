# NextAuth.js Setup Guide

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
FACEBOOK_CLIENT_ID="your-facebook-client-id"
FACEBOOK_CLIENT_SECRET="your-facebook-client-secret"

# Email Service (Resend)
RESEND_API_KEY="your-resend-api-key"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Database Setup

1. Make sure you have PostgreSQL running
2. Create a database for the application
3. Run the migration to create the tables:

```bash
pnpm prisma db push
```

## Migration from AWS Cognito

The authentication system has been migrated from AWS Cognito to NextAuth.js v5. Key changes:

### What's New:
- **NextAuth.js v5**: Modern authentication with better TypeScript support
- **Database-based sessions**: User data stored in PostgreSQL instead of AWS Cognito
- **Multiple providers**: Support for Google, Facebook, and email/password
- **Two-factor authentication**: Built-in 2FA support
- **Email verification**: Email verification flow with Resend

### User Roles:
- `ADMIN`: Full system access
- `USER`: Basic user access
- `MANAGER`: Property manager access
- `TENANT`: Tenant access

### Authentication Flow:
1. **Registration**: Users register with email/password
2. **Email Verification**: Users must verify their email before login
3. **Login**: Users can login with email/password or OAuth providers
4. **Two-Factor**: Optional 2FA for enhanced security
5. **Password Reset**: Users can reset passwords via email

### API Routes:
- `/api/auth/[...nextauth]`: NextAuth.js API routes
- All auth pages moved to `/login`, `/join`, `/reset`, etc.

### Components Updated:
- `Navbar`: Now uses NextAuth.js session
- `Providers`: Replaced AWS Amplify with NextAuth.js SessionProvider
- Auth forms: All forms updated to use new auth actions

## Testing the Setup

1. Start the development server: `pnpm dev`
2. Navigate to `/join` to create a new account
3. Check your email for verification
4. Navigate to `/login` to sign in
5. Test OAuth providers if configured

## Troubleshooting

- Make sure all environment variables are set
- Ensure PostgreSQL is running and accessible
- Check that the database URL is correct
- Verify email service (Resend) is configured for email verification 