# Criterios para la base de datos

## Fuente de verdad

Toda modificación estructural se realiza mediante un archivo nuevo en `supabase/migrations`. No se depende de cambios manuales sin registrar en el panel de Supabase.

## Núcleo conceptual

- Profesor y perfil.
- Periodo académico.
- Catálogo institucional de materias y temarios.
- Carga académica, grupo, horario y sesión de clase.
- Alumno privado dentro de un grupo del profesor.
- Registro de asistencia por alumno y sesión.
- Actividad de evaluación, entrega y calificación.
- Planeación de temas por sesión.
- Material didáctico vinculado con materia y tema.

El modelo definitivo se incorporará como migraciones después de validar el diagrama de clases y las relaciones con el equipo.

## Convenciones

- Identificadores UUID.
- Fechas en UTC; zona horaria presentada en la interfaz.
- `created_at` y `updated_at` en registros operativos.
- Nombres SQL en `snake_case` y TypeScript en `camelCase`.
- Restricciones e índices se definen junto con cada tabla.
- RLS se habilita en la misma migración que expone una tabla.

