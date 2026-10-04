import CardMotion from "@/components/CardMotion";
import { projects } from "@/components/projects";

type Link = { label: string; href: string };

// Selected Work: three equal cards per row. Each stage shows the product doing its one thing, rebuilt as UI
// so it stays sharp at any size; the last card lists the rest of the archive.
// Every stage is finished at rest. CardMotion plays its story on scroll-in and hover (see .work-card in portfolio.css).
const selected: { name: string; desc: string; links: Link[]; status?: string; stage: React.ReactNode }[] = [
  {
    name: "Hushfield",
    desc: "Ambient audio for sleep, focus and quiet.",
    links: [
      { label: "iOS", href: "https://apps.apple.com/app/id6802781534" },
      { label: "Android", href: "https://play.google.com/store/apps/details?id=com.inethan18.hushfield" },
    ],
    stage: <HushfieldStage />,
  },
  {
    name: "QueryIO",
    desc: "Safe and simple database access for AI agents.",
    links: [{ label: "Join the waitlist", href: "https://queryio1.vercel.app/" }],
    status: "In development",
    stage: <QueryIOStage />,
  },
  {
    name: "PageMind",
    desc: "Read and understand research papers with AI.",
    links: [{ label: "Try PageMind", href: "https://www.pagemind.app" }],
    stage: <PageMindStage />,
  },
  {
    name: "v2.aradhya",
    desc: "The previous version of this site.",
    links: [{ label: "Visit v2", href: "https://v2.aradhya.dev" }],
    stage: <V2Stage />,
  },
  {
    name: "v1.aradhya",
    desc: "The first version of this site.",
    links: [{ label: "Visit v1", href: "https://v1.aradhya.dev" }],
    stage: <V1Stage />,
  },
];

const others = projects
  .filter((p) => !selected.some((s) => s.name === p.name))
  .sort((a, b) => Number(b.year) - Number(a.year));

function HushfieldStage() {
  return (
    <div className="stage stage-hush">
      <div className="hush-scene" />
      <div className="hush-rain" />
      <div className="hush-shade" />
      <div className="hush-phone">
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative screenshot inside an aria-hidden stage */}
        <img src="/static/Images/hushfield/home.jpg" alt="" loading="lazy" />
      </div>
      <div className="hush-np">
        <span className="hush-eq"><i /><i /><i /><i /></span>
        <span>Corner Table, Rain Outside<small>Café murmur and rain</small></span>
      </div>
    </div>
  );
}

const ruleIcons = {
  ok: <path d="m5 8.2 2 2 4-4.2" />,
  no: <path d="m5.6 5.6 4.8 4.8m0-4.8-4.8 4.8" />,
};

function Rule({ kind, label, value }: { kind: keyof typeof ruleIcons; label: string; value: string }) {
  return (
    <div className={`qio-rule qio-${kind}`}>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7" />{ruleIcons[kind]}</svg>
      <span>{label}</span>
      <span className="qio-v">{value}</span>
    </div>
  );
}

function QueryIOStage() {
  return (
    <div className="stage stage-qio">
      <div className="qio-ui">
        <pre className="qio-sql">
          <span><b>UPDATE</b> subscriptions</span>
          <span>SET status = &apos;cancelled&apos;</span>
          <span>WHERE id = &apos;3f9a-11ee&apos;;</span>
        </pre>
        <div className="qio-gate">
          <div className="qio-head"><b>QueryIO</b><span>checks every query first</span></div>
          <Rule kind="ok" label="One statement" value="1 statement" />
          <Rule kind="no" label="SELECT only" value="UPDATE refused" />
        </div>
        <p className="qio-out"><span className="qio-node" /><strong>Refused before the database.</strong></p>
      </div>
    </div>
  );
}

