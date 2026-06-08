import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function getProdutos(categoria?: string) {
  const params = categoria ? { categoria } : {}
  const { data } = await api.get('/produtos', { params })
  return data
}

export async function getProduto(slug: string) {
  const { data } = await api.get(`/produtos/${slug}`)
  return data
}

export async function getCategorias() {
  const { data } = await api.get('/categorias')
  return data
}

export async function getCategoria(slug: string) {
  const { data } = await api.get(`/categorias/${slug}`)
  return data
}

export async function getProjetos(categoria?: string) {
  const params = categoria ? { categoria } : {}
  const { data } = await api.get('/projetos', { params })
  return data
}

export async function getProjeto(id: string) {
  const { data } = await api.get(`/projetos/${id}`)
  return data
}

export async function enviarOrcamento(payload: {
  nome: string
  email: string
  telefone: string
  empresa?: string
  mensagem: string
  produtos?: string
}) {
  const { data } = await api.post('/orcamento', payload)
  return data
}

export async function enviarContato(payload: {
  nome: string
  email: string
  assunto: string
  mensagem: string
}) {
  const { data } = await api.post('/contato', payload)
  return data
}

export async function adminLogin(username: string, password: string) {
  const { data } = await api.post('/auth/login', { username, password })
  return data
}

export async function adminGetProfile() {
  const { data } = await api.get('/admin/profile')
  return data
}

export async function adminUpdateProfile(payload: { nome?: string }) {
  const { data } = await api.put('/admin/profile', payload)
  return data
}

export async function adminChangePassword(payload: { currentPassword: string; newPassword: string }) {
  const { data } = await api.put('/admin/profile/password', payload)
  return data
}

export async function adminUploadAvatar(file: File) {
  const form = new FormData()
  form.append('file', file)
  const { data } = await api.post('/admin/profile/avatar', form)
  return data
}

export async function adminGetProdutos() {
  const { data } = await api.get('/admin/produtos')
  return data
}

export async function adminGetProduto(id: string) {
  const { data } = await api.get(`/admin/produtos/${id}`)
  return data
}

export async function adminCreateProduto(payload: any) {
  const { data } = await api.post('/admin/produtos', payload)
  return data
}

export async function adminUpdateProduto(id: string, payload: any) {
  const { data } = await api.put(`/admin/produtos/${id}`, payload)
  return data
}

export async function adminDeleteProduto(id: string) {
  const { data } = await api.delete(`/admin/produtos/${id}`)
  return data
}

export async function adminGetCategorias() {
  const { data } = await api.get('/admin/categorias')
  return data
}

export async function adminCreateCategoria(payload: any) {
  const { data } = await api.post('/admin/categorias', payload)
  return data
}

export async function adminUpdateCategoria(id: string, payload: any) {
  const { data } = await api.put(`/admin/categorias/${id}`, payload)
  return data
}

export async function adminDeleteCategoria(id: string) {
  const { data } = await api.delete(`/admin/categorias/${id}`)
  return data
}

export async function adminGetProjetos() {
  const { data } = await api.get('/admin/projetos')
  return data
}

export async function adminCreateProjeto(payload: any) {
  const { data } = await api.post('/admin/projetos', payload)
  return data
}

export async function adminUpdateProjeto(id: string, payload: any) {
  const { data } = await api.put(`/admin/projetos/${id}`, payload)
  return data
}

export async function adminDeleteProjeto(id: string) {
  const { data } = await api.delete(`/admin/projetos/${id}`)
  return data
}

export async function adminGetOrcamentos() {
  const { data } = await api.get('/admin/orcamentos')
  return data
}

export async function adminUpdateOrcamento(id: string, payload: { lido?: boolean; respondido?: boolean }) {
  const { data } = await api.put(`/admin/orcamentos/${id}`, payload)
  return data
}

export async function adminGetContatos() {
  const { data } = await api.get('/admin/contatos')
  return data
}

export async function adminUpdateContato(id: string, payload: { lido?: boolean; respondido?: boolean }) {
  const { data } = await api.put(`/admin/contatos/${id}`, payload)
  return data
}
