import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads' });

  const frontendDist = join(process.cwd(), '..', 'frontend', 'dist');
  app.useStaticAssets(frontendDist, { index: false });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Funcional Inox API')
    .setDescription('API da loja virtual Funcional Inox')
    .setVersion('1.0')
    .addTag('Produtos', 'Catálogo de produtos')
    .addTag('Categorias', 'Categorias de produtos')
    .addTag('Projetos', 'Portfólio de projetos')
    .addTag('Orçamento', 'Solicitações de orçamento')
    .addTag('Contato', 'Formulário de contato')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    const indexPath = join(frontendDist, 'index.html');
    if (fs.existsSync(indexPath)) res.sendFile(indexPath);
    else next();
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
