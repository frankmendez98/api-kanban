import { IsBoolean, IsBooleanString, IsNumber, IsOptional } from 'class-validator';

export class CreateLoteCertificadoDto {
  @IsOptional()
  @IsBoolean()
  firmar_con_imagen: boolean;
}
