import { useState, useRef, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { User, Camera, CheckCircle } from 'lucide-react'
import { adminGetProfile, adminUpdateProfile, adminChangePassword, adminUploadAvatar } from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

export default function AdminPerfil() {
  const queryClient = useQueryClient()
  const { user, setUser } = useAuth()
  const fileRef = useRef<HTMLInputElement>(null)

  const { data: profile } = useQuery({ queryKey: ['admin', 'profile'], queryFn: adminGetProfile })

  const [nome, setNome] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (profile?.nome) setNome(profile.nome)
  }, [profile])

  const updateNome = useMutation({
    mutationFn: () => adminUpdateProfile({ nome }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'profile'] })
      setUser({ ...user!, nome })
      setMessage('Nome atualizado!')
      setTimeout(() => setMessage(''), 3000)
    },
  })

  const changePass = useMutation({
    mutationFn: () => adminChangePassword({ currentPassword, newPassword }),
    onSuccess: () => {
      setCurrentPassword('')
      setNewPassword('')
      setMessage('Senha alterada com sucesso!')
      setTimeout(() => setMessage(''), 3000)
    },
    onError: () => {
      setMessage('Erro: verifique a senha atual')
      setTimeout(() => setMessage(''), 3000)
    },
  })

  const uploadAvatar = useMutation({
    mutationFn: (file: File) => adminUploadAvatar(file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'profile'] })
      setUser({ ...user!, avatarUrl: data.avatarUrl })
    },
  })

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadAvatar.mutate(file)
  }

  const avatarUrl = profile?.avatarUrl || user?.avatarUrl

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-inox-900 mb-6">Meu Perfil</h1>

      {message && (
        <div className="mb-4 flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 px-4 py-3 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          {message}
        </div>
      )}

      {/* Avatar */}
      <div className="bg-white rounded-xl border border-inox-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-inox-900 mb-4">Avatar</h2>
        <div className="flex items-center gap-6">
          <div className="relative group">
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-brand-100 flex items-center justify-center">
                <User className="w-8 h-8 text-brand-600" />
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>
          <div>
            <p className="text-sm text-inox-700 font-medium">{profile?.username || user?.username}</p>
            <p className="text-xs text-inox-400">@{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Nome */}
      <div className="bg-white rounded-xl border border-inox-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-inox-900 mb-4">Nome de exibição</h2>
        <div className="flex gap-3">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            placeholder="Seu nome"
          />
          <button
            onClick={() => updateNome.mutate()}
            disabled={updateNome.isPending}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
          >
            Salvar
          </button>
        </div>
      </div>

      {/* Senha */}
      <div className="bg-white rounded-xl border border-inox-100 p-6">
        <h2 className="text-lg font-semibold text-inox-900 mb-4">Alterar senha</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-inox-700 mb-1">Senha atual</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-inox-700 mb-1">Nova senha</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-inox-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={() => changePass.mutate()}
            disabled={!currentPassword || !newPassword || changePass.isPending}
            className="bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3 rounded-lg transition-all disabled:opacity-50"
          >
            {changePass.isPending ? 'Alterando...' : 'Alterar senha'}
          </button>
        </div>
      </div>
    </div>
  )
}
