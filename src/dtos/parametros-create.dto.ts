import { IsString } from 'class-validator';

export class ParametrosCreateDto {
  @IsString()
  parametro: string;

  @IsString()
  descripcion: string;

  @IsString()
  valorParametro: string;

  @IsString()
  etiqueta: string;
}
