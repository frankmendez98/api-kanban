// src/common/base.service.ts
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import {
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  FindOneOptions,
  DeepPartial,
  FindManyOptions,
  In,
  ILike,
  SelectQueryBuilder,
  Brackets
} from 'typeorm'; // Import ObjectLiteral
import { isNull } from 'util';

type EntityConstructor<T> = new (...args: any[]) => T & { name?: string };

// T must extend ObjectLiteral
export abstract class BaseService<T extends ObjectLiteral> {
  protected entityName: string; // Declara una propiedad para almacenar el nombre de la entidad

  constructor(protected readonly repository: Repository<T>) {
    this.entityName =
      (this.repository.target as EntityConstructor<T>).name || 'Entidad';
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findPaginated(filters: any, orderByObject: any = null) {
    const {
      correo,
      page = 1,
      limit = 10,
      pagination: paginationEnabled = 'false',
    } = filters;

    const pagination = {
      page,
      limit,
      pagination: paginationEnabled,
    };

    const where: any = {};

    // Esto SOLO tiene sentido para el servicio de usuarios,
    // para el resto simplemente no habrá `correo` y el where quedará vacío
    if (correo) {
      where.usuario = {
        email: ILike(`%${correo}%`),
      };
    }

    // 👇 si NO me mandan orderByObject, uso id: DESC por defecto
    if (!orderByObject) {
      orderByObject = { id: 'DESC' };
    }

    return await this.paginate(this.repository, pagination, {
      where,
      order: orderByObject,
    });
  }

  async findPaginatedWithAccess(
    filters: any, 
    idUsuario: string,
    modeloNombre: string,
    orderByObject: any = null
  ) {
    const {
      with_deleted: withDeleted,
      nombre, // O cualquier campo de búsqueda genérico que uses
      page = 1,
      limit = 10,
      pagination: paginationEnabled = 'false',
    } = filters;

    const pagination = {
      page,
      limit,
      pagination: paginationEnabled,
    };

    // 1. Obtener automáticamente el nombre de la tabla y entidad actual
    const alias = this.repository.metadata.name.toLowerCase(); 

    const queryBuilder = this.repository.createQueryBuilder(alias);

    // 2. LEFT JOIN con la tabla de accesos (para evaluar permisos o registros públicos)
    queryBuilder.leftJoin(
      'usuarios_accesos',
      'acceso',
      `acceso.id_item = ${alias}.id AND acceso.id_usuario = :idUsuario AND acceso.modelo = :modeloNombre`,
      { idUsuario, modeloNombre }
    );

    // 3. Regla de negocio: El usuario tiene acceso explícito OR el registro es público
    queryBuilder.andWhere(
      new Brackets((qb) => {
        qb.where('acceso.id IS NOT NULL') // Tiene registro en la tabla de accesos
          .orWhere(`${alias}.publica = :isPublico`, { isPublico: true }); // O el campo público es true
      })
    );

    // 4. Manejo de Soft Delete dinámico
    if (withDeleted !== 'true' && this.repository.metadata.deleteDateColumn) {
      queryBuilder.andWhere(`${alias}.deleted_at IS NULL`);
    }

    // 5. Filtro por nombre (opcional y genérico)
    if (nombre) {
      queryBuilder.andWhere(`${alias}.nombre ILike :nombre`, { nombre: `%${nombre}%` });
    }

    // 6. Ordenamiento dinámico o por defecto
    if (orderByObject) {
      Object.keys(orderByObject).forEach((key) => {
        queryBuilder.addOrderBy(`${alias}.${key}`, orderByObject[key]);
      });
    } else {
      queryBuilder.orderBy(`${alias}.id`, 'DESC');
    }

    // 7. Retorno paginado
    return await this.paginate(queryBuilder, pagination);
  }

  async findById(id: number | string): Promise<T | null> {
    const whereCondition: FindOptionsWhere<T> = {
      id,
    } as unknown as FindOptionsWhere<T>;
    return this.findOneByConditions(whereCondition);
  }

  async exists(id: number | string): Promise<T> {
    const whereCondition: FindOptionsWhere<T> = {
      id,
    } as unknown as FindOptionsWhere<T>;
    const result = await this.findOneByConditions(whereCondition);
    if (!result) {
      throw new NotFoundException(
        `No se encontró ${this.entityName} con ID ${id}.`,
      );
    }
    return result;
  }

  async existShortname(nombre_corto: number | string): Promise<T> {
    const whereCondition: FindOptionsWhere<T> = {
      nombre_corto,
    } as unknown as FindOptionsWhere<T>;
    const result = await this.findOneByConditions(whereCondition);
    if (!result) {
      throw new NotFoundException(
        `No se encontró ${this.entityName} con nombre_corto ${nombre_corto}.`,
      );
    }
    return result;
  }

  async findOneByConditions(
    where: FindOptionsWhere<T>,
    options?: FindOneOptions<T>,
  ): Promise<T | null> {
    // Si estás usando FindOneOptions, asegúrate de que el 'where' se pase correctamente.
    // En TypeORM 0.3.x, `findOne` espera un solo objeto de opciones.
    return this.repository.findOne({ where, ...options });
  }

  async create(createDto: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(createDto);
    return this.repository.save(newEntity);
  }

  async update(id: number | string, updateDto: DeepPartial<T>): Promise<T> {
    const existing = await this.exists(id);

    const merged = this.repository.merge(existing, updateDto);
    return this.repository.save(merged);
  }

  async updateWhereIn(ids: number[], updateDto: DeepPartial<T>): Promise<any> {
    return this.repository.update({ id: In(ids) as any }, updateDto as any);
  }

  async remove(id: number): Promise<void> {
    const resultado = await this.repository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(
        `Lote detalle url coordenada ${id} no encontrado`,
      );
    }
  }

