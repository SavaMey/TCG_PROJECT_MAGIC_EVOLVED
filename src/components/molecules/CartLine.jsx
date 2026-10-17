import { ButtonGroup } from 'react-bootstrap'
import { Button } from '../atoms/Button'
import { formatPrice } from '../../utils/formatPrice'

export function CartLine({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="carrito-item">
      <div className="carrito-item-info">
        <strong>{item.game}: {item.name}</strong>
        <span>(x{item.quantity}) - ${formatPrice(item.price * item.quantity)}</span>
      </div>
      <ButtonGroup size="sm" aria-label={`Cantidad de ${item.name}`}>
        <Button variant="outline-dark" onClick={onDecrease} aria-label="Quitar uno">−</Button>
        <Button variant="outline-dark" onClick={onIncrease} aria-label="Agregar uno">+</Button>
        <Button variant="outline-danger" onClick={onRemove} aria-label="Eliminar">✕</Button>
      </ButtonGroup>
    </li>
  )
}