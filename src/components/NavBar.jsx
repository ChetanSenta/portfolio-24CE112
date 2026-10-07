import { useEffect, useState } from 'react'

function NavBar({ darkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects']
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: '-25% 0px -65% 0px' },
    )
    sections.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <a className="nav-brand" href="#home">
        CS<span>.</span>
      </a>
      <button className="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span />
      </button>
      <div className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
        {['about', 'skills', 'projects'].map((id) => (
          <a className={activeSection === id ? 'active' : ''} href={`#${id}`} key={id} onClick={closeMenu}>
            {id}
          </a>
        ))}
      </div>
      <div className="nav-tools">
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode}>
          <span aria-hidden="true">{darkMode ? '☼' : '☾'}</span>
        </button>
        <a className="nav-contact" href="mailto:chetansenta11@gmail.com">Let&apos;s connect</a>
      </div>
    </nav>
  )
}

export default NavBar
