import { z } from "zod"

export const RoleEnum = z.enum(["PASSENGER", "DRIVER", "ADMIN"])

//this user schema can be used to derive smaller schemas while making the apis
export const userSchema = z.object({
  id: z.number().int().positive().optional(), // Prisma auto-increments this
  name: z.string().min(1).max(255).optional().nullable(),
  email: z.string().email().optional().nullable(),
  phoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, "Invalid phone number")
    .optional()
    .nullable(),
  role: RoleEnum.default("PASSENGER"),
  otpCode: z.string().length(6).optional().nullable(), // assuming 6-digit OTP
  otpExpiresAt: z.date().optional().nullable(),
  aadhaarVerified: z.boolean().default(false),
  selfieVerified: z.boolean().default(false),
  passwordHash: z.string().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  jwtToken: z.string().min(1, "JWT token is required"),
})

export type UserInput = z.infer<typeof userSchema>
