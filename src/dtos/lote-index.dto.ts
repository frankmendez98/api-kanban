import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsBooleanString, IsNumber, IsOptional, IsString } from 'class-validator';

class BaseFilterDto {
  @IsString()
  @IsOptional()
  titulo: string;

  @IsString()
  @IsOptional()
  id_usuario: string;

  @IsString()
  @IsOptional()
  estado_short_name: string;

  @IsNumber()
  @IsOptional()
  id: number;

  @IsOptional()
  @IsBooleanString()
  compartido?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class LoteIndexDto extends PartialType(CombinedDto) {}
