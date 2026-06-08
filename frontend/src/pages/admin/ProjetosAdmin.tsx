import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { adminGetProjetos, adminDeleteProjeto, adminGetCategorias, adminCreateProjeto, adminUpdateProjeto } from '../../services/api'
import ImageUpload from '../../components/admin/ImageUpload'

export default function AdminProjetos() {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const { data: projetos, isLoading } = useQuery({
    queryKey: ['admin', 'projetos'],
    queryFn: adminGetProjetos,
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteProjeto,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'projetos'] }),
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-inox-900">Projetos</h1>
        <button
          onClick={() => { setShowForm(true); setEditingId(null) }}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Projeto
        </button>
      </div>

      {showForm && <ProjetoForm editingId={editingId} onClose={() => { setShowForm(false); setEditingId(null) }} />}

      {isLoading ? (
        <div className="text-center py-12 text-inox-500">Carregando...</div>
      ) : (
        <div className="bg-white rounded-xl border border-inox-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-inox-100 bg-inox-50">
                <th className="text-left px-4 py-3 font-semibold text-inox-700">Título</th>
                <th className="text-left px-4 py-3 font-semibold text-inox-700 hidden md:table-cell">Cliente</th>
                <th className="text-left px-4 py-3 font-semibold text-inox-700 hidden md:table-cell">Categoria</th>
                <th className="text-center px-4 py-3 font-semibold text-inox-700 w-24">Destaque</th>
                <th className="text-right px-4 py-3 font-semibold text-inox-700 w-24">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projetos?.map((p: any) => (
                <tr key={p.id} className="border-b border-inox-50 hover:bg-inox-50">
                  <td className="px-4 py-3 font-medium text-inox-900">{p.titulo}</td>
                  <td className="px-4 py-3 text-inox-500 hidden md:table-cell">{p.cliente || '-'}</td>
                  <td className="px-4 py-3 text-inox-500 hidden md:table-cell">{p.categoria?.nome}</td>
                  <td className="px-4 py-3 text-center">
                    {p.destaque ? <span className="text-amber-500 text-xs">★</span> : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditingId(p.id); setShowForm(true) }} className="p-1.5 text-inox-400 hover:text-brand-600"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => { if (confirm('Excluir projeto?')) deleteMutation.mutate(p.id) }} className="p-1.5 text-inox-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {projetos?.length === 0 && (
                <tr><td colSpan={5} className="text-center py-12 text-inox-400">Nenhum projeto encontrado</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function ProjetoForm({ editingId, onClose }: { editingId: string | null; onClose: () => void }) {
  const queryClient = useQueryClient()
  const { data: categorias } = useQuery({ queryKey: ['admin', 'categorias'], queryFn: adminGetCategorias })
  const [form, setForm] = useState({
    titulo: '', descricao: '', cliente: '', categoriaId: '', destaque: false,
    imagens: [] as { url: string; alt?: string }[],
    produtoIds: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...form,
      imagens: form.imagens.map((i) => i.url),
      produtoIds: form.produtoIds.split(',').map((s) => s.trim()).filter(Boolean),
    }
    try {
      if (editingId) {
        await adminUpdateProjeto(editingId, payload)
      } else {
        await adminCreateProjeto(payload)
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'projetos'] })
      onClose()
    } catch {}
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 pb-10 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
        <div className="flex items-center justify-between p-6 border-b border-inox-100">
          <h2 className="text-lg font-bold text-inox-900">{editingId ? 'Editar' : 'Novo'} Projeto</h2>
          <button onClick={onClose} className="text-inox-400 hover:text-inox-600 text-xl">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-inox-700 mb-1">Título</label>
              <input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Reforma Hospital São Lucas" required />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-inox-700 mb-1">Descrição</label>
              <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={3} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Descreva o projeto realizado..." required />
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">Cliente</label>
              <input value={form.cliente} onChange={(e) => setForm({ ...form, cliente: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Hospital São Lucas" />
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">Categoria</label>
              <select value={form.categoriaId} onChange={(e) => setForm({ ...form, categoriaId: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" required>
                <option value="">Selecione uma categoria</option>
                {categorias?.map((c: any) => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-3">Imagens</label>
              <ImageUpload
                images={form.imagens}
                onChange={(imagens) => setForm({ ...form, imagens })}
                max={10}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-inox-700 mb-1">IDs dos Produtos (separados por vírgula)</label>
              <input value={form.produtoIds} onChange={(e) => setForm({ ...form, produtoIds: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="cmq5jk6z70004izkxwv2sk5hc, cmq5jk6zr0007izkx6scd0dfc" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input type="checkbox" id="destaque" checked={form.destaque} onChange={(e) => setForm({ ...form, destaque: e.target.checked })} className="rounded" />
            <label htmlFor="destaque" className="text-sm text-inox-700">Projeto em destaque</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-inox-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-inox-600 hover:text-inox-900">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg text-sm transition-colors">{editingId ? 'Salvar' : 'Criar'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
