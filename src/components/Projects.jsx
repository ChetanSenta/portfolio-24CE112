import { useCallback, useEffect, useState } from 'react'

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
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const fetchRepositories = useCallback(async (signal) => {
    try {
      const response = await fetch('https://api.github.com/users/ChetanSenta/repos?sort=updated&per_page=100', { signal })
      if (!response.ok) {
        throw new Error(`GitHub returned ${response.status}`)
      }

      const data = await response.json()
      setRepos(data)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setError('Repositories could not be loaded right now. Please try again.')
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    fetchRepositories(controller.signal)
    return () => controller.abort()
  }, [fetchRepositories])

  const retryFetch = () => {
    setLoading(true)
    setError('')
    fetchRepositories(new AbortController().signal)
  }

  const filteredRepos = repos.filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))

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
      <section className="repository-section" aria-labelledby="repository-heading">
        <div className="repository-heading">
          <div>
            <p className="eyebrow">Live from GitHub</p>
            <h2 id="repository-heading">Open source<br /><em>work.</em></h2>
          </div>
          <a className="button button-secondary" href="https://github.com/ChetanSenta?tab=repositories" target="_blank" rel="noreferrer">View GitHub</a>
        </div>
        <label className="repository-search">
          <span>Search repositories</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filter by name..." />
        </label>
        {loading && <p className="repository-status" role="status">Loading repositories...</p>}
        {error && (
          <div className="repository-error" role="alert">
            <p>{error}</p>
            <button className="details-toggle" type="button" onClick={retryFetch}>Retry</button>
          </div>
        )}
        {!loading && !error && (
          <>
            <p className="repository-count">{filteredRepos.length} {filteredRepos.length === 1 ? 'repository' : 'repositories'} found</p>
            <div className="repository-list">
              {filteredRepos.map((repo) => (
                <a className="repository-card" href={repo.html_url} target="_blank" rel="noreferrer" key={repo.id}>
                  <div>
                    <h3>{repo.name}</h3>
                    <p>{repo.description || 'No description provided.'}</p>
                  </div>
                  <div className="repository-meta">
                    <span>{repo.language || 'Code'}</span>
                    <span>★ {repo.stargazers_count}</span>
                    <span>⑂ {repo.forks_count}</span>
                  </div>
                </a>
              ))}
              {filteredRepos.length === 0 && <p className="repository-status">No repositories match “{search}”.</p>}
            </div>
          </>
        )}
      </section>
    </section>
  )
}

export default Projects
