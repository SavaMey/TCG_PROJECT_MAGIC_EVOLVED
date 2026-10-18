import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/organisms/navbar'
import Home from './pages/Home'
import Cartas from './pages/Cartas'
import CartaDetalle from './pages/CartaDetalle'
import Pago from './pages/Pago'
import PagoCompletado from './pages/pagocompletado'
import NotFound from './pages/NotFound'
import Carrito from './pages/Carrito'
import ScrollToTop from './components/atoms/ScrollToTop'
import Login from './pages/Login'

function App() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cartas" element={<Cartas />} />
        <Route path="/cartas/:id" element={<CartaDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/pago-completado" element={<PagoCompletado />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
