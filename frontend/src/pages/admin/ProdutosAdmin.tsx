import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { useState, useEffect } from 'react'
import { adminGetProdutos, adminDeleteProduto, adminGetCategorias, adminUpdateProduto, adminCreateProduto } from '../../services/api'
import ImageUpload from '../../components/admin/ImageUpload'

export default function AdminProdutos() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: produtos, isLoading } = useQuery({
    queryKey: ['admin', 'produtos'],
    queryFn: adminGetProdutos,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProduto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'produtos'] }),
  })

  const filtered = produtos?.filter((p: any) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-inox-900">Produtos</h1>
        <button
          onClick={() => { setShowForm(true); setEditingId(null) }}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-inox-400" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      {showForm && (
        <ProdutoForm
          editingId={editingId}
          onClose={() => { setShowForm(false); setEditingId(null) }}
        />
      )}

      {isLoading ? (
        <div className="text-center py-12 text-inox-500">Carregando...</div>
      ) : (
        <div className="bg-white rounded-xl border border-inox-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-inox-100 bg-inox-50">
                <th className="text-left px-4 py-3 font-semibold text-inox-700">Nome</th>
                <th className="text-left px-4 py-3 font-semibold text-inox-700 hidden md:table-cell">Categoria</th>
                <th className="text-left px-4 py-3 font-semibold text-inox-700 hidden md:table-cell">Slug</th>
                <th className="text-center px-4 py-3 font-semibold text-inox-700 w-24">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-inox-700 w-24">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((p: any) => (
                <tr key={p.id} className="border-b border-inox-50 hover:bg-inox-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-inox-900">{p.nome}</td>
                  <td className="px-4 py-3 text-inox-500 hidden md:table-cell">{p.categoria?.nome}</td>
                  <td className="px-4 py-3 text-inox-500 font-mono text-xs hidden md:table-cell">{p.slug}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      p.status ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {p.status ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => { setEditingId(p.id); setShowForm(true) }}
                        className="p-1.5 text-inox-400 hover:text-brand-600 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { if (confirm('Excluir produto?')) deleteMutation.mutate(p.id) }}
                        className="p-1.5 text-inox-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered?.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-inox-400">Nenhum produto encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ProdutoForm({ editingId, onClose }: { editingId: string | null; onClose: () => void }) {
  const queryClient = useQueryClient()
  const { data: categorias } = useQuery({ queryKey: ['admin', 'categorias'], queryFn: adminGetCategorias })

  const [form, setForm] = useState({
    nome: '',
    slug: '',
    descricao: '',
    destaque: '',
    categoriaId: '',
    subcategoria: '',
    padronizado: true,
    preco_min: '',
    status: true,
    imagens: [] as { url: string; alt?: string }[],
  })

  const [loading, setLoading] = useState(!!editingId)

  useEffect(() => {
    if (!editingId) return
    adminGetProdutos().then((list: any[]) => {
      const p = list.find((x: any) => x.id === editingId)
      if (p) {
        setForm({
          nome: p.nome,
          slug: p.slug,
          descricao: p.descricao,
          destaque: p.destaque || '',
          categoriaId: p.categoriaId,
          subcategoria: p.subcategoria || '',
          padronizado: p.padronizado,
          preco_min: p.preco_min?.toString() || '',
          status: p.status,
          imagens: p.imagens?.map((i: any) => ({ url: i.url, alt: i.alt || p.nome })) || [],
        })
      }
      setLoading(false)
    })
  }, [editingId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...form,
      preco_min: form.preco_min ? parseFloat(form.preco_min) : null,
      imagens: form.imagens,
    }
    try {
      if (editingId) {
        await adminUpdateProduto(editingId, payload)
      } else {
        await adminCreateProduto(payload)
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'produtos'] })
      onClose()
    } catch {}
  }

  if (loading) return <div className="text-center py-12 text-inox-500">Carregando...</div>

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-inox-100">
          <h2 className="text-lg font-bold text-inox-900">{editingId ? 'Editar' : 'Novo'} Produto</h2>
          <button onClick={onClose} className="text-inox-400 hover:text-inox-600 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-inox-700 mb-1">Nome</label>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Lavatório Cirúrgico" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: lavatorio-cirurgico" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">Categoria</label>
              <select value={form.categoriaId} onChange={(e) => setForm({ ...form, categoriaId: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" required>
                <option value="">Selecione uma categoria</option>
                {categorias?.map((c: any) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">Subcategoria</label>
              <input value={form.subcategoria} onChange={(e) => setForm({ ...form, subcategoria: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Lavatórios, Mesas, Bancadas" />
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">Preço mínimo (R$)</label>
              <input type="number" step="0.01" value={form.preco_min} onChange={(e) => setForm({ ...form, preco_min: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: 2500.00" />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.padronizado} onChange={(e) => setForm({ ...form, padronizado: e.target.checked })} className="rounded border-inox-300 text-brand-600 focus:ring-brand-500" />
                Produto padronizado
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={form.status} onChange={(e) => setForm({ ...form, status: e.target.checked })} className="rounded border-inox-300 text-brand-600 focus:ring-brand-500" />
                Ativo
              </label>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-inox-700 mb-1">Linha de destaque</label>
              <input value={form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Sensor de presença · Aço inox 304 · Conformidade ANVISA" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-inox-700 mb-1">Descrição</label>
              <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={4} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Descreva o produto, materiais, aplicações..." required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-inox-700 mb-3">Imagens</label>
              <ImageUpload
                images={form.imagens}
                onChange={(imagens) => setForm({ ...form, imagens })}
                max={10}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-inox-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-inox-600 hover:text-inox-900">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg text-sm transition-colors">
              {editingId ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
