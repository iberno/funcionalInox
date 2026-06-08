export interface Categoria {
  id: string
  nome: string
  slug: 'HOSPITALAR' | 'VETERINARIA' | 'COZINHA'
  descricao: string | null
  imagemUrl?: string | null
  ordem: number
  _count?: { produtos: number }
}

export interface Imagem {
  id: string
  url: string
  alt: string | null
  ordem: number
}

export interface Produto {
  id: string
  nome: string
  slug: string
  descricao: string
  destaque: string | null
  categoriaId: string
  categoria: Categoria
  subcategoria: string | null
  padronizado: boolean
  preco_min: number | null
  imagens: Imagem[]
  status: boolean
}

export interface Projeto {
  id: string
  titulo: string
  descricao: string
  cliente: string | null
  imagens: string[]
  destaque: boolean
  categoriaId: string
  categoria: Categoria
}

export interface LeadOrcamento {
  id: string
  nome: string
  email: string
  telefone: string
  empresa: string | null
  mensagem: string
  produtos: string | null
  arquivo_url: string | null
  lido: boolean
  createdAt: string
}

export interface ContatoMsg {
  id: string
  nome: string
  email: string
  assunto: string
  mensagem: string
  lido: boolean
  createdAt: string
}
