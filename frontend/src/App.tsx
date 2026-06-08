import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import CategoriaPage from './pages/CategoriaPage'
import Projetos from './pages/Projetos'
import Empresa from './pages/Empresa'
import Contato from './pages/Contato'
import Orcamento from './pages/Orcamento'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProdutos from './pages/admin/ProdutosAdmin'
import AdminCategorias from './pages/admin/CategoriasAdmin'
import AdminProjetos from './pages/admin/ProjetosAdmin'
import AdminOrcamentos from './pages/admin/OrcamentosAdmin'
import AdminContatos from './pages/admin/ContatosAdmin'
import AdminPerfil from './pages/admin/PerfilAdmin'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function App() {
  const basename = import.meta.env.VITE_BASE || '/'
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter basename={basename}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/:slug" element={<ProdutoDetalhe />} />
                <Route path="/hospitalar" element={<CategoriaPage slug="HOSPITALAR" />} />
                <Route path="/veterinaria" element={<CategoriaPage slug="VETERINARIA" />} />
                <Route path="/cozinha" element={<CategoriaPage slug="COZINHA" />} />
                <Route path="/projetos" element={<Projetos />} />
                <Route path="/empresa" element={<Empresa />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/orcamento" element={<Orcamento />} />
              </Route>
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/produtos" element={<AdminProdutos />} />
                  <Route path="/admin/categorias" element={<AdminCategorias />} />
                  <Route path="/admin/projetos" element={<AdminProjetos />} />
                  <Route path="/admin/orcamentos" element={<AdminOrcamentos />} />
                  <Route path="/admin/contatos" element={<AdminContatos />} />
                  <Route path="/admin/perfil" element={<AdminPerfil />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
