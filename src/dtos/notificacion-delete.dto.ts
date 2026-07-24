import { IsString, IsOptional } from 'class-validator';

export class NotificacionDeleteDto {
  @IsString()
  @IsOptional()
  id_usuario: string;
}
