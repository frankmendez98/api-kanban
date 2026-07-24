// certificado.dto.ts
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsNumber, IsString } from 'class-validator';

class BaseFilterDto {
  @IsOptional()
  @IsNumber()
  id_item?: number;

  @IsOptional()
  @IsString()
  modelo?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class UsuarioAccesoDto extends PartialType(CombinedDto) {}
