import type { PrismaClient } from '../../../generated/prisma/client';
import type { MentorshipRecord, MentorshipRepository } from './mentorship.repository';

export class PrismaMentorshipRepository implements MentorshipRepository {
  constructor(private readonly db: PrismaClient) {}

  async findBySlug(slug: string): Promise<MentorshipRecord | null> {
    return this.db.mentorship.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        price: true,
        sessions: true,
        isActive: true,
      },
    });
  }
}
