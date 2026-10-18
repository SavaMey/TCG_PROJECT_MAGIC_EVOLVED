
import { Container, Row, Col } from 'react-bootstrap'
import cards from '../data/cards'
import { Text } from '../components/atoms/Text'
import { CardItem } from '../components/organisms/CardItem'
import { useNavigate } from 'react-router-dom'

function Cartas() {
  const navigate = useNavigate()

  return (
    <Container as="main" className="my-5">

      {/* Botón para volver a la página anterior */}
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate('/')}
      >
        ← Volver
      </button>

      {/* Título de la página */}
      <Text variant="h1" className="text-center mb-4">
        LISTADO DE CARTAS
      </Text>

      <Row className="g-4">
        <Col xs={12}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {cards.map((card) => (
              <Col key={card.id}>
                <CardItem card={card} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    </Container>
  )
}

export default Cartas