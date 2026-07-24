// dtos/zip-request.dto.ts
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BuildZipFromQueryDto {
  /** Por ejemplo, filtrar por un lote */
  @IsNumber()
  loteId!: number;

  /** Nombre del .zip descargado */
  @IsOptional()
  @IsString()
  zipName?: string;

  @IsOptional()
  @IsString()
  usuarioId?: string;
}

export class BuildZipFromFilesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ZipFileInput)
  files!: ZipFileInput[];

  @IsOptional()
  @IsString()
  zipName?: string;
}

export class ZipFileInput {
  @IsString()
  fileName!: string;

  @IsOptional()
  @IsString()
  zipName?: string;

  @IsOptional()
  @IsString()
  disk?: 'local' | 's3';
}
