import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import { getProjetos } from '../services/api'
import type { Projeto } from '../types'
export default function Projetos() {
  const { data: projetos } = useQuery<Projeto[]>({
    queryKey: ['projetos'],
    queryFn: () => getProjetos(),
  })

  return (
    <>
      <Helmet>
        <title>Projetos Realizados — Funcional Inox</title>
        <meta name="description" content="Conheça os projetos em aço inoxidável realizados pela Funcional Inox para clientes em todo o Brasil." />
      </Helmet>

      <section className="py-20 bg-inox-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Portfólio</p>
            <h1 className="text-4xl font-bold text-inox-900">Projetos Realizados</h1>
            <p className="text-inox-500 mt-4 max-w-2xl mx-auto">
              Conheça alguns dos projetos que entregamos para clientes em todo o Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projetos?.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-inox-800 rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-brand-300 text-sm font-medium">{projeto.categoria.nome}</p>
                    <h3 className="text-white text-xl font-bold mt-1">{projeto.titulo}</h3>
                    {projeto.cliente && (
                      <p className="text-inox-300 text-sm mt-1">{projeto.cliente}</p>
                    )}
                    <p className="text-inox-400 text-sm mt-2 line-clamp-2">{projeto.descricao}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
