# Guía de contribución

## Flujo de trabajo

1. Tome una historia de Jira acordada por el equipo.
2. Actualice su copia local de `main`.
3. Cree una rama corta desde `main`.
4. Implemente solamente el alcance de esa historia.
5. Verifique tipos, lint, compilación y el flujo visible.
6. Abra un Pull Request hacia `main` y vincule la clave de Jira.
7. Solicite la revisión de al menos un compañero.
8. Integre mediante **Squash and merge** cuando las validaciones pasen.
9. Elimine la rama después del merge.

No se usan ramas permanentes por persona ni una rama `develop` en esta etapa.

## Nombre de ramas

```text
feature/SCRUM-12-crear-grupo
feature/SCRUM-18-registrar-asistencia
fix/SCRUM-31-calculo-porcentaje
docs/SCRUM-40-actualizar-modelo
```

## Commits

Use mensajes breves y orientados al resultado:

```text
feat(attendance): registra estados por sesión
fix(schedule): evita sesiones duplicadas
docs(architecture): aclara reglas de Supabase
```

## Definition of Done

Una historia está terminada cuando:

- cumple sus criterios de aceptación;
- no rompe los flujos existentes;
- funciona en escritorio y móvil cuando aplique;
- contempla estado vacío, carga y error si consume datos;
- otro integrante la revisó y probó;
- pasan `pnpm typecheck`, `pnpm lint` y `pnpm build`;
- está integrada en `main` mediante Pull Request.

## Cambios sensibles

- Migraciones: solicite revisión del responsable de base de datos.
- Tokens o componentes compartidos: solicite revisión del responsable de UI.
- Cambios de alcance: regrese primero a Jira y al equipo; no los resuelva solo en código.

