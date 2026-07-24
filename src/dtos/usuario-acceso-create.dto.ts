import { IsNumber, IsString } from 'class-validator';

export class UsuarioAccesoCreateDto {
  @IsNumber()
  id_item: number;

  @IsString()
  id_usuario: string;

  @IsString()
  modelo: string;
}
