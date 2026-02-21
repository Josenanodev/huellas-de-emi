import type { APIRoute } from 'astro';
import { checkAdmin } from '../../../utils/auth';

export const POST: APIRoute = async (context) => {
  if (!checkAdmin(context)) {
    return new Response(JSON.stringify({ ok: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
