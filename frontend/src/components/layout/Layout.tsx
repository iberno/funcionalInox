import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, X, FileText, Phone } from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Empresa', path: '/empresa' },
  {
    name: 'Produtos',
    path: '/produtos',
    children: [
      { name: 'Hospitalar', path: '/hospitalar' },
      { name: 'Veterinária', path: '/veterinaria' },
      { name: 'Cozinha', path: '/cozinha' },
    ],
  },
  { name: 'Projetos', path: '/projetos' },
  { name: 'Contato', path: '/contato' },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-inox-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-inox-900 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base">FI</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-inox-900">Funcional</span>
                <span className="font-light text-xl text-inox-500">Inox</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navigation.map((item) =>
                item.children ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`inline-flex items-center gap-1 font-medium transition-colors ${
                        isActive(item.path) ? 'text-brand-600' : 'text-inox-600 hover:text-inox-900'
                      }`}
                    >
                      {item.name}
                      <svg className="w-3.5 h-3.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    {(dropdownOpen || isActive(item.children[0].path)) && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-inox-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.path}
                            className={`block px-4 py-2.5 font-medium transition-colors ${
                              isActive(child.path)
                                ? 'text-brand-600 bg-brand-50'
                                : 'text-inox-700 hover:bg-inox-50 hover:text-brand-600'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`font-medium transition-colors relative ${
                      isActive(item.path) ? 'text-brand-600' : 'text-inox-600 hover:text-inox-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                to="/orcamento"
                className="hidden sm:inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-sm"
              >
                <FileText className="w-4 h-4" />
                Orçamento
              </Link>
              <button
                className="lg:hidden p-2 text-inox-600"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-inox-100 bg-white">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name}>
                    <Link
                      to={item.path}
                      className="block font-semibold text-inox-900 py-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className="block text-inox-600 py-1.5 text-sm"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block font-semibold text-inox-900 py-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ),
              )}
              <Link
                to="/orcamento"
                className="flex items-center gap-2 bg-brand-600 text-white font-semibold px-5 py-3 rounded-lg text-center justify-center mt-4"
                onClick={() => setMobileOpen(false)}
              >
                <FileText className="w-4 h-4" />
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-inox-950 text-inox-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">FI</span>
                </div>
                <div>
                  <span className="font-bold text-white text-lg">Funcional</span>
                  <span className="font-light text-inox-500 text-lg">Inox</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed">
                Fabricação de móveis e equipamentos em aço inoxidável sob medida. Qualidade e tradição desde 2009.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Produtos</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/hospitalar" className="hover:text-white transition-colors">Linha Hospitalar</Link></li>
                <li><Link to="/veterinaria" className="hover:text-white transition-colors">Linha Veterinária</Link></li>
                <li><Link to="/cozinha" className="hover:text-white transition-colors">Linha Cozinha</Link></li>
                <li><Link to="/produtos" className="hover:text-white transition-colors">Todos os Produtos</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Institucional</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/empresa" className="hover:text-white transition-colors">Empresa</Link></li>
                <li><Link to="/projetos" className="hover:text-white transition-colors">Projetos</Link></li>
                <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link to="/orcamento" className="hover:text-white transition-colors">Solicitar Orçamento</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contato</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-4 h-4 mt-0.5 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Rua Elias Karam, 605 · Fazendinha<br />Curitiba — PR
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (41) 3082-2951
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-brand-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  vendas@funcionalinox.com.br
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                  (41) 99931-7247
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm">
            <p>© 2026 Funcional Inox — Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* FAB - Orçamento */}
      <Link
        to="/orcamento"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-5 py-3.5 rounded-full shadow-lg shadow-brand-600/30 transition-all duration-200"
      >
        <FileText className="w-5 h-5" />
        Pedir Orçamento
      </Link>
    </div>
  )
}
