# Flujo de Git y Pull Requests

## Ramas

`main` representa la versión integrada y demostrable. Cada historia de Jira crea una rama nueva desde el estado más reciente de `main`.

No se mantienen ramas personales de larga duración. Una persona puede crear muchas ramas, pero cada una resuelve una historia o corrección pequeña.

## Protección recomendada de `main`

Configure en GitHub:

- requerir Pull Request;
- requerir una aprobación;
- requerir que las conversaciones estén resueltas;
- requerir la validación `verify`;
- bloquear force push y eliminación;
- permitir solamente squash merge.

## Responsabilidades

- Responsable de datos: revisa migraciones y políticas RLS.
- Responsable de UI: revisa tokens y componentes compartidos.
- Revisor de historia: valida criterios de aceptación y prueba el flujo.

Son responsabilidades dentro del equipo de desarrollo, no subequipos separados.

## Conflictos

Actualice la rama con `main` antes de solicitar revisión. Si dos historias necesitan modificar navegación, tokens o una migración común, coordinen primero el orden de integración.

