// import { Code2, Play, Sparkles } from 'lucide-astro';

export const projects = [
  {
    number: '01',
    title: 'Nexa Finance',
    type: 'WEB APP / QA AUTOMATION',
    description: 'Una experiencia financiera clara, rápida y segura para tomar mejores decisiones.',
    className: 'project-purple',
    tags: ['Frontend', 'Automation'],
  },
  {
    number: '02',
    title: 'Casa Nómada',
    type: 'E-COMMERCE / BRAND',
    description:
      'Un storefront editorial que convierte la identidad de marca en una experiencia digital.',
    className: 'project-yellow',
    tags: ['Web design', 'React'],
  },
  {
    number: '03',
    title: 'Pulse Mobile',
    type: 'MOBILE APP / PRODUCT',
    description: 'Sistema de hábitos que hace visible el progreso sin añadir fricción.',
    className: 'project-dark',
    tags: ['Product', 'Testing'],
  },
];

export const skills = [
  {
    icon: 'code',
    title: 'QA Automation',
    copy: 'Calidad desde el primer commit. Creo estrategias de prueba robustas que protegen cada experiencia.',
  },
  {
    icon: 'sparkles',
    title: 'Frontend Developer',
    copy: 'Interfaces con intención. Código limpio, sistemas consistentes y obsesión por los detalles.',
  },
  {
    icon: 'play',
    title: 'Mentor',
    copy: 'Comparto lo que sé para que más personas puedan construir con confianza y criterio.',
  },
] as const;

export const testimonials = [
  {
    quote:
      'Trabajar con Fabián fue sumar criterio, energía y una mirada que elevó el producto completo.',
    name: 'Mariana López',
    role: 'Product Lead · Nómada',
  },
  {
    quote:
      'Su manera de unir calidad y estética hizo que el equipo construyera mejor, no solo más rápido.',
    name: 'Carlos Méndez',
    role: 'Engineering Manager · Loop',
  },
  {
    quote: 'Como mentor, convierte lo complejo en pasos accionables. Salí con mucha más claridad.',
    name: 'Ana Torres',
    role: 'Frontend Developer',
  },
];
