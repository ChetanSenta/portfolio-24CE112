function Header({ name, tagline }) {
  return (
    <header id="home" className="hero-section">
      <div className="hero-copy">
        <p className="eyebrow">Hello, I&apos;m</p>
        <p className="status-badge">
          <span /> Open to internships · 2026
        </p>
        <h1>
          {name.split(" ")[0]} <em>{name.split(" ")[1]}</em>
        </h1>
        <p className="hero-tagline">{tagline}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects"> View my work </a>
          <a
            className="button button-secondary"
            href="mailto:chetansenta11@gmail.com"
          >
            Get in touch
          </a>
          <a
            className="button button-quiet"
            href="/Chetan-Senta-Resume.pdf"
            download
          >
            Download Resume
          </a>
        </div>
        <div className="social-links" aria-label="Social links">
          <a
            href="https://github.com/ChetanSenta"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            href="https://www.linkedin.com/in/chetan-senta/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href="https://leetcode.com/u/Chetan_31"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
          >
            LC
          </a>
          <a
            href="https://codeforces.com/profile/Chetan_31"
            target="_blank"
            rel="noreferrer"
            aria-label="Codeforces"
          >
            CF
          </a>
        </div>
      </div>
      <aside className="hero-console" aria-label="Current focus">
        <div className="console-bar">
          <span />
          <span />
          <span /> <small>currently-building.js</small>
        </div>
        <pre>
          <code>{`const focus = {
  building: "useful products",
  learning: "cloud + AI",
  mindset: "ship with care",
}`}</code>
        </pre>
        <p>
          <span className="console-cursor">_</span> Always curious, always
          iterating.
        </p>
      </aside>
    </header>
  );
}

export default Header;
