import { IsOptional, IsString } from 'class-validator';

export class ParametrosUpdateDto {
  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  valorParametro?: string;

  @IsString()
  @IsOptional()
  etiqueta?: string;
}
