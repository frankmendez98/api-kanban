import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationHeaderInterceptor } from 'src/common/interceptors/pagination-header.interceptor';
import { EstadoService } from './estado.service';
import { PaginationDto } from '../paginacion/dto/pagination.dto';

@Controller('certificados') // Todas las rutas en este controlador comenzarán con /products
export class EstadoController {
  constructor(private readonly estadoService: EstadoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(PaginationHeaderInterceptor)
  findAll(@Query() query: PaginationDto) {
    return this.estadoService.findPaginated(query);
  }
}
