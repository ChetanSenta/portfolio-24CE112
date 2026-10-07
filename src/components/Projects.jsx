import { useCallback, useEffect, useMemo, useState } from 'react'
import { IGNORE_REPOS } from '../data/portfolio'

const CACHE_KEY = 'chetan-github-repositories'
const CACHE_DURATION = 10 * 60 * 1000
const FEATURED_REPOS = new Set(['Cashen', 'Pizzara'])

function ProjectPreview({ type }) {
  if (type === 'cashen') {
    return (
      <div className="preview-panel dashboard-preview" aria-label="Cashen dashboard preview">
        <div className="preview-window-bar"><i /><i /><i /><span>cashen / dashboard</span></div>
        <div className="dashboard-body">
          <div className="dashboard-stats">
            <span><b>₹12.4k</b><small>Spent</small></span>
            <span><b>₹20k</b><small>Budget</small></span>
            <span><b>₹7.6k</b><small>Saved</small></span>
          </div>
          <div className="dashboard-chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <div className="dashboard-progress"><span /></div>
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

function ProjectLinks({ links }) {
  const entries = [
    ['live', 'Live Demo'],
    ['github', 'GitHub'],
    ['codolio', 'Codolio'],
    ['leetcode', 'LeetCode'],
    ['codeforces', 'Codeforces'],
    ['codechef', 'CodeChef'],
  ]

  const available = entries.filter(([key]) => links[key])
  if (available.length === 0) return null

  return (
    <div className="project-links">
      {available.map(([key, label]) => (
        <a href={links[key]} key={key} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">→</span></a>
      ))}
    </div>
  )
}

function SkeletonCards() {
  return (
    <div className="repository-grid" aria-label="Loading repositories">
      {[1, 2, 3, 4, 5, 6].map((item) => <div className="repository-skeleton" key={item}><span /><span /><span /></div>)}
    </div>
  )
}

function RepositoryCard({ repo }) {
  const hasDescription = Boolean(repo.description)
  const isFeatured = FEATURED_REPOS.has(repo.name)

  return (
    <a className="repository-card" href={repo.html_url} target="_blank" rel="noreferrer">
      <div className="repository-card__top">
        <h3>{repo.name}</h3>
        <span className="repository-card__counts">★ {repo.stargazers_count} · ⑂ {repo.forks_count}</span>
      </div>
      {hasDescription && <p>{repo.description}</p>}
      <div className="repository-card__bottom">
        <span className="repository-language"><i />{repo.language || 'Code'}</span>
        {isFeatured && <span className="featured-badge">Featured</span>}
        <span className="repository-card__arrow" aria-hidden="true">→</span>
      </div>
    </a>
  )
}

function Projects({ projectList }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [showAll, setShowAll] = useState(false)

  const fetchRepositories = useCallback(async (signal) => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          setRepos(parsed.data)
          setLoading(false)
          return
        }
      }

      const response = await fetch('https://api.github.com/users/ChetanSenta/repos?sort=updated&per_page=100', { signal })
      if (!response.ok) throw new Error(`GitHub returned ${response.status}`)
      const data = await response.json()
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }))
      setRepos(data)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setError('GitHub is unavailable right now. Please try again or visit the profile directly.')
    } finally {
      if (!signal.aborted) setLoading(false)
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

  const visibleRepos = useMemo(() => {
    return repos
      .filter((repo) => !IGNORE_REPOS.includes(repo.name) && !repo.fork && !repo.is_template)
      .filter((repo) => repo.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at) || b.stargazers_count - a.stargazers_count)
  }, [repos, search])

  const shownRepos = showAll ? visibleRepos : visibleRepos.slice(0, 6)

  return (
    <section id="projects" className="content-section projects-section">
      <div className="project-heading">
        <div>
          <p className="eyebrow">Projects</p>
          <h1>Things I&apos;ve<br /><em>worked on.</em></h1>
        </div>
        <p className="project-intro">A selection of products, experiments, and problem-solving work built with care.</p>
      </div>
      <div className="project-list">
        {projectList.map((project, index) => (
          <article className="project-card" key={project.name}>
            <span className="project-number">0{index + 1}</span>
            <div className="project-info">
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-impact"><strong>Impact</strong> {project.impact}</p>
              <ul className="tag-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              <ProjectLinks links={project.links} />
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
        <div className="repository-controls">
          <label className="repository-search">
            <span>Search repositories</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filter by name..." />
          </label>
          {!loading && !error && <p className="repository-count">{visibleRepos.length} {visibleRepos.length === 1 ? 'repository' : 'repositories'} found</p>}
        </div>
        {loading && <SkeletonCards />}
        {error && (
          <div className="repository-error" role="alert">
            <p>{error}</p>
            <div><button className="details-toggle" type="button" onClick={retryFetch}>Retry</button> <a href="https://github.com/ChetanSenta?tab=repositories" target="_blank" rel="noreferrer">Open GitHub</a></div>
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="repository-grid">
              {shownRepos.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}
              {shownRepos.length === 0 && <p className="repository-status">No repositories match “{search}”.</p>}
            </div>
            {visibleRepos.length > 6 && <button className="show-all-button" type="button" onClick={() => setShowAll((visible) => !visible)}>{showAll ? 'Show fewer repositories' : `Show all ${visibleRepos.length} repositories`}</button>}
          </>
        )}
      </section>
    </section>
  )
}

export default Projects
