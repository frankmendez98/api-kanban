import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base_service.service';
import { EstadoService } from '../estados/estado.service';
import { Proyecto } from './proyecto.entity';
import { ProyectoEstadoUpdateDto } from './dto/proyecto-estado-update.dto';

@Injectable()
export class ProyectoService extends BaseService<Proyecto> {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
    private readonly estadoService: EstadoService,
  ) {
    super(proyectoRepository);
  }

  async updateEstado(id: number, body: ProyectoEstadoUpdateDto): Promise<Proyecto> {
    const proyecto = await this.exists(id);
    const estado = await this.estadoService.existShortName(body.nombreCorto);

    proyecto.estado = estado;
    return this.repository.save(proyecto);
  }
}
