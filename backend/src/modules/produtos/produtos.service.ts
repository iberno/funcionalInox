import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProdutoDto, UpdateProdutoDto, QueryProdutosDto } from './dto/produtos.dto';

@Injectable()
export class ProdutosService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryProdutosDto) {
    const where: any = { status: true };

    if (query.categoria) {
      where.categoria = { slug: query.categoria };
    }
    if (query.subcategoria) {
      where.subcategoria = query.subcategoria;
    }

    return this.prisma.produto.findMany({
      where,
      include: { imagens: { orderBy: { ordem: 'asc' } }, categoria: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.produto.findUnique({
      where: { slug },
      include: {
        imagens: { orderBy: { ordem: 'asc' } },
        categoria: true,
        projetos: { include: { projeto: true } },
      },
    });
  }

  async create(dto: CreateProdutoDto) {
    return this.prisma.produto.create({
      data: dto,
      include: { imagens: true, categoria: true },
    });
  }

  async update(id: string, dto: UpdateProdutoDto) {
    return this.prisma.produto.update({
      where: { id },
      data: dto,
      include: { imagens: true, categoria: true },
    });
  }

  async remove(id: string) {
    return this.prisma.produto.update({
      where: { id },
      data: { status: false },
    });
  }
}
