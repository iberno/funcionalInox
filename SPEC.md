# Funcional Inox — Planejamento (Spec) de Modernização

## 1. Resumo do Negócio

**Funcional Inox** é uma fábrica de móveis e equipamentos em aço inoxidável sob medida em Curitiba/PR, com 3 linhas principais:

| Linha | Produtos |
|---|---|
| **Hospitalar** | Lavatórios cirúrgicos, mesas de instrumentação, expurgos, carro-cuba, bancadas |
| **Veterinária** | Mesas cirúrgicas veterinárias, mesas de atendimento, canis modulares, banho e tosa, bebedouros |
| **Cozinha** | Coifas, bancadas, pias, estantes para cozinhas industriais |

> **Modelo:** Linha padronizada + sob medida → Catálogo profissional com solicitação de orçamento

---

## 2. Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| **Frontend** | React 18 + Vite + TypeScript (SPA) |
| **Estilo** | Tailwind CSS + shadcn/ui (Radix primitives) |
| **Backend/API** | NestJS + TypeScript |
| **Banco de Dados** | PostgreSQL (via Prisma ORM) |
| **Autenticação** | Passport (JWT) + Google OAuth2 |
| **Mídia** | Cloudinary (imagens otimizadas) |
| **Formulários** | React Hook Form + Zod (validação) |
| **Pagamento** | Stripe / Asaas (para produtos padronizados futuros) |
| **Deploy** | Backend: Render/Railway · Frontend: Vercel/Netlify |
| **Email** | Nodemailer + SMTP / Resend |

---

## 3. Arquitetura do Projeto

```                   
funcionalinox/
│
├── backend/                # NestJS API
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── common/         # Guards, filters, decorators, pipes
│   │   │   ├── guards/
│   │   │   ├── decorators/
│   │   │   └── filters/
│   │   ├── modules/
│   │   │   ├── produtos/   # CRUD + filtros
│   │   │   ├── projetos/   # Portfólio
│   │   │   ├── categorias/
│   │   │   ├── orcamento/  # Leads de orçamento
│   │   │   ├── contato/    # Formulário de contato
│   │   │   ├── upload/     # Upload de arquivos
│   │   │   └── auth/       # Admin JWT
│   │   └── prisma/
│   │       ├── prisma.module.ts
│   │       └── prisma.service.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── uploads/            # Arquivos enviados
│
├── frontend/               # React Vite SPA
│   ├── src/
│   │   ├── App.tsx
│   │   ├── routes.tsx      # React Router
│   │   ├── components/
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── layout/     # Header, Footer, Sidebar
│   │   │   └── sections/   # Hero, Cards, Galeria
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Produtos.tsx
│   │   │   ├── ProdutoDetalhe.tsx
│   │   │   ├── Hospitalar.tsx
│   │   │   ├── Veterinaria.tsx
│   │   │   ├── Cozinha.tsx
│   │   │   ├── Projetos.tsx
│   │   │   ├── Empresa.tsx
│   │   │   ├── Contato.tsx
│   │   │   └── Orcamento.tsx
│   │   ├── services/       # API client (axios)
│   │   │   └── api.ts
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utils, constants
│   │   └── types/          # TypeScript interfaces
│   └── public/
│       └── images/
│
└── SPEC.md
```

> **Nota sobre SEO:** Por ser SPA, usaremos `react-helmet-async` para meta tags dinâmicas e prerenderização via Vite Plugin (`vite-plugin-prerender`) ou serviço externo ( prerender.io ) para páginas de produtos e projetos.

---

## 4. Modelagem de Dados (Prisma)

