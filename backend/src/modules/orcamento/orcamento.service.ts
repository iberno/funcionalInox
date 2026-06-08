import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrcamentoDto } from './dto/orcamento.dto';

@Injectable()
export class OrcamentoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrcamentoDto) {
    return this.prisma.leadOrcamento.create({ data: dto });
  }

  async findAll() {
    return this.prisma.leadOrcamento.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
