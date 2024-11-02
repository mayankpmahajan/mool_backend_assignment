import mongoose from "mongoose";
import { z } from "zod";


export const userZodSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const passwordZodSchema = z.object({
  password: z.string().min(8),
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});



const User = mongoose.model('User', userSchema);

export default User;