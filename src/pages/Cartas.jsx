
import { useState } from 'react'
import { Container, Row, Col, Toast, ToastContainer } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import cards from '../data/cards'
import { Text } from '../components/atoms/Text'
import { CardItem } from '../components/organisms/CardItem'
import { useCart } from '../hooks/useCart'

function Cartas() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [mostrarMensaje, setMostrarMensaje] = useState(false)

  const handleAgregarAlCarrito = (card) => {
    addToCart(card)
    setMostrarMensaje(true)
  }

  return (
    <>
      <Container as="main" className="my-5">
        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={() => navigate('/')}
        >
          ← Volver
        </button>

        <Text variant="h1" className="text-center mb-4">
          LISTADO DE CARTAS
        </Text>

        <Row className="g-4">
          <Col xs={12}>
            <Row xs={1} md={2} lg={3} className="g-4">
              {cards.map((card) => (
                <Col key={card.id}>
                  <CardItem
                    card={card}
                    onAddToCart={() => handleAgregarAlCarrito(card)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <ToastContainer
        position="bottom-end"
        className="p-3 aviso-carrito"
        style={{ zIndex: 2000 }}
      >
        <Toast
          show={mostrarMensaje}
          onClose={() => setMostrarMensaje(false)}
          delay={3500}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">TCGPOKEMAGIC</strong>
            <span aria-hidden="true">✨</span>
          </Toast.Header>

          <Toast.Body>
            <div className="aviso-carrito-contenido">
              <img
                src="/images/botan_carrito.jpg"
                alt="Shishiro Botan"
                className="aviso-carrito-imagen"
              />

              <div>
                <strong className="aviso-carrito-titulo">
                  ¡Carta/sobre agregado!
                </strong>

                <p className="aviso-carrito-texto">
                  La carta/sobre se agregó al carrito correctamente.
                </p>
              </div>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default Cartas
