export function validateEnv() {
  // During build, be more lenient with environment validation
  const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';

  const requiredEnvVars = [
    'NEXTAUTH_SECRET',
    'DATABASE_URL',
    'NEXTAUTH_URL',
  ];

  const optionalEnvVars = [
    'NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY',
    'IMAGEKIT_PRIVATE_KEY',
    'NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  const missingOptionalVars = optionalEnvVars.filter(varName => !process.env[varName]);
  const isProduction = process.env.NODE_ENV === 'production' && !isBuildTime;

  // Check for missing required variables
  if (missingVars.length > 0) {
    console.warn(`Missing required environment variables: ${missingVars.join(', ')}`);
    // Only throw in actual production runtime, not during build
    if (isProduction) {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }

  // Only warn about optional variables
  if (missingOptionalVars.length > 0) {
    console.warn(`Missing optional environment variables: ${missingOptionalVars.join(', ')}`);
    if (missingOptionalVars.includes('NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY') ||
        missingOptionalVars.includes('IMAGEKIT_PRIVATE_KEY') ||
        missingOptionalVars.includes('NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT')) {
      console.warn('Image upload functionality will not work without ImageKit configuration');
    }
  }

  // Validate NEXTAUTH_SECRET strength only in actual production runtime
  if (isProduction && process.env.NEXTAUTH_SECRET) {
    if (process.env.NEXTAUTH_SECRET.length < 32) {
      console.warn('NEXTAUTH_SECRET should be at least 32 characters in production');
    }
  }

  // Validate NEXTAUTH_URL format
  if (process.env.NEXTAUTH_URL && isProduction) {
    try {
      const url = new URL(process.env.NEXTAUTH_URL);
      if (url.protocol !== 'https:') {
        console.warn('NEXTAUTH_URL should use HTTPS protocol in production');
      }
    } catch (e) {
      throw new Error('NEXTAUTH_URL must be a valid URL');
    }
  }
} 