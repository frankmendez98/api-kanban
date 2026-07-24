import { IsNumber, IsOptional, IsString } from 'class-validator';

import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

class BaseFilterDto {
  @IsNumber()
  @IsOptional()
  id_grupo: number;

  @IsString()
  @IsOptional()
  email: string;
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class UsuarioGrupoIndexDto extends PartialType(CombinedDto) {}
