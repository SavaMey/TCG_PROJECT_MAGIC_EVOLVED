import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Text } from '../atoms/Text'
import { Button } from '../atoms/Button'
import { CartLine } from '../molecules/CartLine'
import { useCart } from '../../hooks/useCart'
import { formatPrice } from '../../utils/formatPrice'
import '../../styles/organisms/cart.css'

export function Cart() {
  const { items, total, increase, decrease, removeFromCart } = useCart()
  const [showEmptyError, setShowEmptyError] = useState(false)
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (items.length === 0) {
      setShowEmptyError(true)
      return
    }
    navigate('/pago')
  }

  return (
    <aside className="carrito">
      <Text variant="h2">Tu Carrito</Text>

      {showEmptyError && items.length === 0 && (
        <Alert variant="danger" dismissible onClose={() => setShowEmptyError(false)}>
          ERROR: El carro ta vacio, agrega al menos una carta
        </Alert>
      )}

      <ul className="carrito-lista">
        {items.map((item) => (
          <CartLine
            key={item.id}
            item={item}
            onIncrease={() => increase(item.id)}
            onDecrease={() => decrease(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        ))}
      </ul>

      <Text variant="h3">Total: ${formatPrice(total)}</Text>
      <Button className="btn-comprar-bs w-100" onClick={handleCheckout}>
        Ir a pagar
      </Button>
    </aside>
  )
}