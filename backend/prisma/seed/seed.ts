import { PrismaClient } from '../generated/prisma/client.js';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.projetoProduto.deleteMany();
  await prisma.imagem.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.projeto.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.leadOrcamento.deleteMany();
  await prisma.contato.deleteMany();

  // Create Categorias
  const hospitalar = await prisma.categoria.create({
    data: {
      nome: 'Hospitalar',
      slug: 'HOSPITALAR',
      descricao: 'Equipamentos hospitalares em aço inoxidável',
      ordem: 1,
    },
  });

  const veterinaria = await prisma.categoria.create({
    data: {
      nome: 'Veterinária',
      slug: 'VETERINARIA',
      descricao: 'Móveis e equipamentos veterinários em aço inox',
      ordem: 2,
    },
  });

  const cozinha = await prisma.categoria.create({
    data: {
      nome: 'Cozinha',
      slug: 'COZINHA',
      descricao: 'Cozinhas industriais e equipamentos em aço inox',
      ordem: 3,
    },
  });

  // Hospitalar
  await prisma.produto.create({
    data: {
      nome: 'Lavatório Cirúrgico',
      slug: 'lavatorio-cirurgico',
      descricao: 'Lavatório cirúrgico em aço inox AISI 304, com acionamento por sensor de presença ou pedal. Ideal para centros cirúrgicos e UTIs. Acabamento escovado, fácil limpeza e manutenção.',
      destaque: 'Acionamento por sensor ou pedal · Aço inox 304 · Conformidade ANVISA',
      categoriaId: hospitalar.id,
      subcategoria: 'Lavatórios',
      padronizado: true,
      preco_min: 2500,
      imagens: { create: [{ url: '/images/hospitalar/lavatorio-cirurgico.jpg', alt: 'Lavatório Cirúrgico em Inox', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Mesa de Instrumentação Cirúrgica',
      slug: 'mesa-instrumentacao-cirurgica',
      descricao: 'Mesa auxiliar para instrumentação cirúrgica em aço inox. Leve, resistente e com rodízios que garantem mobilidade durante o procedimento.',
      destaque: 'Rodízios silenciosos · Bandeja articulada · Aço inox 430',
      categoriaId: hospitalar.id,
      subcategoria: 'Mesas',
      padronizado: true,
      preco_min: 1800,
      imagens: { create: [{ url: '/images/hospitalar/mesa-instrumentacao.jpg', alt: 'Mesa de Instrumentação Cirúrgica', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Bancada Hospitalar com Cuba',
      slug: 'bancada-hospitalar-com-cuba',
      descricao: 'Bancada em aço inox com cuba embutida, ideal para expurgo e preparo de materiais. Sob medida conforme necessidade do cliente.',
      destaque: 'Sob medida · Cuba embutida · Aço inox 304',
      categoriaId: hospitalar.id,
      subcategoria: 'Bancadas',
      padronizado: false,
      imagens: { create: [{ url: '/images/hospitalar/bancada-com-cuba.jpg', alt: 'Bancada Hospitalar com Cuba', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Expurgo Hospitalar',
      slug: 'expurgo-hospitalar',
      descricao: 'Expurgo em aço inox para descontaminação de materiais hospitalares. Resistente a produtos químicos e altas temperaturas.',
      destaque: 'Resistente a químicos · Aço inox 304 · 4 baias',
      categoriaId: hospitalar.id,
      subcategoria: 'Expurgos',
      padronizado: true,
      preco_min: 3200,
      imagens: { create: [{ url: '/images/hospitalar/expurgo.jpg', alt: 'Expurgo Hospitalar', ordem: 0 }] },
    },
  });

  // Veterinária
  await prisma.produto.create({
    data: {
      nome: 'Mesa Cirúrgica Veterinária',
      slug: 'mesa-cirurgica-veterinaria',
      descricao: 'Mesa cirúrgica veterinária em aço inox com bandeja articulada, rodízios com trava e calha para drenagem. Ideal para clínicas e hospitais veterinários.',
      destaque: 'Bandeja articulada · Calha de drenagem · Rodízios com trava',
      categoriaId: veterinaria.id,
      subcategoria: 'Mesas',
      padronizado: true,
      preco_min: 2200,
      imagens: { create: [{ url: '/images/veterinaria/mesa-cirurgica.jpg', alt: 'Mesa Cirúrgica Veterinária', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Mesa de Atendimento Veterinário',
      slug: 'mesa-atendimento-veterinario',
      descricao: 'Mesa de atendimento em aço inox com balde embutido e vinco central. Superfície antiderrapante e fácil limpeza.',
      destaque: 'Balde embutido · Vinco central · Superfície antiderrapante',
      categoriaId: veterinaria.id,
      subcategoria: 'Mesas',
      padronizado: true,
      preco_min: 1900,
      imagens: { create: [{ url: '/images/veterinaria/mesa-atendimento.jpg', alt: 'Mesa de Atendimento Veterinário', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Canil Modular em Inox',
      slug: 'canil-modular-inox',
      descricao: 'Módulos para canil em aço inox, sistema de encaixe que permite expansão. Portas com trinco de segurança, bandeja removível para limpeza.',
      destaque: 'Sistema modular · Bandeja removível · Expansível',
      categoriaId: veterinaria.id,
      subcategoria: 'Canis',
      padronizado: false,
      imagens: { create: [{ url: '/images/veterinaria/canil-modular.jpg', alt: 'Canil Modular em Inox', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Bebedouro para Pets',
      slug: 'bebedouro-pets',
      descricao: 'Bebedouro individual e coletivo em aço inox para clínicas veterinárias. Acionamento automático e fácil higienização.',
      destaque: 'Automático · Individual ou coletivo · Fácil limpeza',
      categoriaId: veterinaria.id,
      subcategoria: 'Acessórios',
      padronizado: true,
      preco_min: 350,
      imagens: { create: [{ url: '/images/veterinaria/bebedouro.jpg', alt: 'Bebedouro para Pets', ordem: 0 }] },
    },
  });

  // Cozinha
  await prisma.produto.create({
    data: {
      nome: 'Coifa Industrial',
      slug: 'coifa-industrial',
      descricao: 'Coifa em aço inox para cozinhas industriais e restaurantes. Sistema de exaustão de alta capacidade, filtros removíveis e iluminação interna.',
      destaque: 'Alta capacidade · Filtros removíveis · Iluminação interna',
      categoriaId: cozinha.id,
      subcategoria: 'Coifas',
      padronizado: false,
      imagens: { create: [{ url: '/images/cozinha/coifa-industrial.jpg', alt: 'Coifa Industrial', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Bancada de Cozinha Industrial',
      slug: 'bancada-cozinha-industrial',
      descricao: 'Bancada em aço inox para cozinha industrial com cuba e estante inferior. Reforçada para suportar equipamentos pesados.',
      destaca: 'Reforçada · Com cuba · Estante inferior',
      categoriaId: cozinha.id,
      subcategoria: 'Bancadas',
      padronizado: true,
      preco_min: 2800,
      imagens: { create: [{ url: '/images/cozinha/bancada.jpg', alt: 'Bancada de Cozinha Industrial', ordem: 0 }] },
    },
  });

  await prisma.produto.create({
    data: {
      nome: 'Pia Industrial em Inox',
      slug: 'pia-industrial-inox',
      descricao: 'Pia industrial em aço inox com cuba profunda e torneira de alta pressão. Ideal para restaurantes, hospitais e indústrias.',
      destaque: 'Cuba profunda · Torneira alta pressão · Aço inox 304',
      categoriaId: cozinha.id,
      subcategoria: 'Pias',
      padronizado: true,
      preco_min: 1500,
      imagens: { create: [{ url: '/images/cozinha/pia-industrial.jpg', alt: 'Pia Industrial em Inox', ordem: 0 }] },
    },
  });

  // Projetos
  await prisma.projeto.create({
    data: {
      titulo: 'Sacolão Popular',
      descricao: 'Projeto completo de expositor, bancadas e estrados em aço inox para o Sacolão Popular. Qualidade, durabilidade e higiene em todas as peças.',
      cliente: 'Sacolão Popular',
      destaque: true,
      categoriaId: cozinha.id,
      imagens: ['/images/projetos/sacolao-1.jpg', '/images/projetos/sacolao-2.jpg'],
    },
  });

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
