import { Badge } from 'react-bootstrap'
import { Text } from '../atoms/Text'
import { formatPrice } from '../../utils/formatPrice'

export function CardBody({ game, title, description, price }) {
  return (
    <>
      {game && <Badge bg="dark" className="mb-2">{game}</Badge>}
      <Text variant="h5">{title}</Text>
      {description && <Text variant="p">{description}</Text>}
      <Text variant="h6" className="precio">PRECIO: ${formatPrice(price)}</Text>
    </>
  )
}