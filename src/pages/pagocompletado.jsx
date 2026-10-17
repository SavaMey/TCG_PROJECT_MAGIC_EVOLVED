import { useEffect } from 'react'
import { useCart } from '../hooks/useCart'
import { Image } from '../components/atoms/Image'
import { Text } from '../components/atoms/Text'
import { Link } from '../components/atoms/Link'
import '../styles/pages/pagoCompletado.css'

function PagoCompletado() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <main className="pago_completado">
      <Link to="/cartas">
        <Image src="/images/17693056__1259424690.webp" alt="Volver a la tienda" />
      </Link>
      <Text variant="h1">Simulación completada: ¡gracias!</Text>
    </main>
  )
}

export default PagoCompletado