import { IsNumber, IsString } from 'class-validator';

export class PlantillaCoordenadaCreateDto {
  @IsString()
  descripcion: string;

  @IsString()
  coordenada: string;

  @IsString()
  coordenada_frontend: string;

  @IsNumber()
  pagina: number;
}
