# Aula Clara — Asistente del profesor

PWA para apoyar a profesores de la Licenciatura en Ciencias Computacionales en la organización de materias y grupos, asistencia, evaluación, planeación y reutilización de materiales.

## Estado actual

Esta es la base compartida del proyecto. Incluye:

- arquitectura frontend con React, TypeScript y Vite;
- sistema visual inicial y pantalla de referencia;
- navegación adaptable a escritorio y móvil;
- demostración interactiva del registro de asistencia;
- configuración PWA;
- cliente de Supabase preparado, todavía sin proyecto remoto conectado;
- acuerdos de colaboración, ramas y revisión.

Los datos visibles son demostrativos. No existe persistencia hasta conectar Supabase.

## Preparación local

Requisitos: Node.js 22 o superior y pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

En Windows, copie `.env.example` como `.env.local` desde el explorador o PowerShell.

## Comandos

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
pnpm preview
```

## Antes de contribuir

Lea [CONTRIBUTING.md](CONTRIBUTING.md), [docs/architecture.md](docs/architecture.md) y [docs/design-system.md](docs/design-system.md). Los asistentes de IA deben leer primero [AGENTS.md](AGENTS.md).

