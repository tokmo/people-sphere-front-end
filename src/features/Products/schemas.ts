import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1).max(200),
  brand: z.string().optional(),
  rating: z.number().int().min(0).max(10).optional(),
  categories: z.array(z.number()).min(1).max(5),
  itemsInStock: z.number().int().min(0).optional(),
  expirationDate: z
    .date()
    .refine((d) => {
      return d.getTime() - Date.now() > 30 * 24 * 60 * 60 * 1000;
    }, 'Expiration date must be at least 30 days from now')
    .optional(),
  receiptDate: z.date().optional(),
  featured: z.boolean().optional(),
});
