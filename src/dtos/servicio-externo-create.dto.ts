// src/dtos/signature-size-create.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ServicioExternoCreateDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  nombre_corto: string;

  @IsString()
  @IsNotEmpty()
  auth_url: string;

  @IsString()
  @IsNotEmpty()
  base_url: string;

  @IsString()
  @IsNotEmpty()
  auth_username: string;

  @IsString()
  @IsNotEmpty()
  auth_password: string;
}
