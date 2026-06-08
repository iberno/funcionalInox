import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/contato.dto';

@ApiTags('Contato')
@Controller('contato')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar formulário de contato' })
  create(@Body() dto: CreateContatoDto) {
    return this.contatoService.create(dto);
  }
}
