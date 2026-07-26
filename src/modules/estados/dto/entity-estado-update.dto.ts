import { IsString } from 'class-validator';

export class EntityEstadoUpdate {
  @IsString()
  nombreCorto: string;
}
