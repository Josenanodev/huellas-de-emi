export type PetSpecies = 'dog' | 'cat';

export interface Pet {
  _id: string;
  species: PetSpecies;
  name: string;
  breed: string;
  age?: number;
  approximateBirthDate?: Date | string;
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

export type Dog = Pet;

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  petId: string;
  message: string;
}
