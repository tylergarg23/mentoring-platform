import { describe, expect, it } from 'vitest';

import { createOrderSchema } from './order.schema';

describe('CreateOrderSchema', () => {
  it('debe aceptar una solicitud válida', () => {
    const result = createOrderSchema.safeParse({
      mentorshipId: 'brujula',
      paymentMethod: 'yape',
    });

    expect(result.success).toBe(true);
  });

  it('debe rechazar una mentoría inexistente', () => {
    const result = createOrderSchema.safeParse({
      mentorshipId: 'inexistente',
      paymentMethod: 'card',
    });

    expect(result.success).toBe(false);
  });

  it('debe rechazar un método de pago no permitido', () => {
    const result = createOrderSchema.safeParse({
      mentorshipId: 'impulso',
      paymentMethod: 'bitcoin',
    });

    expect(result.success).toBe(false);
  });

  it('debe rechazar un precio enviado desde el frontend', () => {
    const result = createOrderSchema.safeParse({
      mentorshipId: 'impulso',
      paymentMethod: 'card',
      price: 1,
    });

    expect(result.success).toBe(false);
  });

  it('debe rechazar una solicitud sin mentorshipId', () => {
    const result = createOrderSchema.safeParse({
      paymentMethod: 'yape',
    });

    expect(result.success).toBe(false);
  });
});
