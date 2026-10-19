
import { Navbar as BsNavbar, Nav, Container, Badge } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Image } from '../atoms/Image'
import '../../styles/organisms/navbar.css'
import { useCart } from '../../hooks/useCart'
import { useState, useEffect } from 'react'
import { obtenerSesion, cerrarSesion } from '../../utils/validarLogin'

export function NavBar() {
  const { count } = useCart()
  const navigate = useNavigate()
  const [sesion, setSesion] = useState(obtenerSesion())

  useEffect(() => {
    const actualizarSesion = () => {
      setSesion(obtenerSesion())
    }

    window.addEventListener('storage', actualizarSesion)
    window.addEventListener('sesionActualizada', actualizarSesion)

    return () => {
      window.removeEventListener('storage', actualizarSesion)
      window.removeEventListener('sesionActualizada', actualizarSesion)
    }
  }, [])

  const handleCerrarSesion = () => {
    cerrarSesion()
    setSesion(null)
    navigate('/home')
  }

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <BsNavbar.Brand as={Link} to="/home" className="navbar-marca">
          <Image src="/images/77610.webp" alt="Logo TCGPOKEMAGIC" />
          TCGPOKEMAGIC
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home" end eventKey="/home">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cartas">
              Cartas
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/carrito">
              🛒 Carrito
              <Badge bg="warning" text="dark" pill className="ms-2">
                {count}
              </Badge>
            </Nav.Link>

            {!sesion ? (
              <Nav.Link as={Link} to="/login">
                Iniciar sesión
              </Nav.Link>
            ) : (
              <>
                <Nav.Link disabled>
                  {sesion.invitado ? 'Invitado' : sesion.email}
                </Nav.Link>

                <Nav.Link onClick={handleCerrarSesion}>
                  Cerrar sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}
