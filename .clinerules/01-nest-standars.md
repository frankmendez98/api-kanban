# Estándares de Desarrollo NestJS - Proyecto Central

## 1. Reglas de Generación de Código
Para cada funcionalidad o endpoint solicitado, la IA debe generar obligatoriamente los siguientes componentes:

### A. Data Transfer Object (DTO)
*   Por cada endpoint, crear el DTO correspondiente para validación.
*   Utilizar exclusivamente `class-validator` y `class-transformer`.
*   Incluir decoradores de validación estándar (`@IsString()`, `@IsNotEmpty()`, etc.).
*   Para endpoints `GET` que retornan listas paginadas, se debe seguir esta estructura:
1. **Base Filter**: Definir los filtros específicos del recurso en una clase `FilterDto`.
2. **Intersección**: Usar `IntersectionType` para combinar `PaginationDto` con `PartialType(FilterDto)`.

*Ejemplo de implementación:*
```typescript

class BaseFilterDto {
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);
export class RecursoDto extends PartialType(CombinedDto) {}

```
### B. Servicio
*   Todo servicio debe extender obligatoriamente de `BaseService`.
*   La lógica de negocio debe residir exclusivamente en el servicio.
*   No incluir lógica de manipulación HTTP en el servicio.

### C. Controlador
*   Responsable único de manejar solicitudes HTTP.
*   Debe llamar a los métodos del servicio extendido.
*   Uso estricto de decoradores de NestJS (`@Get()`, `@Post()`, `@Body()`, etc.).

## 2. Formato de Entrega
*   **Comandos CLI**: Siempre proporcionar el comando de generación antes del código:
    ```bash
    nest g resource <nombre-recurso>
    ```
*   **Bloques de código**: Todo código generado debe estar en bloques de lenguaje (`typescript`, `bash`, etc.) para facilitar la copia.
*   **Rutas**: Indicar siempre la ruta del archivo generado.

## 3. Estructura de BaseService
La IA debe asumir que `BaseService` contiene los métodos genéricos de persistencia. Todo nuevo servicio debe seguir esta estructura:

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parametros } from 'src/entities/parametros.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base_service.service';

@Injectable()
export class ParametrosService extends BaseService<Parametros> {
  constructor(
    @InjectRepository(Parametros)
    private parametrosRepository: Repository<Parametros>,
  ) {
    super(parametrosRepository);
  }
}
```

## 4. Regla de Enfoque (Scope)
*   **Contexto local**: Cuando se solicite una tarea para un módulo específico, la IA debe limitar su contexto de trabajo únicamente a la carpeta `src/modules/<nombre-modulo>/`.
*   **Aislamiento**: No debe realizar cambios en otros módulos o servicios a menos que sea para gestionar las dependencias (ej. `EstadoService`).
*   **Confirmación**: Si la IA necesita tocar otro módulo fuera del alcance solicitado, debe preguntar antes al usuario.