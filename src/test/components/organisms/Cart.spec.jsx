import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {CartProvider} from '../../../context/CartProvider'
import {Cart} from '../../../components/organisms/Cart'

describe('Organismo Cart',()=>{
    beforeEach(()=>window.localStorage.clear())
    afterEach(()=>cleanup())
    
    it('muestra el estado vacío y deshabilita el botón de pago',()=>{
        render(<MemoryRouter><CartProvider><Cart/></CartProvider></MemoryRouter>)
        expect(screen.getByText('¡Todavía no has agregado cartas!')).toBeTruthy()
        expect(screen.getByRole('button',{name:'Continuar al pago'}).disabled).toBeTrue()
    })
});
