import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from './pagination.dto';

export class ParametrosQueryDto extends PaginationDto  {
  @IsString()
  @IsOptional()
  parametro?: string;

  @IsString()
  @IsOptional()
  label?: string;
}
