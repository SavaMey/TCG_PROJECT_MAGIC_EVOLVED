import { useEffect, useMemo, useReducer, useState } from 'react'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'tcgpokemagic_carrito'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, name, game, price } = action.card
      const existing = state.find((item) => item.id === id)
      if (existing) {
        return state.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...state, { id, name, game, price, quantity: 1 }]
    }
    case 'INCREASE':
      return state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
    case 'DECREASE':
      return state
        .map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0)
    case 'REMOVE':
      return state.filter((item) => item.id !== action.id)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart)
  const [lastAdded, setLastAdded] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* si no hay localStorage, el carrito sigue en memoria */
    }
  }, [items])

  const actions = useMemo(
    () => ({
      addToCart: (card) => {
        dispatch({ type: 'ADD', card })
        setLastAdded({ name: `${card.game}: ${card.name}`, at: Date.now() })
      },
      increase: (id) => dispatch({ type: 'INCREASE', id }),
      decrease: (id) => dispatch({ type: 'DECREASE', id }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      clearCart: () => dispatch({ type: 'CLEAR' }),
      dismissToast: () => setLastAdded(null),
    }),
    [],
  )

  const value = useMemo(
    () => ({
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      lastAdded,
      ...actions,
    }),
    [items, lastAdded, actions],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}