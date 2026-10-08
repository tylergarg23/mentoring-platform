import { z } from 'zod';

export const createOrderSchema = z
  .object({
    mentorshipId: z.enum(['brujula', 'impulso', 'evolucion']),
    paymentMethod: z.enum(['card', 'yape']),
  })
  .strict();

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
