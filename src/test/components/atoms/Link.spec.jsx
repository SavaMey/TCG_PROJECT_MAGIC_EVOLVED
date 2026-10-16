import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Link } from '../../../components/atoms/Link'

describe('Átomo Link', () => {
    afterEach(() => cleanup())

    it('renderiza un enlace con el texto y el href correctos', () => {
        render(
        <MemoryRouter>
            <Link to="/productos">Ver productos</Link>
        </MemoryRouter>
        )
        const link = screen.getByRole('link', { name: 'Ver productos' })
        expect(link.getAttribute('href')).toBe('/productos')
    })

    it('aplica la className y reenvía props adicionales', () => {
        render(
        <MemoryRouter>
            <Link to="/" className="nav-link" title="Ir al inicio">Inicio</Link>
        </MemoryRouter>
        )
        const link = screen.getByRole('link', { name: 'Inicio' })
        expect(link).toHaveClass('nav-link')
        expect(link.getAttribute('title')).toBe('Ir al inicio')
    })

    it('navega a la ruta indicada al hacer click', () => {
        render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
            <Route path="/" element={<Link to="/productos">Ir a productos</Link>} />
            <Route path="/productos" element={<h1>Página de Productos</h1>} />
            </Routes>
        </MemoryRouter>
        )

        fireEvent.click(screen.getByRole('link', { name: 'Ir a productos' }))

        expect(screen.getByText('Página de Productos')).toBeTruthy()
    })
})