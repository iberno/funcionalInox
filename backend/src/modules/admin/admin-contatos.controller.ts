import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin - Contatos')
@Controller('admin/contatos')
export class AdminContatosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.contato.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.contato.findUniqueOrThrow({ where: { id } });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { lido?: boolean; respondido?: boolean }) {
    return this.prisma.contato.update({
      where: { id },
      data: { lido: data.lido, respondido: data.respondido },
    });
  }
}
