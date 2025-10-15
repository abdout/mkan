import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import os from 'os';

// Get system metrics
function getSystemMetrics() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;

  return {
    memory: {
      total: Math.round(totalMemory / 1024 / 1024), // MB
      free: Math.round(freeMemory / 1024 / 1024), // MB
      used: Math.round(usedMemory / 1024 / 1024), // MB
      usagePercent: Math.round((usedMemory / totalMemory) * 100),
    },
    cpu: {
      cores: os.cpus().length,
      model: os.cpus()[0]?.model || 'unknown',
      loadAverage: os.loadavg(), // 1, 5, and 15 minute averages
    },
    process: {
      pid: process.pid,
      uptime: Math.round(process.uptime()),
      memoryUsage: {
        rss: Math.round(process.memoryUsage().rss / 1024 / 1024), // MB
        heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024), // MB
        heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024), // MB
        external: Math.round(process.memoryUsage().external / 1024 / 1024), // MB
      },
      nodeVersion: process.version,
    },
  };
}

// Check external services
async function checkExternalServices() {
  const services: Record<string, { status: boolean; latency?: number; error?: string }> = {};

  // Check database with latency
  try {
    const start = Date.now();
    await db.$queryRaw`SELECT 1`;
    const latency = Date.now() - start;
    services.database = { status: true, latency };
  } catch (error) {
    services.database = {
      status: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }

  // Check Redis if configured
  if (process.env.UPSTASH_REDIS_REST_URL) {
    try {
      const start = Date.now();
      const response = await fetch(process.env.UPSTASH_REDIS_REST_URL + '/ping', {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
      });
      const latency = Date.now() - start;
      services.redis = { status: response.ok, latency };
    } catch (error) {
      services.redis = {
        status: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Check ImageKit endpoint
  if (process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT) {
    try {
      const start = Date.now();
      const response = await fetch(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT, {
        method: 'HEAD',
      });
      const latency = Date.now() - start;
      services.imagekit = { status: response.ok, latency };
    } catch (error) {
      services.imagekit = {
        status: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  return services;
}

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Get query parameters for detailed checks
  const { searchParams } = new URL(request.url);
  const detailed = searchParams.get('detailed') === 'true';

  const healthData = {
    status: 'healthy' as 'healthy' | 'degraded' | 'unhealthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptime: Math.round(process.uptime()),
    checks: {
      database: false,
      redis: false,
      imagekit: false,
      auth: false,
      env: false,
    },
    metrics: {} as any,
    services: {} as any,
    responseTime: 0,
  };

  // Basic configuration checks
  healthData.checks.auth = !!(
    process.env.NEXTAUTH_SECRET &&
    process.env.NEXTAUTH_URL
  );

  healthData.checks.env = !!(
    process.env.DATABASE_URL &&
    process.env.NODE_ENV
  );

  healthData.checks.imagekit = !!(
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY &&
    process.env.IMAGEKIT_PRIVATE_KEY &&
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  );

  healthData.checks.redis = !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );

  // Check external services
  healthData.services = await checkExternalServices();

  // Update checks based on service status
  if (healthData.services.database) {
    healthData.checks.database = healthData.services.database.status;
  }

  // Add detailed metrics if requested
  if (detailed) {
    healthData.metrics = getSystemMetrics();

    // Check for warning conditions
    if (healthData.metrics.memory.usagePercent > 90) {
      healthData.status = 'degraded';
    }

    // Check if process heap is too high
    const heapUsagePercent = (healthData.metrics.process.memoryUsage.heapUsed /
                             healthData.metrics.process.memoryUsage.heapTotal) * 100;
    if (heapUsagePercent > 90) {
      healthData.status = 'degraded';
    }
  }

  // Determine overall health status
  const criticalChecks = [
    healthData.checks.database,
    healthData.checks.auth,
    healthData.checks.env,
  ];

  const criticalChecksPassed = criticalChecks.every(check => check === true);

  if (!criticalChecksPassed) {
    healthData.status = 'unhealthy';
  } else if (!Object.values(healthData.checks).every(check => check === true)) {
    healthData.status = 'degraded';
  }

  // Calculate response time
  healthData.responseTime = Date.now() - startTime;

  // Set appropriate HTTP status code
  const statusCode = healthData.status === 'healthy' ? 200 :
                    healthData.status === 'degraded' ? 200 : 503;

  return NextResponse.json(healthData, {
    status: statusCode,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Health-Status': healthData.status,
    }
  });
}