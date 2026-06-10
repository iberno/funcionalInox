const BASE = import.meta.env.VITE_API_BASE?.replace('/api/v1', '') || ''

export function imageUrl(url?: string, fallback?: string): string {
  if (!url) return fallback ? `${BASE}${fallback}` : ''
  return url.startsWith('/') ? `${BASE}${url}` : url
}

export function placeholderUrl(categoriaSlug?: string): string {
  return `${BASE}/uploads/images/${categoriaSlug || 'default'}/placeholder.svg`
}
