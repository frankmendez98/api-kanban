import { IsOptional, IsString } from 'class-validator';

export class LoteDetalleIndexDto {
  @IsString()
  @IsOptional()
  estado_short_name: string;
}
