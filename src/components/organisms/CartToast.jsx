import { Toast, ToastContainer } from 'react-bootstrap'
import { useCart } from '../../hooks/useCart'

export function CartToast() {
  const { lastAdded, dismissToast } = useCart()

  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ position: 'fixed', zIndex: 1100 }}>
      <Toast
        key={lastAdded?.at}
        show={Boolean(lastAdded)}
        onClose={dismissToast}
        delay={2500}
        autohide
        bg="success"
      >
        <Toast.Body className="text-white">
          Carta al carrito ugu — {lastAdded?.name}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}