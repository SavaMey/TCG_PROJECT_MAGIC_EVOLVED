export function validarRut(rut) {
  const limpio = rut.replace(/[.\s-]/g, '').toUpperCase()

  if (!/^\d{7,8}[\dK]$/.test(limpio)) {
    return false
  }

  const cuerpo = limpio.slice(0, -1)
  let suma = 0
  let factor = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }

  const resultado = 11 - (suma % 11)
  const digito = resultado === 11
    ? '0'
    : resultado === 10
      ? 'K'
      : String(resultado)

  return digito === limpio.slice(-1)
}

function validarNombre(nombre) {
  const limpio = nombre.trim()

  // Permite letras, tildes, ñ y espacios.
  // No permite números ni caracteres especiales.
  if (!/^[\p{L}\p{M} ]+$/u.test(limpio)) {
    return false
  }

  // Debe tener al menos 2 letras.
  const letras = limpio.replace(/ /g, '')

  if (letras.length < 2) {
    return false
  }

  // No permite 3 letras iguales consecutivas.
  if (/(.)\1\1/iu.test(letras)) {
    return false
  }

  return true
}

export function validatePayment(values) {
  const errors = {}

  if (!validarNombre(values.nombre)) {
    errors.nombre =
      'Usa al menos 2 letras, sin números ni símbolos, y evita 3 letras iguales seguidas.'
  }

  if (!validarNombre(values.apellido)) {
    errors.apellido =
      'Usa al menos 2 letras, sin números ni símbolos, y evita 3 letras iguales seguidas.'
  }

  if (!validarRut(values.rut)) {
    errors.rut = 'Ingresa un RUT chileno válido, incluido su dígito verificador.'
  }

  const numeroTarjeta = values.numeroTarjeta.replace(/\s/g, '')

  if (!/^\d{16}$/.test(numeroTarjeta)) {
    errors.numeroTarjeta = 'Ingresa 16 dígitos.'
  }

  const fecha = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(
    values.vencimiento.trim()
  )

  if (!fecha) {
    errors.vencimiento = 'Ingresa el vencimiento en formato MM/AA.'
  } else {
    const ahora = new Date()
    const mes = Number(fecha[1])
    const anio = 2000 + Number(fecha[2])

    if (
      anio < ahora.getFullYear() ||
      (anio === ahora.getFullYear() && mes < ahora.getMonth() + 1)
    ) {
      errors.vencimiento = 'La tarjeta está vencida.'
    }
  }

  if (!/^\d{3,4}$/.test(values.cvv.trim())) {
    errors.cvv = 'Ingresa 3 o 4 dígitos.'
  }

  return errors
}
