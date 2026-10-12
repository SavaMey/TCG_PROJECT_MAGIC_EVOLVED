// Reglas de demostración para formulario sin procesamiento real de pagos.
export function validarRut(rut) {
  const limpio = rut.replace(/[.\s-]/g, '').toUpperCase()
  if (!/^\d{7,8}[\dK]$/.test(limpio)) return false
  const cuerpo = limpio.slice(0, -1)
  let suma = 0, factor = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) { suma += Number(cuerpo[i]) * factor; factor = factor === 7 ? 2 : factor + 1 }
  const resultado = 11 - (suma % 11)
  const digito = resultado === 11 ? '0' : resultado === 10 ? 'K' : String(resultado)
  return digito === limpio.slice(-1)
}
export function validatePayment(values) {
  const errors = {}
  if (!values.nombre.trim()) errors.nombre = 'Ingresa tu nombre.'
  if (!values.apellido.trim()) errors.apellido = 'Ingresa tus apellidos.'
  if (!validarRut(values.rut)) errors.rut = 'Ingresa un RUT chileno válido.'
  if (!/^\d{16}$/.test(values.numeroTarjeta.replace(/\s/g, ''))) errors.numeroTarjeta = 'Ingresa 16 dígitos.'
  const fecha = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(values.vencimiento.trim())
  if (!fecha) errors.vencimiento = 'Usa el formato MM/AA.'
  else {const now=new Date();const mes=Number(fecha[1]);const anio=2000+Number(fecha[2]);if(anio<now.getFullYear()||(anio===now.getFullYear()&&mes<now.getMonth()+1))errors.vencimiento='La fecha está vencida.'}
  if (!/^\d{3,4}$/.test(values.cvv.trim())) errors.cvv = 'Ingresa 3 o 4 dígitos.'
  return errors
}
