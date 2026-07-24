// src/database/seeds/seeders/estados.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder } from '../seed.types';
import { Estado } from 'src/modules/estados/estado.entity';

export class EstadosSeeder implements Seeder {
  name = 'estados';
  order = 5;

  async run(dataSource: DataSource) {
    const repo = dataSource.getRepository(Estado);

    const estados: Array<Partial<Estado>> = [
      {
        id: 1,
        nombre: 'Inicializado',
        nombre_corto: 'INC',
        estados_permitidos: '[4,11]',
        clase: 'bg-primary',
      },
      {
        id: 2,
        nombre: 'Procesando',
        nombre_corto: 'PRC',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 3,
        nombre: 'Completado',
        nombre_corto: 'COMP',
        estados_permitidos: '[2,11]',
        clase: 'bg-success',
      },
      {
        id: 4,
        nombre: 'Solicitud de firmas',
        nombre_corto: 'SDF',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 5,
        nombre: 'Ingresado',
        nombre_corto: 'ING',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 6,
        nombre: 'Fallido',
        nombre_corto: 'FAL',
        estados_permitidos: '[]',
        clase: 'bg-success',
      },
      {
        id: 7,
        nombre: 'En Proceso de Firma',
        nombre_corto: 'EPC',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 8,
        nombre: 'En Proceso Reintento Firma',
        nombre_corto: 'EPR',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 9,
        nombre: 'Intermedio Detalle Firma Grupal',
        nombre_corto: 'IDF',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 10,
        nombre: 'Eliminado',
        nombre_corto: 'ELI',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
      {
        id: 11,
        nombre: 'Pendiente Prueba Conexión',
        nombre_corto: 'PPC',
        estados_permitidos: '[3]',
        clase: 'bg-success',
      },
    ];

    for (const e of estados) {
      const existing = await repo.findOne({ where: { id: e.id! } });

      if (!existing) {
        // inserta respetando el ID
        await repo.save(repo.create(e));
      } else {
        // update idempotente (solo campos del catálogo)
        existing.nombre = e.nombre!;
        existing.nombre_corto = e.nombre_corto!;
        existing.estados_permitidos = e.estados_permitidos!;
        existing.clase = e.clase ?? '';

        await repo.save(existing);
      }
    }
  }
}
