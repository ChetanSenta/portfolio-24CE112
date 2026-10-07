function Skills({ skillGroups }) {
  return (
    <section id="skills" className="content-section skills-section">
      <div className="section-heading compact-heading">
        <p className="eyebrow">02 / Toolkit</p>
        <h2>Skills that turn<br /><em>ideas into impact.</em></h2>
      </div>
      <div className="skill-groups">
        {Object.entries(skillGroups).map(([groupName, group]) => (
          <div className="skill-group" key={groupName}>
            <p className="detail-label"><span className="skill-icon">{group.icon}</span>{groupName}</p>
            <ul>
              {group.items.map((skill) => <li key={skill}>{skill}</li>)}
            </ul>
          </div>
        ))}
        <div className="learning-row"><p className="detail-label">Currently learning</p><span>Cloud deployment</span><span>AI fundamentals</span></div>
      </div>
    </section>
  )
}

export default Skills
