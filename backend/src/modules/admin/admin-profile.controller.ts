import { Controller, Get, Put, Post, Body, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from '../../prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Admin - Perfil')
@Controller('admin/profile')
export class AdminProfileController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async get(@Req() req: any) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: req.user.userId },
      select: { id: true, username: true, nome: true, avatarUrl: true, createdAt: true },
    });
    if (!admin) {
      return { id: 'admin', username: req.user.username, nome: 'Administrador', avatarUrl: null };
    }
    return admin;
  }

  @Put()
  async update(@Req() req: any, @Body() data: { nome?: string }) {
    if (req.user.userId === 'admin') return { error: 'Admin padrão não pode ser editado' };
    return this.prisma.admin.update({
      where: { id: req.user.userId },
      data: { nome: data.nome },
      select: { id: true, username: true, nome: true, avatarUrl: true },
    });
  }

  @Put('password')
  async changePassword(@Req() req: any, @Body() data: { currentPassword: string; newPassword: string }) {
    if (req.user.userId === 'admin') {
      const envPass = process.env.ADMIN_PASSWORD || 'admin123';
      if (data.currentPassword !== envPass) throw new Error('Senha atual inválida');
      const hashed = await bcrypt.hash(data.newPassword, 10);
      const existing = await this.prisma.admin.findUnique({ where: { username: req.user.username } });
      if (existing) {
        await this.prisma.admin.update({ where: { id: existing.id }, data: { password: hashed } });
      } else {
        await this.prisma.admin.create({ data: { username: req.user.username, password: hashed } });
      }
      return { message: 'Senha alterada com sucesso' };
    }
    const admin = await this.prisma.admin.findUnique({ where: { id: req.user.userId } });
    if (!admin) throw new Error('Admin não encontrado');
    const valid = await bcrypt.compare(data.currentPassword, admin.password);
    if (!valid) throw new Error('Senha atual inválida');
    const hashed = await bcrypt.hash(data.newPassword, 10);
    await this.prisma.admin.update({ where: { id: req.user.userId }, data: { password: hashed } });
    return { message: 'Senha alterada com sucesso' };
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads', 'avatars'),
        filename: (_req, file, cb) => {
          const name = `admin-${Date.now()}${extname(file.originalname)}`;
          cb(null, name);
        },
      }),
      limits: { fileSize: 2 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          cb(new Error('Apenas imagens são permitidas'), false);
          return;
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new Error('Arquivo não enviado');
    const avatarUrl = `/uploads/avatars/${file.filename}`;
    if (req.user.userId === 'admin') {
      const existing = await this.prisma.admin.findUnique({ where: { username: req.user.username } });
      if (existing) {
        await this.prisma.admin.update({ where: { id: existing.id }, data: { avatarUrl } });
      } else {
        await this.prisma.admin.create({ data: { username: req.user.username, password: '', avatarUrl } });
      }
    } else {
      await this.prisma.admin.update({ where: { id: req.user.userId }, data: { avatarUrl } });
    }
    return { avatarUrl };
  }
}
