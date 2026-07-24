import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PlantillaCreateDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsBoolean()
  publica: boolean;
}
