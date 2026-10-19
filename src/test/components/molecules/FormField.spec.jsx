import { render, screen, fireEvent } from '@testing-library/react'
import { FormField } from '../../../components/molecules/FormField'

describe('Molécula FormField', () => {

    it('asocia la etiqueta con el campo y muestra su valor', () => {
        render(
        <FormField name="correo" label="Correo" value="ginn@mail.cl" onChange={() => {}} />
        )

        const input = screen.getByLabelText('Correo')
        expect(input).toBeTruthy()
        expect(input.getAttribute('name')).toBe('correo')
        expect(input.value).toBe('ginn@mail.cl')
    })

    it('llama a onChange cuando el usuario escribe en el campo', () => {
        let valorRecibido = null
        const onChange = jasmine.createSpy('onChange').and.callFake(e => {
        valorRecibido = e.target.value
        })
        render(<FormField name="correo" label="Correo" value="" onChange={onChange} />)

        fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'nuevo@mail.cl' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(valorRecibido).toBe('nuevo@mail.cl')
    })

    it('muestra el error y lo vincula al campo solo cuando se entrega "error"', () => {
        const { rerender } = render(
        <FormField name="correo" label="Correo" value="" onChange={() => {}}
            isInvalid error="Correo inválido" />
        )
        const input = screen.getByLabelText('Correo')
        expect(screen.getByText('Correo inválido')).toBeTruthy()
        expect(input.getAttribute('aria-describedby')).toBe('correo-error')
        expect(input.classList.contains('is-invalid')).toBeTrue()

        rerender(<FormField name="correo" label="Correo" value="" onChange={() => {}} />)
        expect(screen.queryByText('Correo inválido')).toBeNull()
        expect(screen.getByLabelText('Correo').getAttribute('aria-describedby')).toBeNull()
    })
})