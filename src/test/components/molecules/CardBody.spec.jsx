import { render, screen } from '@testing-library/react'
import { CardBody } from '../../../components/molecules/CardBody'
import { formatPrice } from '../../../utils/formatPrice'

describe('Molécula CardBody', () => {

    it('muestra el título y el precio formateado', () => {
        render(<CardBody title="Charizard" price={15000} />)

        expect(screen.getByText('Charizard')).toBeTruthy()
        expect(screen.getByText(`PRECIO: $${formatPrice(15000)}`)).toBeTruthy()
    })

    it('muestra el badge del juego solo cuando se entrega "game"', () => {
        const { rerender } = render(<CardBody title="Charizard" price={15000} game="Pokémon" />)
        expect(screen.queryByText('Pokémon')).toBeTruthy()

        rerender(<CardBody title="Charizard" price={15000} />)
        expect(screen.queryByText('Pokémon')).toBeNull()
    })

    it('muestra la descripción solo cuando se entrega "description"', () => {
        const { rerender } = render(
        <CardBody title="Charizard" price={15000} description="Carta holográfica" />
        )
        expect(screen.queryByText('Carta holográfica')).toBeTruthy()

        rerender(<CardBody title="Charizard" price={15000} />)
        expect(screen.queryByText('Carta holográfica')).toBeNull()
    })

})