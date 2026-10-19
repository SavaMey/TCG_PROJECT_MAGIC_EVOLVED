
import { useState } from 'react'
import { Container, Card, Badge, Toast, ToastContainer } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import cards from '../data/cards'
import { Image } from '../components/atoms/Image'
import { Text } from '../components/atoms/Text'
import { Button } from '../components/atoms/Button'
import { formatPrice } from '../utils/formatPrice'
import { useCart } from '../hooks/useCart'

function CartaDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const card = cards.find((c) => c.id === parseInt(id))
  const { addToCart } = useCart()
  const [mostrarMensaje, setMostrarMensaje] = useState(false)

  const handleAgregarAlCarrito = () => {
    if (!card) return

    addToCart(card)
    setMostrarMensaje(true)
  }

  if (!card) {
    return (
      <Container as="main" className="my-5 text-center">
        <Text variant="h1">Carta no encontrada</Text>
        <Button
          className="btn-comprar-bs mt-3"
          onClick={() => navigate('/cartas')}
        >
          Volver al listado
        </Button>
      </Container>
    )
  }

  return (
    <>
      <Container as="main" className="my-5" style={{ maxWidth: 720 }}>
        <Button
          variant="outline-dark"
          className="mb-3"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </Button>

        <Card>
          <Image
            src={card.image}
            alt={`${card.game}: ${card.name}`}
            className="card-img-top carta-img-detalle"
          />

          <Card.Body>
            <Badge bg="dark" className="mb-2">
              {card.game}
            </Badge>

            <Text variant="h2">{card.name}</Text>
            <Text variant="p">{card.description}</Text>
            <Text variant="h4">
              PRECIO: ${formatPrice(card.price)}
            </Text>
          </Card.Body>

          <Button
            className="btn-comprar-bs mt-2"
            onClick={handleAgregarAlCarrito}
          >
            Agregar al carrito
          </Button>
        </Card>
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

export default CartaDetalle
