import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrcamentoService } from './orcamento.service';
import { CreateOrcamentoDto } from './dto/orcamento.dto';
import { WebhookService } from '../webhook/webhook.service';

@ApiTags('Orçamento')
@Controller('orcamento')
export class OrcamentoController {
  constructor(
    private readonly orcamentoService: OrcamentoService,
    private readonly webhook: WebhookService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Enviar solicitação de orçamento' })
  async create(@Body() dto: CreateOrcamentoDto) {
    const result = await this.orcamentoService.create(dto);
    this.webhook.send('orcamento', dto);
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'Listar leads de orçamento (admin)' })
  findAll() {
    return this.orcamentoService.findAll();
  }
}
