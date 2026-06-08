import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.categoria.findMany({
      orderBy: { ordem: 'asc' },
      include: { _count: { select: { produtos: true } } },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.categoria.findUnique({
      where: { slug: slug as any },
      include: {
        produtos: {
          where: { status: true },
          include: { imagens: { orderBy: { ordem: 'asc' } } },
        },
      },
    });
  }
}
