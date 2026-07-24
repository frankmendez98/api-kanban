import { IsString } from 'class-validator';

export class LoteFirmaMasivaReintentarDto {
  @IsString()
  scratchcard: string;
}
