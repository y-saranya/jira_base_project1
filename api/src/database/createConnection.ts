import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createDatabaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default createDatabaseConnection;
