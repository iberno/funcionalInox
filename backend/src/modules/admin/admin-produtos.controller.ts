import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin - Produtos')
@Controller('admin/produtos')
export class AdminProdutosController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list(@Query('categoria') categoria?: string) {
    return this.prisma.produto.findMany({
      where: categoria ? { categoria: { slug: categoria as any } } : undefined,
      include: { imagens: { orderBy: { ordem: 'asc' } }, categoria: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.produto.findUniqueOrThrow({
      where: { id },
      include: { imagens: { orderBy: { ordem: 'asc' } }, categoria: true },
    });
  }

  @Post()
  async create(@Body() data: any) {
    return this.prisma.produto.create({
      data: {
        nome: data.nome,
        slug: data.slug,
        descricao: data.descricao,
        destaque: data.destaque,
        categoriaId: data.categoriaId,
        subcategoria: data.subcategoria,
        padronizado: data.padronizado ?? false,
        preco_min: data.preco_min ? parseFloat(data.preco_min) : null,
        status: data.status ?? true,
        imagens: data.imagens ? {
          create: data.imagens.map((img: any, i: number) => ({
            url: img.url,
            alt: img.alt,
            ordem: i,
          })),
        } : undefined,
      },
      include: { imagens: true, categoria: true },
    });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    await this.prisma.produto.findUniqueOrThrow({ where: { id } });

    if (data.imagens) {
      await this.prisma.imagem.deleteMany({ where: { produtoId: id } });
    }

    return this.prisma.produto.update({
      where: { id },
      data: {
        nome: data.nome,
        slug: data.slug,
        descricao: data.descricao,
        destaque: data.destaque,
        categoriaId: data.categoriaId,
        subcategoria: data.subcategoria,
        padronizado: data.padronizado,
        preco_min: data.preco_min != null ? parseFloat(data.preco_min) : null,
        status: data.status,
        imagens: data.imagens ? {
          create: data.imagens.map((img: any, i: number) => ({
            url: img.url,
            alt: img.alt,
            ordem: i,
          })),
        } : undefined,
      },
      include: { imagens: true, categoria: true },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.prisma.produto.delete({ where: { id } });
    return { ok: true };
  }
}
