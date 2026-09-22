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
git clone https://github.com/Licho04/asistente_profesor_app.git
cd asistente_profesor_app
pnpm install
pnpm dev
```

Cuando se conecte Supabase, copie `.env.example` como `.env.local` y agregue las credenciales publicables proporcionadas por el equipo. Nunca suba `.env.local` al repositorio.

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

## Guía de trabajo del equipo

El flujo del proyecto es:

```text
Historia en Jira
      ↓
Rama nueva
      ↓
Implementación
      ↓
Validaciones
      ↓
Pull Request
      ↓
Revisión de un compañero
      ↓
Squash and merge
      ↓
main actualizada
```

### 1. Obtener acceso

El responsable del repositorio agrega a cada integrante desde:

```text
GitHub → Settings → Collaborators → Add people
```

Todos trabajan en este mismo repositorio. No se crean copias independientes del proyecto para cada integrante.

### 2. Clonar el repositorio

Esto se realiza solamente la primera vez:

```bash
git clone https://github.com/Licho04/asistente_profesor_app.git
cd asistente_profesor_app
pnpm install
```

Al clonar el repositorio también se obtienen la arquitectura, el sistema visual, las reglas para asistentes de IA y la plantilla de Pull Request.

### 3. Elegir una historia de Jira

Cada cambio debe corresponder a una historia o tarea acordada. Por ejemplo:

```text
SCRUM-18 — Registrar asistencia
```

Antes de comenzar, actualice su rama principal:

```bash
git switch main
git pull origin main
```

### 4. Crear una rama para la historia

```bash
git switch -c feature/SCRUM-18-registrar-asistencia
```

Convenciones:

```text
feature/SCRUM-12-crear-grupo
feature/SCRUM-18-registrar-asistencia
fix/SCRUM-31-corregir-porcentaje
docs/SCRUM-40-actualizar-modelo
```

No utilice ramas permanentes como `rama-juan` o `rama-maria`. Una rama debe resolver una historia o corrección concreta.

### 5. Implementar únicamente la historia

Puede trabajar manualmente o utilizar un asistente de IA. Si utiliza IA, indíquele que primero lea las reglas del repositorio. Ejemplo:

```text
Implementa la historia SCRUM-18 respetando AGENTS.md, la arquitectura y el
sistema visual del repositorio. No modifiques funcionalidades fuera de esta
historia y verifica sus criterios de aceptación.
```

Todo cambio visual debe reutilizar los componentes y reglas existentes. Los cambios de base de datos se realizan mediante migraciones y requieren revisión del responsable de datos.

### 6. Verificar antes de subir

```bash
pnpm typecheck
pnpm lint
pnpm build
```

También debe probar manualmente el flujo modificado. Si afecta la interfaz, revíselo en escritorio y móvil.

### 7. Guardar y subir la rama

```bash
git add .
git commit -m "feat(attendance): registra asistencia por sesión"
git push -u origin feature/SCRUM-18-registrar-asistencia
```

Esto publica únicamente la rama de trabajo; no modifica `main`.

### 8. Crear el Pull Request

En GitHub seleccione **Compare & pull request** y complete la plantilla incluida. El Pull Request debe indicar:

- clave e historia de Jira;
- resultado implementado;
- criterios de aceptación verificados;
- pasos para probarlo;
- capturas cuando exista un cambio visual.

### 9. Esperar revisión y validaciones

Para poder integrar un Pull Request se necesita:

- una aprobación de otro integrante;
- validación automática `verify` exitosa;
- conversaciones de revisión resueltas;
- rama compatible con el estado actual de `main`.

La validación automática ejecuta TypeScript, ESLint y la compilación de producción. Si falla, el cambio debe corregirse en la misma rama.

### 10. Integrar y limpiar

Cuando todo esté aprobado, utilice **Squash and merge**. Después elimine la rama remota y actualice su copia local:

```bash
git switch main
git pull origin main
git branch -d feature/SCRUM-18-registrar-asistencia
```

No realice cambios directos sobre `main`, aunque GitHub se lo permita por ser propietario del repositorio.

## Definition of Done

Una historia está terminada cuando:

- cumple sus criterios de aceptación;
- funciona y no rompe los flujos existentes;
- contempla estados de carga, vacío y error cuando consume datos;
- fue probada en escritorio y móvil cuando corresponde;
- otro integrante la revisó y probó;
- pasan `pnpm typecheck`, `pnpm lint` y `pnpm build`;
- quedó integrada en `main` mediante Pull Request.
