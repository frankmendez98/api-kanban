import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/services/base_service.service';
import { Repository } from 'typeorm';
import { Estado } from './estado.entity';

@Injectable()
export class EstadoService extends BaseService<Estado> {
  constructor(
    @InjectRepository(Estado) // Inyecta el repositorio de la entidad Estado
    private estadoRepository: Repository<Estado>,
  ) {
    super(estadoRepository);
  }

  async existShortName(nombreCorto: string): Promise<Estado> {
    const estado = await this.estadoRepository.findOne({
      where: { nombre_corto: nombreCorto },
    });
    if (!estado) {
      throw new NotFoundException(
        `Estado con nombre_corto "${nombreCorto}" no encontrado.`,
      );
    }
    return estado;
  }
}
