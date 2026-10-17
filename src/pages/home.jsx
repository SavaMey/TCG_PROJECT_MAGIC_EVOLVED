import { Container } from 'react-bootstrap'
import { Text } from '../components/atoms/Text'
import { Image } from '../components/atoms/Image'
import { Link } from '../components/atoms/Link'
import '../styles/pages/home.css'

function Home() {
  return (
    <Container as="main" className="home">
      <section id="inicio" className="centrador-abajo">
        <Text variant="h2">Tu tienda favorita para perder plata a lo loco por cartas TCG</Text>
        <Text variant="p">
          Encuentra tu próxima carta favorita. Explora nuestro catálogo de cartas y coleccionables.
        </Text>
        <Image src="/images/How-many-Pokemon-cards-are-there.webp" alt="Banner TCGPOKEMAGIC" />
      </section>

      <section id="informacion" className="centrador-abajo">
        <Text variant="h2">Explora tu TCG favorito</Text>
        <Text variant="p">
          Encuentra cartas y coleccionables de Pokémon, Magic: The Gathering, Yu-Gi-Oh!, Mitos y
          Leyendas, Hololive, y otros más, con productos para distintos estilos de juego y colección.
        </Text>
      </section>

      <Link to="/cartas" className="btn-comprar">
        Cartas para comprar
      </Link>
    </Container>
  )
}

export default Home