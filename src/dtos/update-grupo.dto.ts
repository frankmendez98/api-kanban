// src/grupos/dto/update-grupo.dto.ts
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class UpdateGrupoDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nombre?: string;

  @IsOptional()
  @IsInt()
  orden?: number;

  // Puede venir null para soltar al nodo (convertir en raíz)

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => o.padreId !== undefined)
  @IsInt()
  padreId?: number | null;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  tipoGrupo: string;

  @IsOptional()
  @IsBoolean()
  publica: boolean;
}
