import type { APIContext } from 'astro';

export function checkAdmin(context: APIContext): boolean {
  const adminPassword = context.request.headers.get('x-admin-password')?.trim();
  const expectedPassword =
    process.env.SECRET_ADMIN_PASSWORD?.trim() ||
    import.meta.env.SECRET_ADMIN_PASSWORD?.trim();

  if (!adminPassword || !expectedPassword) {
    return false;
  }

  return adminPassword === expectedPassword;
}
