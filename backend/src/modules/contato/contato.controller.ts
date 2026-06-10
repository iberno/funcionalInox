import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/contato.dto';
import { WebhookService } from '../webhook/webhook.service';

@ApiTags('Contato')
@Controller('contato')
export class ContatoController {
  constructor(
    private readonly contatoService: ContatoService,
    private readonly webhook: WebhookService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Enviar formulário de contato' })
  async create(@Body() dto: CreateContatoDto) {
    const result = await this.contatoService.create(dto);
    this.webhook.send('contato', dto);
    return result;
  }
}
