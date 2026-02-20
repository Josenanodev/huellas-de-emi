import type { APIRoute } from 'astro';
import { checkAdmin } from '../../utils/auth';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const POST: APIRoute = async (context) => {
  try {
    if (!checkAdmin(context)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const formData = await context.request.formData();
    const files = formData.getAll('images');

    if (!files || files.length === 0) {
      return new Response(JSON.stringify({ error: 'No files uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const uploadedUrls: string[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        continue;
      }

      // Validate file type
      if (!ALLOWED_TYPES.includes(file.type)) {
        return new Response(
          JSON.stringify({
            error: `Invalid file type: ${file.type}. Allowed types: ${ALLOWED_TYPES.join(', ')}`,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Validate file size
      if (file.size > MAX_SIZE) {
        return new Response(
          JSON.stringify({
            error: `File too large: ${file.size} bytes. Maximum size: ${MAX_SIZE} bytes (5MB)`,
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const ext = path.extname(file.name);
      const filename = `dog-${timestamp}-${randomStr}${ext}`;
      const filepath = path.join(UPLOAD_DIR, filename);

      // Save file
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await writeFile(filepath, buffer);

      // Store public URL
      uploadedUrls.push(`/uploads/${filename}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        urls: uploadedUrls,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
