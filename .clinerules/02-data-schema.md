# Esquema de Entidades - Taller App

## Estructura de Definición
Para cada módulo, definir:
- **Módulo**: Nombre del directorio/recurso (kebab-case).
- **Entidad**: Nombre de la clase (PascalCase).
- **Campos**: Lista de campos y tipos de datos.
- **Relaciones**: Entidad destino y tipo (N:1, 1:N) indicando la Foreign Key (FK).

## Registro de Módulos (La Traza)
| Módulo | Entidad | Campos | Relaciones |
| :--- | :--- | :--- | :--- |
| `tipos-vehiculos` | `TipoVehiculo` | id, nombre, nombre_corto | N/A |
| `marcas-tipos` | `MarcaTipoVehiculo` | id, id_marca, id_tipo_vehiculo, url | N:1 `Marca` (FK: id_marca), N:1 `TipoVehiculo` (FK: id_tipo_vehiculo) |
| `usuarios` | `Usuario` | id, name, email, loyalty_points, avatar, provider_name, provider_id, email_verified_at, password, remember_token | N/A |

| `talleres` | `Taller` | id, id_usuario, stripe_account_id, nombre_comercial, identificacion_tributaria, logo, descripcion, ubicacion, contact_number, calificacion_promedio, verificado | N:1 `Usuario` (FK: id_usuario), N:1 `Estado` (FK: id_estado) |
| `servicios` | `Servicio` | id, nombre_servicio, precio_base, duracion_est_mins | N/A |
| `vehiculos` | `Vehiculo` | id, id_usuario, placa, modelo, anio, vin, kilometraje, id_marca, id_tipo_vehiculo, id_estado | N:1 `Usuario` (FK: id_usuario), N:1 `Marca` (FK: id_marca), N:1 `TipoVehiculo` (FK: id_tipo_vehiculo), N:1 `Estado` (FK: id_estado) |
| `citas` | `Cita` | id, id_vehiculo, id_taller, id_servicio, programada_para, estado | N:1 `Vehiculo` (FK: id_vehiculo), N:1 `Taller` (FK: id_taller), N:1 `CatalogoServicio` (FK: id_servicio) |
| `social-identities` | `SocialIdentity` | id, id_usuario, provider, id_provider | N:1 `Usuario` (FK: id_usuario) |


## Regla de Inferencia
Si un módulo se solicita y no está en esta tabla, el agente DEBE:
1. Proponer los campos básicos (id, created_at, updated_at, deleted_at).
2. Preguntar al usuario por las relaciones y campos adicionales antes de generar el código.