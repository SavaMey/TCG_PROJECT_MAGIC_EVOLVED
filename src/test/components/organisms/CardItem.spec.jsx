import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import {MemoryRouter,Routes,Route} from 'react-router-dom'
import {CartProvider} from '../../../context/CartProvider'
import {useCart} from '../../../hooks/useCart'
import {CardItem} from '../../../components/organisms/CardItem'
import {formatPrice} from '../../../utils/formatPrice'

const carta={id:7,game:'Pokemon',name:'Sceptile',description:'Carta tipo planta',price:1000,image:'sceptile.png'}

function Probe(){
    const {count}=useCart()
    return <p>En carrito: {count}</p>
}

const ui=(onAddToCart)=>(
    <MemoryRouter initialEntries={['/']}>
        <CartProvider>
            <Routes>
                <Route path="/" element={<><CardItem card={carta} onAddToCart={onAddToCart}/><Probe/></>}/>
                <Route path="/cartas/:id" element={<p>Detalle de carta</p>}/>
            </Routes>
        </CartProvider>
    </MemoryRouter>
)

describe('Organismo CardItem',()=>{
    beforeEach(()=>window.localStorage.clear())
    afterEach(()=>cleanup())

    it('muestra la imagen, el juego, el nombre, la descripción y el precio de la carta',()=>{
        render(ui())
        expect(screen.getByAltText('Pokemon: Sceptile').getAttribute('src')).toContain('sceptile.png')
        expect(screen.getByText('Pokemon')).toBeTruthy()
        expect(screen.getByText('Sceptile')).toBeTruthy()
        expect(screen.getByText('Carta tipo planta')).toBeTruthy()
        expect(screen.getByText(`PRECIO: $${formatPrice(1000)}`)).toBeTruthy()
    })

    it('navega al detalle de la carta al presionar "Ver detalles"',()=>{
        render(ui())
        fireEvent.click(screen.getByRole('button',{name:'Ver detalles'}))
        expect(screen.getByText('Detalle de carta')).toBeTruthy()
    })

    it('"Agregar" usa onAddToCart si existe y, si no, agrega la carta al carrito',()=>{
        const onAdd=jasmine.createSpy('onAddToCart')
        const {rerender}=render(ui(onAdd))

        fireEvent.click(screen.getByRole('button',{name:'Agregar'}))
        expect(onAdd).toHaveBeenCalledTimes(1)
        expect(screen.getByText('En carrito: 0')).toBeTruthy()

        rerender(ui())
        fireEvent.click(screen.getByRole('button',{name:'Agregar'}))
        expect(screen.getByText('En carrito: 1')).toBeTruthy()
    })
})