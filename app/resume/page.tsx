import type { Metadata } from "next";
import TopNav from "@/components/TopNav";
import { ChipLink, SectionHeader } from "@/components/PortfolioHome";

export const metadata: Metadata = { title: "Résumé — Aradhya Singh" };

// Mirrors public/static/Resume/AradhyaSingh_Software_Developer.pdf; update both together. The phone number stays PDF-only.
const pdf = "/static/Resume/AradhyaSingh_Software_Developer.pdf";

const contact = [
  { label: "aradhya.dev", href: "https://aradhya.dev" },
  { label: "aradhyas8@zohomailcloud.ca", href: "mailto:aradhyas8@zohomailcloud.ca" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aradhyas8/" },
  { label: "GitHub", href: "https://github.com/aradhyas8" },
];

const summary =
  "Software Developer with experience building secure full-stack applications, REST APIs, automation tools, and LLM-powered platforms using Python, JavaScript, TypeScript, React, Node.js, SQL, PostgreSQL, Docker, and GitHub Actions. Strong background in authentication workflows, API testing, fraud technology, identity/access controls, and production issue investigation in financial services environments. Comfortable collaborating with technology, QA, security, and operations teams to deliver reliable, tested, production-ready software.";

const skills: [string, string[]][] = [
  ["Languages", ["Python", "JavaScript", "TypeScript", "SQL", "Java", "Bash"]],
  ["Frontend", ["React.js", "Next.js", "HTML", "CSS"]],
  ["Backend & APIs", ["Node.js", "Express.js", "Spring Boot", "REST APIs", "Prisma", "Hibernate"]],
  ["Databases", ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Schema design", "Query optimization"]],
  ["AI & Internal Tools", ["OpenAI API", "LLM workflows", "Prompt-to-SQL", "Python automation"]],
  ["Auth & Security", ["Auth0", "bcrypt", "AES-256 encryption", "RBAC", "Rate limiting"]],
  ["DevOps", ["Docker", "GitHub Actions", "CI/CD", "Linux", "AWS", "Git"]],
  ["Testing", ["Postman", "JUnit", "Selenium", "Charles Proxy", "Jira", "TestRail", "API testing", "Unit testing", "Functional testing", "Regression testing"]],
  ["Documentation", ["REST API documentation", "Technical documentation", "API specifications"]],
];

const experience = [
  {
    time: "Sep 2026 — Now",
    company: "Empire Life",
    role: "Software Engineer",
    place: "Toronto, ON",
    points: [
      "Developing and maintaining Customer Identity and Access Management (CIAM) solutions using Auth0, supporting secure authentication, authorization, and user access workflows.",
    ],
  },
  {
    time: "Jan 2023 — Sep 2026",
    company: "Canadian Imperial Bank of Commerce",
    role: "Business Analyst, Fraud Technology — Python Automation",
    place: "Toronto, ON",
    points: [
      "Built Python automation scripts and reconciliation pipelines using pandas, NumPy, SQL, and PostgreSQL to identify SLA breaches, queue mismatches, duplicate fraud cases, and workflow anomalies, reducing manual review effort by approximately 40%.",
      "Developed internal tooling to support fraud case assignment, investigator queue monitoring, exception handling, and operational reporting across high-volume fraud workflows.",
      "Investigated production workflow issues by analyzing transaction patterns, case routing logic, API responses, and data inconsistencies across CNP, tap, chip, debit, and e-Transfer fraud channels.",
    ],
  },
  {
    time: "Jan — May 2023",
    company: "Fibra Inc.",
    role: "Software Engineer Intern — Backend (Part-Time)",
    place: "Toronto, ON",
    points: [
      "Designed and built RESTful backend services using Node.js, Express.js, and PostgreSQL, including authentication endpoints, user-management APIs, normalized database schemas, and backend validation logic for the product’s beta launch.",
      "Implemented authentication and identity controls using JWT, bcrypt hashing, request validation, and role-based access policies, securing all backend routes and standardizing authorization logic.",
      "Optimized PostgreSQL schema design and query performance through indexing and normalization, improving average response time by approximately 35%.",
    ],
  },
  {
    time: "Jan — Sep 2023",
    company: "Score Media and Gaming (Penn Entertainment)",
    role: "Quality Engineering Intern",
    place: "Toronto, ON",
    points: [
      "Designed and executed automated unit, functional, and regression test suites using Python, covering REST API responses, payment scenarios, geolocation checks, and regulatory compliance logic across Android, iOS, and web platforms.",
      "Used Charles Proxy, Postman, Jira, TestRail, and CI/CD pipeline logs to debug API requests, reproduce defects, and validate fixes across UAT, staging, and production environments.",
      "Automated QA reporting workflows with Python by generating TestRail test cases and Jira defect tickets from structured failure outputs, reducing manual reporting effort by approximately 50%.",
    ],
  },
];

const projects = [
  {
    name: "NL-to-SQL Engine",
    tools: ["OpenAI API", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Prisma", "Redis", "Docker", "JWT"],
    points: [
      "Built a full-stack LLM-powered platform using the OpenAI API to convert plain-English prompts into executable SQL queries, with a React/Next.js front-end and Node.js/PostgreSQL backend.",
      "Developed REST API routes for authentication, database connection management, prompt processing, SQL generation, query execution, and structured error handling.",
      "Implemented secure multi-tenant access controls using JWT authentication, AES-256 credential encryption, Redis rate limiting, and row-level access policies.",
      "Added SQL validation and guardrails to reduce unsafe query execution, improve response reliability, and protect connected database credentials.",
      "Containerized the application with Docker and configured environment-based deployment settings for local development and production hosting.",
    ],
  },
  {
    name: "Transaction Risk API",
    tools: ["Java", "Spring Boot", "Kafka", "Redis", "PostgreSQL", "Hibernate", "Docker", "GitHub Actions"],
    points: [
      "Built a production-ready real-time fraud detection backend using Java and Spring Boot, exposing REST APIs that score transactions and return approve, flag, or block decisions based on configurable rule sets.",
      "Implemented an event-driven architecture using Kafka to consume and process payment events asynchronously, publishing fraud decision outcomes under simulated high-throughput workloads.",
      "Containerized the application with Docker and configured GitHub Actions CI/CD to automate build, test, and deployment pipelines end-to-end.",
      "Designed PostgreSQL persistence using Hibernate ORM; added Redis caching for fraud rule lookups to reduce database reads and improve scoring latency under load.",
    ],
  },
];

// Figures like "40%" get the primary ink so the outcomes stand out without bold or colour.
function Points({ items }: { items: string[] }) {
  return (
    <ul className="resume-points">
      {items.map((p) => (
        <li key={p}>{p.split(/(\d+%)/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</li>
      ))}
    </ul>
  );
}

// Résumé entry header, laid out like the PDF: name and dates on one line, role and place under it.
function RowHead({ title, aside, sub, subAside }: { title: string; aside?: string; sub?: string; subAside?: string }) {
  return (
    <div className="resume-row-head">
      <h3 className="resume-row-title">{title}</h3>
      {aside ? <p className="resume-date">{aside}</p> : null}
      {sub ? <p className="resume-role">{sub}</p> : null}
      {subAside ? <p className="resume-place">{subAside}</p> : null}
    </div>
  );
}

export default function ResumePage() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to résumé</a>
      <TopNav archive resumePage />

      <main id="main" className="page">
        <header className="archive resume-head">
          <a className="text-link back-link" href="/">Home</a>
          <div className="resume-head-grid">
            <div>
              <h1 className="archive-title">Résumé</h1>
              <p className="resume-download"><ChipLink href={pdf} external>Download PDF</ChipLink></p>
            </div>
            <div className="resume-id">
              <p className="resume-name">Aradhya Singh</p>
              <p className="resume-tagline">Software Engineer · Toronto, ON</p>
              <ul className="resume-contact">
                {contact.map((c) => (
                  <li key={c.href}>
                    <a className="text-link" href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </header>

        <section className="section resume-section" data-reveal="line" aria-labelledby="summary-title">
          <SectionHeader num="01" title="Summary" id="summary" />
          <p className="resume-summary" data-reveal="up">{summary}</p>
        </section>

        <section className="section resume-section" data-reveal="line" aria-labelledby="skills-title">
          <SectionHeader num="02" title="Technical Skills" id="skills" />
          <dl className="resume-skills">
            {skills.map(([label, items]) => (
              <div className="resume-skill" data-reveal="up" key={label}>
                <dt>{label}</dt>
                <dd>{items.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section resume-section" data-reveal="line" aria-labelledby="experience-title">
          <SectionHeader num="03" title="Experience" id="experience" />
          <ol className="resume-list">
            {experience.map((r) => (
              <li className="resume-row" data-reveal="up" key={r.company}>
                <RowHead title={r.company} aside={r.time} sub={r.role} subAside={r.place} />
                <Points items={r.points} />
              </li>
            ))}
          </ol>
        </section>

        <section className="section resume-section" data-reveal="line" aria-labelledby="projects-title">
          <SectionHeader num="04" title="Projects" id="projects" />
          <ol className="resume-list">
            {projects.map((p) => (
              <li className="resume-row" data-reveal="up" key={p.name}>
                <RowHead title={p.name} />
                <ul className="archive-tools resume-tools" aria-label="Built with">
                  {p.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <Points items={p.points} />
              </li>
            ))}
          </ol>
        </section>

        <section className="section resume-section" data-reveal="line" aria-labelledby="education-title">
          <SectionHeader num="05" title="Education" id="education" />
          <ol className="resume-list">
            <li className="resume-row" data-reveal="up">
              <RowHead title="York University" aside="Sep 2019 — Apr 2024" sub="Bachelor of Science in Computer Science" subAside="Toronto, ON" />
            </li>
          </ol>
        </section>

        <footer className="footer">
          <span>© 2026 Aradhya Singh</span>
          <a className="text-link" href="#main">Back to top</a>
        </footer>
      </main>
    </>
  );
}
