
import { Navbar as BsNavbar, Nav, Container, Badge } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { Image } from '../atoms/Image'
import '../../styles/organisms/navbar.css'
import { useCart } from '../../hooks/useCart'

export function NavBar() {
  const { count } = useCart()

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="navbar-marca">
          <Image src="/images/77610.webp" alt="Logo TCGPOKEMAGIC" />
          TCGPOKEMAGIC
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end eventKey="/">
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cartas" eventKey="/cartas">
              Cartas
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={NavLink} to="/pago" eventKey="/pago">
              Pagar{' '}
              {count > 0 && (
                <Badge bg="warning" text="dark" pill>
                  {count}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}