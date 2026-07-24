import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EntityEstadoUpdate {
  @ApiProperty({
    description: 'Nombre corto que identifica al estado',
    example: 'COMP',
  })
  @IsString()
  nombre_corto: string;
}
