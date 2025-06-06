# Authentication System Documentation

## Overview

The Real Estate Project uses a robust authentication system built on **AWS Cognito** for user management and JWT tokens for authorization. The system supports role-based access control with two primary user types: **Tenants** and **Managers**.

## Architecture

### Client-Side Authentication
- **Framework**: Next.js 15 with React 19
- **Authentication Provider**: AWS Amplify with Cognito
- **State Management**: Redux Toolkit Query (RTK Query)
- **UI Components**: AWS Amplify UI React components with custom styling

### Server-Side Authentication
- **Framework**: Express.js with TypeScript
- **Token Validation**: jsonwebtoken (JWT)
- **Database**: PostgreSQL with Prisma ORM
- **Middleware**: Custom role-based authentication middleware

## Dependencies & Packages

### Client-Side Packages
```json
{
  "@aws-amplify/ui-react": "^6.9.1",
  "aws-amplify": "^6.12.2",
  "@reduxjs/toolkit": "^2.5.1",
  "react-redux": "^9.2.0"
}
```

### Server-Side Packages
```json
{
  "jsonwebtoken": "^9.0.2",
  "@types/jsonwebtoken": "^9.0.8",
  "@prisma/client": "^6.3.0",
  "express": "^4.21.2"
}
```

## Directory Structure

```
real-estate-prod/
├── client/
│   └── src/
│       ├── app/
│       │   ├── (auth)/
│       │   │   └── authProvider.tsx          # AWS Amplify authentication setup
│       │   ├── (dashboard)/
│       │   │   ├── layout.tsx                # Protected dashboard layout
│       │   │   ├── managers/                 # Manager-only routes
│       │   │   └── tenants/                  # Tenant-only routes
│       │   ├── (nondashboard)/
│       │   │   └── layout.tsx                # Public layout with auth checks
│       │   ├── providers.tsx                 # Global providers wrapper
│       │   └── layout.tsx                    # Root layout
│       ├── state/
│       │   └── api.ts                        # RTK Query with auth headers
│       ├── lib/
│       │   └── utils.ts                      # User creation utilities
│       └── types/
│           ├── index.d.ts                    # User type definitions
│           └── prismaTypes.d.ts              # Generated Prisma types
└── server/
    └── src/
        ├── middleware/
        │   └── authMiddleware.ts             # JWT validation & RBAC
        ├── routes/
        │   ├── tenantRoutes.ts               # Tenant-protected routes
        │   ├── managerRoutes.ts              # Manager-protected routes
        │   ├── applicationRoutes.ts          # Mixed access routes
        │   ├── leaseRoutes.ts                # Mixed access routes
        │   └── propertyRoutes.ts             # Mixed access routes
        ├── controllers/
        │   ├── tenantControllers.ts          # Tenant management
        │   └── managerControllers.ts         # Manager management
        └── index.ts                          # Main server with protected routes
```

## Environment Variables

### Client Environment Variables
```env
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=your_cognito_user_pool_id
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=your_cognito_client_id
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002
```

### Server Environment Variables
```env
DATABASE_URL=postgresql://username:password@localhost:5432/real_estate_db
PORT=3002
```

## Database Schema

### User Models

#### Manager Model
```prisma
model Manager {
  id          Int    @id @default(autoincrement())
  cognitoId   String @unique                        # AWS Cognito User ID
  name        String
  email       String
  phoneNumber String

  managedProperties Property[]                      # One-to-many relationship
}
```

#### Tenant Model
```prisma
model Tenant {
  id          Int    @id @default(autoincrement())
  cognitoId   String @unique                        # AWS Cognito User ID
  name        String
  email       String
  phoneNumber String

  properties   Property[]    @relation("TenantProperties")   # Current properties
  favorites    Property[]    @relation("TenantFavorites")    # Favorite properties
  applications Application[]                                  # Rental applications
  leases       Lease[]                                       # Lease agreements
}
```

## Authentication Flow

### 1. User Registration

#### Frontend (Amplify UI)
```typescript
// client/src/app/(auth)/authProvider.tsx
const components = {
  SignUp: {
    FormFields() {
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    }
  }
}
```

#### Backend User Creation
```typescript
// client/src/lib/utils.ts
export const createNewUserInDatabase = async (
  user: any,
  idToken: any,
  userRole: string,
  fetchWithBQ: any
) => {
  const createEndpoint = userRole?.toLowerCase() === "manager" 
    ? "/managers" 
    : "/tenants";

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: "POST",
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || "",
      phoneNumber: "",
    },
  });
  
  return createUserResponse;
};
```

