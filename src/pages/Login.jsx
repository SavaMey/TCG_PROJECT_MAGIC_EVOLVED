import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form } from 'react-bootstrap'
import { Text } from '../components/atoms/Text'
import { Input } from '../components/atoms/Input'
import { Button } from '../components/atoms/Button'
import { validarLogin, guardarSesion } from '../utils/validarLogin'

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validarLogin(form)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    guardarSesion({ email: form.email.trim(), invitado: false })
    navigate('/home')
  }

  const handleInvitado = () => {
    guardarSesion({ invitado: true })
    navigate('/home')
  }

  return (
    <Container className="my-5" style={{ maxWidth: 420 }}>
      <div className="text-center mb-4">
        <Text variant="h2">Iniciar sesión</Text>
      </div>

      <Form noValidate onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
        <Form.Group className="mb-3" controlId="login-email">
          <Form.Label>Correo electrónico</Form.Label>
          <Input
            type="email"
            name="email"
            placeholder="nombre@correo.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            isInvalid={!!errores.email}
          />
          <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4" controlId="login-password">
          <Form.Label>Contraseña</Form.Label>
          <Input
            type="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            isInvalid={!!errores.password}
          />
          <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          Entrar
        </Button>
      </Form>

      <div className="d-flex align-items-center my-3">
        <hr className="flex-grow-1" />
        <span className="mx-3 text-muted">o</span>
        <hr className="flex-grow-1" />
      </div>

      <Button type="button" variant="outline-secondary" className="w-100" onClick={handleInvitado}>
        Entrar como invitado
      </Button>
    </Container>
  )
}

export default Login