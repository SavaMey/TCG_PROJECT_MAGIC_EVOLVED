import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '../../../components/atoms/Input'

describe('Átomo Input', () => {
    it('renderiza un input de tipo text por defecto', () => {
        render(<Input placeholder="Nombre" />)
        const input = screen.getByPlaceholderText('Nombre')
        expect(input.tagName).toBe('INPUT')
        expect(input.getAttribute('type')).toBe('text')
    })

    it('aplica el type recibido', () => {
        render(<Input type="password" placeholder="Clave" />)
        const input = screen.getByPlaceholderText('Clave')
        expect(input.getAttribute('type')).toBe('password')
    })

    it('renderiza un textarea cuando type es "textarea"', () => {
        render(<Input type="textarea" placeholder="Comentario" />)
        const field = screen.getByPlaceholderText('Comentario')
        expect(field.tagName).toBe('TEXTAREA')
        expect(field.getAttribute('type')).toBeNull()
    })

    it('combina form-control con la className recibida', () => {
        render(<Input className="mb-3" placeholder="Correo" />)
        const input = screen.getByPlaceholderText('Correo')
        expect(input).toHaveClass('form-control')
        expect(input).toHaveClass('mb-3')
    })

    it('reenvía props y ejecuta onChange al escribir', () => {
        const onChange = jasmine.createSpy('onChange')
        render(<Input placeholder="Buscar" disabled={false} onChange={onChange} />)
        const input = screen.getByPlaceholderText('Buscar')

        fireEvent.change(input, { target: { value: 'pikachu' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(input.value).toBe('pikachu')
    })
})