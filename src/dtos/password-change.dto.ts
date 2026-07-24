// password-change.dto.ts
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString() currentPassword!: string;

  @IsString()
  @MinLength(8) // agrega tus reglas (mayúsculas, símbolos, etc.)
  newPassword!: string;
}
