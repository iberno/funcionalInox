import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getProduto } from '../services/api'
import { FileText, ArrowLeft, Check } from 'lucide-react'
import { imageUrl, placeholderUrl } from '../utils'
import type { Produto } from '../types'

export default function ProdutoDetalhe() {
  const { slug } = useParams<{ slug: string }>()
  const { data: produto, isLoading } = useQuery<Produto>({
    queryKey: ['produto', slug],
    queryFn: () => getProduto(slug!),
    enabled: !!slug,
  })

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    )
  }

  if (!produto) {
    return (
      <div className="py-20 text-center text-inox-500">
        Produto não encontrado.
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{produto.nome} — Funcional Inox</title>
        <meta name="description" content={produto.destaque || produto.descricao.slice(0, 160)} />
      </Helmet>

      <section className="py-12 bg-inox-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/produtos" className="inline-flex items-center gap-2 text-inox-500 hover:text-brand-600 font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao catálogo
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-inox-100">
                <img
                  src={imageUrl(produto.imagens?.[0]?.url, placeholderUrl(produto.categoria?.slug))}
                  alt={produto.imagens?.[0]?.alt || produto.nome}
                  className="w-full h-full object-cover"
                />
              </div>
              {produto.imagens && produto.imagens.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {produto.imagens.slice(1).map((img) => (
                    <div key={img.id} className="aspect-square rounded-lg overflow-hidden bg-inox-100">
                      <img src={imageUrl(img.url)} alt={img.alt || produto.nome} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                produto.padronizado ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
              }`}>
                {produto.padronizado ? 'Produto Padronizado' : 'Sob Medida'}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-inox-900 mb-4">{produto.nome}</h1>
              <p className="text-brand-600 font-medium mb-6">{produto.categoria.nome}</p>

              <p className="text-inox-600 leading-relaxed mb-8">{produto.descricao}</p>

              {produto.destaque && (
                <div className="bg-brand-50 rounded-xl p-5 mb-8">
                  <p className="text-brand-800 font-medium mb-2">Diferenciais</p>
                  <div className="flex flex-wrap gap-2">
                    {produto.destaque.split('·').map((item, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-sm text-brand-700">
                        <Check className="w-3.5 h-3.5 text-brand-500" />
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {produto.preco_min && (
                <p className="text-inox-500 text-sm mb-6">
                  A partir de <span className="text-2xl font-bold text-inox-900">
                    R$ {produto.preco_min.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </p>
              )}

              <Link
                to="/orcamento"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all shadow-lg shadow-brand-600/25"
              >
                <FileText className="w-5 h-5" />
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
