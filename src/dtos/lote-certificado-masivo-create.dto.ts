import { IsArray, IsBoolean, IsBooleanString, IsNumber, IsOptional } from 'class-validator';

export class CreateLoteCertificadoMasivoDto {
  @IsArray()
  certificados: number[];
}
