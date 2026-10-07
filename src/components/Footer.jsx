function Footer({ email, phone }) {
  return (
    <footer className="site-footer">
      <div>
        <p className="eyebrow">Have a project in mind?</p>
        <h2>Let&apos;s make it<br /><em>happen.</em></h2>
      </div>
      <div className="footer-contact">
        <a href={`mailto:${email}`}>{email}</a>
        <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
        <div className="footer-socials">
          <a href="https://github.com/ChetanSenta" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/chetan-senta/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://leetcode.com/u/Chetan_31" target="_blank" rel="noreferrer">LeetCode</a>
        </div>
        <p>© 2026 Chetan Senta</p>
      </div>
    </footer>
  )
}

export default Footer
