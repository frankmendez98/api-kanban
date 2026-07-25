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
import { TareaService } from './tarea.service';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { TareaIndexDto } from './dto/tarea-index.dto';
import { TareaEstadoUpdateDto } from './dto/tarea-estado-update.dto';
import { Tarea } from './tarea.entity';

@Controller('tareas')
export class TareaController {
  constructor(private readonly tareaService: TareaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTareaDto): Promise<Tarea> {
    return this.tareaService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(PaginationHeaderInterceptor)
  async findAll(@Query() query: TareaIndexDto) {
    return this.tareaService.findPaginated(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tarea> {
    return this.tareaService.exists(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTareaDto,
  ): Promise<Tarea> {
    return this.tareaService.update(id, body);
  }

  @Put(':id/estados')
  @HttpCode(HttpStatus.OK)
  async updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TareaEstadoUpdateDto,
  ): Promise<Tarea> {
    return this.tareaService.updateEstado(id, body);
  }
}
