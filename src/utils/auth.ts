import type { APIContext } from 'astro';

export function checkAdmin(context: APIContext): boolean {
  const adminPassword = context.request.headers.get('x-admin-password');
  
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return false;
  }
  
  return true;
}
