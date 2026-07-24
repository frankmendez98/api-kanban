// src/common/dtos/pagination.dto.ts
import { IsBooleanString, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number = 10;

  @IsOptional()
  @IsBooleanString()
  pagination?: string; // 'true' o 'false' como string
}
