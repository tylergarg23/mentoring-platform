// import { Code2, Play, Sparkles } from 'lucide-astro';

export const projects = [
  {
    number: '01',
    title: 'Acymas Iglesia',
    type: 'SITE WEB / RESPONSIVE',
    description:
      'Un sitio web responsive para la iglesia Acymas, con un diseño moderno y funcional que refleja su identidad.',
    className: 'project-purple',
    image: '/images/projects/acymas.webp',
    imageAlt: 'Vista previa del sitio web Acymas Iglesia',
    url: 'https://acymas.org/', // Coloca aquí la URL real de Pulse Mobile
    tags: ['Frontend', 'Backend', 'Web design'],
  },
  {
    number: '02',
    title: 'Estación DG',
    type: 'SITE WEB / RESTAURANT',
    description:
      'Un restaurant con identidad propia y un sitio web que refleja su esencia, con un diseño moderno y funcional.',
    className: 'project-yellow',
    image: '/images/projects/estacion-dg.webp',
    imageAlt: 'Vista previa del sitio web Estación DG',
    url: 'https://estaciondg.com/', // Coloca aquí la URL real de Pulse Mobile
    tags: ['Web design', 'WordPress'],
  },
  {
    number: '03',
    title: 'Elepic Perú',
    type: 'SITE WEB / PRODUCT',
    description:
      'Una Compañía de Integración de Procesos Electrónicos dedicada a ofrecer soluciones tecnológicas innovadoras.',
    className: 'project-dark',
    image: '/images/projects/elepic.webp',
    imageAlt: 'Vista previa del sitio web Elepic Perú',
    url: 'https://elepicperu.com/', // Coloca aquí la URL real de Pulse Mobile
    tags: ['Product', 'Web design'],
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
