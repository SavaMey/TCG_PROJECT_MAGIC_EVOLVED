import { Container } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { Text } from '../components/atoms/Text'
import { PaymentForm } from '../components/organisms/PaymentForm'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatPrice'

function Pago() {
  const { items, total } = useCart()

  if (items.length === 0) {
    return <Navigate to="/cartas" replace />
  }

  return (
    <Container as="main" className="my-5" style={{ maxWidth: 560 }}>
      <Text variant="h1" className="text-center">TCGPOKEMAGIC</Text>
      <Text variant="h3" className="text-center mb-4">
        Total a pagar: ${formatPrice(total)}
      </Text>
      <PaymentForm />
    </Container>
  )
}

export default Pago