import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, Calendar } from 'lucide-react'
import { adminGetContatos, adminUpdateContato } from '../../services/api'

export default function AdminContatos() {
  const queryClient = useQueryClient()
  const { data: contatos, isLoading } = useQuery({ queryKey: ['admin', 'contatos'], queryFn: adminGetContatos })

  const markRead = useMutation({
    mutationFn: ({ id, lido }: { id: string; lido: boolean }) => adminUpdateContato(id, { lido }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'contatos'] }),
  })

  const markRespondido = useMutation({
    mutationFn: ({ id, respondido }: { id: string; respondido: boolean }) => adminUpdateContato(id, { respondido }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'contatos'] }),
  })

  if (isLoading) return <div className="text-center py-12 text-inox-500">Carregando...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-inox-900 mb-6">Contatos</h1>
      {contatos?.length === 0 ? (
        <div className="text-center py-12 text-inox-400">Nenhum contato recebido</div>
      ) : (
        <div className="space-y-4">
          {contatos?.map((c: any) => (
            <div key={c.id} className={`bg-white rounded-xl border ${c.lido ? 'border-inox-100' : 'border-rose-300'} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-inox-900">{c.nome}</h3>
                    {!c.lido && <span className="text-xs bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-medium">Novo</span>}
                    {c.respondido && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Respondido</span>}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-inox-500 mb-3">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{c.email}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(c.createdAt).toLocaleString('pt-BR')}</span>
                  </div>
                  <p className="text-sm text-inox-500 mb-1"><strong>Assunto:</strong> {c.assunto}</p>
                  <p className="text-sm text-inox-600 whitespace-pre-wrap">{c.mensagem}</p>
                </div>
                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => markRead.mutate({ id: c.id, lido: !c.lido })}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      c.lido ? 'bg-inox-100 text-inox-500 hover:bg-inox-200' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                    }`}
                  >
                    {c.lido ? 'Não lido' : 'Lido'}
                  </button>
                  <button
                    onClick={() => markRespondido.mutate({ id: c.id, respondido: !c.respondido })}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      c.respondido ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-inox-100 text-inox-500 hover:bg-inox-200'
                    }`}
                  >
                    {c.respondido ? 'Não respondido' : 'Respondido'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
