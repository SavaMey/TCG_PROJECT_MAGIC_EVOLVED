import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {CartProvider} from '../../../context/CartProvider'
import {Cart} from '../../../components/organisms/Cart'

describe('Organismo Cart',()=>{
   beforeEach(()=>window.localStorage.clear())
   afterEach(()=>cleanup())
 
   it('informa al usuario si intenta pagar con el carrito vacío',()=>{
        render(<MemoryRouter><CartProvider><Cart/></CartProvider></MemoryRouter>)
        fireEvent.click(screen.getByRole('button',{name:'Ir a pagar'}))
        expect(screen.getByText(/carro ta vacio/)).toBeTruthy()
    });
});
