// certificado.dto.ts
import {
  PartialType,
  IntersectionType,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsString } from 'class-validator';

class BaseFilterDto {
  @ApiPropertyOptional({ description: 'Filtro por título del lote' })
  @IsOptional()
  @IsString()
  titulo?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class LoteCoordenadaFirmaPendienteDto extends PartialType(CombinedDto) {}
