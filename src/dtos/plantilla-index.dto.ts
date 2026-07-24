import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

class BaseFilterDto {
  @IsString()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsOptional()
  with_deleted: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class PlantillaIndexDto extends PartialType(CombinedDto) {}
