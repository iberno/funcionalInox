import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin - Orçamentos')
@Controller('admin/orcamentos')
export class AdminOrcamentosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.leadOrcamento.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.leadOrcamento.findUniqueOrThrow({ where: { id } });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: { lido?: boolean; respondido?: boolean }) {
    return this.prisma.leadOrcamento.update({
      where: { id },
      data: { lido: data.lido, respondido: data.respondido },
    });
  }

  @Put(':id/archive')
  async archive(@Param('id') id: string) {
    return this.prisma.leadOrcamento.update({
      where: { id },
      data: { lido: true },
    });
  }
}
