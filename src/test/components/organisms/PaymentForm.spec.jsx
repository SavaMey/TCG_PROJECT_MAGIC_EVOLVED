import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import {PaymentForm} from '../../../components/organisms/PaymentForm'

describe('Organismo PaymentForm',()=>{
    afterEach(()=>cleanup())
    
    it('muestra un aviso y errores cuando se envía vacío',()=>{
        render(<MemoryRouter><PaymentForm/></MemoryRouter>)
        fireEvent.click(screen.getByRole('button',{name:'Completar simulación'}))
        expect(screen.getByText(/Revisa los campos marcados/)).toBeTruthy()
        expect(screen.getByText('Ingresa tu nombre.')).toBeTruthy()
    })
})
