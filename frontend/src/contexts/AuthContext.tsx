import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { adminLogin } from '../services/api'

interface UserInfo {
  id: string
  username: string
  nome: string | null
  avatarUrl: string | null
}

interface AuthContextType {
  token: string | null
  user: UserInfo | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  setUser: (user: UserInfo) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('admin_token'))
  const [user, setUser] = useState<UserInfo | null>(() => {
    const stored = localStorage.getItem('admin_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback(async (username: string, password: string) => {
    const res = await adminLogin(username, password)
    localStorage.setItem('admin_token', res.access_token)
    setToken(res.access_token)
    if (res.user) {
      localStorage.setItem('admin_user', JSON.stringify(res.user))
      setUser(res.user)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToken(null)
    setUser(null)
  }, [])

  const handleSetUser = useCallback((u: UserInfo) => {
    localStorage.setItem('admin_user', JSON.stringify(u))
    setUser(u)
  }, [])

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setUser: handleSetUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
