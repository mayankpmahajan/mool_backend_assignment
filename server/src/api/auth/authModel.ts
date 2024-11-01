import mongoose from "mongoose";
import { z } from "zod";

export interface LoginResponse {
    user: {
      id: string;
      email: string;
      name: string | null;
    };
    accessToken: string;
  }

export const userZodSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

export default User;