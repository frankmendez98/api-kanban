import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base_service.service';
import { Tarea } from './tarea.entity';
import { TareaEstadoUpdateDto } from './dto/tarea-estado-update.dto';

const ESTADOS_PERMITIDOS = ['pending', 'in-progress', 'completed', 'failed'];
const TIPOS_TAREA_PERMITIDOS = ['create', 'patch'];

@Injectable()
export class TareaService extends BaseService<Tarea> {
  constructor(
    @InjectRepository(Tarea)
    private tareaRepository: Repository<Tarea>,
  ) {
    super(tareaRepository);
  }

  async create(createDto: Partial<Tarea>): Promise<Tarea> {
    if (createDto.tipo_tarea !== undefined) {
      this.validarTipoTarea(createDto.tipo_tarea);
    }
    if (createDto.estado !== undefined) {
      this.validarEstado(createDto.estado);
    }
    return super.create(createDto);
  }

  async update(id: number, updateDto: Partial<Tarea>): Promise<Tarea> {
    if (updateDto.tipo_tarea !== undefined) {
      this.validarTipoTarea(updateDto.tipo_tarea);
    }
    if (updateDto.estado !== undefined) {
      this.validarEstado(updateDto.estado);
    }
    return super.update(id, updateDto);
  }

  async updateEstado(id: number, body: TareaEstadoUpdateDto): Promise<Tarea> {
    const tarea = await this.exists(id);
    this.validarEstado(body.estado);
    tarea.estado = body.estado;
    return this.repository.save(tarea);
  }

  private validarEstado(estado: string): void {
    if (estado && !ESTADOS_PERMITIDOS.includes(estado)) {
      throw new BadRequestException(
        `Estado inválido: "${estado}". Estados permitidos: ${ESTADOS_PERMITIDOS.join(', ')}`,
      );
    }
  }

  private validarTipoTarea(tipo_tarea: string): void {
    if (tipo_tarea && !TIPOS_TAREA_PERMITIDOS.includes(tipo_tarea)) {
      throw new BadRequestException(
        `Tipo de tarea inválido: "${tipo_tarea}". Tipos permitidos: ${TIPOS_TAREA_PERMITIDOS.join(', ')}`,
      );
    }
  }
}
