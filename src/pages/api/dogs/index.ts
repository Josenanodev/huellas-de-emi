import type { APIRoute } from 'astro';
import type { IDog } from '../../../lib/models/Dog';
import Dog from '../../../lib/models/Dog.js';
import { checkAdmin } from '../../../utils/auth';
import { connectDB } from '../../../lib/db';

// Get all dogs
export const GET: APIRoute = async () => {
  try {
    await connectDB();
    const dogs = await Dog.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(dogs), {
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

// Create dog (admin only)
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
    console.log('Create dog request body:', body);

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

    const dogData: Partial<IDog> = {};
    for (const field of allowedFields) {
      if (bodyData[field] !== undefined) {
        (dogData as Record<AllowedField, unknown>)[field] = bodyData[field];
      }
    }

    const newDog = new Dog(dogData);
    const savedDog = await newDog.save();

    return new Response(JSON.stringify(savedDog), {
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
