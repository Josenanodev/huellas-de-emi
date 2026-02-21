import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    const uri =
      process.env.SECRET_MONGODB_URI?.trim() ||
      process.env.MONGODB_URI?.trim() ||
      import.meta.env.SECRET_MONGODB_URI?.trim();

    if (!uri) {
      throw new Error(
        'MongoDB URI is not defined. Set SECRET_MONGODB_URI (or MONGODB_URI) in environment variables.'
      );
    }
    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

export async function disconnectDB() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log('Disconnected from MongoDB');
  }
}

export function isDBConnected() {
  return isConnected;
}
