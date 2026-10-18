import React from 'react'
import {render,screen,cleanup} from '@testing-library/react'
import {Text} from '../../../components/atoms/Text'

describe('Átomo Text',()=>{
    afterEach(()=>cleanup())
    
    it('renderiza un título según la prop variant',()=>{
        render(<Text variant="h2">Catálogo</Text>)
        expect(screen.getByRole('heading',{level:2}).textContent).toBe('Catálogo')
    })

    it('utiliza párrafo por defecto',()=>{
        const {container}=render(<Text>Descripción</Text>)
        expect(container.querySelector('p')?.textContent).toBe('Descripción')
    })

    it('reenvía className al elemento renderizado', () => {
        render(<Text variant="h3" className="text-primary">Oferta</Text>)
        const heading = screen.getByRole('heading', { level: 3 })
        expect(heading).toHaveClass('text-primary')
    })

    it('renderiza correctamente una etiqueta span', () => {
        render(<Text variant="span">Texto en línea</Text>)
        expect(screen.getByText('Texto en línea').tagName.toLowerCase()).toBe('span')
    })

    it('renderiza nodos hijos complejos correctamente', () => {
        render(<Text>Hola <strong>Mundo</strong></Text>)
        expect(screen.getByText('Mundo').tagName.toLowerCase()).toBe('strong')
    })
})
