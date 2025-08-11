import { PrismaClient } from "@prisma/client"
import { logger } from "../app";

const connectDB = async () => {
  try {
    const prisma = new PrismaClient()
    logger.info('DB connected successfully');
  } catch (error) {
    logger.error('DB connection failed:'+ error);
  }
};

export default connectDB;

