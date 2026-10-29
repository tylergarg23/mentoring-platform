import type { CreateOrderInput, CreateQeOrderInput } from '../schemas/order.schema';

import type { MentorshipRepository } from '../../mentorship/repositories/mentorship.repository';
import type { ServiceRepository } from '../../services/repositories/service.repository';
import type { OrderRepository } from '../repositories/order.repository';

export interface OrderPreview {
  mentorshipId: string;
  mentorshipName: string;
  amount: number;
  currency: 'PEN';
  paymentMethod: 'card' | 'yape';
  status: 'PREVIEW';
}

export class MentorshipNotAvailableError extends Error {
  constructor() {
    super('La mentoría solicitada no existe o no está disponible.');
    this.name = 'MentorshipNotAvailableError';
  }
}

export class ServiceNotAvailableError extends Error {
  constructor() {
    super('El servicio solicitado no existe o no está disponible.');
    this.name = 'ServiceNotAvailableError';
  }
}

export class OrderService {
  constructor(
    private readonly mentorshipRepository: MentorshipRepository,
    private readonly orderRepository: OrderRepository,
    private readonly serviceRepository?: ServiceRepository,
  ) {}

  async previewOrder(
    input: Extract<CreateOrderInput, { mentorshipId: string }>,
  ): Promise<OrderPreview> {
    const mentorship = await this.mentorshipRepository.findBySlug(input.mentorshipId);

    if (!mentorship || !mentorship.isActive) {
      throw new MentorshipNotAvailableError();
    }

    return {
      mentorshipId: mentorship.slug,
      mentorshipName: mentorship.name,
      amount: mentorship.price / 100,
      currency: 'PEN',
      paymentMethod: input.paymentMethod,
      status: 'PREVIEW',
    };
  }

  async createOrder(input: CreateOrderInput) {
    if ('serviceId' in input) {
      return this.createQeOrder(input);
    }

    const mentorship = await this.mentorshipRepository.findBySlug(input.mentorshipId);

    if (!mentorship || !mentorship.isActive) {
      throw new MentorshipNotAvailableError();
    }

    return this.orderRepository.create({
      mentorshipId: mentorship.id,
      amount: mentorship.price,
      currency: 'PEN',
    });
  }

  private async createQeOrder(input: CreateQeOrderInput) {
    if (!this.serviceRepository) {
      throw new Error('El repositorio de servicios no está configurado.');
    }

    const service = await this.serviceRepository.findBySlug(input.serviceId);

    if (!service || !service.isActive || service.category !== 'qe') {
      throw new ServiceNotAvailableError();
    }

    const amount = service.price * input.hours;

    if (
      !Number.isSafeInteger(service.price) ||
      service.price <= 0 ||
      !Number.isSafeInteger(amount)
    ) {
      throw new Error('El precio configurado no es válido.');
    }

    return this.orderRepository.create({
      serviceId: service.id,
      hours: input.hours,
      unitPrice: service.price,
      amount,
      currency: 'PEN',
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      paymentMethod: 'YAPE',
    });
  }
}
