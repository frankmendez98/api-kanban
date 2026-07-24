// src/dtos/signature-size-create.dto.ts
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class ServicioExternoUpdateDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  nombre: string;

  @IsString()
  @IsOptional()
  auth_url: string;

  @IsString()
  @IsOptional()
  base_url: string;

  @IsString()
  @IsOptional()
  auth_username: string;

  @IsString()
  @IsOptional()
  auth_password: string;
}
