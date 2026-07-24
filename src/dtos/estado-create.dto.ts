import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateEstadoDto {
  @ApiProperty({
    description: 'Nombre del estado',
    example: 'Completado',
  })
  @IsString()
  @IsOptional()
  nombre: string;

  @ApiProperty({
    description: 'Nombre corto que identifica al estado',
    example: 'COMP',
  })
  @IsString()
  @IsOptional()
  nombre_corto: string;

  @ApiProperty({
    description:
      'Estados permitidos, array con los ids de los estados a los que puede cambiar',
    example: '[1,2,4]',
  })
  @IsString()
  @IsOptional()
  estados_permitidos: string;
}
