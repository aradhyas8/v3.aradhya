import CardMotion from "@/components/CardMotion";
import { projects } from "@/components/projects";

type Link = { label: string; href: string };
type Stat = { label: string; value: string; href?: string; icon: "star" | "download" };

type CardItem = {
  name: string;
  desc: string;
  links: Link[];
  status?: string;
  stats?: Stat[];
  stage: React.ReactNode;
};

// Selected Work: three equal cards per row. Each stage shows the product doing its one thing, rebuilt as UI
// so it stays sharp at any size; the last card lists the rest of the archive.
// Every stage is finished at rest. CardMotion plays its story on scroll-in and hover (see .work-card in portfolio.css).
const selected: CardItem[] = [
  {
    name: "Alder",
    desc: "Custom Android TV client for Stremio with smart stream selection.",
    links: [{ label: "GitHub", href: "https://github.com/aradhyas8/Alder" }],
    stage: <AlderStage />,
  },
  {
    name: "Plume",
    desc: "Minimal, ad-free Android TV launcher with zero bloat.",
    links: [
      { label: "Website", href: "#" },
      { label: "GitHub", href: "https://github.com/aradhyas8/Plume_Launcher" },
    ],
    stats: [
      {
        label: "Stars",
        value: "280+",
        href: "https://github.com/aradhyas8/Plume_Launcher/stargazers",
        icon: "star",
      },
      {
        label: "Downloads",
        value: "7.8k",
        href: "https://github.com/aradhyas8/Plume_Launcher/releases",
        icon: "download",
      },
    ],
    stage: <PlumeStage />,
  },
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
    desc: "Context engine for your AI agents.",
    links: [{ label: "Try QueryIO", href: "https://queryiomcp.vercel.app/" }],
    stage: <QueryIOStage />,
  },
  {
    name: "PageMind",
    desc: "Read and understand research papers with AI.",
    links: [{ label: "Try PageMind", href: "https://www.pagemind.app" }],
    stage: <PageMindStage />,
  },
];

const others = projects
  .filter((p) => !selected.some((s) => s.name === p.name))
  .sort((a, b) => Number(b.year) - Number(a.year));

function AlderStage() {
  return (
    <div className="stage stage-alder">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover inside an aria-hidden stage */}
      <img src="/static/Images/alder-cover.svg" alt="" loading="lazy" />
    </div>
  );
}

function PlumeStage() {
  return (
    <div className="stage stage-plume">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover inside an aria-hidden stage */}
      <img src="/static/Images/plume-cover.svg" alt="" loading="lazy" />
    </div>
  );
}

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

// The product's investigate panel: an agent answering a support case from real rows.
function QueryIOStage() {
  return (
    <div className="stage stage-qio">
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative cover inside an aria-hidden stage */}
      <img src="/static/Images/queryio-cover.png" alt="" loading="lazy" />
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
function WorkCard({ name, desc, links, status, stats, stage }: CardItem) {
  // If the first link is a placeholder like '#', prioritize the next real link for the card click target
  const primary = links.find((l) => l.href && l.href !== "#") ?? links[0];
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
          {stats ? (
            <div className="project-stats" aria-label={`${name} statistics`}>
              {stats.map((s) => {
                const content = (
                  <>
                    {s.icon === "star" ? (
                      <svg viewBox="0 0 16 16" width="11" height="11" fill="currentColor" aria-hidden="true">
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M8 2.5v8m-3.5-3.5L8 10.5l3.5-3.5M3 13.5h10" />
                      </svg>
                    )}
                    <span>{s.value}</span>
                  </>
                );
                return s.href ? (
                  <a key={s.label} className="stat-pill" href={s.href} {...ext(s.href)} title={`${s.value} ${s.label}`}>
                    {content}
                  </a>
                ) : (
                  <span key={s.label} className="stat-pill" title={`${s.value} ${s.label}`}>
                    {content}
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>
        <p className="work-desc">{desc}</p>
        <p className="work-links">
          {links.map((l) => (
            <a key={l.label + l.href} className="text-link" href={l.href} {...ext(l.href)}>
              {l.label}
            </a>
          ))}
        </p>
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
