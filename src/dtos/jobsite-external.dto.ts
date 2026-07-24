import { IsInt, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';

export class JobsiteExternalDto {
  @IsString()
  authUrl: string;
  @IsString()
  authUsername: string;
  @IsString()
  authPassword: string;
  @IsOptional()
  @IsObject()
  extraPayload?: Record<string, any>;
}
