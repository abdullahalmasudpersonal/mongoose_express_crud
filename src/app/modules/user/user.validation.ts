import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
});

const addressValidationSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(50),
  country: z.string().min(1).max(20),
});

const orderSchema = z.object({
  productName: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
});

export const createUserValidationSchema = z.object({
  userId: z.number().int(),
  username: z.string().min(1).max(30),
  password: z.string().min(6).max(20),
  fullName: fullNameValidationSchema,
  age: z.number().int(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  isDeleted: z.boolean().optional(),
  orders: z.array(orderSchema).optional(),
});
