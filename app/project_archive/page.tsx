import TopNav from "@/components/TopNav";
import { projects } from "@/components/projects";

export default function ProjectArchivePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to projects</a>
      <TopNav archive />

      <main id="main" className="page">
        <section className="archive">
          <a className="text-link back-link" href="/">Home</a>
          <h1 className="archive-title">Project archive</h1>
          <p className="body-copy">More of the products, tools, and experiments I&rsquo;ve built.</p>

          <ol className="archive-list">
            {[...projects].sort((a, b) => Number(b.year) - Number(a.year)).map((project) => (
              <li className="archive-row" data-reveal="up" key={project.name}>
                <span className="exp-time">{project.year}</span>
                <h2>{project.name}</h2>
                <ul className="archive-tools" aria-label="Built with">
                  {project.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <div className="archive-links">
                  {project.status ? <span className="project-status"><span className="live-dot" aria-hidden="true" />{project.status}</span> : null}
                  {project.links.map((l) => (
                    <a key={l.href} className="text-link" href={l.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.name}: ${l.label}`}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
