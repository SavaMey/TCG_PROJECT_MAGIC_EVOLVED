import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Image } from '../../../components/atoms/Image';

describe('Atomo Image', () => {
    afterEach(() => cleanup())

    it('renderiza la imagen con src y alt', () => {
        render(<Image src = "producto.jpg" alt = "Cartita pa comprar" />)
        const img = screen.getByRole('img', { name: 'Cartita pa comprar' })
        expect(img.getAttribute('src')).toBe('producto.jpg')
    })

    it('usa alt vacio por defecto', () => {
        const { container } = render(<Image src="producto.jpg" />)
        const img = container.querySelector('img')
        expect(img.getAttribute('alt')).toBe('')
    })

    it('aplica la clase recibida en className', () => {
        render(<Image src="producto.jpg" alt="Producto" className="img-fluid rounded" />)
        const img = screen.getByRole('img', { name: 'Producto' })
        expect(img).toHaveClass('img-fluid')
        expect(img).toHaveClass('rounded')
    })

    it('reenvía props adicionales al elemento img', () => {
        render(<Image src="producto.jpg" alt="Producto" width="200" loading="lazy" data-testid="mi-imagen" />)
        const img = screen.getByTestId('mi-imagen')
        expect(img.getAttribute('width')).toBe('200')
        expect(img.getAttribute('loading')).toBe('lazy')
    })

    it('ejecuta onError cuando la imagen falla al cargar', () => {
        const onError = jasmine.createSpy('onError')
        render(<Image src="rota.jpg" alt="Rota" onError={onError} />)
        fireEvent.error(screen.getByRole('img', { name: 'Rota' }))
        expect(onError).toHaveBeenCalledTimes(1)
    })
})