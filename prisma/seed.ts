import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL no está configurada.');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

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

async function main() {
  for (const mentorship of mentorships) {
    await prisma.mentorship.upsert({
      where: { slug: mentorship.slug },
      update: mentorship,
      create: mentorship,
    });
  }

  console.log('Catálogo de mentorías sincronizado correctamente.');
}

main()
  .catch((error) => {
    console.error('Error al sincronizar mentorías:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
