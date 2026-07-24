import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoteFirmanteCacheDto {
  @IsString()
  scratchcard: string;
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  pin: string;
  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  password: string;
  @IsNumber()
  id_certificado: number;
  @IsBoolean()
  @IsOptional()
  autocompletar_credencial: boolean;
}
