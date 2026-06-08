import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, FolderTree, Building2, FileText, MessageSquare, LogOut, Menu, X, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Produtos', path: '/admin/produtos', icon: Package },
  { name: 'Categorias', path: '/admin/categorias', icon: FolderTree },
  { name: 'Projetos', path: '/admin/projetos', icon: Building2 },
  { name: 'Orçamentos', path: '/admin/orcamentos', icon: FileText },
  { name: 'Contatos', path: '/admin/contatos', icon: MessageSquare },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-inox-50 flex">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-inox-900 text-white flex flex-col transform transition-transform duration-200
        lg:translate-x-0 lg:static lg:inset-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link to="/admin" className="font-bold text-lg">
            <span className="text-white">Funcional</span>
            <span className="text-inox-400 font-light">Inox</span>
            <span className="text-brand-400 text-sm block font-normal">Admin</span>
          </Link>
          <button className="lg:hidden text-inox-400" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path !== '/admin' && location.pathname.startsWith(item.path))
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white'
                    : 'text-inox-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-3 space-y-1">
          <Link
            to="/admin/perfil"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === '/admin/perfil'
                ? 'bg-brand-600 text-white'
                : 'text-inox-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <User className="w-5 h-5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="truncate">{user?.nome || 'Perfil'}</div>
              <div className="text-xs text-inox-400 truncate">@{user?.username}</div>
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-inox-300 hover:bg-white/10 hover:text-white w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-inox-100 flex items-center justify-between px-4 lg:px-8">
          <button className="lg:hidden p-2 text-inox-600" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-sm text-inox-500">
            Painel Administrativo
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
