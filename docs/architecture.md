# Arquitectura del proyecto

## Decisión

El producto será una sola aplicación web progresiva. Se evita dividirlo en microservicios o repositorios múltiples mientras el alcance y el equipo sean pequeños.

## Tecnologías

- React y TypeScript para la interfaz.
- Vite para desarrollo y compilación.
- React Router para rutas.
- Tailwind CSS y componentes propios compatibles con el enfoque de shadcn/ui.
- Supabase para autenticación, PostgreSQL y almacenamiento de archivos.
- `vite-plugin-pwa` para manifiesto, instalación y caché del shell.

La sincronización avanzada sin conexión no forma parte de esta base. Primero se implementarán flujos conectados y después una cola local para capturas críticas, especialmente asistencia y calificaciones.

## Organización del código

```text
src/
├── app/                 configuración global y rutas
├── components/
│   ├── ui/              controles visuales reutilizables
│   └── layout/          navegación y estructuras comunes
├── features/
│   ├── academic/        periodos, materias, grupos, horarios y alumnos
│   ├── attendance/      sesiones y asistencia
│   ├── grading/         actividades, entregas y calificaciones
│   ├── planning/        temario, agenda y avance
│   └── materials/       archivos y vínculos con temas
├── lib/
│   ├── supabase/        cliente e infraestructura compartida
│   └── offline/         futura cola local
└── styles/              tokens y estilos globales
```

Cada feature puede contener `components`, `services`, `hooks`, `types` y `pages` cuando realmente los necesite. No se crean capas vacías por adelantado.

## Flujo de datos

```text
Pantalla → hook o acción del módulo → servicio del módulo → Supabase
```

Los componentes presentan datos y eventos; no contienen consultas SQL, reglas de asistencia ni cálculos institucionales dispersos.

## Seguridad

- Supabase Auth identifica al profesor.
- Todas las tablas expuestas deben tener Row Level Security.
- Cada registro docente debe incluir `teacher_id` cuando corresponda.
- Storage debe usar rutas y políticas por profesor.
- La clave `service_role` solo pertenece a entornos seguros y nunca al frontend.
- Las migraciones son la fuente de verdad de la estructura de datos.

## Decisiones diferidas

- Estrategia completa de conflictos sin conexión.
- Compresión automática de materiales.
- Integración con Teams u otros servicios institucionales.
- Administración general de carreras fuera de Ciencias Computacionales.

