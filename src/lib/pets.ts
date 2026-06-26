import mongoose from 'mongoose';
import type { Pet as PetType } from '../types';
import { connectDB } from './db';
import Pet from './models/Pet.js';

function serializePet(pet: any): PetType {
  return {
    ...pet,
    _id: pet._id?.toString?.() ?? String(pet._id),
    species: pet.species || 'dog',
  };
}

export async function listPets(): Promise<PetType[]> {
  await connectDB();
  const pets = await Pet.find().sort({ createdAt: -1 }).lean();
  return pets.map(serializePet);
}

export async function getPetById(id: string | undefined): Promise<PetType | null> {
  if (!id || !mongoose.isValidObjectId(id)) {
    return null;
  }

  await connectDB();
  const pet = await Pet.findById(id).lean();
  return pet ? serializePet(pet) : null;
}
