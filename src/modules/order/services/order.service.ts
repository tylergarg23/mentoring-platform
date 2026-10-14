import type { CreateOrderInput } from '../schemas/order.schema';
import type { MentorshipRepository } from '../../mentorship/repositories/mentorship.repository';
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

export class OrderService {
  constructor(
    private readonly mentorshipRepository: MentorshipRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async previewOrder(input: CreateOrderInput): Promise<OrderPreview> {
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
}
