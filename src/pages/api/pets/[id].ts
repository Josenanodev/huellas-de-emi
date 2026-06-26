import type { APIRoute } from 'astro';
import mongoose from 'mongoose';
import Pet from '../../../lib/models/Pet.js';
import { connectDB } from '../../../lib/db';
import { getPetById } from '../../../lib/pets';
import { checkAdmin } from '../../../utils/auth';

export const GET: APIRoute = async ({ params }) => {
  try {
    const { id } = params;
    const pet = await getPetById(id);

    if (!pet) {
      return new Response(JSON.stringify({ error: 'Pet not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(pet), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

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
    if (!id || !mongoose.isValidObjectId(id)) {
      return new Response(JSON.stringify({ error: 'Invalid pet id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await context.request.json();
    const allowedFields = [
      'species',
      'name',
      'breed',
      'approximateBirthDate',
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

    const pet = await Pet.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!pet) {
      return new Response(JSON.stringify({ error: 'Pet not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(pet), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

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
    if (!id || !mongoose.isValidObjectId(id)) {
      return new Response(JSON.stringify({ error: 'Invalid pet id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const pet = await Pet.findByIdAndDelete(id);

    if (!pet) {
      return new Response(JSON.stringify({ error: 'Pet not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'Pet deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
