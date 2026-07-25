import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base_service.service';
import { RegistroTarea } from './registro-tarea.entity';
import { TareaService } from '../tareas/tarea.service';

const ESTADOS_PERMITIDOS = ['success', 'error'];

@Injectable()
export class RegistroTareaService extends BaseService<RegistroTarea> {
  constructor(
    @InjectRepository(RegistroTarea)
    private registroTareaRepository: Repository<RegistroTarea>,
    private readonly tareaService: TareaService,
  ) {
    super(registroTareaRepository);
  }

  async create(createDto: Partial<RegistroTarea>): Promise<RegistroTarea> {
    if (createDto.estado !== undefined) {
      this.validarEstado(createDto.estado);
    }
    if (createDto.id_tarea !== undefined) {
      await this.tareaService.exists(createDto.id_tarea);
    }
    return super.create(createDto);
  }

  private validarEstado(estado: string): void {
    if (estado && !ESTADOS_PERMITIDOS.includes(estado)) {
      throw new BadRequestException(
        `Estado inválido: "${estado}". Estados permitidos: ${ESTADOS_PERMITIDOS.join(', ')}`,
      );
    }
  }
}
