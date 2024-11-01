import mongoose, { Error } from 'mongoose';
import { logger } from '../app';

const connectDB = async (uri:string) => {
  try {
    await mongoose.connect(uri);
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error('MongoDB connection failed:'+ error);
  }
};

export default connectDB;
