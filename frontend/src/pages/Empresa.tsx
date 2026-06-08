import { Helmet } from 'react-helmet-async'
import { Shield, Award, Building2, Factory } from 'lucide-react'

export default function Empresa() {
  return (
    <>
      <Helmet>
        <title>Empresa — Funcional Inox</title>
        <meta name="description" content="Conheça a história da Funcional Inox, fabricante de móveis e equipamentos em aço inoxidável em Curitiba/PR." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Nossa História</p>
            <h1 className="text-4xl font-bold text-inox-900">Sobre a Funcional Inox</h1>
          </div>

          <div className="prose prose-lg max-w-none text-inox-600 mb-16">
            <p className="lead text-xl text-inox-700">
              Há mais de 15 anos fabricando móveis e equipamentos em aço inoxidável com qualidade, precisão e compromisso.
            </p>
            <p>
              Localizada em Curitiba/PR, a Funcional Inox nasceu da experiência de profissionais que identificaram a necessidade
              de móveis e equipamentos em aço inox com alto padrão de qualidade, durabilidade e custo competitivo.
            </p>
            <p>
              Ao longo dos anos, atendemos centenas de clientes em todo o Brasil, entregando projetos que vão desde
              pequenos consultórios veterinários até grandes hospitais e cozinhas industriais.
            </p>
            <p>
              Nosso processo produtivo utiliza aço inoxidável AISI 304 e 430, com acabamento escovado ou polido,
              garantindo resistência à corrosão, facilidade de limpeza e conformidade com as normas da ANVISA.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-50 rounded-2xl p-8">
              <Building2 className="w-10 h-10 text-brand-600 mb-4" />
              <h3 className="text-xl font-bold text-inox-900 mb-3">Missão</h3>
              <p className="text-inox-600">Oferecer soluções em aço inoxidável que unam qualidade, durabilidade e design funcional para nossos clientes.</p>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8">
              <Award className="w-10 h-10 text-brand-600 mb-4" />
              <h3 className="text-xl font-bold text-inox-900 mb-3">Visão</h3>
              <p className="text-inox-600">Ser referência nacional em fabricação de equipamentos em aço inox para os segmentos de saúde, alimentação e veterinária.</p>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8">
              <Shield className="w-10 h-10 text-brand-600 mb-4" />
              <h3 className="text-xl font-bold text-inox-900 mb-3">Valores</h3>
              <p className="text-inox-600">Qualidade, honestidade, inovação, respeito ao cliente e compromisso com prazos e entregas.</p>
            </div>
            <div className="bg-brand-50 rounded-2xl p-8">
              <Factory className="w-10 h-10 text-brand-600 mb-4" />
              <h3 className="text-xl font-bold text-inox-900 mb-3">Estrutura</h3>
              <p className="text-inox-600">Fábrica própria equipada com maquinário moderno para corte, dobra e solda em aço inoxidável.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
