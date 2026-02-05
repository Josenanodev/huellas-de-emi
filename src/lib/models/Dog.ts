import mongoose, { Schema, Document } from 'mongoose';

export interface IDog extends Document {
  name: string;
  breed: string;
  age: number;
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

const dogSchema = new Schema<IDog>(
  {
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
      required: true,
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
    timestamps: true,
  }
);

const Dog = mongoose.model<IDog>('Dog', dogSchema);

export default Dog;
