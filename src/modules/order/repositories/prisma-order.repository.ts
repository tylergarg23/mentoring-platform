import type { PrismaClient } from '../../../generated/prisma/client';

import type { CreateOrderData, OrderRecord, OrderRepository } from './order.repository';

export class PrismaOrderRepository implements OrderRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: CreateOrderData): Promise<OrderRecord> {
    return this.db.order.create({
      data: {
        mentorshipId: data.mentorshipId,
        serviceId: data.serviceId,
        hours: data.hours,
        unitPrice: data.unitPrice,
        amount: data.amount,
        currency: data.currency,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        status: 'PENDING',

        ...(data.paymentMethod === 'YAPE'
          ? {
              payments: {
                create: {
                  provider: 'MANUAL',
                  method: 'YAPE' as const,
                  status: 'PENDING' as const,
                },
              },
            }
          : {}),
      },
      select: {
        id: true,
        mentorshipId: true,
        serviceId: true,
        hours: true,
        unitPrice: true,
        amount: true,
        currency: true,
        customerEmail: true,
        customerPhone: true,
        status: true,
        createdAt: true,
      },
    });
  }
}
