import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri:
        !!(import.meta.env.SECRET_MONGODB_URI?.trim() ||
        process.env.SECRET_MONGODB_URI?.trim() ||
        process.env.MONGODB_URI?.trim()),
      hasAdminPassword:
        !!(import.meta.env.SECRET_ADMIN_PASSWORD?.trim() ||
        process.env.SECRET_ADMIN_PASSWORD?.trim() ||
        process.env.ADMIN_PASSWORD?.trim()),
      nodeEnv: process.env.NODE_ENV || import.meta.env.MODE || 'unknown',
      mode: import.meta.env.MODE,
      ssr: import.meta.env.SSR,
    },
  };

  return new Response(JSON.stringify(health, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
