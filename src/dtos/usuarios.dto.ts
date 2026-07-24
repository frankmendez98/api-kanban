// certificado.dto.ts
import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { RegisterDto } from './register.dto';

const CombinedDto = IntersectionType(PaginationDto, RegisterDto);

export class UsuarioDto extends PartialType(CombinedDto) {}
