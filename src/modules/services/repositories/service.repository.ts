export interface ServiceRecord {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  isActive: boolean;
}

export interface ServiceRepository {
  findBySlug(slug: string): Promise<ServiceRecord | null>;
}
