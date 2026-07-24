import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateCertificadoDto {
  @ApiProperty({
    description: 'Nombre del certificado',
    example: 'Ceritificado persona Natural',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'ScratchCard o usuario del cerificado',
    example: '3060107',
  })
  @IsString()
  scratchcard: string;

  @ApiProperty({
    description: 'ID del usuario propietario del certificado (UUID)',
    example: 'b8f4c0e3-d35b-4f3a-a7a2-8a0ff3f245ae',
  })
  @IsUUID()
  usuario_id: string;

  @ApiProperty({
    description: 'ID del tipo de certificado',
    example: '3',
  })
  @IsNumber()
  tipo_certificado_id: number;

  @ApiProperty({
    description: 'Fecha inicio de la vigencia del certificado',
    example: '2020-10-12',
  })
  @IsString()
  fecha_vigencia_desde: string;

  @ApiProperty({
    description: 'Fecha fin de la vigencia del certificado',
    example: '2021-10-12',
  })
  @IsString()
  fecha_vigencia_hasta: string;

  @IsString()
  status_certificado_uanataca: string;

  @IsNumber()
  id_uanataca_identificador: number;
}
