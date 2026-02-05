import type { APIRoute } from 'astro';
import Dog from '../../../lib/models/Dog.js';
import { connectDB } from '../../../lib/db';

// Get single dog
export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const { id } = params;
    const dog = await Dog.findById(id);

    if (!dog) {
      return new Response(JSON.stringify({ error: 'Dog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(dog), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
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
