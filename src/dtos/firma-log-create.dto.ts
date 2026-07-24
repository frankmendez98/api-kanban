import { IsString, IsOptional } from 'class-validator';

export class FirmaLogCreateDto {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  exception: string;
}
