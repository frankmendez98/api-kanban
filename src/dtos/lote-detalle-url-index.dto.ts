import { PartialType, IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from './pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

class BaseFilterDto {
}

const CombinedDto = IntersectionType(PaginationDto, BaseFilterDto);

export class LoteDetalleUrlIndexDto extends PartialType(CombinedDto) {}
