export interface MentorshipRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  sessions: number;
  isActive: boolean;
}

export interface MentorshipRepository {
  findBySlug(slug: string): Promise<MentorshipRecord | null>;
}
