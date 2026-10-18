
import { Container, Row, Col, Button as BsButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Text } from '../components/atoms/Text'
import { Cart } from '../components/organisms/Cart'

function Carrito() {
  const navigate = useNavigate()

  return (
    <Container as="main" className="my-5 pagina-carrito">
      <BsButton
        variant="secondary"
        className="mb-4"
        onClick={() => navigate('/cartas')}
      >
        ← Volver a las cartas
      </BsButton>

      <Text variant="h1" className="text-center mb-4">
        MI CARRITO DE COMPRAS
      </Text>

      <Row className="justify-content-center">
        <Col lg={9} xl={8}>
          <Cart />
        </Col>
      </Row>
    </Container>
  )
}

export default Carrito
