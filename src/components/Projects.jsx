function ProjectPreview({ type }) {
  if (type === 'cashen') {
    return (
      <div className="preview-panel dashboard-preview" aria-label="Cashen dashboard preview">
        <div className="preview-window-bar"><i /><i /><i /><span>cashen / dashboard</span></div>
        <div className="dashboard-body">
          <div className="dashboard-stats"><span /><span /><span /></div>
          <div className="dashboard-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="dashboard-progress"><span /><b /></div>
        </div>
      </div>
    )
  }

  if (type === 'pizza') {
    return (
      <div className="preview-panel tracker-preview" aria-label="Pizza delivery order tracking preview">
        <div className="preview-window-bar"><i /><i /><i /><span>order / tracking</span></div>
        <div className="tracker-body">
          {['Placed', 'Preparing', 'Baking', 'Out for delivery', 'Delivered'].map((step, index) => (
            <div className={index < 3 ? 'tracker-step complete' : 'tracker-step'} key={step}>
              <span>{index < 3 ? '✓' : index + 1}</span><small>{step}</small>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="preview-panel coding-preview" aria-label="Competitive programming ratings preview">
      <div className="coding-stats">
        <div><strong>1068</strong><small>Codeforces</small><i /></div>
        <div><strong>1473</strong><small>LeetCode</small><i /></div>
        <div><strong>1088</strong><small>CodeChef</small><i /></div>
      </div>
      <p>150+ problems solved</p>
    </div>
  )
}

function Projects({ projectList }) {
  return (
    <section id="projects" className="content-section projects-section">
      <div className="section-heading project-heading">
        <p className="eyebrow">03 / Selected work</p>
        <h2>Things I&apos;ve<br /><em>worked on.</em></h2>
      </div>
      <div className="project-list">
        {projectList.map((project, index) => (
          <article className="project-card" key={project.name}>
            <span className="project-number">0{index + 1}</span>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-impact"><strong>Impact</strong> {project.impact}</p>
              <ul className="tag-list">
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              {(project.links.live || project.links.github || project.links.codolio || project.links.leetcode || project.links.codeforces || project.links.codechef) && (
                <div className="project-links">
                  {project.links.live && <a href={project.links.live} target="_blank" rel="noreferrer">Live Demo</a>}
                  {project.links.github && <a href={project.links.github} target="_blank" rel="noreferrer">GitHub</a>}
                  {project.links.codolio && <a href={project.links.codolio} target="_blank" rel="noreferrer">Codolio</a>}
                  {project.links.leetcode && <a href={project.links.leetcode} target="_blank" rel="noreferrer">LeetCode</a>}
                  {project.links.codeforces && <a href={project.links.codeforces} target="_blank" rel="noreferrer">Codeforces</a>}
                  {project.links.codechef && <a href={project.links.codechef} target="_blank" rel="noreferrer">CodeChef</a>}
                </div>
              )}
            </div>
            <ProjectPreview type={index === 0 ? 'cashen' : index === 1 ? 'pizza' : 'coding'} />
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
