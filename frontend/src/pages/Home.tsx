import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Shield, Star, Ruler, Users } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getProdutos, getCategorias, getProjetos } from '../services/api'
import type { Produto, Categoria, Projeto } from '../types'

const diferenciais = [
  { icon: Shield, title: 'Certificação ANVISA', desc: 'Produtos em conformidade com as normas da ANVISA para ambientes de saúde.' },
  { icon: Star, title: 'Aço Inox 304', desc: 'Aço inoxidável AISI 304/430 de alta qualidade, resistência e durabilidade.' },
  { icon: Ruler, title: 'Sob Medida', desc: 'Projetos customizados para atender exatamente as necessidades do seu espaço.' },
  { icon: Users, title: 'Equipe Especializada', desc: 'Mais de 15 anos de experiência em projetos especiais em aço inoxidável.' },
]

export default function Home() {
  const { data: categorias } = useQuery<Categoria[]>({ queryKey: ['categorias'], queryFn: getCategorias })
  const { data: produtos } = useQuery<Produto[]>({ queryKey: ['produtos'], queryFn: () => getProdutos() })
  const { data: projetos } = useQuery<Projeto[]>({ queryKey: ['projetos'], queryFn: () => getProjetos() })

  return (
    <>
      <Helmet>
        <title>Funcional Inox — Móveis e Equipamentos em Aço Inoxidável</title>
        <meta name="description" content="Fabricação de móveis e equipamentos em aço inox sob medida para hospitais, clínicas veterinárias e cozinhas industriais. Qualidade e tradição em Curitiba." />
      </Helmet>

      {/* Hero */}
      <section className="relative bg-inox-900 min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-inox-900 via-inox-950 to-inox-800" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-inox-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-inox-200 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-white/10">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Fabricação própria · Curitiba/PR
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              Móveis e equipamentos<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-brand-500">
                em aço inoxidável
              </span>
            </h1>

            <p className="text-lg md:text-xl text-inox-300 max-w-2xl mb-10 leading-relaxed">
              Soluções sob medida para hospitais, clínicas veterinárias e cozinhas profissionais.
              Qualidade, durabilidade e higiene que seu negócio merece.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/produtos"
                className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-brand-600/25 inline-flex items-center gap-3"
              >
                Ver Produtos
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/5541999317247"
                target="_blank"
                rel="noreferrer"
                className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-lg transition-all inline-flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-3xl font-bold text-white">15+</p>
                <p className="text-sm text-inox-400 mt-1">Anos de mercado</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-inox-400 mt-1">Projetos entregues</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-sm text-inox-400 mt-1">Clientes satisfeitos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section className="py-24 bg-inox-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Nossas Linhas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-inox-900">Soluções em aço inox para todos os segmentos</h2>
            <p className="text-inox-500 mt-4 max-w-2xl mx-auto text-lg">
              Cada linha é desenvolvida com materiais de altíssima qualidade, acabamento premium e em conformidade com as normas da ANVISA.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categorias?.map((cat) => (
              <Link
                key={cat.id}
                to={`/${cat.slug.toLowerCase()}`}
                className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`aspect-[4/3] relative overflow-hidden ${
                  cat.slug === 'HOSPITALAR' ? 'bg-gradient-to-br from-inox-800 to-inox-900' :
                  cat.slug === 'VETERINARIA' ? 'bg-gradient-to-br from-emerald-800 to-emerald-900' :
                  'bg-gradient-to-br from-amber-800 to-amber-900'
                }`}>
                  {cat.imagemUrl && <img src={cat.imagemUrl} alt={cat.nome} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Linha</p>
                    <h3 className="text-white text-2xl font-bold mt-1">{cat.nome}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-inox-600 mb-4">{cat.descricao}</p>
                  <span className="text-brand-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                    Explorar linha
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Por que escolher a Funcional Inox</p>
            <h2 className="text-3xl md:text-4xl font-bold text-inox-900">Qualidade que faz a diferença</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {diferenciais.map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-8 h-8 text-brand-600" />
                </div>
                <h3 className="text-lg font-bold text-inox-900 mb-2">{item.title}</h3>
                <p className="text-inox-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="py-24 bg-inox-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Catálogo</p>
              <h2 className="text-3xl md:text-4xl font-bold text-inox-900">Produtos em destaque</h2>
            </div>
            <Link to="/produtos" className="mt-6 md:mt-0 text-brand-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtos?.slice(0, 4).map((produto) => (
              <Link
                key={produto.id}
                to={`/produtos/${produto.slug}`}
                className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 relative flex items-center justify-center overflow-hidden">
                  {produto.imagens?.[0] ? (
                    <img src={produto.imagens[0].url} alt={produto.imagens[0].alt || produto.nome} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-inox-400 text-sm">Sem imagem</span>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      produto.padronizado
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {produto.padronizado ? 'Padronizado' : 'Sob Medida'}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs text-brand-600 font-semibold uppercase tracking-wider mb-1">{produto.categoria.nome}</p>
                  <h3 className="font-bold text-inox-900 mb-2">{produto.nome}</h3>
                  <p className="text-sm text-inox-500 mb-4 line-clamp-2">{produto.destaque || produto.descricao}</p>
                  <span className="w-full inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm py-2.5 px-4 rounded-lg transition-all">
                    Solicitar Orçamento
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Portfólio</p>
            <h2 className="text-3xl md:text-4xl font-bold text-inox-900">Projetos realizados</h2>
            <p className="text-inox-500 mt-4 max-w-2xl mx-auto">Conheça alguns dos projetos que entregamos para clientes em todo o Brasil.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projetos?.filter(p => p.destaque).slice(0, 3).map((projeto) => (
              <div
                key={projeto.id}
                className="aspect-[4/3] bg-inox-800 rounded-2xl cursor-pointer relative overflow-hidden group shadow-sm hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-brand-300 text-sm font-medium">{projeto.categoria.nome}</p>
                  <h3 className="text-white text-xl font-bold mt-1">{projeto.titulo}</h3>
                  <p className="text-inox-300 text-sm mt-1 line-clamp-1">{projeto.cliente}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 border-2 border-inox-900 text-inox-900 hover:bg-inox-900 hover:text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Ver Todos os Projetos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-inox-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
        />
        <div className="relative max-w-3xl mx-auto text-center px-4">
          <p className="text-brand-400 font-semibold text-sm tracking-widest uppercase mb-4">Solicite seu Orçamento</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Vamos construir seu projeto em aço inoxidável</h2>
          <p className="text-inox-300 text-lg mb-10">
            Conte com a gente para criar móveis e equipamentos sob medida para seu negócio. Orçamento sem compromisso.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/orcamento"
              className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg shadow-brand-600/25 inline-flex items-center gap-3"
            >
              Solicitar Orçamento
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://wa.me/5541999317247"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-lg inline-flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
