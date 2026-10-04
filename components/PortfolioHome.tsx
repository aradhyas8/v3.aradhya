import TopNav from "@/components/TopNav";
import WorkCards from "@/components/WorkCards";

const resume = "/resume";
const email = "aradhyas8@zohomailcloud.ca";
const github = "https://github.com/aradhyas8";
const linkedin = "https://www.linkedin.com/in/aradhyas8/";

const roles = [
  { time: "2026—Now", company: "Empire Life", role: "Software Engineer", note: "Identity and Access Management infrastructure" },
  { time: "2023—2026", company: "CIBC", role: "Business Analyst", note: "Debit Card Fraud and Identity Theft" },
  { time: "2023", company: "Fibra", role: "Software Engineer", note: "Mobile Application Development" },
  { time: "2023", company: "theScore", role: "Quality Engineering Intern", note: "Sportsbook QA, Multi-State Launch & Release Testing" },
];

// Pill link with a sliding arrow: → for in-site, ↗ for external. Two copies so one can leave as the other arrives.
export function ChipLink({ href, external = false, children }: { href: string; external?: boolean; children: React.ReactNode }) {
  const arrow = external ? <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" /> : <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />;
  return (
    <a className="chip-link" href={href} {...(external ? { "data-external": "", target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      <span className="chip-arrow" aria-hidden="true">
        {[0, 1].map((i) => <svg key={i} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{arrow}</svg>)}
      </span>
    </a>
  );
}

export function SectionHeader({ num, title, id }: { num: string; title: string; id: string }) {
  return (
    <div className="sec-head">
      <span className="sec-num" data-reveal="num" aria-hidden="true">{num}</span>
      <h2 className="sec-title" id={`${id}-title`}>{title}</h2>
    </div>
  );
}

function ExperienceRow({ time, company, role, note }: (typeof roles)[number]) {
  return (
    <li className="exp-row" data-reveal="up">
      <p className="exp-time">{time}</p>
      <div>
        <h3 className="exp-company">{company}</h3>
        <p className="exp-role">{role}</p>
      </div>
      <p className="exp-note">{note}</p>
    </li>
  );
}

const icons = {
  GitHub: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" /></svg>,
  LinkedIn: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>,
  Email: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3 6 9 7 9-7" /></svg>,
  "Résumé": <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>,
};

// Icon-only links; the label is the accessible name and the hover tooltip.
function IconLinks({ full = false }: { full?: boolean }) {
  const links: [keyof typeof icons, string][] = [["GitHub", github], ["LinkedIn", linkedin]];
  if (full) links.push(["Email", `mailto:${email}`], ["Résumé", resume]);
  return (
    <ul className="link-row">
      {links.map(([label, href]) => (
        <li key={label}>
          <a className="icon-link" href={href} aria-label={label} title={label} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{icons[label]}</a>
        </li>
      ))}
    </ul>
  );
}

function ContactSection() {
  return (
    <section className="section contact" data-reveal="line" id="contact" data-nav="contact" aria-labelledby="contact-title">
      <SectionHeader num="03" title="Contact" id="contact" />
      <div className="contact-body">
        <p className="contact-statement">Have something worth building? Say hello.</p>
        <div className="contact-foot">
        <p className="body-copy">Open to engineering roles and interesting problems. Email is the quickest way to reach me.</p>
        <a className="text-link contact-email" href={`mailto:${email}`}>{email}</a>
        <IconLinks />
        </div>
      </div>
    </section>
  );
}

// Abstract CN Tower mark, traced from the supplied artwork as filled shapes so the lines taper to points.
// Body uses currentColor (muted); the ring picks up the live blue, echoing the location dot.
// The orbit carries a paper-coloured outline so it reads as passing in front of the mast.
const orbit = "M756 510C700 499 660 495.5 620 496C570 497 539 510 539 528C539 548 575 559 612 560C578 557.5 543.5 547 543.5 528C543.5 512 572 500.5 620 499.5C660 499 700 502 756 510Z";

function HeroTower() {
  return (
    <svg className="hero-art" viewBox="487 150 280 966" fill="currentColor" aria-hidden="true">
      <path d="M627 162C627.6 210 628.4 255 629 289H625C625.6 255 626.4 210 627 162Z" />
      <circle className="hero-art-node" cx="627" cy="306" r="10.5" fill="none" strokeWidth="3.2" />
      <path d="M624.4 323H629.6C630.4 600 629.4 900 627.3 1104H626.7C624.6 900 623.6 600 624.4 323Z" />
      <path d={orbit} stroke="var(--color-paper)" strokeWidth="5" strokeLinejoin="round" />
      <path d={orbit} />
    </svg>
  );
}

export default function PortfolioHome() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <TopNav />

      <main id="main" className="page">
        <section className="hero" id="top" aria-label="Introduction">
          <div className="hero-copy">
            <p className="hero-location"><span className="live-dot" aria-hidden="true" /><span>Toronto, Canada</span><span className="hero-location-sep" aria-hidden="true">/</span><span>Now at Empire Life</span></p>
            <h1 className="hero-title">Software Engineer <span className="hero-title-sub">Building software from infrastructure to interface.</span></h1>
            <p className="hero-about">Experience across identity infrastructure, backend systems, developer tooling, and product engineering.</p>
            <IconLinks full />
          </div>
          <HeroTower />
        </section>

        <section className="section work" data-reveal="line" id="work" data-nav="work" aria-labelledby="work-title">
          <SectionHeader num="01" title="Selected Work" id="work" />
          <div className="work-body">
            <WorkCards />
          </div>
        </section>

        <section className="section experience" data-reveal="line" id="experience" data-nav="experience" aria-labelledby="experience-title">
          <SectionHeader num="02" title="Experience" id="experience" />
          <ol className="exp-list">
            {roles.map((r) => <ExperienceRow key={r.company} {...r} />)}
          </ol>
          <p className="section-foot exp-foot"><ChipLink href={resume}>Full résumé</ChipLink></p>
        </section>

        <ContactSection />

        <footer className="footer">
          <span>© 2026 Aradhya Singh</span>
          <a className="text-link" href="#top">Back to top</a>
        </footer>
      </main>
    </>
  );
}
