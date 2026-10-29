export type ServiceCategory = 'web' | 'qe';

export interface ServicePackage {
  id: string;
  number: string;
  name: string;
  category: ServiceCategory;
  price: number;
  priceUnit: 'project' | 'hour';
  description: string;
  features: string[];
  audience: string;
  featured?: boolean;
}

export const services: ServicePackage[] = [
  {
    id: 'sitio-estatico',
    number: '01',
    name: 'Sitio estático',
    category: 'web',
    price: 1200,
    priceUnit: 'project',
    description: 'Una presencia digital rápida, clara y memorable para presentar tu marca.',
    features: ['Landing page responsive', 'Diseño visual personalizado', 'SEO técnico esencial'],
    audience: 'Emprendimientos y portafolios',
  },
  {
    id: 'sitio-dinamico',
    number: '02',
    name: 'Sitio dinámico',
    category: 'web',
    price: 2400,
    priceUnit: 'project',
    description: 'Una experiencia web con contenido vivo para crecer, conectar y convertir.',
    features: ['Hasta 5 secciones', 'CMS y formularios', 'Animaciones e integración'],
    audience: 'Marcas y negocios en expansión',
    featured: true,
  },
  {
    id: 'aplicacion-web',
    number: '03',
    name: 'Aplicación web',
    category: 'web',
    price: 4800,
    priceUnit: 'project',
    description:
      'El producto digital que tu idea necesita para convertirse en una experiencia real.',
    features: ['Arquitectura frontend', 'Flujos y estados complejos', 'Entrega por etapas'],
    audience: 'Equipos con una idea validada',
  },
  {
    id: 'qe-funcional',
    number: '04',
    name: 'QE funcional',
    category: 'qe',
    price: 180,
    priceUnit: 'hour',
    description:
      'Capacitación práctica por hora para elevar la calidad de tus productos digitales.',
    features: ['Casos de prueba', 'Técnicas funcionales', 'Feedback sobre tu proceso'],
    audience: 'Todos los niveles',
  },
  {
    id: 'qe-automatizado',
    number: '05',
    name: 'QE automatizado',
    category: 'qe',
    price: 260,
    priceUnit: 'hour',
    description:
      'Acompañamiento por hora para construir una estrategia de automatización sostenible.',
    features: ['Diseño de framework', 'Buenas prácticas', 'Mentoría con ejemplos reales'],
    audience: 'Personas con experiencia',
  },
];

export const whatsappNumber = '51997890845';

export function getServiceWhatsAppUrl(service: ServicePackage): string {
  const message = [
    'Hola, estoy interesado(a) en contratar uno de tus servicios.',
    '',
    `Servicio: ${service.name}`,
    `Precio referencial: Desde S/ ${service.price.toLocaleString('en-US')}`,
    '',
    'Me gustaría conocer más detalles y solicitar una cotización.',
  ].join('\n');

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
