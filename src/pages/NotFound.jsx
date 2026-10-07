import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="content-section not-found-page">
      <div className="section-heading">
        <p className="eyebrow">404 / Page not found</p>
        <h1>This page took<br /><em>a wrong turn.</em></h1>
      </div>
      <div>
        <p className="about-summary">The route you requested does not exist. Return home to continue exploring the portfolio.</p>
        <Link className="button button-primary" to="/">Return home</Link>
      </div>
    </section>
  )
}
