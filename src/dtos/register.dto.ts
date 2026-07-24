import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Nombre de usuario', example: 'john.doe' }) // <-- Describe la propiedad
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  username: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  email: string;

  @ApiProperty({
    description: 'Nombres del Usuario',
    example: 'Juan Carlos',
  })
  @IsNotEmpty({ message: 'El campo no debe estar vacío' })
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  @IsString({ message: 'El campo debe ser una cadena de texto' })
  firstName: string;

  @ApiProperty({
    description: 'Apellidos del Usuario',
    example: 'Vásquez Pérez',
  })
  @IsNotEmpty({ message: 'El campo no debe estar vacío' })
  @MinLength(3, { message: 'El apellido debe tener al menos 3 caracteres' })
  @IsString({ message: 'El campo debe ser una cadena de texto' })
  lastName: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  tipoGrupo: string;
}
