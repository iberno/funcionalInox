import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin - Projetos')
@Controller('admin/projetos')
export class AdminProjetosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.projeto.findMany({
      include: { categoria: true, produtos: { include: { produto: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.projeto.findUniqueOrThrow({
      where: { id },
      include: { categoria: true, produtos: { include: { produto: true } } },
    });
  }

  @Post()
  async create(@Body() data: any) {
    return this.prisma.projeto.create({
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        cliente: data.cliente,
        imagens: data.imagens || [],
        destaque: data.destaque ?? false,
        categoriaId: data.categoriaId,
        produtos: data.produtoIds ? {
          create: data.produtoIds.map((produtoId: string) => ({ produtoId })),
        } : undefined,
      },
      include: { categoria: true, produtos: { include: { produto: true } } },
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    await this.prisma.projeto.findUniqueOrThrow({ where: { id } });

    if (data.produtoIds) {
      await this.prisma.projetoProduto.deleteMany({ where: { projetoId: id } });
    }

    return this.prisma.projeto.update({
      where: { id },
      data: {
        titulo: data.titulo,
        descricao: data.descricao,
        cliente: data.cliente,
        imagens: data.imagens,
        destaque: data.destaque,
        categoriaId: data.categoriaId,
        produtos: data.produtoIds ? {
          create: data.produtoIds.map((produtoId: string) => ({ produtoId })),
        } : undefined,
      },
      include: { categoria: true, produtos: { include: { produto: true } } },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.prisma.projeto.delete({ where: { id } });
    return { ok: true };
  }
}
