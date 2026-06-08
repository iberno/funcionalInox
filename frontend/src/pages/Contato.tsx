import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useMutation } from '@tanstack/react-query'
import { enviarContato } from '../services/api'
import { Send, CheckCircle } from 'lucide-react'

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' })
  const [sent, setSent] = useState(false)
  const mutation = useMutation({
    mutationFn: () => enviarContato(form),
    onSuccess: () => setSent(true),
  })

  if (sent) {
    return (
      <section className="py-20">
        <div className="max-w-lg mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-inox-900 mb-4">Mensagem enviada!</h1>
          <p className="text-inox-500">Recebemos sua mensagem e responderemos em breve.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <Helmet>
        <title>Contato — Funcional Inox</title>
        <meta name="description" content="Entre em contato com a Funcional Inox. Solicite seu orçamento ou tire suas dúvidas." />
      </Helmet>

      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold text-sm tracking-widest uppercase mb-4">Contato</p>
            <h1 className="text-4xl font-bold text-inox-900">Entre em contato</h1>
            <p className="text-inox-500 mt-4">
              Tire suas dúvidas ou solicite um orçamento sem compromisso.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-inox-100 p-8">
            <form
              onSubmit={(e) => { e.preventDefault(); mutation.mutate() }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Nome</label>
                <input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Assunto</label>
                <input
                  required
                  value={form.assunto}
                  onChange={(e) => setForm({ ...form, assunto: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
                  placeholder="Assunto da mensagem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Mensagem</label>
                <textarea
                  required
                  rows={5}
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Descreva sua necessidade ou dúvida..."
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-inox-50 rounded-xl p-6 text-center">
              <p className="text-inox-500 text-sm">Telefone</p>
              <p className="text-inox-900 font-bold mt-1">(41) 3082-2951</p>
            </div>
            <div className="bg-inox-50 rounded-xl p-6 text-center">
              <p className="text-inox-500 text-sm">WhatsApp</p>
              <p className="text-inox-900 font-bold mt-1">(41) 99931-7247</p>
            </div>
            <div className="bg-inox-50 rounded-xl p-6 text-center">
              <p className="text-inox-500 text-sm">Email</p>
              <p className="text-inox-900 font-bold mt-1">vendas@funcionalinox.com.br</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
