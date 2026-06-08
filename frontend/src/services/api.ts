import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
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
