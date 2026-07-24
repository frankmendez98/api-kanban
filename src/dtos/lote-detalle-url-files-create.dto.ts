import { Type } from "class-transformer";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UploadLoteDetalleUrlFileDto {
  @IsOptional()
  @IsString() // Asegura que el valor final sea un booleano
  es_grupo?: string;
}
