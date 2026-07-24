import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UsuarioGrupoDto {
  @IsString()
  @IsOptional()
  id_usuario: string;

  @IsNumber()
  @IsOptional()
  id_grupo: number;

  @IsNumber()
  @IsOptional()
  id_certificado: number;
}
