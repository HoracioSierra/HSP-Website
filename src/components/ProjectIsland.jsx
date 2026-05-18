function ProjectIsland({ project }) {
  return (
    <article className="project-island">
      <div className="project-card-inner">
        <div className="project-card-face project-card-front">
          <div>
            <h3 className="project-name">{project.name}</h3>
            <p className="project-description">{project.description}</p>
          </div>

          {project.tech && <p className="project-tech">{project.tech}</p>}
        </div>

        <div className="project-card-face project-card-back">
          <div>
            <h3 className="project-name">{project.name}</h3>
          </div>

          {project.link ? (
            <a
              className="learn-more-button"
              href={project.link}
              target="_blank"
              rel="noreferrer"
            >
              Learn More →
            </a>
          ) : (
            <span className="learn-more-button disabled">
              Private Repo
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectIsland;