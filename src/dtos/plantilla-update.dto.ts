import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PlantillaUpdateDto {
  @IsString()
  @IsOptional()
  nombre: string;
  @IsString()
  @IsOptional()
  coordenada: string;
  @IsString()
  @IsOptional()
  coordenada_frontend: string;

  @IsOptional()
  @IsBoolean()
  publica: boolean;
}
