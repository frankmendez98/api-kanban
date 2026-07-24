## Reglas de Endpoints de Estado (Change Status)
*   **Responsabilidad**: Toda lógica de validación (existencia de recurso, existencia de estado, inyección de servicios secundarios) debe residir exclusivamente en el **Servicio**. El Controlador solo recibe el request y delega al servicio.
*   **Implementación en Controlador**:
    ```typescript
    @Put(':id/estados')
    async updateEstado(
      @Param('id', ParseIntPipe) id: number,
      @Body() body: EntityEstadoUpdate,
    ): Promise<Entidad> {
      return this.service.updateEstado(id, body);
    }
    ```
*   **Implementación en Servicio**: El servicio debe inyectar el servicio de `Estado` (u otros necesarios) para validar antes de persistir.
    ```typescript
    async updateEstado(id: number, body: EntityEstadoUpdate): Promise<Entidad> {
      const entidad = await this.exists(id);
      const estado = await this.estadoService.existShortName(body.nombreCorto);
      
      entidad.estado = estado; // Asignar la relación completa, no solo el nombre
      return this.repository.save(entidad);
    }
    ```