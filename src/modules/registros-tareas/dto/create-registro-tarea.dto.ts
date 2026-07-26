import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateRegistroTareaDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  id_tarea: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  numero_intento: number;

  @IsString()
  @IsNotEmpty()
  estado: string;

  @IsString()
  @IsOptional()
  salida_error?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tokens_utilizados?: number;
}
