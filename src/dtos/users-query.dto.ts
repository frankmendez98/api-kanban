// users-query.dto.ts  (úsalo en tu endpoint GET)
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { PaginationDto } from './pagination.dto';

export class UsersQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  @Transform(({ value }) =>
    value === 'null' || value === 'undefined' || value === ''
      ? undefined
      : String(value).trim(),
  )
  search?: string;

  @IsString()
  @IsOptional()
  with_deleted: string;
}
