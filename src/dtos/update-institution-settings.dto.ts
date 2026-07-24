// src/dtos/update-institution-settings.dto.ts
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateInstitutionSettingsDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  primaryColor?: string;

  @IsOptional()
  @IsString()
  emailHeader?: string | null;

  @IsOptional()
  @IsString()
  emailBody?: string | null;

  @IsOptional()
  @IsString()
  emailFooter?: string | null;
}
