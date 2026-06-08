import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjetosService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoria?: string) {
    const where: any = {};
    if (categoria) {
      where.categoria = { slug: categoria as any };
    }
    return this.prisma.projeto.findMany({
      where,
      include: { categoria: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.projeto.findUnique({
      where: { id },
      include: {
        categoria: true,
        produtos: { include: { produto: { include: { imagens: true } } } },
      },
    });
  }
}
