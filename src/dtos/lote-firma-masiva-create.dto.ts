// src/lote/dto/create-lote.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class LoteFirmaMasivaCreateDto {
  @ApiProperty({
    description:
      'Disco a usar para el almacenamiento de los documentos firmados',
    example: 'local, s3',
  })
  @IsString()
  @IsOptional()
  disco: string;
  @IsString()
  scratchcard: string;
}
