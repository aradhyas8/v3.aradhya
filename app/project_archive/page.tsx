import TopNav from "@/components/TopNav";

const projects: { year: string; name: string; status?: string; tools: string[]; links: { label: string; href: string }[] }[] = [
    {
        year: '2026',
        name: 'Hushfield',
        tools: ['React Native', 'Expo', 'Audio DSP'],
        links: [
            { label: 'App Store', href: 'https://apps.apple.com/app/id6802781534' },
            { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.inethan18.hushfield' },
        ],
    },
    {
        year: '2026',
        name: 'QueryIO',
        status: 'In development',
        tools: ['TypeScript', 'MCP', 'PostgreSQL'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/query-io' }],
    },
    {
        year: '2026',
        name: 'Paperrow',
        status: 'In development',
        tools: ['Next.js', 'PostgreSQL', 'Gemini'],
        links: [],
    },
    {
        year: '2025',
        name: 'PageMind',
        tools: ['Next.js', 'LangChain', 'Pinecone'],
        links: [{ label: 'pagemind.app', href: 'https://pagemind.app' }],
    },
    {
        year: '2025',
        name: 'Serverus',
        tools: ['Node.js', 'Redis', 'AWS EC2'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/serverus' }],
    },
    {
        year: '2024',
        name: 'Flowrite',
        tools: ['React', 'Socket.io', 'MongoDB'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/Flowrite' }],
    },
    {
        year: '2023',
        name: 'CSHub',
        tools: ['Spring Boot', 'PostgreSQL'],
        links: [{ label: 'cshub.tech', href: 'https://www.cshub.tech' }],
    },
    {
        year: '2023',
        name: 'yuHacks',
        tools: ['Next.js', 'GraphQL'],
        links: [{ label: 'yuhacks.ca', href: 'https://yuhacks.ca' }],
    },
    {
        year: '2023',
        name: 'Project: Human City',
        tools: ['React', 'PostgreSQL'],
        links: [{ label: 'projecthumancity.com', href: 'https://projecthumancity.com/' }],
    },
    {
        year: '2023',
        name: 'API Generator',
        tools: ['Node.js', 'GraphQL', 'MongoDB'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/API-Generator' }],
    },
    {
        year: '2022',
        name: 'For The Horses',
        tools: ['React', 'Express', 'MongoDB'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/ForTheHorses' }],
    },
    {
        year: '2022',
        name: 'Sorting Visualizer',
        tools: ['JavaScript'],
        links: [{ label: 'Live site', href: 'https://aradhyas8.github.io/Sorting-Algorithmn-Visualizer/' }],
    },
    {
        year: '2024',
        name: 'v2.aradhya',
        tools: ['Next.js', 'Framer Motion'],
        links: [{ label: 'aradhyapf.vercel.app', href: 'https://aradhyapf.vercel.app/' }],
    },
    {
        year: '2023',
        name: 'Portfolio v1',
        tools: ['React', 'Bootstrap'],
        links: [{ label: 'v1aradhya.vercel.app', href: 'https://v1aradhya.vercel.app/' }],
    },
]

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
