import type { APIRoute } from 'astro';
import type { IPet } from '../../../lib/models/Pet';
import Pet from '../../../lib/models/Pet.js';
import { checkAdmin } from '../../../utils/auth';
import { connectDB } from '../../../lib/db';
import { listPets } from '../../../lib/pets';

export const GET: APIRoute = async () => {
  try {
    const pets = await listPets();
    return new Response(JSON.stringify(pets), {
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
      'arrivalDate',
    ] as const;

    type AllowedField = (typeof allowedFields)[number];
    const bodyData = body as Partial<Record<AllowedField, unknown>>;

    const petData: Partial<IPet> = {};
    for (const field of allowedFields) {
      if (bodyData[field] !== undefined) {
        (petData as Record<AllowedField, unknown>)[field] = bodyData[field];
      }
    }

    if (!petData.approximateBirthDate) {
      return new Response(
        JSON.stringify({ error: 'La fecha aproximada de nacimiento es requerida' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const newPet = new Pet(petData);
    const savedPet = await newPet.save();

    return new Response(JSON.stringify(savedPet), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
