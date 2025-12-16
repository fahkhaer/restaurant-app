import z from 'zod/v3';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  password: z.string().nonempty('Password is required'),
});

export const registerSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  phone: z
    .string()
    .nonempty('Phone number is required')
    .regex(/^08\d{8,11}$/, 'Please provide a valid Indonesian phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().nonempty('Confirm Password is required'),
});
