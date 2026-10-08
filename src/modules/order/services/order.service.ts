import type { CreateOrderInput } from '../schemas/order.schema';

export interface OrderPreview {
  mentorshipId: string;
  mentorshipName: string;
  amount: number;
  currency: 'PEN';
  paymentMethod: 'card' | 'yape';
  status: 'PREVIEW';
}

const mentorshipCatalog = {
  brujula: {
    name: 'Brújula',
    price: 120,
  },
  impulso: {
    name: 'Impulso',
    price: 220,
  },
  evolucion: {
    name: 'Evolución',
    price: 390,
  },
} as const;

export const previewOrder = (input: CreateOrderInput): OrderPreview => {
  const mentorship = mentorshipCatalog[input.mentorshipId];

  return {
    mentorshipId: input.mentorshipId,
    mentorshipName: mentorship.name,
    amount: mentorship.price,
    currency: 'PEN',
    paymentMethod: input.paymentMethod,
    status: 'PREVIEW',
  };
};
