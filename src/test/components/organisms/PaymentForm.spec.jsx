import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import {MemoryRouter,Routes,Route} from 'react-router-dom'
import {PaymentForm} from '../../../components/organisms/PaymentForm'

describe('Organismo PaymentForm',()=>{
    afterEach(()=>cleanup())
    
    const llenar=(etiqueta,valor)=>
    fireEvent.change(screen.getByLabelText(etiqueta),{target:{value:valor}})

    it('muestra un aviso y errores cuando se envía vacío',()=>{
        render(<MemoryRouter><PaymentForm/></MemoryRouter>)
        fireEvent.click(screen.getByRole('button',{name:'Completar simulación'}))
        expect(screen.getByText(/Revisa los campos marcados/)).toBeTruthy()
        expect(screen.getAllByText(/Usa al menos 2 letras/).length).toBe(2)
    })
    
    it('formatea el vencimiento como MM/AA y deja solo dígitos en tarjeta y CVV',()=>{
        render(<MemoryRouter><PaymentForm/></MemoryRouter>)

        llenar('Vencimiento (MM/AA)','1228')
        expect(screen.getByLabelText('Vencimiento (MM/AA)').value).toBe('12/28')

        llenar('Número de tarjeta (simulación)','12ab34-56')
        expect(screen.getByLabelText('Número de tarjeta (simulación)').value).toBe('123456')

        llenar('CVV (simulación)','1a2b3')
        expect(screen.getByLabelText('CVV (simulación)').value).toBe('123')
    })

    it('navega a /pago-completado cuando todos los datos son válidos',()=>{
        render(
            <MemoryRouter initialEntries={['/pago']}>
                <Routes>
                    <Route path="/pago" element={<PaymentForm/>}/>
                    <Route path="/pago-completado" element={<p>Pago completado</p>}/>
                </Routes>
            </MemoryRouter>
        )

        llenar('Nombre','Ginn')
        llenar('Apellidos','Soto')
        llenar('RUT','12345678-5')
        llenar('Número de tarjeta (simulación)','4111111111111111')
        llenar('Vencimiento (MM/AA)','1235')
        llenar('CVV (simulación)','123')

        fireEvent.click(screen.getByRole('button',{name:'Completar simulación'}))

        expect(screen.queryByText(/Revisa los campos marcados/)).toBeNull()
        expect(screen.getByText('Pago completado')).toBeTruthy()
    })
})
