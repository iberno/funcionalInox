import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriasService } from './categorias.service';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as categorias' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Buscar categoria por slug com produtos' })
  findBySlug(@Param('slug') slug: string) {
    return this.categoriasService.findBySlug(slug);
  }
}
