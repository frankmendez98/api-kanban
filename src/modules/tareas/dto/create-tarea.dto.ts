import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateTareaDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id_proyecto: number;

  @IsString()
  @IsNotEmpty()
  nombre_modulo: string;

  @IsString()
  @IsNotEmpty()
  nombre_entidad: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsOptional()
  tipo_tarea?: string;

  @IsString()
  @IsOptional()
  estado?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  prioridad?: number;

  @IsString()
  @IsOptional()
  hash_commit?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tiempo_ejecucion_seg?: number;
}
