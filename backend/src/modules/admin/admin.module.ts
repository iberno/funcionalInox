import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminProdutosController } from './admin-produtos.controller';
import { AdminCategoriasController } from './admin-categorias.controller';
import { AdminProjetosController } from './admin-projetos.controller';
import { AdminOrcamentosController } from './admin-orcamentos.controller';
import { AdminContatosController } from './admin-contatos.controller';
import { AdminProfileController } from './admin-profile.controller';
import { AdminUploadController } from './admin-upload.controller';

@Module({
  imports: [AuthModule],
  controllers: [
    AdminProdutosController,
    AdminCategoriasController,
    AdminProjetosController,
    AdminOrcamentosController,
    AdminContatosController,
    AdminProfileController,
    AdminUploadController,
  ],
})
export class AdminModule {}
