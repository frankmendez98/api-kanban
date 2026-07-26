import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';
import { CreateTareaDto } from './create-tarea.dto';

export class CreateTareaBulkDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'Debe proporcionar al menos una tarea' })
  @IsNotEmpty({ message: 'El arreglo de tareas no puede estar vacío' })
  tareas: CreateTareaDto[];
}
