import { Link as RouterLink } from 'react-router-dom'

export function Link({ to, children, className, ...props }) {
  return (
    <RouterLink to={to} className={className} {...props}>
      {children}
    </RouterLink>
  )
}