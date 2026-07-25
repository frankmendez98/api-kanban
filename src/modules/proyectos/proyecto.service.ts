import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from 'src/services/base_service.service';
import { Proyecto } from './proyecto.entity';

@Injectable()
export class ProyectoService extends BaseService<Proyecto> {
  constructor(
    @InjectRepository(Proyecto)
    private proyectoRepository: Repository<Proyecto>,
  ) {
    super(proyectoRepository);
  }
}
