const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const espacios_regex = /\s/
const min_password = 6

export function validarLogin({ email, password }) {
  const errores = {}

  if (!email.trim()) {
    errores.email = 'Ingresa tu correo electrónico.'
  } else if (!email_regex.test(email.trim())) {
    errores.email = 'Ingresa un correo válido, por ejemplo nombre@correo.com.'
  }

  if (!password) {
    errores.password = 'Ingresa tu contraseña.'
  } else if (espacios_regex.test(password)) {
    errores.password = 'La contraseña no puede contener espacios.'
  } else if (password.length < min_password) {
    errores.password = `La contraseña debe tener al menos ${min_password} caracteres.`
  }

  return errores
}

export function guardarSesion(sesion) {
  try {
    localStorage.setItem('sesion', JSON.stringify(sesion))
  } catch {
  }
}