import type { APIRoute } from 'astro';
import Cat from '../../../lib/models/Cat.js';
import { connectDB } from '../../../lib/db';
import { checkAdmin } from '../../../utils/auth';

// Get single cat
export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const { id } = params;
    const cat = await Cat.findById(id);

    if (!cat) {
      return new Response(JSON.stringify({ error: 'Cat not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(cat), {
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

// Update cat
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

    const cat = await Cat.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!cat) {
      return new Response(JSON.stringify({ error: 'Cat not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(cat), {
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

// Delete cat
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
    const cat = await Cat.findByIdAndDelete(id);

    if (!cat) {
      return new Response(JSON.stringify({ error: 'Cat not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Cat deleted successfully' }), {
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
