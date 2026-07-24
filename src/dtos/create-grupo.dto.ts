import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGrupoDto {
  @IsString()
  @MaxLength(120)
  nombre!: string;

  // Si lo envias -> crea hijo. Si no lo envias -> crea raíz
  @IsOptional()
  @IsInt()
  padreId?: number;

  @IsOptional()
  @IsInt()
  orden?: number;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  tipoGrupo: string;

  @IsOptional()
  @IsBoolean()
  publica: boolean;
}
