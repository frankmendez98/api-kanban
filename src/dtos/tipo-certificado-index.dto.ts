import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';

class BaseFilterDto {}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class TipoCertificadoIndexDto extends PartialType(CombinedDto) {}
