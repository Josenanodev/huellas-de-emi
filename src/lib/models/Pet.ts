import mongoose, { Schema } from 'mongoose';
import type { Document, Model } from 'mongoose';

export interface IPet extends Document {
  species: 'dog' | 'cat';
  name: string;
  breed: string;
  age?: number;
  approximateBirthDate?: Date;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  status: 'available' | 'adopted' | 'in_treatment' | 'reserved';
  healthConditions: string[];
  vaccinated: boolean;
  sterilized: boolean;
  specialCare: string;
  personality: string;
  description: string;
  images: string[];
  arrivalDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const petSchema = new Schema<IPet>(
  {
    species: {
      type: String,
      enum: ['dog', 'cat'],
      default: 'dog',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    approximateBirthDate: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'adopted', 'in_treatment', 'reserved'],
      default: 'available',
    },
    healthConditions: {
      type: [String],
      default: [],
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    sterilized: {
      type: Boolean,
      default: false,
    },
    specialCare: {
      type: String,
      default: '',
    },
    personality: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    arrivalDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: 'dogs',
    timestamps: true,
  },
);

const Pet =
  (mongoose.models.Pet as Model<IPet> | undefined) ||
  mongoose.model<IPet>('Pet', petSchema);

export default Pet;
