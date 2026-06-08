import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, Phone, Building2, Calendar } from 'lucide-react'
import { adminGetOrcamentos, adminUpdateOrcamento } from '../../services/api'

export default function AdminOrcamentos() {
  const queryClient = useQueryClient()
  const { data: orcamentos, isLoading } = useQuery({ queryKey: ['admin', 'orcamentos'], queryFn: adminGetOrcamentos })

  const markRead = useMutation({
    mutationFn: ({ id, lido }: { id: string; lido: boolean }) => adminUpdateOrcamento(id, { lido }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orcamentos'] }),
  })

  const markRespondido = useMutation({
    mutationFn: ({ id, respondido }: { id: string; respondido: boolean }) => adminUpdateOrcamento(id, { respondido }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'orcamentos'] }),
  })

  if (isLoading) return <div className="text-center py-12 text-inox-500">Carregando...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-inox-900 mb-6">Orçamentos</h1>
      {orcamentos?.length === 0 ? (
        <div className="text-center py-12 text-inox-400">Nenhum orçamento recebido</div>
      ) : (
        <div className="space-y-4">
          {orcamentos?.map((o: any) => (
            <div key={o.id} className={`bg-white rounded-xl border ${o.lido ? 'border-inox-100' : 'border-brand-300'} p-6`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-semibold text-inox-900">{o.nome}</h3>
                    {!o.lido && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium">Novo</span>}
                    {o.respondido && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Respondido</span>}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-inox-500 mb-3">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{o.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{o.telefone}</span>
                    {o.empresa && <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" />{o.empresa}</span>}
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{new Date(o.createdAt).toLocaleString('pt-BR')}</span>
                  </div>
                  {o.produtos && <p className="text-sm text-inox-600 mb-2"><strong>Produtos:</strong> {o.produtos}</p>}
                  <p className="text-sm text-inox-600 whitespace-pre-wrap">{o.mensagem}</p>
                </div>
                <div className="shrink-0 flex flex-col gap-2">
                  <button
                    onClick={() => markRead.mutate({ id: o.id, lido: !o.lido })}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      o.lido ? 'bg-inox-100 text-inox-500 hover:bg-inox-200' : 'bg-brand-50 text-brand-700 hover:bg-brand-100'
                    }`}
                  >
                    {o.lido ? 'Não lido' : 'Lido'}
                  </button>
                  <button
                    onClick={() => markRespondido.mutate({ id: o.id, respondido: !o.respondido })}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                      o.respondido ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-inox-100 text-inox-500 hover:bg-inox-200'
                    }`}
                  >
                    {o.respondido ? 'Não respondido' : 'Respondido'}
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