```prisma
enum ProdutoStatus {
  ATIVO
  INATIVO
}

enum Categoria {
  HOSPITALAR
  VETERINARIA
  COZINHA
}

model Produto {
  id          String        @id @default(cuid())
  nome        String
  slug        String        @unique
  descricao   String        @db.Text
  destaque    String?       @db.Text       // Frase de chamada
  categoria   Categoria
  subcategoria String?                      // ex: "Mesas", "Lavatórios"
  padronizado Boolean       @default(false) // true = tem dimensões fixas
  preco_min   Float?                        // preço base para padronizados
  imagens     Imagem[]
  projetos    Projeto[]
  status      ProdutoStatus @default(ATIVO)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Imagem {
  id        String  @id @default(cuid())
  url       String
  alt       String?
  ordem     Int     @default(0)
  produto   Produto @relation(fields: [produtoId], references: [id], onDelete: Cascade)
  produtoId String
}

model Projeto {
  id          String       @id @default(cuid())
  titulo      String
  descricao   String       @db.Text
  cliente     String?
  imagens     String[]     // URLs das fotos do projeto
  destaque    Boolean      @default(false)
  categoria   Categoria
  produtos    Produto[]
  createdAt   DateTime     @default(now())
}

model LeadOrcamento {
  id          String   @id @default(cuid())
  nome        String
  email       String
  telefone    String
  empresa     String?
  mensagem    String   @db.Text
  produtos    String?  // JSON com IDs e quantidades
  arquivo_url String?  // Upload de projeto
  lido        Boolean  @default(false)
  createdAt   DateTime @default(now())
}

model Contato {
  id        String   @id @default(cuid())
  nome      String
  email     String
  assunto   String
  mensagem  String   @db.Text
  lido      Boolean  @default(false)
  createdAt DateTime @default(now())
}
```

---

## 5. Design System & UI/UX

### 5.1 Identidade Visual Proposta