### 2. Token Management

#### Client-Side Token Handling
```typescript
// client/src/state/api.ts
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  // ... rest of API configuration
});
```

#### Server-Side Token Validation
```typescript
// server/src/middleware/authMiddleware.ts
interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";
      
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    next();
  };
};
```

### 3. User Authentication State
```typescript
// client/src/state/api.ts
getAuthUser: build.query<User, void>({
  queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
    try {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      const user = await getCurrentUser();
      const userRole = idToken?.payload["custom:role"] as string;

      const endpoint = userRole === "manager"
        ? `/managers/${user.userId}`
        : `/tenants/${user.userId}`;

      let userDetailsResponse = await fetchWithBQ(endpoint);

      // Auto-create user if doesn't exist
      if (userDetailsResponse.error?.status === 404) {
        userDetailsResponse = await createNewUserInDatabase(
          user, idToken, userRole, fetchWithBQ
        );
      }

      return {
        data: {
          cognitoInfo: { ...user },
          userInfo: userDetailsResponse.data as Tenant | Manager,
          userRole,
        },
      };
    } catch (error: any) {
      return { error: error.message || "Could not fetch user data" };
    }
  },
}),
```

## Route Protection

### 1. Server-Side Route Protection

#### Protected Manager Routes
```typescript
// server/src/index.ts
app.use("/managers", authMiddleware(["manager"]), managerRoutes);
app.use("/tenants", authMiddleware(["tenant"]), tenantRoutes);
```

#### Mixed Access Routes
```typescript
// server/src/routes/applicationRoutes.ts
router.post("/", authMiddleware(["tenant"]), createApplication);
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);
router.get("/", authMiddleware(["manager", "tenant"]), listApplications);
```

#### Property Routes
```typescript
// server/src/routes/propertyRoutes.ts
router.get("/", getProperties);  // Public access
router.post("/", authMiddleware(["manager"]), upload.array("photos"), createProperty);
```

### 2. Client-Side Route Protection

#### Dashboard Layout Protection
```typescript
// client/src/app/(dashboard)/layout.tsx
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      
      // Role-based redirection
      if (
        (userRole === "manager" && pathname.startsWith("/tenants")) ||
        (userRole === "tenant" && pathname.startsWith("/managers"))
      ) {
        router.push(
          userRole === "manager"
            ? "/managers/properties"
            : "/tenants/favorites"
        );
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading) return <>Loading...</>;
  if (!authUser?.userRole) return null;

  return (
    // Protected dashboard content
  );
};
```

#### Auth Provider Protection
```typescript
// client/src/app/(auth)/authProvider.tsx
const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);
  const isDashboardPage = pathname.startsWith("/manager") || 
                          pathname.startsWith("/tenants");

  // Redirect authenticated users away from auth pages
  useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);

  // Allow access to public pages without authentication
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <Authenticator
      initialState={pathname.includes("signup") ? "signUp" : "signIn"}
      components={components}
      formFields={formFields}
    >
      {() => <>{children}</>}
    </Authenticator>
  );
};
```

## Role-Based Access Control (RBAC)

### User Roles
1. **Tenant**: Can view properties, submit applications, manage favorites, view leases and payments
2. **Manager**: Can create/manage properties, review applications, manage tenants, view analytics

### Permission Matrix

| Feature | Public | Tenant | Manager |
|---------|--------|--------|---------|
| View Properties | ✅ | ✅ | ✅ |
| Search Properties | ✅ | ✅ | ✅ |
| Create Property | ❌ | ❌ | ✅ |
| Submit Application | ❌ | ✅ | ❌ |
| Review Applications | ❌ | ❌ | ✅ |
| Manage Favorites | ❌ | ✅ | ❌ |
| View Own Leases | ❌ | ✅ | ✅ |
| Manage Properties | ❌ | ❌ | ✅ |
| Dashboard Access | ❌ | ✅ | ✅ |

### Route Access Control

#### Tenant-Only Routes
- `/tenants/favorites`
- `/tenants/applications`
- `/tenants/leases`
- `/tenants/payments`
- `/tenants/settings`

#### Manager-Only Routes
- `/managers/properties`
- `/managers/applications`
- `/managers/tenants`
- `/managers/analytics`
- `/managers/settings`

#### Mixed Access Routes
- `/properties` (Public)
- `/search` (Public)
- `/applications` (Tenant create, Manager review)
- `/leases` (Both view their respective data)

## Authentication UI Components

