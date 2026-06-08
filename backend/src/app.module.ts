import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ProjetosModule } from './modules/projetos/projetos.module';
import { OrcamentoModule } from './modules/orcamento/orcamento.module';
import { ContatoModule } from './modules/contato/contato.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    PrismaModule,
    ProdutosModule,
    CategoriasModule,
    ProjetosModule,
    OrcamentoModule,
    ContatoModule,
    AuthModule,
    AdminModule,
  ],
})
export class AppModule {}
