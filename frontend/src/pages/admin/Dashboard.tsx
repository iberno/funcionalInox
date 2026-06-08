import { useQuery } from '@tanstack/react-query'
import { Package, FolderTree, Building2, FileText, MessageSquare } from 'lucide-react'
import { adminGetProdutos, adminGetCategorias, adminGetProjetos, adminGetOrcamentos, adminGetContatos } from '../../services/api'

export default function AdminDashboard() {
  const produtos = useQuery({ queryKey: ['admin', 'produtos'], queryFn: adminGetProdutos })
  const categorias = useQuery({ queryKey: ['admin', 'categorias'], queryFn: adminGetCategorias })
  const projetos = useQuery({ queryKey: ['admin', 'projetos'], queryFn: adminGetProjetos })
  const orcamentos = useQuery({ queryKey: ['admin', 'orcamentos'], queryFn: adminGetOrcamentos })
  const contatos = useQuery({ queryKey: ['admin', 'contatos'], queryFn: adminGetContatos })

  const orcamentosNaoLidos = orcamentos.data?.filter((o: any) => !o.lido).length ?? 0
  const contatosNaoLidos = contatos.data?.filter((c: any) => !c.lido).length ?? 0

  const cards = [
    { label: 'Produtos', value: produtos.data?.length ?? '...', icon: Package, href: '/admin/produtos', color: 'bg-blue-500' },
    { label: 'Categorias', value: categorias.data?.length ?? '...', icon: FolderTree, href: '/admin/categorias', color: 'bg-emerald-500' },
    { label: 'Projetos', value: projetos.data?.length ?? '...', icon: Building2, href: '/admin/projetos', color: 'bg-purple-500' },
    { label: 'Orçamentos', value: orcamentos.data?.length ?? '...', icon: FileText, href: '/admin/orcamentos', color: 'bg-amber-500', badge: orcamentosNaoLidos },
    { label: 'Contatos', value: contatos.data?.length ?? '...', icon: MessageSquare, href: '/admin/contatos', color: 'bg-rose-500', badge: contatosNaoLidos },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-inox-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl border border-inox-100 p-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-inox-900">{card.value}</div>
            <div className="text-sm text-inox-500 mt-1">{card.label}</div>
            {card.badge > 0 && (
              <div className="mt-2 text-xs font-medium text-amber-600 bg-amber-50 inline-block px-2 py-0.5 rounded-full">
                {card.badge} não lido{card.badge > 1 ? 's' : ''}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
