import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Image } from '../atoms/Image'
import { Button } from '../atoms/Button'
import { CardBody } from '../molecules/CardBody'
import '../../styles/organisms/cardItem.css'
import { useCart } from '../../hooks/useCart'

export function CardItem({ card }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <Card className="carta h-100">
      <Image
        src={card.image}
        alt={`${card.game}: ${card.name}`}
        className="card-img-top carta-img"
      />
      <Card.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          <CardBody
            game={card.game}
            title={card.name}
            description={card.description}
            price={card.price}
          />
        </div>
        <div className="d-flex gap-2 mt-3">
          <Button variant="outline-dark" onClick={() => navigate(`/cartas/${card.id}`)}>
            Ver detalles
          </Button>
          <Button className="btn-comprar-bs" onClick={() => addToCart(card)}>
            Agregar
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}