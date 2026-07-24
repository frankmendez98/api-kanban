// src/common/utils/paginate.util.ts
import { FindManyOptions, Repository, Like, ObjectLiteral } from 'typeorm';
import { PaginationDto } from 'src/dtos/pagination.dto';

export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  pagination: PaginationDto,
  options: FindManyOptions<T> = {},
  filters: Record<string, any> = {},
): Promise<{ data: T[]; total: number }> {
  const {
    page = 1,
    limit = 10,
    pagination: paginationEnabled = 'true',
  } = pagination;

  const shouldPaginate = paginationEnabled !== 'false';

  // Agregar filtros al "where"
  const whereConditions = Object.entries(filters).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = Like(`%${value}%`); // búsqueda parcial por defecto
      }
      return acc;
    },
    {} as Record<string, any>,
  );

  const baseOptions: FindManyOptions<T> = {
    ...options,
    where: whereConditions,
  };

  if (!shouldPaginate) {
    const data = await repository.find(baseOptions);
    return { data, total: data.length };
  }

  const [data, total] = await repository.findAndCount({
    ...baseOptions,
    skip: (page - 1) * limit,
    take: limit,
  });

  return { data, total };
}
