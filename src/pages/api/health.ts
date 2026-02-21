import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri:
        !!(process.env.SECRET_MONGODB_URI?.trim() ||
        process.env.MONGODB_URI?.trim()),
      hasAdminPassword:
        !!(process.env.SECRET_ADMIN_PASSWORD?.trim() ||
        process.env.ADMIN_PASSWORD?.trim()),
      nodeEnv: process.env.NODE_ENV || 'unknown',
    },
  };

  return new Response(JSON.stringify(health, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
