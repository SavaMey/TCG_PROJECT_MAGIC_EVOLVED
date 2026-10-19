
import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { Text } from '../components/atoms/Text'
import { PaymentForm } from '../components/organisms/PaymentForm'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'
import { obtenerSesion } from '../utils/validarLogin'

function FormularioPago() {
  const { items, total } = useCart()
  const sesion = obtenerSesion()

  const usuarioAutenticado =
    sesion &&
    sesion.invitado === false &&
    Boolean(sesion.email)

  if (!usuarioAutenticado) {
    return (
      <Navigate
        to="/login"
        state={{ desde: '/carrito' }}
        replace
      />
    )
  }

  if (items.length === 0) {
    return <Navigate to="/cartas" replace />
  }

  return (
    <Container as="main" className="my-5" style={{ maxWidth: 560 }}>
      <Text variant="h1" className="text-center">
        TCGPOKEMAGIC
      </Text>

      <Text variant="h3" className="text-center mb-4">
        Total a pagar: ${formatPrice(total)}
      </Text>

      <PaymentForm />
    </Container>
  )
}

export default FormularioPago
