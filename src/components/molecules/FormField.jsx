import { Form } from 'react-bootstrap'
export function FormField({name,label,value,onChange,isInvalid,error,...props}) {
  return <Form.Group controlId={name} className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control name={name} value={value} onChange={onChange} isInvalid={isInvalid} aria-describedby={error?`${name}-error`:undefined} {...props}/>
    {error && <Form.Control.Feedback type="invalid" id={`${name}-error`}>{error}</Form.Control.Feedback>}
  </Form.Group>
}
