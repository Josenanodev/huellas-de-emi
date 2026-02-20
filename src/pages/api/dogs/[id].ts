import type { APIRoute } from 'astro';
import Dog from '../../../lib/models/Dog.js';
import { connectDB } from '../../../lib/db';
import { checkAdmin } from '../../../utils/auth';

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

// Update dog
export const PUT: APIRoute = async (context) => {
  try {
    if (!checkAdmin(context)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    const { id } = context.params;
    const body = await context.request.json();

    const allowedFields = [
      'name',
      'breed',
      'age',
      'gender',
      'size',
      'status',
      'description',
      'personality',
      'specialCare',
      'healthConditions',
      'vaccinated',
      'sterilized',
      'images',
    ];

    const updateData: any = {};
    for (const field of allowedFields) {
      if (field in body) {
        updateData[field] = body[field];
      }
    }

    const dog = await Dog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

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

// Delete dog
export const DELETE: APIRoute = async (context) => {
  try {
    if (!checkAdmin(context)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    const { id } = context.params;
    const dog = await Dog.findByIdAndDelete(id);

    if (!dog) {
      return new Response(JSON.stringify({ error: 'Dog not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Dog deleted successfully' }), {
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
