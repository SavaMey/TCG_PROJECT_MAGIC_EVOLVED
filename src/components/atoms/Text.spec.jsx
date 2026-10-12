import React from 'react'
import {render,screen,cleanup} from '@testing-library/react'
import {Text} from './Text'
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
})
