import About from '../components/About'
import Header from '../components/Header'
import Skills from '../components/Skills'
import { skills } from '../data/portfolio'

export default function Home() {
  return (
    <>
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
    </>
  )
}
