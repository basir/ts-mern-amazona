import Alert from 'react-bootstrap/Alert'

export default function MessageBox({
  variant = 'info',
  children,
}: {
  variant?: string
  children: React.ReactNode
}) {
  return <Alert variant={variant || 'info'}>{children}</Alert>
}
