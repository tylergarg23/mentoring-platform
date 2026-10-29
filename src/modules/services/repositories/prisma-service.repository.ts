import type { PrismaClient } from '../../../generated/prisma/client';

import type { ServiceRepository } from './service.repository';

export class PrismaServiceRepository implements ServiceRepository {
  constructor(private readonly db: PrismaClient) {}

  async findBySlug(slug: string) {
    return this.db.service.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        category: true,
        price: true,
        isActive: true,
      },
    });
  }
}
