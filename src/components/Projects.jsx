import { useState } from "react";
import SplitText from "./SplitText";
import "./Projects.css";

const META = [
  { key: "role", label: "Rol" },
  { key: "timeline", label: "Duración" },
  { key: "year", label: "Año" },
  { key: "team", label: "Equipo" },
];

function Projects({ projects }) {
  const [active, setActive] = useState(0);

  return (
    <section id="proyectos" className="section projects">
      <p className="seccion-label">{projects.label}</p>
      <h2 className="seccion-titulo projects-heading">{projects.title}</h2>

      <ul className="projects-list" onMouseLeave={() => setActive(0)}>
        {projects.items.map((project, index) => {
          const isActive = index === active;
          const rowClass = isActive ? "project-row is-active" : "project-row";

          return (
            <li key={project.id} className={rowClass} onMouseEnter={() => setActive(index)}>
              <a href={project.url} target="_blank" rel="noreferrer" className="project-link" onFocus={() => setActive(index)}>
                <div className="project-main">
                  <div className="project-head">
                    <SplitText as="h3" text={project.name} active={isActive} className="project-title" />
                    <span className="project-cta">
                      <SplitText text="Ver proyecto →" active={isActive} />
                    </span>
                  </div>

                  <dl className="project-meta">
                    {META.map(({ key, label }) => (
                      <div key={key}>
                        <dt>{label}</dt>
                        <dd>
                          <SplitText text={project[key]} active={isActive} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <figure className="project-cover">
                  <img src={project.image} alt={"Captura de " + project.name} loading="lazy" />
                  <figcaption className="project-overlay">
                    <span className="chip">{project.category}</span>
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">{tech}</span>
                    ))}
                  </figcaption>
                </figure>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default Projects;