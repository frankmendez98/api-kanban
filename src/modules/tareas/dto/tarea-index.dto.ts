import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../paginacion/dto/pagination.dto';

class BaseFilterDto {
  @IsOptional()
  @IsNumberString()
  id_proyecto?: string;

  @IsOptional()
  @IsString()
  nombre_modulo?: string;

  @IsOptional()
  @IsString()
  nombre_entidad?: string;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  tipo_tarea?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumberString()
  prioridad?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);
export class TareaIndexDto extends PartialType(CombinedDto) {}
