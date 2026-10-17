
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
  const {
    items,
    total,
    count,
    increase,
    decrease,
    removeFromCart
  } = useCart()

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
      <Text variant="h2">Tu carrito</Text>

      {showEmptyError && items.length === 0 && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setShowEmptyError(false)}
        >
          Tu carrito está vacío. Agrega al menos una carta.
        </Alert>
      )}

      {items.length === 0 ? (
        <p>¡Todavía no has agregado cartas!</p>
      ) : (
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
      )}

      <Text variant="h3">
        Cantidad de productos: {count}
      </Text>

      <Text variant="h3">
        Total: ${formatPrice(total)}
      </Text>

      <Button
        className="btn-comprar-bs w-100"
        onClick={handleCheckout}
        disabled={items.length === 0}
      >
        Continuar al pago
      </Button>
    </aside>
  )
}
