import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEstadoDto } from './estado-create.dto';
import { IsString } from 'class-validator';

export class UpdateEstadoDto extends PartialType(CreateEstadoDto) {
  @ApiProperty({
    description: 'Nombre corto que identifica al estado',
    example: 'COMP',
  })
  @IsString()
  nombre_corto: string;
}