### Custom Amplify Styling
```css
/* client/src/app/globals.css */
[data-amplify-authenticator] {
  --amplify-components-button-primary-background-color: var(--primary);
  --amplify-components-button-primary-hover-background-color: hsl(var(--primary) / 0.9);
  --amplify-components-button-border-radius: var(--radius);
  --amplify-components-fieldcontrol-border-radius: var(--radius);
}
```

### Custom Form Fields
```typescript
const formFields = {
  signIn: {
    username: {
      placeholder: "Enter your email",
      label: "Email",
      isRequired: true,
    },
    password: {
      placeholder: "Enter your password", 
      label: "Password",
      isRequired: true,
    },
  },
  signUp: {
    username: { order: 1, placeholder: "Choose a username" },
    email: { order: 2, placeholder: "Enter your email address" },
    password: { order: 3, placeholder: "Create a password" },
    confirm_password: { order: 4, placeholder: "Confirm your password" },
  },
};
```

## Error Handling

### Client-Side Error Handling
```typescript
// RTK Query error handling
async onQueryStarted(_, { queryFulfilled }) {
  await withToast(queryFulfilled, {
    error: "Failed to load user data.",
  });
}
```

### Server-Side Error Handling
```typescript
// Middleware error responses
if (!token) {
  res.status(401).json({ message: "Unauthorized" });
  return;
}

if (!hasAccess) {
  res.status(403).json({ message: "Access Denied" });
  return;
}

res.status(400).json({ message: "Invalid token" });
```

## Security Features

### 1. JWT Token Security
- Tokens are validated on every protected request
- Role information stored in custom claims
- Automatic token refresh via AWS Amplify

### 2. Route Protection
- Server-side middleware validation
- Client-side route guards
- Role-based redirection

### 3. CORS Configuration
```typescript
// server/src/index.ts
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
```

### 4. Request Validation
- Authentication required for protected routes
- Role validation for specific endpoints
- User existence verification

## Usage Examples

### 1. Protecting a New API Endpoint
```typescript
// server/src/routes/newRoute.ts
router.get("/sensitive-data", authMiddleware(["manager"]), getSensitiveData);
router.post("/tenant-action", authMiddleware(["tenant"]), createTenantAction);
router.get("/shared-data", authMiddleware(["manager", "tenant"]), getSharedData);
```

### 2. Using Auth State in Components
```typescript
// Any React component
import { useGetAuthUserQuery } from "@/state/api";

const MyComponent = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();

  if (isLoading) return <Loading />;
  if (!authUser) return <NotAuthenticated />;

  const userRole = authUser.userRole?.toLowerCase();
  const isManager = userRole === "manager";
  const isTenant = userRole === "tenant";

  return (
    <div>
      {isManager && <ManagerOnlyContent />}
      {isTenant && <TenantOnlyContent />}
    </div>
  );
};
```

### 3. Making Authenticated API Calls
```typescript
// Using RTK Query endpoints
const { data: properties } = useGetPropertiesQuery();  // Public
const { data: applications } = useGetApplicationsQuery();  // Auto-authenticated
```

## Troubleshooting

### Common Issues

1. **Token Expiry**: AWS Amplify handles automatic token refresh
2. **Role Mismatch**: Ensure custom:role is set during signup
3. **CORS Issues**: Verify server CORS configuration
4. **Database User Creation**: Auto-creation handles first-time logins

### Debug Commands
```bash
# Check server auth middleware
curl -H "Authorization: Bearer <token>" http://localhost:3002/managers

# Verify database user creation
npm run seed  # In server directory
```

## Migration & Setup

### 1. AWS Cognito Setup
1. Create User Pool in AWS Cognito
2. Configure custom attributes (custom:role)
3. Set up App Client
4. Configure environment variables

### 2. Database Setup
```bash
# Initialize Prisma
cd server
npx prisma migrate dev
npx prisma generate
```

### 3. Environment Configuration
```env
# Client .env.local
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_API_BASE_URL=http://localhost:3002

# Server .env
DATABASE_URL=postgresql://username:password@localhost:5432/real_estate_db
PORT=3002
```

## Testing Authentication

### Manual Testing
1. Register as tenant/manager
2. Verify role-based redirects
3. Test protected route access
4. Verify token in network requests

### Automated Testing
```typescript
// Example test structure
describe("Authentication", () => {
  test("should redirect manager to properties dashboard", () => {
    // Test implementation
  });
  
  test("should protect tenant-only routes", () => {
    // Test implementation
  });
});
``` 