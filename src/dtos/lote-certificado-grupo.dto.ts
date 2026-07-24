// certificado.dto.ts
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsOptional, IsEmail, IsString } from 'class-validator';

class BaseFilterDto {
  @IsOptional()
  @IsString()
  usuario?: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class LoteCertificadoGrupoDto extends PartialType(CombinedDto) {}
