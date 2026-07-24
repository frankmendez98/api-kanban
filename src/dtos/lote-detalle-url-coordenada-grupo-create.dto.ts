import { IsString, IsNumber } from 'class-validator';

export class CreateLoteDetalleUrlCoordenadaGrupoDto {
  @IsString()
  modelo: string;

  @IsNumber()
  id_grupo: number;

  @IsString()
  coordenada: string;

  @IsString()
  coordenada_frontend: string;

  @IsNumber()
  pagina: number;
}
