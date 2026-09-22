# Instrucciones del repositorio

## Producto y alcance

Aula Clara es un asistente personal para profesores de Ciencias Computacionales de la UJAT. El producto se organiza en cinco áreas vigentes:

1. Organización y control de materias y grupos.
2. Control de asistencia.
3. Evaluación y calificaciones.
4. Planeación didáctica y agenda.
5. Gestión y reutilización del material del profesor.

No invente módulos administrativos, integraciones institucionales ni sincronización compleja si una historia de Jira no los solicita.

## Reglas obligatorias

- Trabaje una historia de Jira por rama y Pull Request.
- Mantenga los términos de Jira, casos de uso, modelo de datos e interfaz.
- Organice el código nuevo dentro de `src/features/<modulo>`; comparta componentes solo cuando exista reutilización real.
- No acceda a Supabase directamente desde componentes visuales. Use funciones del módulo o de `src/lib/supabase`.
- Nunca exponga claves secretas o `service_role`. El frontend solo usa la clave publicable con RLS.
- Todo cambio visual debe respetar `docs/design-system.md` y reutilizar `src/components/ui`.
- No agregue otra biblioteca de componentes ni nuevos colores o tipografías sin una decisión documentada.
- La PWA puede almacenar trabajo pendiente, pero no se debe prometer sincronización sin conflictos hasta diseñarla y probarla.
- La carga de alumnos es manual y privada por profesor; no existe un catálogo compartido de alumnos.
- Las sesiones se generan a partir del periodo y horario del grupo. Asistencia selecciona una sesión existente.
- Los materiales se relacionan con materia y, cuando corresponda, con unidad o tema del temario.

## Verificación mínima

Antes de terminar un cambio ejecute:

```bash
pnpm typecheck
pnpm lint
pnpm build
```

Pruebe además el flujo modificado en escritorio y en ancho móvil. No declare completada una historia solamente porque compila.

## Documentación relevante

- Arquitectura: `docs/architecture.md`
- Sistema visual: `docs/design-system.md`
- Flujo de Git: `docs/git-workflow.md`
- Base de datos: `docs/database.md`
- Skill visual: `.agents/skills/asistente-profesor-ui/SKILL.md`

