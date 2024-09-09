import { z } from "zod";

export const registerValidation = z.object(
  {
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({mesasge: 'Invalid email' }).min(6).max(255).trim(),
    password: z.string().min(8,{message: 'Password must be atleast 6 characters'}).max(1024)
  }
)
export const loginValidation = z.object(
  {
    email: z.string().email({mesasge: 'Invalid email' }).min(6).max(255).trim(),
    password: z.string().min(8,{message: 'Password must be atleast 6 characters'}).max(1024)
  }
)