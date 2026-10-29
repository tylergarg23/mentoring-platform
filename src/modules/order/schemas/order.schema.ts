import { z } from 'zod';

const mentorshipOrderSchema = z
  .object({
    mentorshipId: z.enum(['brujula', 'impulso', 'evolucion']),
    paymentMethod: z.enum(['card', 'yape']),
  })
  .strict();

const qeOrderSchema = z
  .object({
    serviceId: z.enum(['qe-funcional', 'qe-automatizado']),
    hours: z.number().int().min(1).max(40),
    customerEmail: z.email().max(254),
    customerPhone: z.string().trim().min(6).max(20).optional(),
    paymentMethod: z.literal('yape'),
  })
  .strict();

export const createOrderSchema = z.union([mentorshipOrderSchema, qeOrderSchema]);

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export type CreateQeOrderInput = z.infer<typeof qeOrderSchema>;
