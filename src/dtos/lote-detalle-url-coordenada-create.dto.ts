import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateLoteDetalleUrlCoordenadaDto {
  @IsString()
  modelo: string;

  @IsNumber()
  id_item: number; // id_lote_detalle_url

  @IsString()
  id_certificado: string;

  @IsString()
  coordenada: string;

  @IsString()
  coordenada_frontend: string;

  @IsNumber()
  pagina: number;

  @IsBoolean()
  es_grupo: boolean;
}
