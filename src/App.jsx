import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/organisms/navbar'
import { Footer } from './components/organisms/Footer'
import { CartToast } from './components/organisms/CartToast'
import Home from './pages/home'
import Cartas from './pages/Cartas'
import CartaDetalle from './pages/CartaDetalle'
import Pago from './pages/Pago'
import PagoCompletado from './pages/pagocompletado'
import NotFound from './pages/NotFound'
import Carrito from './pages/Carrito'
import ScrollToTop from './components/atoms/ScrollToTop'

function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartas" element={<Cartas />} />
        <Route path="/cartas/:id" element={<CartaDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/pago-completado" element={<PagoCompletado />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <CartToast />
    </>
  )
}

export default App