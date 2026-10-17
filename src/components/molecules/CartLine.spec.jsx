import React from 'react'
import {render,screen,fireEvent,cleanup} from '@testing-library/react'
import {CartLine} from './CartLine'
describe('Molécula CartLine',()=>{
 afterEach(()=>cleanup())
 it('muestra el nombre, cantidad y subtotal de una carta',()=>{
  render(<CartLine item={{game:'Pokemon',name:'Sceptile',quantity:2,price:1000}} onIncrease={()=>{}} onDecrease={()=>{}} onRemove={()=>{}}/>)
  expect(screen.getByText(/Sceptile/)).toBeTruthy()
  expect(screen.getByText(/2.000/)).toBeTruthy()
 })
 it('invoca los eventos aumentar, disminuir y eliminar',()=>{
  const inc=jasmine.createSpy("aumentar"),dec=jasmine.createSpy("disminuir"),del=jasmine.createSpy("eliminar")
  render(<CartLine item={{game:'Pokemon',name:'Sceptile',quantity:1,price:1000}} onIncrease={inc} onDecrease={dec} onRemove={del}/>)
  fireEvent.click(screen.getByRole('button',{name:'Agregar uno'}))
  fireEvent.click(screen.getByRole('button',{name:'Quitar uno'}))
  fireEvent.click(screen.getByRole('button',{name:'Eliminar'}))
  expect(inc).toHaveBeenCalledTimes(1)
  expect(dec).toHaveBeenCalledTimes(1)
  expect(del).toHaveBeenCalledTimes(1)
 })
})
