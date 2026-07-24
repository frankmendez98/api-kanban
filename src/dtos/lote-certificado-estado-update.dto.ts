import { IsString } from 'class-validator';

export class UpdateLoteCertificadoEstadoDto {
  @IsString()
  estado_nombre_corto: string;
}
