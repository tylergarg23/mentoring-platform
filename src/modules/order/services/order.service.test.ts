import { describe, expect, it } from 'vitest';

import { previewOrder } from './order.service';

describe('OrderService - previewOrder', () => {
  it('debe devolver el precio correcto de Brújula', () => {
    const result = previewOrder({
      mentorshipId: 'brujula',
      paymentMethod: 'yape',
    });

    expect(result.amount).toBe(120);
    expect(result.currency).toBe('PEN');
    expect(result.status).toBe('PREVIEW');
    expect(result.paymentMethod).toBe('yape');
  });

  it('debe devolver el precio correcto de Impulso', () => {
    const result = previewOrder({
      mentorshipId: 'impulso',
      paymentMethod: 'card',
    });

    expect(result.amount).toBe(220);
    expect(result.mentorshipName).toBe('Impulso');
  });

  it('debe devolver el precio correcto de Evolución', () => {
    const result = previewOrder({
      mentorshipId: 'evolucion',
      paymentMethod: 'card',
    });

    expect(result.amount).toBe(390);
    expect(result.mentorshipName).toBe('Evolución');
  });
});
