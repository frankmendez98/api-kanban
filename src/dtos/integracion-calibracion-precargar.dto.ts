import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UrlDataDto {
  @IsString({ message: 'El id debe ser un texto' })
  id: string;

  @IsString({ message: 'La coordenada debe ser un texto válido' })
  coordenada: string;

  @IsOptional()
  @IsString({ message: 'La coordenada_frontend debe ser un texto válido' })
  coordenada_frontend: string | null;

  @IsString({ message: 'La nombre_corto_firmante debe ser un texto válido' })
  nombre_corto_firmante: string;

  @IsString({ message: 'La nombre_firmante debe ser un texto válido' })
  nombre_firmante: string;
  
  @IsNumber()
  npagina: number;
}

// 1. Molde para los objetos dentro del arreglo 'urls'
class UrlItemDto {
  @IsString({ message: 'El id de la URL debe ser un texto' })
  id: string;

  @IsString({ message: 'El nombre de la URL debe ser un texto' })
  nombre: string;

  @IsString({ message: 'La URL debe ser un texto válido' })
  url: string;

  @IsArray({ message: 'El campo coordenadas debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => UrlDataDto) // <-- Crucial para que class-transformer sepa el tipo
  coordenadas: UrlDataDto[];
}

// 2. Molde para los objetos dentro del arreglo 'firmantes'
class FirmanteItemDto {
  @IsString({ message: 'El nombre corto debe ser un texto' })
  nombre_corto: string;

  @IsString({ message: 'El nombre completo debe ser un texto' })
  nombre: string;
}

// 3. DTO Principal
export class IntegracionCalibracionPrecargarDto {
  @IsString({ message: 'El atributo urlout debe ser un texto' })
  urlout: string;

  @IsArray({ message: 'El campo urls debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => UrlItemDto) // <-- Crucial para que class-transformer sepa el tipo
  urls: UrlItemDto[];

  @IsArray({ message: 'El campo firmantes debe ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => FirmanteItemDto) // <-- Crucial para que class-transformer sepa el tipo
  firmantes: FirmanteItemDto[];
}