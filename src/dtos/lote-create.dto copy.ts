// src/lote/dto/create-lote.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateLoteDto {
  @ApiProperty({
    description:
      'Disco a usar para el almacenamiento de los documentos firmados',
    example: 'local, s3',
  })
  @IsString()
  @IsOptional()
  disco: string;

  @ApiProperty({
    description: 'Descripción breve de la carga de archivos a firmar',
    example: 'titulo carga de archivos',
  })
  @IsString()
  @IsOptional()
  titulo: string;

  @ApiProperty({
    description:
      'true para notificar a todos los participantes al momento de generar la solicitud de firma',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  notificacion_firmantes: boolean;

  @ApiProperty({
    description:
      'true para cargar una plantilla que contiene las coordenadas por cada firmante',
    example: 'true',
  })
  @IsBoolean()
  @IsOptional()
  firma_por_plantilla: boolean;

  @ApiProperty({
    description:
      'id de plantilla que contiene las coordenadas por cada firmante',
    example: 'true',
  })
  @IsNumber()
  @IsOptional()
  id_plantilla: number;
}
