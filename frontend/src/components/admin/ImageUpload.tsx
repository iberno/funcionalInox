import { useState, useRef } from 'react'
import { Upload, X, GripVertical } from 'lucide-react'
import { imageUrl } from '../../utils'

const BASE = import.meta.env.VITE_API_BASE?.replace('/api/v1', '') || ''

interface ImageItem {
  url: string
  alt?: string
}

interface ImageUploadProps {
  images: ImageItem[]
  onChange: (images: ImageItem[]) => void
  max?: number
}

export default function ImageUpload({ images, onChange, max = 10 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    const formData = new FormData()
    for (const file of Array.from(files)) {
      formData.append('files', file)
    }

    try {
      const token = localStorage.getItem('admin_token')
      const res = await fetch(`${BASE}/api/v1/admin/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      const uploaded = await res.json()
      const newImages = uploaded.map((u: any) => ({
        url: u.url,
        alt: u.originalname?.replace(/\.[^/.]+$/, '') || '',
      }))
      onChange([...images, ...newImages].slice(0, max))
    } catch (err) {
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= images.length) return
    const copy = [...images]
    const [item] = copy.splice(from, 1)
    copy.splice(to, 0, item)
    onChange(copy)
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {images.map((img, i) => (
          <div key={i} className="relative group aspect-square rounded-lg border border-inox-200 overflow-hidden bg-inox-50">
            <img
              src={imageUrl(img.url)}
              alt={img.alt || ''}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
              <button
                type="button"
                onClick={() => moveImage(i, i - 1)}
                disabled={i === 0}
                className="p-1 bg-white/90 rounded disabled:opacity-30"
                title="Mover para esquerda"
              >
                <GripVertical className="w-4 h-4 text-inox-700" />
              </button>
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="p-1 bg-red-500/90 rounded"
                title="Remover"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <button
                type="button"
                onClick={() => moveImage(i, i + 1)}
                disabled={i === images.length - 1}
                className="p-1 bg-white/90 rounded disabled:opacity-30"
                title="Mover para direita"
              >
                <GripVertical className="w-4 h-4 text-inox-700 rotate-90" />
              </button>
            </div>
            <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
              {i + 1}
            </div>
          </div>
        ))}

        {images.length < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-lg border-2 border-dashed border-inox-300 hover:border-brand-400 hover:bg-brand-50 transition-colors flex flex-col items-center justify-center gap-1 text-inox-400 hover:text-brand-600"
          >
            <Upload className="w-5 h-5" />
            <span className="text-xs">{uploading ? 'Enviando...' : 'Upload'}</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  )
}
