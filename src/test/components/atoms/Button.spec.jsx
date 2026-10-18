import React from 'react';
import {Button} from '../../../components/atoms/Button';
import { cleanup } from '@testing-library/react';

describe('Atomo Button', ()=>{
    afterEach(() => cleanup())

    it('renderiza el texto hijo dentro de un botón', () => {
        render(<Button>Guardar</Button>);
        const button = screen.getByRole('button', { name: 'Guardar' });
        expect(button).toBeTruthy();
    });

    it('aplica las clases de variant y size', () => {
        render(<Button variant="danger" size="lg">Eliminar</Button>);
        const button = screen.getByRole('button', { name: 'Eliminar' });
        expect(button).toHaveClass('btn-danger');
        expect(button).toHaveClass('btn-lg');
    });

    it('ejecuta onClick al hacer click, pero no cuando está deshabilitado', () => {
        const onClick = jasmine.createSpy('onClick');

        const { rerender } = render(<Button onClick={onClick}>Enviar</Button>);
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
        expect(onClick).toHaveBeenCalledTimes(1);

        rerender(<Button onClick={onClick} disabled>Enviar</Button>);
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});