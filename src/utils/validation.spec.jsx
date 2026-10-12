import {validarRut,validatePayment} from './validation'
describe('Validaciones del formulario',()=>{
 it('acepta un RUT válido de ejemplo',()=>{expect(validarRut('12.345.678-5')).toBeTrue()})
 it('rechaza un RUT incorrecto',()=>{expect(validarRut('12.345.678-9')).toBeFalse()})
 it('detecta campos vacíos y tarjeta inválida',()=>{
  const result=validatePayment({nombre:'',apellido:'',rut:'',numeroTarjeta:'',vencimiento:'',cvv:''})
  expect(Object.keys(result).length).toBe(6)
 })
 it('acepta un conjunto de datos ficticios válidos',()=>{
  const anio=String((new Date().getFullYear()+1)%100).padStart(2,'0')
  expect(Object.keys(validatePayment({nombre:'Ana',apellido:'Pérez',rut:'12345678-5',numeroTarjeta:'1111222233334444',vencimiento:'12/'+anio,cvv:'123'}))).toEqual([])
 })
})