  async softDelete(id: number): Promise<void> {
    const resultado = await this.repository.softDelete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(
        `Lote detalle url coordenada ${id} no encontrado`,
      );
    }
  }
  /*
  async paginate<T extends ObjectLiteral>(
    repository: Repository<T>,
    pagination: PaginationDto,
    options: FindManyOptions<T> = {},
  ): Promise<{ data: T[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      pagination: paginationEnabled = 'true',
    } = pagination;

    const shouldPaginate = paginationEnabled !== 'false';

    if (!shouldPaginate) {
      const data = await repository.find(options);
      return { data, total: data.length };
    }

    const [data, total] = await repository.findAndCount({
      ...options,
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }
  */

  async paginate<T extends ObjectLiteral>(
  // Aceptamos repositorio o querybuilder
  target: Repository<T> | SelectQueryBuilder<T>,
  pagination: PaginationDto,
  options: FindManyOptions<T> = {}, // Solo se usará si 'target' es un Repository
  ): Promise<{ data: T[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      pagination: paginationEnabled = 'true',
    } = pagination;

    const shouldPaginate = paginationEnabled !== 'false';
    const skip = (page - 1) * limit;
    const take = limit;

    // CASO A: Es un QueryBuilder
    if (target instanceof SelectQueryBuilder) {
      if (!shouldPaginate) {
        const data = await target.getMany();
        return { data, total: data.length };
      }

      const [data, total] = await target
        .skip(skip)
        .take(take)
        .getManyAndCount();

      return { data, total };
    }

    // CASO B: Es un Repository (tu lógica original)
    if (!shouldPaginate) {
      const data = await target.find(options);
      return { data, total: data.length };
    }

    const [data, total] = await target.findAndCount({
      ...options,
      skip,
      take,
    });

    return { data, total };
  }

  async existsCustom(value: string | number, campo: string): Promise<T> {
    const whereCondition = { [campo]: value } as FindOptionsWhere<T>;

    const result = await this.findOneByConditions(whereCondition);
    if (result) {
      throw new ConflictException(
        `Se encontró ${this.entityName} con ${String(campo)} = ${value}.`,
      );
    } else if (isNull(result)) {
      throw new BadRequestException(
        `${this.entityName} no puede retornar null.`,
      );
    }
    return result;
  }

  async existsCustomMultiple(
    fields: Partial<Record<keyof T, string | number | boolean>>,
  ): Promise<void> {
    const conflictos: string[] = [];

    for (const [campo, valor] of Object.entries(fields)) {
      const condition = { [campo]: valor } as FindOptionsWhere<T>;
      const result = await this.findOneByConditions(condition);

      if (result) {
        conflictos.push(`${campo} = ${valor}`);
      }
    }

    if (conflictos.length > 0) {
      throw new ConflictException(
        `Ya existe ${this.entityName} con los siguientes campos en conflicto: ${conflictos.join(', ')}.`,
      );
    }
  }

  async paginateQueryBuilder(
    qb: SelectQueryBuilder<T>,
    pagination: PaginationDto,
  ): Promise<{ data: T[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      pagination: paginationEnabled = 'true',
    } = pagination;

    const shouldPaginate = paginationEnabled !== 'false';

    if (!shouldPaginate) {
      const [data, total] = await qb.getManyAndCount();
      return { data, total };
    }

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
  }
}
