import { IsNumber } from 'class-validator';

export class UpdateLoteCertificadoDto {
  @IsNumber()
  id_certificado: number;
}
