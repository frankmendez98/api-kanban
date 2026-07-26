import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProyectoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  url_repositorio: string;

  @IsString()
  @IsNotEmpty()
  ruta_local: string;

  @IsString()
  @IsOptional()
  stack_predeterminado?: string;
}
