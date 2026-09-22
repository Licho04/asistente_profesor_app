---
name: asistente-profesor-ui
description: Diseña o implementa pantallas, componentes y flujos visuales de Aula Clara, el asistente docente. Úsala para cualquier trabajo de UI o UX dentro de este repositorio; no modifica por sí sola alcance, datos ni reglas de negocio.
---

# Aula Clara UI

Construya una interfaz reconocible como parte del mismo escritorio académico, aunque la implemente una persona o un agente diferente.

## Antes de diseñar

1. Lea `../../../docs/design-system.md` completo.
2. Consulte `../../../docs/architecture.md` si la pantalla introduce datos o navegación.
3. Lea [references/page-patterns.md](references/page-patterns.md) para elegir la composición apropiada.
4. Revise los componentes existentes antes de crear uno nuevo.

## Resultado esperado

- Mantenga visible el contexto académico: periodo, materia, grupo o sesión.
- Haga evidente la acción primaria sin llenar la pantalla de botones principales.
- Use listas, cronologías o tablas cuando expresen mejor la información; no convierta cada dato en una tarjeta.
- Resuelva escritorio y móvil como parte de la misma historia.
- Incluya foco visible, etiquetas, estados vacíos y errores cuando correspondan.
- Use datos de ejemplo únicamente en prototipos y márquelos claramente como demostrativos.

## Límites

- No introduzca colores, tipografías o bibliotecas visuales nuevas sin registrar una decisión.
- No copie el estilo por defecto de una librería; adapte componentes a los tokens de Aula Clara.
- No invente funcionalidades para completar una pantalla.
- No cambie términos del dominio definidos en Jira o documentación.

## Validación

Compare el resultado con la pantalla de referencia del dashboard. Verifique jerarquía, consistencia de controles, ancho móvil, navegación por teclado y contraste. Ejecute las validaciones del repositorio y pruebe la interacción principal, no solo el renderizado.

