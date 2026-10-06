export interface MentorshipPackage {
  id: string;
  name: string;
  price: number;
  sessions: number;
  description: string;
  audience: string;
  tone: string;
  featured?: boolean;
}

export const mentorshipPackages: readonly MentorshipPackage[] = [
  {
    id: 'brujula',
    name: 'Brújula',
    price: 120,
    sessions: 1,
    description: '1 hora de conversación para ordenar tus ideas y definir tu siguiente paso.',
    audience: 'Todos',
    tone: 'Ideal para empezar',
  },
  {
    id: 'impulso',
    name: 'Impulso',
    price: 220,
    sessions: 2,
    description: '2 sesiones de 1 hora con objetivos, feedback y un plan de acción personalizado.',
    audience: 'Personas con experiencia',
    tone: 'Más elegido',
    featured: true,
  },
  {
    id: 'evolucion',
    name: 'Evolución',
    price: 390,
    sessions: 4,
    description:
      '4 sesiones de 1 hora para construir hábitos, portafolio y una ruta profesional sólida.',
    audience: 'Personas en transición',
    tone: 'Acompañamiento profundo',
  },
];

export const mentorshipBenefits = [
  'Claridad para tomar decisiones',
  'Feedback honesto y accionable',
  'Una ruta profesional aterrizada',
  'Confianza para mostrar tu trabajo',
] as const;

export const mentorshipValues = [
  {
    number: '01',
    title: 'Autenticidad',
    description: 'Ser tú también es una estrategia.',
  },
  {
    number: '02',
    title: 'Humildad',
    description: 'Aprendemos en ambas direcciones.',
  },
  {
    number: '03',
    title: 'Igualdad',
    description: 'Tu historia merece el mismo espacio.',
  },
  {
    number: '04',
    title: 'Transparencia',
    description: 'Lo claro se convierte en acción.',
  },
] as const;
