# Mentoring Platform

Plataforma web para presentar y comercializar servicios de mentoría profesional.

El proyecto permitirá consultar información sobre las mentorías disponibles, contactar al mentor y adquirir mentorías mediante diferentes métodos de pago.

## Estado del proyecto

🚧 En desarrollo.

Actualmente el proyecto se encuentra en la fase de configuración y definición de su arquitectura base.

## Stack tecnológico

### Frontend

- Astro
- TypeScript
- Tailwind CSS

### Backend

Inicialmente utilizaremos las capacidades server-side de Astro dentro de un monolito modular.

La arquitectura permitirá separar el backend en el futuro, por ejemplo utilizando NestJS, si la complejidad del sistema lo requiere.

### Base de datos

- PostgreSQL
- Prisma ORM

### Testing

- Vitest
- V8 Coverage

Posteriormente se incorporarán pruebas de integración, API y E2E.

## Arquitectura

El proyecto utiliza inicialmente una arquitectura de **Monolito Modular**, aplicando de manera pragmática principios de Clean Architecture.

Los principales módulos de negocio serán:

- Mentorship
- Contact
- Order
- Payment

La aplicación buscará mantener separadas las responsabilidades entre:

1. Presentation
2. Application
3. Domain
4. Infrastructure

### Principios de diseño

El desarrollo seguirá los principios SOLID:

- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

También se aplicarán:

- DRY
- KISS
- YAGNI
- Separation of Concerns

Estos principios se aplicarán de forma pragmática, evitando abstracciones innecesarias y sobrearquitectura.

## Patrones de diseño

Dependiendo de las necesidades de cada módulo se utilizarán patrones como:

- Repository Pattern
- Service Pattern
- Adapter Pattern
- Dependency Injection

Los patrones se introducirán únicamente cuando resuelvan un problema concreto del sistema.

## Metodología

El proyecto seguirá un enfoque Agile utilizando Kanban y desarrollo iterativo e incremental.

Flujo de trabajo:

Backlog → To Do → In Progress → Testing → Done

Cada funcionalidad debe entregar un incremento funcional y verificable.

## Definition of Done

Una funcionalidad se considera terminada cuando:

- Cumple los criterios funcionales definidos.
- TypeScript/Astro Check no reporta errores.
- ESLint no reporta errores.
- Prettier está correctamente aplicado.
- Las reglas de negocio relevantes tienen pruebas.
- Las validaciones necesarias están implementadas.
- Se revisaron consideraciones de seguridad.
- El proyecto compila correctamente.
- La documentación relevante fue actualizada.

## Quality Gate

Antes de integrar cambios se ejecutarán:

```bash
npm run check
npm run lint
npm run format:check
npm test
npm run build
```
