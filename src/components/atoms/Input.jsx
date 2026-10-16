import { Form } from 'react-bootstrap'

export function Input({ className = '', type = 'text', ...props }) {
  const componentProps = {
    className,
    ...(type === 'textarea' ? { as: 'textarea' } : { type }),
    ...props,
  }
  return <Form.Control {...componentProps} />
}