- **Paleta:** Inox (prata, cinza escuro #1a1a1a, branco #fff, azul hospitalar #2563eb como accent)
- **Tipografia:** Inter (headings), Roboto (corpo) — google fonts
- **Estilo:** Clean, industrial, profissional. Fundo branco com fotos em alta resolução em destaque. Cards com bordas sutis.
- **Micro-interações:** Hover suave, transições fade/slide, skeleton loading
- **Responsivo:** Mobile-first, fotos adaptáveis

### 5.2 Estrutura de Navegação

```
[Logo]  Home | Empresa | Produtos ▼ | Projetos | Contato | [Orçamento CTA]
                           ├── Hospitalar
                           ├── Veterinária
                           └── Cozinha
```

### 5.3 Páginas

#### **Home**
- Hero com vídeo/foto de fundo + CTA "Solicite Orçamento"
- Grid das 3 categorias com imagem e chamada
- Diferenciais: durabilidade, higiene, sob medida, certificação
- Projetos em destaque (carrossel)
- Selos de qualidade / certificações
- Footer com dados, endereço, WhatsApp, formulário rápido

#### **Produtos (Catálogo)**
- Grid filtrável por categoria (Hospitalar, Veterinária, Cozinha)
- Subcategorias como tabs
- Cada card: imagem, nome, descrição curta, badge "Padronizado" ou "Sob Medida", botão "Solicitar Orçamento"
- Página individual do produto: galeria de fotos, descrição detalhada, dimensões, aplicações, botão de orçamento

#### **Orçamento**
- Formulário multi-etapas:
  1. Selecione produtos e quantidades
  2. Dimensões / customizações (texto livre)
  3. Dados de contato
  4. Upload de projeto/modelo (opcional)
  5. Confirmação e envio
- Notificação por email para a empresa + confirmação para o cliente

#### **Empresa**
- História, missão, equipe, estrutura fabril
- Fotos da fábrica e processo produtivo

#### **Projetos**
- Portfólio de projetos realizados (galeria com filtro por categoria)
- Cada projeto: descrição, fotos, desafio, solução

#### **Contato**
- Formulário de contato + WhatsApp click-to-chat + mapa + dados

---

## 6. API (NestJS)

### 6.1 Estrutura de Módulos

```
src/modules/
├── produtos/
│   ├── produtos.module.ts
│   ├── produtos.controller.ts    # GET /produtos, GET /produtos/:slug
│   ├── produtos.service.ts
│   └── dto/                      # CreateProdutoDto, UpdateProdutoDto
├── projetos/
│   ├── projetos.module.ts
│   ├── projetos.controller.ts    # GET /projetos, GET /projetos/:id
│   └── projetos.service.ts
├── categorias/
│   ├── categorias.module.ts
│   ├── categorias.controller.ts  # GET /categorias
│   └── categorias.service.ts
├── orcamento/
│   ├── orcamento.module.ts
│   ├── orcamento.controller.ts   # POST /orcamento
│   ├── orcamento.service.ts      # Envio de email + salvar lead
│   └── dto/                      # CreateOrcamentoDto
├── contato/
│   ├── contato.module.ts
│   ├── contato.controller.ts     # POST /contato
│   └── contato.service.ts
├── upload/
│   ├── upload.module.ts
│   ├── upload.controller.ts      # POST /upload (multipart)
│   └── providers/                # Multer config, Cloudinary
└── auth/
    ├── auth.module.ts
    ├── auth.controller.ts        # POST /auth/login, POST /auth/google
    ├── auth.service.ts
    ├── strategies/               # JwtStrategy, GoogleStrategy
    └── guards/                   # JwtAuthGuard, RolesGuard
```

### 6.2 Endpoints

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/v1/produtos` | Listar produtos (query: categoria, subcategoria) | — |
| GET | `/api/v1/produtos/:slug` | Detalhe do produto com imagens | — |
| GET | `/api/v1/categorias` | Listar categorias | — |
| GET | `/api/v1/projetos` | Listar projetos (query: categoria) | — |
| GET | `/api/v1/projetos/:id` | Detalhe do projeto | — |
| POST | `/api/v1/orcamento` | Enviar solicitação de orçamento | — |
| POST | `/api/v1/contato` | Enviar formulário de contato | — |
| POST | `/api/v1/upload` | Upload de arquivo (projeto/modelo) | — |
| POST | `/api/v1/auth/login` | Login admin (JWT) | — |
| POST | `/api/v1/auth/google` | Login admin via Google | — |
| GET | `/api/v1/admin/produtos` | CRUD produtos | JWT |
| GET | `/api/v1/admin/orcamentos` | Listar leads | JWT |

### 6.3 Segurança

- **Helmet** — headers de segurança
- **CORS** — origens permitidas (frontend)
- **Rate limiting** — `@nestjs/throttler` nas rotas POST (10 req/min)
- **Validação** — `class-validator` + `class-transformer` + DTOs
- **Autenticação** — Passport JWT + Google OAuth2
- **Autorização** — Guards por role
- **Upload** — extensões permitidas (pdf, jpg, png, dwg), tamanho máx 10MB
- **Sanitização** — `helmet` + validação de entrada em todos os DTOs

---

## 7. Conteúdo SEO & Copywriting

### 7.1 Estratégia de Conteúdo

| Página | Palavra-chave Principal | Intenção |
|---|---|---|
| Home | móveis em aço inox Curitiba | Informativa / Comercial |
| Hospitalar | lavatório cirúrgico inox | Comercial |
| Veterinária | mesa cirúrgica veterinária inox | Comercial |
| Cozinha | coifa aço inox cozinha industrial | Comercial |
| Projetos | projetos em inox sob medida | Navegação |

### 7.2 Melhorias de Conteúdo

- [x] Substituir textos genéricos por descrições técnicas reais (bitola do aço, tipo de acabamento, normas ANVISA)
- [x] Adicionar dados técnicos: espessura do inox (304/430), tipo de polimento, carga suportada
- [x] Criar descrições únicas para cada produto (sem duplicidade)
- [x] Adicionar metadados (title, description, og:image) por página
- [x] Schema.org JSON-LD (Product, LocalBusiness, Organization)
- [x] Remover keyword stuffing excessivo do footer e headings

### 7.3 Schema Markup

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Funcional Inox",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Elias Karam, 605",
    "addressLocality": "Curitiba",
    "addressRegion": "PR"
  },
  "telephone": "(41) 3082-2951",
  "url": "https://funcionalinox.com.br"
}
```

---

## 8. Performance

### Backend (NestJS)
- Compodoc para documentação
- Cache com @nestjs/cache-manager (Redis para GET /produtos)
- Compressão (compression middleware)
- PostgreSQL indexes nas colunas de busca (slug, categoria)

### Frontend (React Vite)
- Code splitting por página (React.lazy + Suspense)
- Imagens: lazy loading + blur placeholder + Cloudinary transforms
- Bundle analysis com vite-bundle-analyzer
- React.memo + useMemo em componentes pesados
- Skeleton loading em todas as páginas com dados assíncronos
- LCP < 2.5s, CLS < 0.1, FID < 50ms
- CDN via Vercel/Netlify Edge

---

## 9. Roadmap (Fases)

### Fase 1 — Backend MVP (Semanas 1–2)
- Setup NestJS + Prisma + PostgreSQL
- Módulos: Produtos, Categorias, Contato
- Seed do banco com dados atuais do WordPress
- CRUD da API (GET públicos)
- CORS + Helmet + Rate limiting
- Documentação Swagger (@nestjs/swagger)

### Fase 2 — Frontend MVP (Semanas 3–4)
- Setup Vite + React + Tailwind + shadcn/ui
- Design System: Header, Footer, Tipografia, Paleta
- Home page com Hero + Categorias + Diferenciais
- Catálogo de produtos consumindo API NestJS
- Páginas: Empresa, Contato (com formulário integrado)

### Fase 3 — Orçamento + Upload (Semanas 5–6)
- Módulo Orcamento no NestJS (POST + email)
- Módulo Upload (Cloudinary)
- Formulário multi-etapas no frontend:
  1. Seleção de produtos e quantidades
  2. Dimensões / customizações
  3. Dados de contato
  4. Upload de projeto/modelo
  5. Confirmação e envio
- Notificação por email (admin + cliente)

### Fase 4 — Conteúdo + SEO (Semanas 7–8)
- Fotografia profissional dos produtos e fábrica
- Redação de descrições técnicas otimizadas para SEO
- react-helmet-async para meta tags dinâmicas
- Prerender das páginas principais
- Schema.org JSON-LD (Product, LocalBusiness)
- Sitemap.xml gerado dinamicamente
- Remover keyword stuffing do conteúdo legado

### Fase 5 — Projetos + Auth Admin (Semanas 9–10)
- Módulo Projetos + Galeria no frontend
- Módulo Auth (JWT + Google OAuth2)
- Painel admin básico: listar leads, gerenciar produtos
- Depoimentos / cases de sucesso

### Fase 5 — E-commerce (Futuro)
- Checkout para produtos padronizados
- Gateway de pagamento (Stripe / Asaas Pix + Boleto)
- Frete (correios API)
- Painel admin completo (gerenciar pedidos, produtos)
- Área do cliente (acompanhamento de pedidos)

---

## 10. Estimativa

| Fase | Horas (dev) | Custo Estimado |
|---|---|---|
| Fase 1 — Backend MVP | 30–40h | — |
| Fase 2 — Frontend MVP | 40–50h | — |
| Fase 3 — Orçamento + Upload | 30–40h | — |
| Fase 4 — Conteúdo + SEO | 20–30h | — |
| Fase 5 — Projetos + Auth | 30–40h | — |
| **Total** | **150–200h** | — |

---

## 11. Próximos Passos

1. Validar este spec com a equipe
2. Definir identidade visual (logo refinado, paleta exata)
3. Coletar fotos profissionais dos produtos e fábrica
4. Setup do monorepo (backend/ + frontend/) + CI/CD
5. Iniciar Fase 1 — Backend NestJS

---

*Documento criado em 08/06/2026*
