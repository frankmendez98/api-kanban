import { IsString, IsNumber } from 'class-validator';

export class LoteFirmaMasivaRestaurarDto {
  @IsNumber()
  id_lote_certificado: number;
}
