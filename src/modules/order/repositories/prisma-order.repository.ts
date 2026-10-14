import type { PrismaClient } from '../../../generated/prisma/client';

import type { CreateOrderData, OrderRecord, OrderRepository } from './order.repository';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: CreateOrderData): Promise<OrderRecord> {
    return this.db.order.create({
      data: {
        mentorshipId: data.mentorshipId,
        amount: data.amount,
        currency: data.currency,
        customerEmail: data.customerEmail,
        status: 'PENDING',
      },
      select: {
        id: true,
        mentorshipId: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true,
      },
    });
  }
}
