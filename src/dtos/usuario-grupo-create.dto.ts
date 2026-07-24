import { IsNumber, IsArray } from 'class-validator';

export class UsuarioGrupoCreateDto {
  @IsNumber()
  id_grupo: number;

  @IsNumber()
  id_lote: number;

  @IsArray()
  ids_usuario_grupo: number[];
}
