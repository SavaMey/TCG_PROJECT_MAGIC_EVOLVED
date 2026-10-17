import { Form } from 'react-bootstrap'

// Átomo del profesor: un <input> o un <textarea> según el "type"
export function Input({ className = '', type = 'text', ...props }) {
  const componentProps = {
    className,
    ...(type === 'textarea' ? { as: 'textarea' } : { type }),
    ...props,
  }
  return <Form.Control {...componentProps} />
}