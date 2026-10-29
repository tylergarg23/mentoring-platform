import type { APIRoute } from 'astro';

import { prisma } from '../../lib/prisma';

import { PrismaMentorshipRepository } from '../../modules/mentorship/repositories/prisma-mentorship.repository';

import { PrismaServiceRepository } from '../../modules/services/repositories/prisma-service.repository';

import { PrismaOrderRepository } from '../../modules/order/repositories/prisma-order.repository';

import { createOrderSchema } from '../../modules/order/schemas/order.schema';

import {
  MentorshipNotAvailableError,
  ServiceNotAvailableError,
  OrderService,
} from '../../modules/order/services/order.service';

export const prerender = false;

// export const GET: APIRoute = async () => {
//   return Response.json({
//     success: true,
//     message: 'El endpoint /api/orders está funcionando.',
//   });
// };

export const POST: APIRoute = async ({ request }) => {
  // 1. Leer el cuerpo de la solicitud
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        message: 'El cuerpo de la solicitud debe ser un JSON válido.',
      },
      { status: 400 },
    );
  }

  // 2. Validar los datos mediante Zod
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
    // 3. Inicializar los repositorios
    const mentorshipRepository = new PrismaMentorshipRepository(prisma);

    const serviceRepository = new PrismaServiceRepository(prisma);

    const orderRepository = new PrismaOrderRepository(prisma);

    // 4. Inyectar las dependencias en el servicio
    const orderService = new OrderService(mentorshipRepository, orderRepository, serviceRepository);

    // 5. Crear la orden
    const order = await orderService.createOrder(validation.data);

    // 6. Responder con la orden creada
    return Response.json(
      {
        success: true,
        message: 'Orden creada correctamente. Pendiente de pago.',
        data: order,
      },
      { status: 201 },
    );
  } catch (error) {
    // 7. Mentoría no disponible
    if (error instanceof MentorshipNotAvailableError) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        { status: 404 },
      );
    }

    // 8. Servicio QE no disponible
    if (error instanceof ServiceNotAvailableError) {
      return Response.json(
        {
          success: false,
          message: error.message,
        },
        { status: 404 },
      );
    }

    // 9. Error interno no controlado
    console.error('Error al crear la orden:', error);

    return Response.json(
      {
        success: false,
        message: 'Ocurrió un error interno al crear la orden.',
      },
      { status: 500 },
    );
  }
};
