# Sistema visual de Aula Clara

## Concepto

La interfaz se siente como un escritorio académico ordenado: sobria, cálida y útil durante una jornada de clases. Debe mostrar bastante información sin parecer un tablero empresarial genérico.

## Principios

1. La siguiente acción del profesor debe ser evidente.
2. Periodo, materia, grupo y sesión siempre tienen contexto visible.
3. Tablas y listas priorizan lectura rápida sobre decoración.
4. Los estados no dependen únicamente del color.
5. La misma acción conserva nombre, icono y posición entre módulos.

## Identidad

- Azul tinta `#17324D`: navegación y estructura.
- Terracota `#C85F41`: acción principal y énfasis.
- Verde petróleo `#2D7771`: progreso y estados positivos.
- Ocre `#BA8A34`: advertencias moderadas.
- Papel `#FBFAF7` y lienzo `#F3EFE7`: superficies.
- Texto principal `#172433`; texto secundario `#66727D`.

Las variables viven en `src/styles/global.css`. No copie valores hexadecimales dentro de componentes salvo que se esté ampliando deliberadamente el sistema.

## Tipografía

- Encabezados: serif editorial del sistema, actualmente Georgia.
- Interfaz y datos: sans serif del sistema.
- Las mayúsculas con espaciado se reservan para etiquetas pequeñas, no para párrafos.

## Forma y composición

- Radio estándar de controles: 8–9 px.
- Radio de paneles: 13–15 px.
- Bordes suaves antes que sombras intensas.
- Una navegación lateral estable en escritorio y un panel deslizable en móvil.
- El contenido principal usa una anchura máxima; no se estira indefinidamente.

## Componentes

- Reutilice los componentes de `src/components/ui`.
- Cree variantes antes de duplicar estilos.
- Todo control interactivo necesita estado hover, foco visible y etiqueta accesible.
- Formularios: etiqueta persistente, ayuda breve y error junto al campo.
- Tablas: encabezado fijo cuando sea útil y primera columna identificable.
- Estados vacíos: explique qué falta y ofrezca una acción concreta.

## Patrones prohibidos

- Degradados morado-azul sin relación con la identidad.
- Glassmorphism, brillos y sombras decorativas excesivas.
- Páginas compuestas únicamente por tarjetas iguales.
- Emojis como iconos de navegación.
- Colores nuevos por cada módulo.
- Texto provisional, botones sin destino o métricas inventadas en entregables finales.

## Pantalla de referencia

El dashboard inicial fija el lenguaje visual: navegación, encabezados editoriales, agenda cronológica, tarjeta de próxima clase, pendientes y resumen compacto. Las pantallas nuevas deben sentirse como partes del mismo producto, no como plantillas independientes.

