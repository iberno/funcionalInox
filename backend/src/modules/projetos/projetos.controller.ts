import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProjetosService } from './projetos.service';

@ApiTags('Projetos')
@Controller('projetos')
export class ProjetosController {
  constructor(private readonly projetosService: ProjetosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar projetos realizados' })
  @ApiQuery({ name: 'categoria', required: false })
  findAll(@Query('categoria') categoria?: string) {
    return this.projetosService.findAll(categoria);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar projeto por ID' })
  findById(@Param('id') id: string) {
    return this.projetosService.findById(id);
  }
}
