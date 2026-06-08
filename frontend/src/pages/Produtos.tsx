import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getProdutos, getCategorias } from '../services/api'
import type { Produto, Categoria } from '../types'
export default function Produtos() {
  const [filtro, setFiltro] = useState<string | null>(null)
  const { data: categorias } = useQuery<Categoria[]>({ queryKey: ['categorias'], queryFn: getCategorias })
  const { data: produtos } = useQuery<Produto[]>({
    queryKey: ['produtos', filtro],
    queryFn: () => getProdutos(filtro || undefined),
  })

  return (
    <>
      <Helmet>
        <title>Produtos em Aço Inox — Funcional Inox</title>
        <meta name="description" content="Conheça nossa linha completa de produtos em aço inoxidável para hospitais, clínicas veterinárias e cozinhas industriais." />
      </Helmet>

      <section className="py-20 bg-inox-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Catálogo</p>
            <h1 className="text-4xl font-bold text-inox-900">Todos os Produtos</h1>
            <p className="text-inox-500 mt-4 max-w-2xl mx-auto">
              Equipamentos profissionais em aço inoxidável para todos os segmentos.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setFiltro(null)}
              className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                !filtro ? 'bg-brand-600 text-white' : 'bg-white text-inox-600 hover:bg-inox-100 border border-inox-200'
              }`}
            >
              Todos
            </button>
            {categorias?.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setFiltro(cat.slug)}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
                  filtro === cat.slug ? 'bg-brand-600 text-white' : 'bg-white text-inox-600 hover:bg-inox-100 border border-inox-200'
                }`}
              >
                {cat.nome}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {produtos?.map((produto) => (
              <Link
                key={produto.id}
                to={`/produtos/${produto.slug}`}
                className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 relative flex items-center justify-center overflow-hidden">
                  {produto.imagens?.[0] ? (
                    <img src={produto.imagens[0].url} alt={produto.imagens[0].alt || produto.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <span className="text-inox-400 text-sm">Sem imagem</span>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      produto.padronizado ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
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
    </>
  )
}
