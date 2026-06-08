import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import ProdutoDetalhe from './pages/ProdutoDetalhe'
import CategoriaPage from './pages/CategoriaPage'
import Projetos from './pages/Projetos'
import Empresa from './pages/Empresa'
import Contato from './pages/Contato'
import Orcamento from './pages/Orcamento'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
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
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
