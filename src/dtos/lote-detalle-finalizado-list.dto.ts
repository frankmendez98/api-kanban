import { IsOptional, IsString } from 'class-validator';

export class LoteDetalleFinalizadoListDto {
  @IsString()
  @IsOptional()
  short_name_estado: string;
}
