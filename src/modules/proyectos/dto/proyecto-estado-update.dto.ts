import { IsString, IsNotEmpty } from 'class-validator';

export class ProyectoEstadoUpdateDto {
  @IsString()
  @IsNotEmpty()
  nombreCorto: string;
}
