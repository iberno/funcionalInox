import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, Pencil, Trash2, Upload } from 'lucide-react'
import { useState, useRef } from 'react'
import { imageUrl } from '../../utils'
import { adminGetCategorias, adminCreateCategoria, adminUpdateCategoria, adminDeleteCategoria } from '../../services/api'

export default function AdminCategorias() {
  const queryClient = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ nome: '', slug: '', descricao: '', ordem: 0, imagemUrl: '' })

  const { data: categorias, isLoading } = useQuery({
    queryKey: ['admin', 'categorias'],
    queryFn: adminGetCategorias,
  })

  const createMutation = useMutation({
    mutationFn: adminCreateCategoria,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'categorias'] }); setShowForm(false); setForm({ nome: '', slug: '', descricao: '', ordem: 0, imagemUrl: '' }) },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => adminUpdateCategoria(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['admin', 'categorias'] }); setEditing(null); setShowForm(false) },
  })

  const deleteMutation = useMutation({
    mutationFn: adminDeleteCategoria,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'categorias'] }),
  })

  const handleEdit = (cat: any) => {
    setForm({ nome: cat.nome, slug: cat.slug, descricao: cat.descricao || '', ordem: cat.ordem, imagemUrl: cat.imagemUrl || '' })
    setEditing(cat)
    setShowForm(true)
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const token = localStorage.getItem('admin_token')
      const fd = new FormData()
      fd.append('files', file)
      const res = await fetch('/api/v1/admin/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      })
      const uploaded = await res.json()
      if (uploaded?.[0]?.url) setForm({ ...form, imagemUrl: uploaded[0].url })
    } catch {}
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      updateMutation.mutate({ id: editing.id, data: form })
    } else {
      createMutation.mutate(form)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-inox-900">Categorias</h1>
        <button
          onClick={() => { setEditing(null); setForm({ nome: '', slug: '', descricao: '', ordem: 0, imagemUrl: '' }); setShowForm(true) }}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nova Categoria
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-inox-100">
              <h2 className="text-lg font-bold text-inox-900">{editing ? 'Editar' : 'Nova'} Categoria</h2>
              <button onClick={() => { setShowForm(false); setEditing(null) }} className="text-inox-400 hover:text-inox-600 text-xl">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Nome</label>
                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Hospitalar" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Slug</label>
                <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toUpperCase().replace(/\s/g, '_') })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: HOSPITALAR" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Descrição</label>
                <textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={2} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: Equipamentos hospitalares em aço inoxidável" />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Ordem</label>
                <input type="number" value={form.ordem} onChange={(e) => setForm({ ...form, ordem: parseInt(e.target.value) || 0 })} className="w-full px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Ex: 1" />
              </div>
              <div>
                <label className="block text-sm font-medium text-inox-700 mb-1">Imagem</label>
                <div className="flex gap-2">
                  <input value={form.imagemUrl} onChange={(e) => setForm({ ...form, imagemUrl: e.target.value })} className="flex-1 px-3 py-2 border border-inox-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="/uploads/categoria.jpg" />
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="px-3 py-2 border border-inox-200 rounded-lg text-sm text-inox-600 hover:bg-inox-50 transition-colors">
                    <Upload className="w-4 h-4" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </div>
                {form.imagemUrl && <img src={imageUrl(form.imagemUrl)} alt="" className="mt-2 w-20 h-20 rounded-lg object-cover border border-inox-200" />}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-inox-100">
                <button type="button" onClick={() => { setShowForm(false); setEditing(null) }} className="px-4 py-2 text-sm text-inox-600 hover:text-inox-900">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-lg text-sm transition-colors">{editing ? 'Salvar' : 'Criar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12 text-inox-500">Carregando...</div>
      ) : (
        <div className="bg-white rounded-xl border border-inox-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-inox-100 bg-inox-50">
                <th className="text-left px-4 py-3 font-semibold text-inox-700">Nome</th>
                <th className="text-left px-4 py-3 font-semibold text-inox-700 hidden md:table-cell">Slug</th>
                <th className="text-center px-4 py-3 font-semibold text-inox-700 w-20">Img</th>
                <th className="text-center px-4 py-3 font-semibold text-inox-700 w-24">Produtos</th>
                <th className="text-right px-4 py-3 font-semibold text-inox-700 w-24">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias?.map((c: any) => (
                <tr key={c.id} className="border-b border-inox-50 hover:bg-inox-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-inox-900">{c.nome}</td>
                  <td className="px-4 py-3 text-inox-500 font-mono text-xs hidden md:table-cell">{c.slug}</td>
                  <td className="px-4 py-3 text-center">
                    {c.imagemUrl ? <img src={imageUrl(c.imagemUrl)} alt="" className="w-8 h-8 rounded object-cover mx-auto" /> : <span className="text-inox-300 text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3 text-center text-inox-500">{c._count?.produtos ?? 0}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(c)} className="p-1.5 text-inox-400 hover:text-brand-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => { if (confirm('Excluir categoria?')) deleteMutation.mutate(c.id) }} className="p-1.5 text-inox-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
