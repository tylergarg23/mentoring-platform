export interface CreateOrderData {
  mentorshipId: string;
  amount: number;
  currency: 'PEN';
  customerEmail?: string;
}

export interface OrderRecord {
  id: string;
  mentorshipId: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED';
  createdAt: Date;
}

export interface OrderRepository {
  create(data: CreateOrderData): Promise<OrderRecord>;
}