function PageMindStage() {
  return (
    <div className="stage stage-pm">
      <div className="pm-ui">
        <div className="pm-doc">
          <h4>The Apology and Crito</h4>
          <p><mark>The most important of them was Plato, who founded the Academy</mark> and recorded his teacher&apos;s trial in the Apology.</p>
          <p>Charged with impiety and with corrupting the young, Socrates chose to defend himself before a jury of five hundred citizens.</p>
        </div>
        <div className="pm-chat">
          <p className="pm-q">In one sentence, who was Plato?</p>
          <p className="pm-a"><span className="pm-stream">Socrates&apos; student, who founded the Academy.</span> <span className="pm-src">p. 2</span></p>
          <p className="pm-typing"><i /><i /><i /></p>
        </div>
      </div>
    </div>
  );
}

// The old site's first screen, rebuilt: name and nav on the left, the about card on the right.
// On play the nav indicator steps through its sections, the old site's signature interaction.
function V2Stage() {
  return (
    <div className="stage stage-v2">
      <div className="v2-ui">
        <div className="v2-bar"><i /><i /><i /><span>v2.aradhya.dev</span></div>
        <div className="v2-page">
          <div className="v2-left">
            <p className="v2-name">Aradhya Singh</p>
            <p className="v2-role">Software Developer</p>
            <ul className="v2-nav"><li>About</li><li>Experience</li><li>Project</li></ul>
          </div>
          <p className="v2-card">Graduating from <b>York University</b> with a Bachelor of Science in Computer Science, my career has spanned roles such as a Software Engineer Intern at <b>Fibra Inc.</b> and a Quality Engineering Intern at <b>theScore</b> in Toronto.</p>
        </div>
      </div>
    </div>
  );
}

// The first site's intro, rebuilt in its navy and teal. On play the name types itself out, as it did on the real page.
function V1Stage() {
  return (
    <div className="stage stage-v1">
      <ul className="v1-nav"><li><b>01.</b> Home</li><li><b>02.</b> About</li><li><b>03.</b> Experience</li></ul>
      <div className="v1-hero">
        <p className="v1-hi">hi, I am <span className="v1-name">Aradhya.</span><span className="v1-caret" /></p>
        <p className="v1-sub">I like to solve problems.</p>
        <span className="v1-btn">Resume</span>
      </div>
    </div>
  );
}

// The list is rendered twice so the scroll loop can wrap without a seam.
function ArchiveStage() {
  const rows = (pass: number) => others.map((p) => (
    <li key={`${pass}-${p.name}`}><span className="arc-y">{p.year}</span><span className="arc-n">{p.name}</span></li>
  ));
  return (
    <div className="stage stage-arc">
      <div className="arc-ledger"><ol>{rows(1)}{rows(2)}</ol></div>
    </div>
  );
}

// The name links to the card's main destination and its hit area covers the whole card; secondary links sit above it.
function WorkCard({ name, desc, links, status, stage }: { name: string; desc: string; links: Link[]; status?: string; stage: React.ReactNode }) {
  const [primary] = links;
  const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {});
  return (
    <li className="work-card" data-reveal="up">
      <div className="stage-frame" aria-hidden="true">
        {stage}
        <div className="stage-spot" />
      </div>
      <div className="work-cap">
        <div className="work-cap-top">
          <h3 className="work-name">{primary ? <a href={primary.href} {...ext(primary.href)}>{name}</a> : name}</h3>
          {status ? <span className="project-status"><span className="live-dot" aria-hidden="true" />{status}</span> : null}
        </div>
        <p className="work-desc">{desc}</p>
        <p className="work-links">{links.map((l) => <a key={l.href} className="text-link" href={l.href} {...ext(l.href)}>{l.label}</a>)}</p>
      </div>
    </li>
  );
}

export default function WorkCards() {
  return (
    <>
      <ol className="work-grid">
        {selected.map((p) => <WorkCard key={p.name} {...p} />)}
        <WorkCard
          name="More projects"
          desc={`${others.length} more, from ${others[others.length - 1].year} to now.`}
          links={[{ label: "Project archive", href: "/project_archive" }]}
          stage={<ArchiveStage />}
        />
      </ol>
      <CardMotion />
    </>
  );
}
