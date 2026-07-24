// certificado.dto.ts
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsEmail, IsBooleanString } from 'class-validator';

class BaseFilterDto {
  @IsOptional()
  @IsEmail()
  correo?: string;

  @IsOptional()
  @IsBooleanString()
  activo?: string; // 'true' o 'false' como string
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class CertificadoDto extends PartialType(CombinedDto) {}
