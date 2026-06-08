import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto, QueryProdutosDto } from './dto/produtos.dto';

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos ativos' })
  findAll(@Query() query: QueryProdutosDto) {
    return this.produtosService.findAll(query);
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Buscar produto por slug' })
  findBySlug(@Param('slug') slug: string) {
    return this.produtosService.findBySlug(slug);
  }

  @Post()
  @ApiOperation({ summary: 'Criar novo produto (admin)' })
  create(@Body() dto: CreateProdutoDto) {
    return this.produtosService.create(dto);
  }
}
