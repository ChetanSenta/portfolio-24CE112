import './App.css'
import { useEffect, useState } from 'react'
import About from './components/About'
import Footer from './components/Footer'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Projects from './components/Projects'
import Skills from './components/Skills'

const skills = {
  languages: { icon: '⌘', items: ['C++', 'C', 'Java', 'SQL', 'Python'] },
  technologies: { icon: '◈', items: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'MongoDB'] },
  tools: { icon: '✦', items: ['VS Code', 'GitHub', 'GitHub Copilot'] },
}

const projects = [
  {
    name: 'Cashen',
    description:
      'A full-stack budget management application with expense categorization, planning tools, analytics, budget alerts, and secure authentication.',
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
    impact: 'Secure financial planning with real-time analytics and budget alerts.',
    links: { github: 'https://github.com/ChetanSenta/Cashen' },
  },
  {
    name: 'Pizza Delivery Application',
    description:
      'A full-stack ordering platform with JWT authentication, pizza customization, role-based access control, and a real-time order tracking workflow.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    impact: 'JWT auth, role-based access, and real-time order tracking for 100+ users.',
    links: {},
  },
  {
    name: 'Competitive Programming',
    description:
      'Consistent problem-solving practice focused on data structures, algorithms, optimized solutions, and maintainable code.',
    technologies: ['C++', 'Data Structures', 'Algorithms'],
    impact: 'Codeforces 1068 · LeetCode 1473 · CodeChef 1088.',
    links: {
      codolio: 'https://codolio.com/profile/Chetan_31',
      leetcode: 'https://leetcode.com/u/Chetan_31',
      codeforces: 'https://codeforces.com/profile/Chetan_31',
      codechef: 'https://www.codechef.com/users/senta_31',
    },
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => document.documentElement.dataset.theme === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('portfolio-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <div className="app">
      <NavBar darkMode={darkMode} onToggleTheme={() => setDarkMode((isDark) => !isDark)} />
      <main>
        <Header
          name="Chetan Senta"
          tagline="I build dependable web products and developer tools for people who value clarity, speed, and thoughtful engineering."
        />
        <About
          education="B.Tech in Computer Engineering"
          university="Charotar University of Science and Technology"
          summary="I like turning complex problems into calm, useful interfaces. From budget dashboards to delivery workflows, I care about the details that make software feel trustworthy."
          experience="Web Development and Designing Intern · Oasis Infobyte · May–June 2026"
        />
        <Skills skillGroups={skills} />
        <Projects projectList={projects} />
      </main>
      <Footer email="chetansenta11@gmail.com" phone="+91 635440XXXX" />
    </div>
  )
}

export default App
