import { IsOptional, IsString } from 'class-validator';

export class NotificacionIndexDto {
  @IsString()
  @IsOptional()
  usuario_id: string;

  @IsString()
  @IsOptional()
  tipo: string;
}
