import { IsOptional, IsString, IsNumberString } from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../paginacion/dto/pagination.dto';

class BaseFilterDto {
  @IsOptional()
  @IsNumberString()
  id_tarea?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumberString()
  numero_intento?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);
export class RegistroTareaIndexDto extends PartialType(CombinedDto) {}
