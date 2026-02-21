import type { APIContext } from 'astro';
import '../lib/load-env';

export function checkAdmin(context: APIContext): boolean {
  const adminPassword = context.request.headers.get('x-admin-password')?.trim();
  const expectedPassword =
    import.meta.env.SECRET_ADMIN_PASSWORD?.trim() ||
    process.env.SECRET_ADMIN_PASSWORD?.trim() ||
    process.env.ADMIN_PASSWORD?.trim();

  if (!adminPassword || !expectedPassword) {
    return false;
  }

  return adminPassword === expectedPassword;
}
