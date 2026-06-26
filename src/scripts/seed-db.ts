import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Pet from '../lib/models/Pet.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/huellas-de-emi';

async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Pet.deleteMany({});
    console.log('Cleared existing pets');

    const pets = [
      {
        species: 'dog',
        name: 'Max',
        breed: 'Labrador Retriever',
        approximateBirthDate: new Date('2023-01-01'),
        gender: 'male',
        size: 'large',
        status: 'available',
        description:
          'Max es un perro muy amigable y energético que ama jugar y correr. Es perfecto para familias activas con espacio para que pueda ejercitarse.',
        personality: 'Juguetón, leal y muy sociable con niños y otros perros.',
        specialCare: 'Necesita ejercicio diario y cepillado regular.',
        healthConditions: [],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500'],
      },
      {
        species: 'dog',
        name: 'Luna',
        breed: 'Pastor Alemán',
        approximateBirthDate: new Date('2024-01-01'),
        gender: 'female',
        size: 'large',
        status: 'available',
        description:
          'Luna es una perra inteligente y protectora. Está muy bien entrenada y es excelente como perro guardián.',
        personality: 'Inteligente, protectora pero cariñosa con su familia.',
        specialCare: 'Requiere entrenamiento continuo y socialización.',
        healthConditions: [],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1568572933382-74d440642117?w=500'],
      },
      {
        species: 'dog',
        name: 'Toby',
        breed: 'Beagle',
        approximateBirthDate: new Date('2021-01-01'),
        gender: 'male',
        size: 'medium',
        status: 'available',
        description:
          'Toby es un perro tranquilo y amigable, ideal para familias con niños. Le encanta dormir y recibir caricias.',
        personality: 'Tranquilo, amigable y perfecto para apartamentos.',
        specialCare: 'Dieta controlada para mantener peso saludable.',
        healthConditions: ['Tendencia al sobrepeso'],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=500'],
      },
      {
        species: 'dog',
        name: 'Bella',
        breed: 'Golden Retriever',
        approximateBirthDate: new Date('2025-01-01'),
        gender: 'female',
        size: 'large',
        status: 'reserved',
        description:
          'Bella es una cachorra juguetona y llena de energía. Está aprendiendo órdenes básicas y le encanta estar con personas.',
        personality: 'Muy juguetona, cariñosa y llena de energía.',
        specialCare: 'Necesita entrenamiento básico continuo.',
        healthConditions: [],
        vaccinated: true,
        sterilized: false,
        images: ['https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500'],
      },
      {
        species: 'dog',
        name: 'Rocky',
        breed: 'Pitbull',
        approximateBirthDate: new Date('2022-01-01'),
        gender: 'male',
        size: 'large',
        status: 'in_treatment',
        description:
          'Rocky está recuperándose de una lesión menor en su pata. Es un perro muy dulce y cariñoso a pesar de su apariencia fuerte.',
        personality: 'Dulce, protector y muy leal.',
        specialCare: 'Actualmente en tratamiento veterinario por lesión en pata.',
        healthConditions: ['Lesión en pata trasera (en recuperación)'],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1551717743-49959800b1f6?w=500'],
      },
      {
        species: 'dog',
        name: 'Daisy',
        breed: 'Chihuahua',
        approximateBirthDate: new Date('2020-01-01'),
        gender: 'female',
        size: 'small',
        status: 'available',
        description:
          'Daisy es una perrita pequeña y adorable. Perfecta para apartamentos y personas que buscan un compañero fiel y de bajo mantenimiento.',
        personality: 'Cariñosa, un poco tímida al principio pero muy leal.',
        specialCare: 'Sensible al frío, necesita ropa en invierno.',
        healthConditions: [],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500'],
      },
      {
        species: 'cat',
        name: 'Mila',
        breed: 'Doméstico de pelo corto',
        approximateBirthDate: new Date('2024-05-01'),
        gender: 'female',
        size: 'small',
        status: 'available',
        description:
          'Mila es una gatita curiosa, dulce y muy juguetona. Le gusta dormir cerca de la ventana y pedir cariños cuando agarra confianza.',
        personality: 'Curiosa, tierna y tranquila con personas pacientes.',
        specialCare: 'Necesita adaptación gradual a nuevos espacios.',
        healthConditions: [],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500'],
      },
      {
        species: 'cat',
        name: 'Nube',
        breed: 'Siamés mix',
        approximateBirthDate: new Date('2023-08-01'),
        gender: 'male',
        size: 'small',
        status: 'reserved',
        description:
          'Nube es sociable, platicador y muy cariñoso. Busca una familia que disfrute su compañía y le dé juego diario.',
        personality: 'Sociable, expresivo y afectuoso.',
        specialCare: '',
        healthConditions: [],
        vaccinated: true,
        sterilized: true,
        images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500'],
      },
    ];

    await Pet.insertMany(pets);
    console.log(`✓ Database seeded with ${pets.length} pets`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
