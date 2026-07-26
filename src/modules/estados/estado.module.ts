import { TypeOrmModule } from '@nestjs/typeorm';
import { Estado } from './estado.entity';
import { EstadoService } from './estado.service';
import { EstadoController } from './estado.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Estado])],
  providers: [EstadoService],
  controllers: [EstadoController],
  exports: [EstadoService],
})
export class EstadoModule {}
