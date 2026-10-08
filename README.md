# Mentoring Platform

Plataforma web personal desarrollada con Astro y TypeScript para presentar servicios profesionales, proyectos y paquetes de mentoría, con un proceso de adquisición mediante tarjeta o Yape.

## Estado del proyecto

**En desarrollo — versión inicial (MVP).**

Actualmente incluye:

- Sitio web responsive con páginas informativas.
- Página de mentorías con los paquetes Brújula, Impulso y Evolución.
- Modal de adquisición con selección de método de pago.
- Validaciones de formularios en el frontend.
- Endpoint `POST /api/orders`.
- Validación de solicitudes con Zod.
- Generación de vistas previas de órdenes con precios definidos en el backend.
- Pruebas unitarias con Vitest.
- Configuración de Prisma y conexión local a PostgreSQL.
- Adaptador Node.js de Astro para ejecutar endpoints dinámicos.

**Pendiente:** persistencia de órdenes, carga inicial del catálogo, integración real de pagos, confirmación mediante webhooks y despliegue en producción.

## Tecnologías

| Tecnología        | Propósito                    |
| ----------------- | ---------------------------- |
| Astro 7           | Framework web                |
| TypeScript        | Tipado estático              |
| Tailwind CSS 4    | Estilos                      |
| Node.js 24        | Entorno de ejecución         |
| Zod               | Validación de datos          |
| Vitest            | Pruebas unitarias            |
| PostgreSQL        | Base de datos relacional     |
| Prisma 7.10.0     | ORM y migraciones            |
| Lucide Astro      | Iconografía                  |
| ESLint y Prettier | Calidad y formato del código |

## Arquitectura

El proyecto sigue una arquitectura de monolito modular, con separación de responsabilidades y principios SOLID aplicados de manera pragmática.

```text
src/
├── components/
│   └── mentorship/
├── data/
├── generated/
│   └── prisma/
├── modules/
│   ├── mentorship/
│   └── order/
│       ├── schemas/
│       └── services/
├── pages/
│   └── api/
│       └── orders.ts
└── styles/

prisma/
└── schema.prisma
```

La estructura continuará evolucionando con repositorios, servicios de aplicación e integraciones de pago.

## Requisitos

- Node.js 24
- npm
- PostgreSQL instalado y ejecutándose
- Git

## Instalación local

Clonar el repositorio:

```bash
git clone https://github.com/tylergarg23/mentoring-platform.git
cd mentoring-platform
```

Instalar dependencias:

```bash
npm install
```

Crear el archivo `.env` a partir de `.env.example` y configurar:

```dotenv
DATABASE_URL="postgresql://USUARIO:PASSWORD@localhost:5432/mentoring_db?schema=public"
```

No subir credenciales reales al repositorio.

## Base de datos

Crear previamente una base de datos PostgreSQL llamada `mentoring_db`.

Validar el esquema:

```bash
npx prisma validate
```

Aplicar las migraciones existentes:

```bash
npx prisma migrate dev
```

Generar el cliente:

```bash
npx prisma generate
```

Para crear una nueva migración durante el desarrollo:

```bash
npx prisma migrate dev --name nombre_del_cambio
```

Las migraciones deben versionarse junto con el código fuente.

## Desarrollo

Iniciar el servidor:

```bash
npm run dev
```

## Calidad de código

```bash
npm run check
npm run lint
npm run format:check
npm test
```

Las últimas pruebas unitarias reportadas finalizaron correctamente: **10 pruebas aprobadas en 3 archivos**.

## Build de producción

```bash
npm run build
```

Ejecutar el servidor generado:

```bash
node ./dist/server/entry.mjs
```

El proyecto utiliza el adaptador Node.js de Astro para soportar rutas dinámicas.

## API

### POST /api/orders

Recibe el identificador de la mentoría y el método de pago.

Ejemplo:

```json
{
  "mentorshipId": "brujula",
  "paymentMethod": "yape"
}
```

Respuesta de vista previa:

```json
{
  "success": true,
  "message": "Vista previa de orden generada correctamente.",
  "data": {
    "mentorshipId": "brujula",
    "mentorshipName": "Brújula",
    "amount": 120,
    "currency": "PEN",
    "paymentMethod": "yape",
    "status": "PREVIEW"
  }
}
```

**Nota:** la API actual devuelve una vista previa. No registra una compra ni realiza cobros. El catálogo actual de precios todavía se encuentra en el servicio de órdenes.

## Seguridad

- Validación de solicitudes en el servidor.
- Precios determinados por el backend.
- Variables sensibles fuera del repositorio.
- Sin almacenamiento de números completos de tarjetas, CVV ni códigos de autorización de Yape.
- Los pagos deberán confirmarse mediante un proveedor y webhooks verificados.

## Próximas etapas

- Completar los modelos y migraciones de `Mentorship`, `Order` y `Payment`.
- Insertar los paquetes de mentoría en PostgreSQL.
- Implementar repositorios y persistencia de órdenes.
- Agregar pruebas de integración.
- Integrar una pasarela de pagos.
- Implementar webhooks e idempotencia.
- Configurar CI con GitHub Actions.
- Desplegar la aplicación y la base de datos en producción.

## Control de versiones

Desarrollo actual en la rama `feature/frontend-foundation`.

Los cambios deben pasar las validaciones de calidad antes de integrarse en `main`.
