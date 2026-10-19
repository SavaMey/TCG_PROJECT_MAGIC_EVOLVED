import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { NavBar } from './components/organisms/navbar'
import Home from './pages/home'
import Cartas from './pages/Cartas'
import CartaDetalle from './pages/CartaDetalle'
import FormularioPago from './pages/formulariopago'
import PagoCompletado from './pages/pagocompletado'
import NotFound from './pages/NotFound'
import Carrito from './pages/Carrito'
import ScrollToTop from './components/atoms/ScrollToTop'
import Login from './pages/Login'

function App() {
  const { pathname } = useLocation()
  const fondoDegradado = ['/home', '/cartas', '/carrito', '/pago-completado'].includes(pathname) || pathname.startsWith('/cartas/')
  return (
    <>
      <NavBar />
      <ScrollToTop />

      <div className={fondoDegradado ? 'fondo-degradado' : 'fondo-suave'}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cartas" element={<Cartas />} />
        <Route path="/cartas/:id" element={<CartaDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<FormularioPago />} />
        <Route path="/pago-completado" element={<PagoCompletado />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <footer id="footer" className="bg-dark text-light py-4 mt-auto">
        <Container>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-4">
            <div className="text-start">
              <h5 className="text-light mb-1">TCGPOKEMAGIC</h5>
              <p className="mb-0">
                Tu tienda de cartas y coleccionables TCG.
              </p>
            </div>

            <div className="text-end">
              <p className="mb-1">
                <strong>Contacto:</strong> Atención al cliente
              </p>
              <p className="mb-1">
                <strong>Email:</strong>{' '}
                <a href="mailto:contacto@tcgpokemagic.cl" className="text-light">
                  contacto@tcgpokemagic.cl
                </a>
              </p>
              <p className="mb-0">
                <strong>Fono:</strong> +56 9 1234 5678
              </p>
            </div>
          </div>

          <hr className="border-secondary my-3" />

          <p className="text-center mb-0">
            © {new Date().getFullYear()} TCGPOKEMAGIC. Todos los derechos reservados.
          </p>
        </Container>
      </footer>
    </>
  )
}

export default App