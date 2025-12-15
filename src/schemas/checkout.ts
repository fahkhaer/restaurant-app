import { z } from 'zod';

export const checkoutSchema = z.object({
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters' }),
  phone: z
    .string()
    .min(9, { message: 'Phone must be at least 9 digits' })
    .max(15, { message: 'Phone cannot exceed 15 digits' })
    .regex(/^\d+$/, { message: 'Phone can only contain numbers' }),
  notes: z
    .string()
    .min(3, { message: 'Notes must be at least 3 characters' })
    .max(200, { message: 'Notes cannot exceed 200 characters' })
    .optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
