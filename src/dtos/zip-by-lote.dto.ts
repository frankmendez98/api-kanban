// src/dtos/zip-by-lote.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ZipByLoteDto {
  @ApiProperty({ example: 436 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  loteId: number;

  @ApiPropertyOptional({ example: 'mis_documentos' })
  @IsOptional()
  @IsString()
  zipName?: string; // sin .zip
}
