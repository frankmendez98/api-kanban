import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationHeaderInterceptor } from 'src/common/interceptors/pagination-header.interceptor';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { ProyectoIndexDto } from './dto/proyecto-index.dto';
import { ProyectoEstadoUpdateDto } from './dto/proyecto-estado-update.dto';
import { Proyecto } from './proyecto.entity';

@Controller('proyectos')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateProyectoDto): Promise<Proyecto> {
    return this.proyectoService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(PaginationHeaderInterceptor)
  async findAll(@Query() query: ProyectoIndexDto) {
    return this.proyectoService.findPaginated(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Proyecto> {
    return this.proyectoService.exists(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProyectoDto,
  ): Promise<Proyecto> {
    return this.proyectoService.update(id, body);
  }

  @Put(':id/estados')
  @HttpCode(HttpStatus.OK)
  async updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ProyectoEstadoUpdateDto,
  ): Promise<Proyecto> {
    return this.proyectoService.updateEstado(id, body);
  }
}
