import { IsOptional, IsString } from 'class-validator';
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from '../../paginacion/dto/pagination.dto';

class BaseFilterDto {
  @IsOptional()
  @IsString()
  nombre?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);
export class ProyectoIndexDto extends PartialType(CombinedDto) {}
