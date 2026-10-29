export interface CreateOrderData {
  mentorshipId?: string;
  serviceId?: string;

  hours?: number;
  unitPrice?: number;

  amount: number;
  currency: 'PEN';

  customerEmail?: string;
  customerPhone?: string;

  paymentMethod?: 'CARD' | 'YAPE';
}

export interface OrderRecord {
  id: string;

  mentorshipId: string | null;
  serviceId: string | null;

  hours: number | null;
  unitPrice: number | null;

  amount: number;
  currency: string;

  customerEmail: string | null;
  customerPhone: string | null;

  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'EXPIRED';

  createdAt: Date;
}

export interface OrderRepository {
  create(data: CreateOrderData): Promise<OrderRecord>;
}
