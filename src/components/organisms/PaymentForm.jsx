
import { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FormField } from '../molecules/FormField'
import { Button } from '../atoms/Button'
import { Link } from '../atoms/Link'
import { Text } from '../atoms/Text'
import { validatePayment } from '../../utils/validation'
import '../../styles/organisms/paymentForm.css'

const fields = [
  {
    name: 'nombre',
    label: 'Nombre',
    placeholder: 'Nombre'
  },
  {
    name: 'apellido',
    label: 'Apellidos',
    placeholder: 'Apellidos'
  },
  {
    name: 'rut',
    label: 'RUT',
    placeholder: '12345678-5'
  },
  {
    name: 'numeroTarjeta',
    label: 'Número de tarjeta (simulación)',
    placeholder: '16 dígitos',
    inputMode: 'numeric',
    maxLength: 16
  },
  {
    name: 'vencimiento',
    label: 'Vencimiento (MM/AA)',
    placeholder: '  /  ',
    inputMode: 'numeric',
    maxLength: 5
  },
  {
    name: 'cvv',
    label: 'CVV (simulación)',
    placeholder: '3 o 4 dígitos',
    type: 'password',
    inputMode: 'numeric',
    maxLength: 4
  }
]

const initial = Object.fromEntries(
  fields.map((field) => [field.name, ''])
)

export function PaymentForm() {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name } = event.target
    let { value } = event.target

    if (name === 'vencimiento') {
      const numeros = value.replace(/\D/g, '').slice(0, 4)

      if (numeros.length >= 2) {
        value = `${numeros.slice(0, 2)}/${numeros.slice(2)}`
      } else {
        value = numeros
      }
    }

    if (name === 'numeroTarjeta' || name === 'cvv') {
      value = value.replace(/\D/g, '')
    }

    setValues((previous) => ({
      ...previous,
      [name]: value
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: undefined
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const next = validatePayment(values)
    setErrors(next)

    if (Object.keys(next).length > 0) {
      event.currentTarget.elements[
        Object.keys(next)[0]
      ]?.focus()

      return
    }

    navigate('/pago-completado')
  }

  const renderField = (field) => (
    <FormField
      key={field.name}
      {...field}
      value={values[field.name]}
      onChange={handleChange}
      isInvalid={!!errors[field.name]}
      error={errors[field.name]}
      autoComplete="off"
    />
  )

  return (
    <Form
      onSubmit={handleSubmit}
      noValidate
      className="formulario-pago"
    >
      <Alert variant="info">
        Pago de demostración. No ingreses datos de una tarjeta real.
      </Alert>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger" role="alert">
          Revisa los campos marcados antes de continuar.
        </Alert>
      )}

      <Text variant="h2">Información personal</Text>

      {fields.slice(0, 3).map(renderField)}

      <Text variant="h2">
        Información de pago (simulada)
      </Text>

      {fields.slice(3).map(renderField)}

      <div className="d-flex gap-2 justify-content-center flex-wrap mt-4">
        <Link to="/cartas" className="btn btn-outline-dark">
          Volver a las cartas
        </Link>

        <Button type="submit" className="btn-comprar-bs">
          Completar simulación
        </Button>
      </div>
    </Form>
  )
}
