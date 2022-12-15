import mongoose from 'mongoose';

const mongooseURL = process.env.MONGODB_URL || 'mongodb://localhost';

export const mongooseService = {
  connect: async () => {
    console.log('Connecting to Mongoose'.bgYellow);
    await mongoose.connect(mongooseURL);
    console.log('Connected with Mongoose'.bgGreen);
  },
  disconnect: async () => {
    await mongoose.disconnect();
  },
};
