function About({ education, university, summary, experience }) {
  return (
    <section id="about" className="content-section about-section">
      <div className="section-heading">
        <p className="eyebrow">01 / About me</p>
        <h2>Curious mind.<br /><em>Practical builder.</em></h2>
      </div>
      <div className="about-content">
        <p className="about-summary">{summary}</p>
        <div className="stats-row">
          <div><strong>7.38</strong><span>CGPA / 10</span></div>
          <div><strong>02</strong><span>Projects built</span></div>
          <div><strong>150+</strong><span>Problems solved</span></div>
          <div><strong>03</strong><span>Years coding</span></div>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-year">2024 — Present</span>
            <div><p className="detail-label">Education</p><p>{education}</p><p className="muted">{university} · CGPA 7.38/10</p></div>
          </div>
          <div className="timeline-item">
            <span className="timeline-year">May — Jun 2026</span>
            <div><p className="detail-label">Experience</p><p>{experience}</p><p className="muted">Remote · Full-stack web development</p></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
