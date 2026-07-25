import { IsString, IsNotEmpty } from 'class-validator';

export class TareaEstadoUpdateDto {
  @IsString()
  @IsNotEmpty()
  estado: string;
}
