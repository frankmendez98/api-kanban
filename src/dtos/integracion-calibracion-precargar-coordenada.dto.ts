import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class IntegracionCalibracionPrecargarCoordenadaDto {
  @IsString({ message: 'El campo coordenadas debe ser un string' })
  coordenada: string;
  @IsString({ message: 'El campo coordenada_frontend debe ser un string' })
  coordenada_frontend: string;
  @IsString({ message: 'El campo nombre_corto_firmante debe ser un string' })
  nombre_corto_firmante: string;
  @IsString({ message: 'El campo nombre_firmante debe ser un string' })
  nombre_firmante: string;
  @IsNumber()
  npagina: number;
  @IsString()
  @IsOptional() // 👈 Permite que TypeScript y el validador acepten que inicialmente no venga
  id?: string;
}