export function validateEnv() {
  const requiredEnvVars = [
    'NEXTAUTH_SECRET',
    'DATABASE_URL',
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    console.warn(`Missing environment variables: ${missingVars.join(', ')}`);
    // Don't throw in development to allow for easier setup
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
} 