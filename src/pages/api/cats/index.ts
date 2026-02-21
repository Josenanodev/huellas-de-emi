import type { APIRoute } from 'astro';
import type { ICat } from '../../../lib/models/Cat';
import Cat from '../../../lib/models/Cat.js';
import { checkAdmin } from '../../../utils/auth';
import { connectDB } from '../../../lib/db';

// Get all cats
export const GET: APIRoute = async () => {
  try {
    await connectDB();
    const cats = await Cat.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(cats), {
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

// Create cat (admin only)
export const POST: APIRoute = async (context) => {
  try {
    await connectDB();
    if (!checkAdmin(context)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await context.request.json();
    console.log('Create cat request body:', body);

    // Only allow specific fields to prevent injection of unexpected data
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
      'arrivalDate',
    ] as const;

    type AllowedField = (typeof allowedFields)[number];
    const bodyData = body as Partial<Record<AllowedField, unknown>>;

    const catData: Partial<ICat> = {};
    for (const field of allowedFields) {
      if (bodyData[field] !== undefined) {
        (catData as Record<AllowedField, unknown>)[field] = bodyData[field];
      }
    }

    const newCat = new Cat(catData);
    const savedCat = await newCat.save();

    return new Response(JSON.stringify(savedCat), {
      status: 201,
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
