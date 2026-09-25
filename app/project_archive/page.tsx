import PortfolioSidebar from "@/components/PortfolioSidebar";

const projects = [
    {
        year: '2026',
        name: 'Hushfield',
        tools: ['React Native', 'Expo', 'TypeScript', 'Audio DSP', 'CoreAudio', 'iOS', 'Android'],
        url: 'https://apps.apple.com/app/id6802781534',
        urlName: 'App Store',
    },
    {
        year: '2026',
        name: 'QueryIO',
        tools: ['MCP', 'PostgreSQL', 'TypeScript', 'SQL AST', 'Zod', 'Docker'],
        url: '',
        urlName: '',
    },
    {
        year: '2026',
        name: 'Paperrow',
        tools: ['Next.js 16', 'PostgreSQL', 'Gemini', 'Google Sheets API', 'Cloudflare R2', 'Stripe'],
        url: 'https://paperrow.com',
        urlName: 'paperrow.com',
    },
    {
        year: '2025',
        name: 'PageMind',
        tools: ['TypeScript', 'Next.js 14', 'Prisma', 'LangChain', 'Pinecone', 'tRPC', 'Zod'],
        url: 'https://pagemind.app',
        urlName: 'pagemind.app',
    },
    {
        year: '2025',
        name: 'Serverus',
        tools: ['TypeScript', 'Node.js', 'Express', 'AWS EC2', 'Redis', 'Docker', 'S3'],
        url: 'https://github.com/aradhyas8/serverus',
        urlName: 'GitHub',
    },
    {
        year: '2024',
        name: 'Flowrite',
        tools: ['TypeScript', 'Node.js', 'Socket.io', 'MongoDB', 'React'],
        url: 'https://github.com/aradhyas8/Flowrite',
        urlName: 'GitHub',
    },
    {
        year: '2023',
        name: 'CSHub',
        tools: ['Spring Boot', 'Java', 'PostgreSQL', 'REST APIs', 'Docker'],
        url: 'https://www.cshub.tech',
        urlName: 'cshub.tech',
    },
    {
        year: '2023',
        name: 'yuHacks',
        tools: ['TypeScript', 'Next.js', 'GraphQL', 'Node.js', 'Tailwind CSS'],
        url: 'https://yuhacks.ca',
        urlName: 'yuhacks.ca',
    },
    {
        year: '2023',
        name: 'Project: Human City',
        tools: ['React', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL'],
        url: 'https://projecthumancity.com/',
        urlName: 'projecthumancity.com',
    },
    {
        year: '2023',
        name: 'API Generator',
        tools: ['JavaScript', 'Node.js', 'MongoDB', 'GraphQL', 'Express'],
        url: 'https://github.com/aradhyas8/API-Generator',
        urlName: 'GitHub',
    },
    {
        year: '2022',
        name: 'For The Horses',
        tools: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB'],
        url: 'https://github.com/aradhyas8/ForTheHorses',
        urlName: 'GitHub',
    },
    {
        year: '2024',
        name: 'v2.aradhya',
        tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
        url: 'https://aradhyapf.vercel.app/',
        urlName: 'aradhyapf.vercel.app',
    },
    {
        year: '2023',
        name: 'Portfolio v1',
        tools: ['JavaScript', 'React', 'Bootstrap'],
        url: 'https://v1aradhya.vercel.app/',
        urlName: 'v1aradhya.vercel.app',
    },
]

export default function ProjectArchivePage() {
  return (
    <div className="portfolio portfolio-archive">
      <a className="skip-link" href="#archive-main">Skip to projects</a>
      <div className="portfolio-shell">
        <PortfolioSidebar archive />

        <main id="archive-main" className="portfolio-main">
          <header className="archive-head">
            <a className="text-link" href="/">← Selected work</a>
            <h1>Project archive</h1>
            <p>More of the products, tools, and experiments I’ve built.</p>
          </header>

          <div className="archive-list">
            <div className="archive-labels" aria-hidden="true"><span>Year</span><span>Project</span><span>Tools</span><span>Link</span></div>
            {[...projects].sort((a, b) => Number(b.year) - Number(a.year)).map((project) => (
              <article className="archive-row" key={project.name}>
                <time dateTime={project.year}>{project.year}</time>
                <h2>{project.name}</h2>
                <p>{project.tools.slice(0, 4).join(" · ")}</p>
                {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={"Open " + project.name + ": " + project.urlName}>{project.urlName} ↗</a>}
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
