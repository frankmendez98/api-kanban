import { IsNumber, IsString } from 'class-validator';

export class LoteCoordenadaCreate {
  @IsNumber()
  id_plantilla_coordenada: number;

  @IsNumber()
  id_certificado: number;
}
