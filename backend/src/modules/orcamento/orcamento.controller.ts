import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrcamentoService } from './orcamento.service';
import { CreateOrcamentoDto } from './dto/orcamento.dto';

@ApiTags('Orçamento')
@Controller('orcamento')
export class OrcamentoController {
  constructor(private readonly orcamentoService: OrcamentoService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar solicitação de orçamento' })
  create(@Body() dto: CreateOrcamentoDto) {
    return this.orcamentoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar leads de orçamento (admin)' })
  findAll() {
    return this.orcamentoService.findAll();
  }
}
