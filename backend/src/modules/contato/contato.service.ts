import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContatoDto } from './dto/contato.dto';

@Injectable()
export class ContatoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateContatoDto) {
    return this.prisma.contato.create({ data: dto });
  }
}
