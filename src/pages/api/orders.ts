import type { APIRoute } from 'astro';

import { createOrderSchema } from '../../modules/order/schemas/order.schema';
import { previewOrder } from '../../modules/order/services/order.service';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
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

  const order = previewOrder(validation.data);

  return Response.json(
    {
      success: true,
      message: 'Vista previa de orden generada correctamente.',
      data: order,
    },
    { status: 200 },
  );
};
