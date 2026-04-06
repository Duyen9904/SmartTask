import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>Page not found</h1>
      <p>The requested route does not exist.</p>
      <Link to="/">Go to dashboard</Link>
    </div>
  )
}
