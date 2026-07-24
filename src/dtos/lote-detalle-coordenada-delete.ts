import { IsNumber, IsOptional } from 'class-validator';

export class LoteCoordenadaGrupoDelete {
  @IsNumber()
  @IsOptional()
  id_grupo: number;
}
