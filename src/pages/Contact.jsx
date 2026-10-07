import { useState } from 'react'

export default function Contact() {
  const [message, setMessage] = useState('')
  const [showDetails, setShowDetails] = useState(false)

  return (
    <section className="content-section contact-page">
      <div className="section-heading">
        <p className="eyebrow">Contact</p>
        <h1>Let&apos;s make it<br /><em>happen.</em></h1>
      </div>
      <div className="contact-page__content">
        <p className="about-summary">Have a project idea, internship opportunity, or simply want to say hello? Send a message and I&apos;ll get back to you.</p>
        <form className="contact-form contact-page__form" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" name="name" placeholder="Your name" required />
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Tell me about your idea..."
            maxLength={500}
            rows={5}
            required
          />
          <p className="character-count">{message.length}/500 characters</p>
          <button className="button button-primary" type="submit">Send message</button>
        </form>
        <button className="details-toggle" type="button" onClick={() => setShowDetails((visible) => !visible)} aria-expanded={showDetails}>
          {showDetails ? 'Hide contact details' : 'Show contact details'}
        </button>
        {showDetails && (
          <div className="contact-details">
            <a href="mailto:chetansenta11@gmail.com">chetansenta11@gmail.com</a>
            <a href="tel:+91635440XXXX">+91 635440XXXX</a>
          </div>
        )}
      </div>
    </section>
  )
}
