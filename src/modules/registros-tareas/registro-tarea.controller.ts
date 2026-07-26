import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationHeaderInterceptor } from 'src/common/interceptors/pagination-header.interceptor';
import { RegistroTareaService } from './registro-tarea.service';
import { CreateRegistroTareaDto } from './dto/create-registro-tarea.dto';
import { RegistroTareaIndexDto } from './dto/registro-tarea-index.dto';
import { RegistroTarea } from './registro-tarea.entity';

@Controller('registros-tareas')
export class RegistroTareaController {
  constructor(private readonly registroTareaService: RegistroTareaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateRegistroTareaDto): Promise<RegistroTarea> {
    return this.registroTareaService.create(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(PaginationHeaderInterceptor)
  async findAll(@Query() query: RegistroTareaIndexDto) {
    return this.registroTareaService.findPaginated(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<RegistroTarea> {
    return this.registroTareaService.exists(id);
  }
}
