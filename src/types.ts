export interface Dog {
  _id: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  dogId: string;
  message: string;
}
