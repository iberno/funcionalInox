import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getCategoria } from '../services/api'
import { imageUrl } from '../utils'

const labels: Record<string, { title: string; desc: string }> = {
  HOSPITALAR: {
    title: 'Linha Hospitalar',
    desc: 'Equipamentos hospitalares em aço inoxidável, desenvolvidos com ergonomia e acabamento perfeito para ambientes de saúde.',
  },
  VETERINARIA: {
    title: 'Linha Veterinária',
    desc: 'Móveis e equipamentos em aço inox para hospitais e clínicas veterinárias. Qualidade e durabilidade para o cuidado animal.',
  },
  COZINHA: {
    title: 'Linha Cozinha',
    desc: 'Cozinhas industriais totalmente customizadas e sob medida. Coifas, bancadas, pias e estantes em aço inox.',
  },
}

export default function CategoriaPage({ slug }: { slug: string }) {
  const { data: categoria } = useQuery({
    queryKey: ['categoria', slug],
    queryFn: () => getCategoria(slug),
  })

  const info = labels[slug] || { title: slug, desc: '' }

  return (
    <>
      <Helmet>
        <title>{info.title} — Funcional Inox</title>
        <meta name="description" content={info.desc} />
      </Helmet>

      <section className={`py-20 ${categoria?.imagemUrl ? 'relative' : 'bg-inox-50/50'}`}>
        {categoria?.imagemUrl && (
          <div className="absolute inset-0">
            <img src={imageUrl(categoria.imagemUrl)} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-white/80" />
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">{info.title}</p>
            <h1 className="text-4xl font-bold text-inox-900">{info.title}</h1>
            <p className="text-inox-500 mt-4 max-w-2xl mx-auto">{info.desc}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoria?.produtos?.map((produto: any) => (
              <Link
                key={produto.id}
                to={`/produtos/${produto.slug}`}
                className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 relative flex items-center justify-center overflow-hidden">
                  {produto.imagens?.[0] ? (
                    <img src={imageUrl(produto.imagens[0].url)} alt={produto.imagens[0].alt || produto.nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
