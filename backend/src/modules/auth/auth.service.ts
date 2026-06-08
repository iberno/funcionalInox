import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(username: string, password: string) {
    const admin = await this.prisma.admin.findUnique({ where: { username } });

    if (admin) {
      const valid = await bcrypt.compare(password, admin.password);
      if (!valid) throw new UnauthorizedException('Credenciais inválidas');
      const payload = { username: admin.username, sub: admin.id };
      return {
        access_token: this.jwtService.sign(payload),
        user: { id: admin.id, username: admin.username, nome: admin.nome, avatarUrl: admin.avatarUrl },
      };
    }

    const adminUser = process.env.ADMIN_USERNAME || 'admin';
    const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
    if (username !== adminUser || password !== adminPass) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { username, sub: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: 'admin', username, nome: 'Administrador', avatarUrl: null },
    };
  }
}
