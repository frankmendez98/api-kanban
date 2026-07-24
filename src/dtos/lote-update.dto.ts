import { PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { CreateLoteDto } from './lote-create.dto';
import { Type } from 'class-transformer';

export class UpdateLoteDto extends PartialType(CreateLoteDto) {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fecha_inicio: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fecha_fin: Date;
}
