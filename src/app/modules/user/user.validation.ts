import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lustName: z.string().min(1).max(20),
});

const addressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(20),
});

export const userValidationSchema = z.object({
  userId: z.number().int(),
  userName: z.string().min(1).max(30),
  password: z.string().min(6).max(20),
  fullName: fullNameValidationSchema,
  age: z.number().int(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
});
