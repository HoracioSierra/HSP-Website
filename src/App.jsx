import React from 'react';
import ProjectIsland from './components/ProjectIsland';
import PixelCat from './components/PixelCat';
import projects from './data/projects';

function App() {
  return (
    <div className="app-shell">
      <main className="hero-section">
        <section className="hero-copy">
          <h1>Horacio Sierra Perez</h1>
          <p className="eyebrow">developer · student · builder</p>

          <div className="hero-grid">
            <div className="hero-left">
              <div className="panel">
                <p className="label">about me</p>
                <p>computer science @ ucf.</p>
                <p>
                  currently building something
                  <span className="loading-dots">
                    <span>•</span>
                    <span>•</span>
                    <span>•</span>
                  </span>
                </p>
              </div>

              <div className="panel">
                <p className="label">contact me</p>
                <p>ho361339@ucf.edu</p>
                <div className="links-row">
                  <a href="https://github.com/" target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                  <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="panel">
                <p className="label">tech stack</p>
                <p>python, c, java, javascript/typescript</p>
                <p>react, node.js, express, mongodb</p>
                <p>git, github, postman, digitalocean</p>
              </div>

              <div className="panel">
                <p className="label">about this site</p>
                <p>built with react, vite, and css</p>
              </div>
            </div>

            <div className="hero-right">
              <div className="profile-card">
                <div className="profile-image" />
                <p className="profile-caption">profile image placeholder</p>
                <a className="resume-button" href="/Horacio-Sierra-Perez.pdf" target="_blank" rel="noreferrer">
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="projects-section">
          <div className="section-header">
            <p className="label">projects</p>
            <h2>recent work</h2>
            <p className="section-copy">
              Click each card to open the GitHub repository.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectIsland key={project.name} project={project} />
            ))}
          </div>
        </section>

        <section className="activity-panel panel">
          <p className="label">github activity</p>
          <p>Recent project updates appear here. This section is optional-looking for now.</p>
        </section>
      </main>

      <PixelCat />
    </div>
  );
}

export default App;
