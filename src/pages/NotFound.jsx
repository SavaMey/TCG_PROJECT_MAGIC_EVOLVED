import { Container } from 'react-bootstrap'
import { Text } from '../components/atoms/Text'
import { Link } from '../components/atoms/Link'

function NotFound() {
  return (
    <Container as="main" className="my-5 text-center">
      <Text variant="h1">404 - Página no encontrada</Text>
      <Link to="/" className="btn-comprar">Volver al inicio</Link>
    </Container>
  )
}

export default NotFound