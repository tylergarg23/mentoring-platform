import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

// 1. Configuración de conexión
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está configurada.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

// 2. Catálogo anterior de mentorías
// Se conserva temporalmente por compatibilidad.
const mentorships = [
  {
    slug: 'brujula',
    name: 'Brújula',
    description: '1 hora de conversación para ordenar tus ideas y definir tu siguiente paso.',
    price: 12000,
    sessions: 1,
    isActive: true,
  },
  {
    slug: 'impulso',
    name: 'Impulso',
    description: '2 sesiones de 1 hora con objetivos, feedback y un plan de acción personalizado.',
    price: 22000,
    sessions: 2,
    isActive: true,
  },
  {
    slug: 'evolucion',
    name: 'Evolución',
    description:
      '4 sesiones de 1 hora para construir hábitos, portafolio y una ruta profesional sólida.',
    price: 39000,
    sessions: 4,
    isActive: true,
  },
];

// 3. Nuevo catálogo de servicios QE
// Los precios se almacenan en céntimos.
const services = [
  {
    slug: 'qe-funcional',
    name: 'QE funcional',
    description:
      'Capacitación práctica por hora para elevar la calidad de tus productos digitales.',
    category: 'qe',
    price: 18000,
    isActive: true,
  },
  {
    slug: 'qe-automatizado',
    name: 'QE automatizado',
    description:
      'Acompañamiento por hora para construir una estrategia de automatización sostenible.',
    category: 'qe',
    price: 26000,
    isActive: true,
  },
];

// 4. Sincronizar mentorías existentes
async function seedMentorships(): Promise<void> {
  for (const mentorship of mentorships) {
    await prisma.mentorship.upsert({
      where: {
        slug: mentorship.slug,
      },
      update: mentorship,
      create: mentorship,
    });
  }

  console.log('✓ Catálogo de mentorías sincronizado.');
}

// 5. Sincronizar servicios QE
async function seedServices(): Promise<void> {
  for (const service of services) {
    await prisma.service.upsert({
      where: {
        slug: service.slug,
      },
      update: service,
      create: service,
    });
  }

  console.log('✓ Catálogo de servicios QE sincronizado.');
}

// 6. Función principal
async function main(): Promise<void> {
  console.log('Iniciando sincronización de catálogos...');

  await seedMentorships();
  await seedServices();

  console.log('Sincronización finalizada correctamente.');
}

// 7. Manejo de errores y cierre de conexión
main()
  .catch((error: unknown) => {
    console.error('Error al sincronizar los catálogos:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
