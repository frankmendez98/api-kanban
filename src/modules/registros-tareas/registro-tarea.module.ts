import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroTarea } from './registro-tarea.entity';
import { RegistroTareaService } from './registro-tarea.service';
import { RegistroTareaController } from './registro-tarea.controller';
import { TareaModule } from '../tareas/tarea.module';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroTarea]), TareaModule],
  providers: [RegistroTareaService],
  controllers: [RegistroTareaController],
  exports: [RegistroTareaService],
})
export class RegistroTareaModule {}
