import { RegisterDto } from './register.dto';
import { PartialType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRegisterDto extends PartialType(RegisterDto) {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  updated_at: Date;
}
