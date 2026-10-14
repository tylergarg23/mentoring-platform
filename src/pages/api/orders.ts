import type { APIRoute } from 'astro';

import { prisma } from '../../lib/prisma';
import { PrismaMentorshipRepository } from '../../modules/mentorship/repositories/prisma-mentorship.repository';
import { createOrderSchema } from '../../modules/order/schemas/order.schema';
import {
  MentorshipNotAvailableError,
  OrderService,
} from '../../modules/order/services/order.service';
import { PrismaOrderRepository } from '../../modules/order/repositories/prisma-order.repository';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: 'El cuerpo debe ser un JSON válido.' },
      { status: 400 },
    );
  }

  const validation = createOrderSchema.safeParse(body);

  if (!validation.success) {
    return Response.json(
      {
        success: false,
        message: 'Los datos de la solicitud no son válidos.',
        errors: validation.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    const mentorshipRepository = new PrismaMentorshipRepository(prisma);
    const orderRepository = new PrismaOrderRepository(prisma);

    const orderService = new OrderService(mentorshipRepository, orderRepository);

    const order = await orderService.createOrder(validation.data);

    return Response.json(
      {
        success: true,
        message: 'Orden creada correctamente. Pendiente de pago.',
        data: order,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof MentorshipNotAvailableError) {
      return Response.json({ success: false, message: error.message }, { status: 404 });
    }

    console.error('Error al consultar la mentoría:', error);

    return Response.json({ success: false, message: 'Ocurrió un error interno.' }, { status: 500 });
  }
};
