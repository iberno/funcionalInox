import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin - Categorias')
@Controller('admin/categorias')
export class AdminCategoriasController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async list() {
    return this.prisma.categoria.findMany({
      include: { _count: { select: { produtos: true } } },
      orderBy: { ordem: 'asc' },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.prisma.categoria.findUniqueOrThrow({ where: { id } });
  }

  @Post()
  async create(@Body() data: any) {
    return this.prisma.categoria.create({ data });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.prisma.categoria.update({ where: { id }, data });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.prisma.categoria.delete({ where: { id } });
    return { ok: true };
  }
}
