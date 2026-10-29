import { describe, expect, it, vi } from 'vitest';

import type { MentorshipRepository } from '../../mentorship/repositories/mentorship.repository';
import type { OrderRepository } from '../repositories/order.repository';

import { MentorshipNotAvailableError, OrderService } from './order.service';

describe('OrderService', () => {
  const createMentorshipRepository = (): MentorshipRepository => ({
    findBySlug: vi.fn().mockResolvedValue({
      id: 'mentorship-test-001',
      slug: 'brujula',
      name: 'Brújula',
      description: 'Mentoría de prueba',
      price: 12000,
      sessions: 1,
      isActive: true,
    }),
  });

  const createOrderRepository = (): OrderRepository => ({
    create: vi.fn().mockResolvedValue({
      id: 'order-test-001',
      mentorshipId: 'mentorship-test-001',
      amount: 12000,
      currency: 'PEN',
      status: 'PENDING',
      createdAt: new Date('2026-10-13T00:00:00.000Z'),
    }),
  });

  it('debe generar una vista previa con el precio correcto', async () => {
    const service = new OrderService(createMentorshipRepository(), createOrderRepository());

    const result = await service.previewOrder({
      mentorshipId: 'brujula',
      paymentMethod: 'yape',
    });

    expect(result.amount).toBe(120);
    expect(result.status).toBe('PREVIEW');
  });

  it('debe crear una orden pendiente en el repositorio', async () => {
    const mentorshipRepository = createMentorshipRepository();
    const orderRepository = createOrderRepository();

    const service = new OrderService(mentorshipRepository, orderRepository);

    const result = await service.createOrder({
      mentorshipId: 'brujula',
      paymentMethod: 'yape',
    });

    expect(result.status).toBe('PENDING');
    expect(result.amount).toBe(12000);

    expect(orderRepository.create).toHaveBeenCalledWith({
      mentorshipId: 'mentorship-test-001',
      amount: 12000,
      currency: 'PEN',
    });
  });

  it('debe rechazar una mentoría inexistente', async () => {
    const mentorshipRepository: MentorshipRepository = {
      findBySlug: vi.fn().mockResolvedValue(null),
    };

    const orderRepository = createOrderRepository();

    const service = new OrderService(mentorshipRepository, orderRepository);

    await expect(
      service.createOrder({
        mentorshipId: 'brujula',
        paymentMethod: 'card',
      }),
    ).rejects.toBeInstanceOf(MentorshipNotAvailableError);

    expect(orderRepository.create).not.toHaveBeenCalled();
  });

  it('debe rechazar una mentoría inactiva', async () => {
    const mentorshipRepository: MentorshipRepository = {
      findBySlug: vi.fn().mockResolvedValue({
        id: 'mentorship-test-001',
        slug: 'brujula',
        name: 'Brújula',
        description: 'Mentoría de prueba',
        price: 12000,
        sessions: 1,
        isActive: false,
      }),
    };

    const orderRepository = createOrderRepository();

    const service = new OrderService(mentorshipRepository, orderRepository);

    await expect(
      service.createOrder({
        mentorshipId: 'brujula',
        paymentMethod: 'yape',
      }),
    ).rejects.toBeInstanceOf(MentorshipNotAvailableError);

    expect(orderRepository.create).not.toHaveBeenCalled();
  });
});
