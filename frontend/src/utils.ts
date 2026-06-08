const BASE = import.meta.env.VITE_API_BASE?.replace('/api/v1', '') || ''

export function imageUrl(url?: string): string | undefined {
  if (!url) return undefined
  return url.startsWith('/') ? `${BASE}${url}` : url
}
