import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import { enviarOrcamento } from '../services/api'
import { FileText, CheckCircle } from 'lucide-react'

export default function Orcamento() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nome: '', email: '', telefone: '', empresa: '',
    mensagem: '', produtos: '',
  })
  const [sent, setSent] = useState(false)
  const mutation = useMutation({
    mutationFn: () => enviarOrcamento(form),
    onSuccess: () => {
      setSent(true)
    },
  })

  const update = (field: string, value: string) => setForm({ ...form, [field]: value })

  if (sent) {
    return (
      <section className="py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-inox-900 mb-4">Orçamento solicitado!</h1>
          <p className="text-inox-500">Recebemos sua solicitação e entraremos em contato em breve com uma proposta personalizada.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>Solicitar Orçamento — Funcional Inox</title>
        <meta name="description" content="Solicite seu orçamento personalizado para móveis e equipamentos em aço inoxidável." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Orçamento</p>
            <h1 className="text-4xl font-bold text-inox-900">Solicite seu Orçamento</h1>
            <p className="text-inox-500 mt-4">
              Preencha o formulário abaixo e receba uma proposta personalizada para seu projeto.
            </p>
          </div>

          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s ? 'bg-brand-600 text-white' : 'bg-inox-100 text-inox-400'
                }`}>
                  {s}
                </div>
                <span className={`text-sm hidden sm:inline ${step >= s ? 'text-brand-600 font-medium' : 'text-inox-400'}`}>
                  {s === 1 ? 'Produtos' : s === 2 ? 'Detalhes' : 'Contato'}
                </span>
                {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-brand-600' : 'bg-inox-200'}`} />}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-inox-100 p-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-inox-900">Quais produtos você precisa?</h2>
                <div>
                  <label className="block text-sm font-medium text-inox-700 mb-1">Descreva os produtos desejados</label>
                  <textarea
                    rows={4}
                    value={form.produtos}
                    onChange={(e) => update('produtos', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Ex: 1 lavatório cirúrgico, 2 mesas de instrumentação, 1 bancada hospitalar 2m x 0.6m..."
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.produtos}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all disabled:opacity-50"
                >
                  Continuar
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-inox-900">Detalhes do projeto</h2>
                <div>
                  <label className="block text-sm font-medium text-inox-700 mb-1">Dimensões e especificações</label>
                  <textarea
                    rows={4}
                    value={form.mensagem}
                    onChange={(e) => update('mensagem', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Informe dimensões, tipo de aço desejado, acabamento, prazo estimado..."
                  />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-lg border border-inox-200 text-inox-700 font-medium hover:bg-inox-50 transition-all">
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!form.mensagem}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all disabled:opacity-50"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-inox-900">Seus dados de contato</h2>
                <div>
                  <label className="block text-sm font-medium text-inox-700 mb-1">Nome *</label>
                  <input required value={form.nome} onChange={(e) => update('nome', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-inox-700 mb-1">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-inox-700 mb-1">Telefone *</label>
                  <input required value={form.telefone} onChange={(e) => update('telefone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-inox-700 mb-1">Empresa</label>
                  <input value={form.empresa} onChange={(e) => update('empresa', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-lg border border-inox-200 text-inox-700 font-medium hover:bg-inox-50 transition-all">
                    Voltar
                  </button>
                  <button
                    onClick={() => mutation.mutate()}
                    disabled={!form.nome || !form.email || !form.telefone || mutation.isPending}
                    className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    {mutation.isPending ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Solicitar Orçamento
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
