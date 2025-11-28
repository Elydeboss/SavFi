// src/features/auth/registerSchema.ts
import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/\d/, 'Include at least one number'),
    confirmPassword: z.string(),
    username: z
      .string()
      .min(3, 'Username must be at least 3 characters')
      .optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
